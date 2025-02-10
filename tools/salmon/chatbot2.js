

let botName = "Micheal";
let userId = "Guest";

// Initialize base data
let baseData = [
    ["hello", "Hi there!", ""],
    ["how old is the earth", "The Earth is approximately 4.54 billion years old.", ""]
];


function levenshtein(a, b) {
    if (a.length > b.length) [a, b] = [b, a];
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    let matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
    matrix[0] = Array.from({ length: a.length + 1 }, (_, i) => i);

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            matrix[i][j] = b.charAt(i - 1) === a.charAt(j - 1) ?
                matrix[i - 1][j - 1] :
                Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
        }
    }
    return matrix[b.length][a.length];
}

function getClosestQuestion(input, data) {
    let closestQuestion = null;
    let minDistance = Infinity;

    for (const entry of data) {
        const distance = levenshtein(input, entry[0]);
        if (distance < minDistance) {
            minDistance = distance;
            closestQuestion = entry[0];
        }
    }
    return closestQuestion;
}




function sendMessage() {
    const inputElem = document.getElementById('userInput');
    const message = inputElem.value.trim();
    if (!message) return; // Prevent empty messages

    inputElem.value = '';
    const chatWindow = document.getElementById('chatWindow');

    // Add User Message
    const userMessage = createChatBubble(userId, message, "user-message");
    chatWindow.appendChild(userMessage);

    // Auto-scroll to bottom
    scrollToBottom();

    // Simulated bot response delay
    setTimeout(() => {
        const response = getResponse(message);
        const botMessage = createChatBubble(botName, response, "bot-message");
        chatWindow.appendChild(botMessage);

        scrollToBottom();
        animateTalking(true); // Start talking animation
        
        // Calculate dynamic animation duration based on text length
        const duration = Math.max(1000, (response.length / 20) * 1000);
        setTimeout(() => animateTalking(false), duration);
    }, 1000);
}

// Function to create chat bubble
function createChatBubble(sender, text, className) {
    const bubble = document.createElement("div");
    bubble.classList.add("chat-bubble", className);
    bubble.innerHTML = `<strong>${sender}:</strong> ${text}`;
    return bubble;
}


setTimeout(function () {
    const chatWindow = document.getElementById('chatWindow'); // Ensure chatWindow is selected
    // Introduction Message
    const introMessage = createChatBubble(botName, `Model Version 3.1 - Let's begin chatting...`, "bot-message");
    chatWindow.appendChild(introMessage);
    scrollToBottom();
}, 300);





function handleKeyPress(event) {
    if (event.keyCode === 13) { // Check if Enter key is pressed
        event.preventDefault();
        sendMessage();
        scrollToBottom();
    }
}



function getResponse(message) {
    let response = searchInData(message, baseData);
    return response || "I can't answer that until you provide me with an Updated OS.";
}

function searchInData(message, data) {
    const closestQuestion = getClosestQuestion(message, data);
    return data.find(entry => entry[0] === closestQuestion)?.[1] || null;
}


function scrollToBottom() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.scrollTop = chatWindow.scrollHeight;
}


const chatToggle = document.getElementById("dragHandle"); // Select element
const chatWindow = document.getElementById("chatContainer"); // Chat window element
const chatDisplay = document.getElementById("chatDisplay"); // Display text element


// 
// chatToggle.addEventListener("click", toggleChatWindow);
// chatToggle.addEventListener("touchstart", function (event) {
    // event.preventDefault(); // Prevent default touch behavior
    // toggleChatWindow();
// });
// 
// let shouldShowChat = false;
// 
// function toggleChatWindow() {
    // shouldShowChat = !shouldShowChat; // Toggle the state
    // chatWindow.style.transition = "opacity 0.5s ease-in-out";
    // chatWindow.style.opacity = shouldShowChat ? "1" : "0";
    // chatWindow.style.pointerEvents = shouldShowChat ? "auto" : "none";
    // mainIcon.style.backgroundColor = shouldShowChat ? "#f8db82" : "#be7272";
    // mainIcon.style.opacity = shouldShowChat ? "1" : ".3";
// }