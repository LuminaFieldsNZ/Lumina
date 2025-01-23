import http.server
import socketserver
import os

# Set the port number
port = 8090

# Set the directory to the current working directory
directory = '.'  # Uncomment this line if you want test.html to be served for any path

# Change to the specified directory
os.chdir(directory)

# Create a custom handler
class MyHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        path = path.split('?', 1)[0]  # Remove query string
        return super().translate_path(path)

    def do_GET(self):
        if self.path == '/':
            self.path = 'index.html'  # Redirect to test.html for the root path
        super().do_GET()

# Set up the server
with socketserver.TCPServer(("", port), MyHandler) as httpd:
    print("Server started at localhost:" + str(port))
    httpd.serve_forever()
