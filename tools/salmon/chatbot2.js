let botName;

setTimeout(async function() {
    const chatWindow = document.getElementById('chatWindow');

    const finalMessage = `
        <p><span class="gradient-text"> Micheal | Model Version 3.1</span> - Let's begin chatting ...</p><br>
    `;

    chatWindow.innerHTML += finalMessage;
    botName = "Micheal";
scrollToBottom();
}, 300);

// Global variable to store the user ID
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
    const message = inputElem.value;
    inputElem.value = '';

    const chatWindow = document.getElementById('chatWindow');
    chatWindow.innerHTML += '<p>' + userId + ': ' + message + '</p>';

    // Calculate duration based on the length of the chat window content
    const chatContentLength = chatWindow.innerHTML.replace(/<[^>]*>/g, '').length; // remove HTML tags for character count
    const duration = Math.max(1000, (chatContentLength / 20) * 1000); // Duration is 1 second per 20 characters, but minimum 1 second

    setTimeout(() => {
        response = getResponse(message);
        chatWindow.innerHTML += '<span class="gradient-text">' + botName + '</span>: ' + response + '</p><br>';
        scrollToBottom();
        animateTalking(true); // Start talking
        setTimeout(() => animateTalking(false), duration); // Dynamically adjust the animation duration
    }, 1000);
}


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

let isChatVisible = false; // Track chat visibility

dragHandle.addEventListener('click', function () {
    if (chatWindow) {
        isChatVisible = !isChatVisible; // Toggle state
        chatWindow.style.opacity = isChatVisible ? "1" : "0"; // Show or hide
        chatWindow.style.pointerEvents = isChatVisible ? "auto" : "none"; // Ensure it doesn't interfere when hidden
    }
});




