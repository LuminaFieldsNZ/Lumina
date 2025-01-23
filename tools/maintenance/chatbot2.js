window.onload = function() {
    loadPlayerJson();
};

function updateAppWithData(playerData) {
    console.log('Updating app with Player Data:', playerData);

    if (playerData.userData) {
        updateUserData(playerData.userData);
        console.log('App updated successfully.');
    } else {
        console.error('Invalid Player Data structure. Check the player1.json format.');
    }
}

 // Initialize user data with default values
        let userData = {
            id: "Newcomer",
            roomMaintenance: [],
            conversationData: []
        };

// Global variable to store the user ID
let userId = "Newcomer";

// Function to track user ID globally
function trackUserId(newUserId) {
    userId = newUserId; // Update userId variable
    userData.id = newUserId; // Update userData.id
}

// JSON editor element
let jsonEditor = document.getElementById('jsonEditor');

// Combine user data into a single object
let combinedData = {
    conversationData: userData.conversationData,
    userData: {
        id: userData.id,
        roomMaintenance: userData.roomMaintenance
    }
};

// Initialize base data
let baseData = [
    ["hello", "Hi there!", ""],
    ["how old is the earth", "The Earth is approximately 4.54 billion years old.", ""]
];

// Function to export data as JSON
function exportData() {
    const jsonData = jsonEditor.value;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonData);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "resort_maintenance.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

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
    chatWindow.innerHTML += '<br><p>' + userData.id + ': ' + message + '</p>';

    setTimeout(() => {
        response = getResponse(message);
        chatWindow.innerHTML += '<span class="gradient-text">' + botName + '</span>: ' + response + '</p>';
        scrollToBottom();

        // Update conversationData with the new message
        userData.conversationData.push([userData.id, message, response]);

        // Update the JSON editor separately
        updateJSONEditor();

        const timestamp = new Date().toISOString();
    }, 1000);
}


function getResponse(message) {
    let response = searchInData(message, baseData);
    if (!response) {
        response = searchInData(message, conversationData);
    }
    return response || "I can't answer that until you provide me with an Updated OS.";
}

function searchInData(message, data) {
    const closestQuestion = getClosestQuestion(message, data);
    return data.find(entry => entry[0] === closestQuestion)?.[1] || null;
}

function isValidDataFormat(data) {
    if (!data || !data.conversationData || !Array.isArray(data.conversationData)) {
        return false;
    }
    for (const entry of data.conversationData) {
        if (!Array.isArray(entry) || entry.length !== 3 || typeof entry[0] !== 'string' || typeof entry[1] !== 'string' || typeof entry[2] !== 'string') {
            return false;
        }
    }
    if (!data.userData || typeof data.userData.id !== 'string' || !Array.isArray(data.userData.roomMaintenance)) {
        return false;
    }
    return true;
}

function updateUserData(userData) {
    userId = userData.id;
    roomMaintenance = userData.roomMaintenance;
}

function importBaseDataSet(event) {
    const files = event.target.files;
    if (files.length === 0) {
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        try {
            const importedData = JSON.parse(event.target.result);
            console.log("Imported data:", importedData);

            if (isValidDataFormat(importedData)) {
                let { conversationData, userData } = importedData;

                if (userData && userData.id) {
                    trackUserId(userData.id);
                }

                userData = userData || {};
                userData.conversationData = conversationData || [];
                userData.roomMaintenance = userData.roomMaintenance || [];

                const chatWindow = document.getElementById('chatWindow');
                chatWindow.innerHTML += '<p>Logged in as: ' + userData.id + '</p>';

                updateJSONEditor();

                console.log('Data imported successfully.');
            } else {
                alert('Invalid data format.');
            }
        } catch (error) {
            console.error("Error parsing or reading the file:", error);
            alert('Error reading the file.');
        }
    };
    reader.readAsText(files[0]);
}

function scrollToBottom() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function updateJSONEditor() {
    const updatedData = {
        conversationData: userData.conversationData,
        userData: {
            id: userId,
            roomMaintenance: userData.roomMaintenance
        }
    };
    jsonEditor.value = JSON.stringify(updatedData, null, 2);
}