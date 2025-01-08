import tkinter as tk
from tkinter import messagebox
import inputs
import pyautogui
import threading
import time
import queue

# Global flag to control the input listening loop
is_running = True
macros = {}  # Dictionary to store macro mappings
train_mode = False  # To keep track of whether we are training a macro
current_macro_keys = []  # To store keys pressed during macro training

# Thread-safe queue for notifications
notification_queue = queue.Queue()

# Function to map Xbox controller buttons to keystrokes
def map_button_to_keys(event):
    if event.ev_type == 'Key':
        button_name = event.ev_code
        if button_name in macros:
            notification_text = f"Executing macro for {button_name}: {macros[button_name]}"
            update_notifications(notification_text)
            pyautogui.hotkey(*macros[button_name])  # Simulate the keys for the macro
        else:
            notification_text = f"No macro assigned for {button_name}"
            update_notifications(notification_text)

# Function to listen for Xbox controller input
def listen_for_input():
    global is_running
    print("Listening for Xbox controller input...")
    while is_running:
        try:
            events = inputs.get_key()
            for event in events:
                map_button_to_keys(event)
        except Exception as e:
            error_message = f"Error while listening to input: {e}"
            update_notifications(error_message)
            break
        time.sleep(0.1)  # To avoid maxing out CPU

# Function to stop the input listener when the GUI is closed
def stop_program():
    global is_running
    is_running = False
    print("Closing program...")
    root.quit()

# Function to handle key press logging for macro training
def handle_key_press(event):
    global current_macro_keys, train_mode

    if train_mode:
        if event.ev_code == 'KEY_ESC':
            notification_text = f"Macro training stopped. Keys logged: {current_macro_keys}"
            update_notifications(notification_text)
            macros[current_button.get()] = current_macro_keys  # Assign macro to button
            listbox.insert(tk.END, f"{current_button.get()} -> {current_macro_keys}")
            current_macro_keys = []  # Clear current keys
            stop_macro_training()
        elif event.ev_type == 'Key':
            current_macro_keys.append(event.ev_code)  # Log key press
            notification_text = f"Key logged: {event.ev_code}"
            update_notifications(notification_text)

# Function to start macro training
def start_macro_training():
    global train_mode
    train_mode = True
    current_button.set("")  # Clear current button field
    messagebox.showinfo("Macro Training", "Press the keys for the macro. Press ESC to stop.")
    update_notifications("Training mode started.")

# Function to stop macro training
def stop_macro_training():
    global train_mode
    train_mode = False
    update_notifications("Training mode stopped.")

# Function to update notifications in the UI
def update_notifications(text):
    notification_queue.put(text)

# Function to process notifications from the queue
def process_notifications():
    while not notification_queue.empty():
        text = notification_queue.get()
        notifications.insert(tk.END, text)
        notifications.yview(tk.END)  # Auto scroll to the latest message
    root.after(100, process_notifications)  # Check for new notifications every 100ms

# Function to create the GUI
def create_gui():
    global root, listbox, notifications, current_button

    root = tk.Tk()
    root.title("Xbox Controller Macro Mapper")

    # Set window size
    root.geometry("400x500")

    # Frame for list of buttons and macros
    frame = tk.Frame(root)
    frame.pack(pady=10)

    # Label and Listbox for Xbox buttons and assigned macros
    list_label = tk.Label(frame, text="Assign Macros to Xbox Buttons", font=("Arial", 12))
    list_label.pack()
    listbox = tk.Listbox(frame, width=50, height=10, font=("Arial", 10))
    listbox.pack(pady=10)

    # Button to start macro training
    train_button = tk.Button(root, text="Train Macro", command=start_macro_training, font=("Arial", 12))
    train_button.pack(pady=10)

    # Input field for the selected button (for training purposes)
    current_button = tk.StringVar()
    button_label = tk.Label(root, text="Selected Button", font=("Arial", 10))
    button_label.pack(pady=5)
    button_entry = tk.Entry(root, textvariable=current_button, font=("Arial", 10))
    button_entry.pack(pady=5)

    # Notifications area at the bottom
    notifications_label = tk.Label(root, text="Notifications", font=("Arial", 12))
    notifications_label.pack(pady=5)
    notifications = tk.Listbox(root, height=5, font=("Arial", 10))
    notifications.pack(pady=5, fill=tk.BOTH, expand=True)

    # Button to exit the program manually
    quit_button = tk.Button(root, text="Quit", command=stop_program, font=("Arial", 12))
    quit_button.pack(pady=10)

    # When the window is closed, stop the program
    root.protocol("WM_DELETE_WINDOW", stop_program)

    # Start processing notifications
    root.after(100, process_notifications)

    # Start the Tkinter event loop
    root.mainloop()

# Function to run the program in parallel with the GUI
def run_program():
    global is_running

    # Start the input listener in a separate thread
    input_thread = threading.Thread(target=listen_for_input, daemon=True)
    input_thread.start()

    # Start the GUI
    create_gui()

    # Wait for the input thread to finish (i.e., when is_running becomes False)
    input_thread.join()

# Main function to run the program
if __name__ == "__main__":
    run_program()
