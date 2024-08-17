
faxiumResponses = {
  "Hello": "Hey, it's Faxium here!"
}

 baseData =
[
    ["hello", "Hi there!", ""],
["how old is the earth", "The Earth is approximately 4.54 billion years old.", ""]
];

function exitAll() {
    // Delete all cookies
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
  document.body.innerHTML = '';
}


let userId = "Guest";
let state = {
     hair: './hair/hair0.png',
     glasses: './glasses/glasses0.png',
     body: './body/body0.png',
     outer: './outer/outer0.png'
 };
let populations = {};
let mainHeading = {};
let completedProjects = [];
let homePage = "";
let userCompletedProjects = [];
let conversationData = [];

setTimeout(function() {

    chatWindow.innerHTML += '<p>Collective: Hello, I\'m your <font style="color: lightblue;">AI</font> assistant...  here to listen and support you. Feel free to share what\'s on your mind in the field below</p>';
    scrollToBottom();
}, 4300);

function showCommands() {
        chatWindow.innerHTML += '<p>Commands:<br><font style="color: lightblue;">[add]</font> Will increase a quantity<br><font style="color: lightblue;">[subtract]</font> Will decrease a quantity<br><font style="color: lightblue;">[set]</font> Will reset value to specified amount<br><font style="color: purple;">[frame]</font> Will create live elements</p>';
        scrollToBottom();
}


function exportData() {
    updateJSONDisplay(); // Update the JSON editor with the latest data

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonEditor.value);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "profile.json");
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
const validCategories = ["captain", "voyager", "smuggler", "sailor", "arbiter", "explorer", "merchant", "shipwright", "fisherman", "populist", "nationalist", "realist", "economist", "conservative", "globalist", "idealist", "socialist", "progressive"];

function getClosestCategory(input) {
    let closestCategory = null;
    let minDistance = Infinity;

    for (const category of validCategories) {
        const distance = levenshtein(input, category);
        if (distance < minDistance) {
            minDistance = distance;
            closestCategory = category;
        }
    }
    return minDistance <= 2 ? closestCategory : null; // Only accept if the distance is 2 or less
}

function handleAction(action, value, category) {
    if (populations.hasOwnProperty(category)) {
        switch (action.toLowerCase()) {
            case "add":
                populations[category] += value;
                break;
            case "subtract":
                populations[category] -= value;
                break;
            case "set":
                populations[category] = value;
                break;
            default:
                console.error("Invalid action:", action);
        }
        postMessageToParent(populations[category], category);
    } else if (mainHeading.hasOwnProperty(category)) {
        switch (action.toLowerCase()) {
            case "add":
                mainHeading[category] += value;
                break;
            case "subtract":
                mainHeading[category] -= value;
                break;
            case "set":
                mainHeading[category] = value;
                break;
            default:
                console.error("Invalid action:", action);
        }
        postMessageToParent(mainHeading[category], category);
    } else {
        console.error("Invalid category:", category);
    }
}


function parseCollectiveCommand(data) {


  if (data.trim().toLowerCase() === 'cmd [all]') {
          showCommands();
          return "Commands " + data + " accepted"; // You can customize this response message
      }


    const matches = data.match(/\[(\w+|\d+)\]/g);

    if (!matches || matches.length !== 3) {
        return null;
    }

    let action, value, categoryInput;

    for (const match of matches) {
        const content = match.slice(1, -1);
        if (["add", "subtract", "set"].includes(content.toLowerCase())) {
            action = content;
        } else if (!isNaN(content)) {
            value = parseInt(content, 10);
        } else {
            categoryInput = content;
        }
    }

    if (!action || !value || !categoryInput) {
        return null;
    }

    const category = getClosestCategory(categoryInput.toLowerCase());

    if (!category) {
        return "Invalid category: " + categoryInput;
    }

    handleAction(action, value, category);

    return "Command accepted: " + action + " " + value + " points in " + category;
}


// Function to send a message and handle conversation data
function sendMessage() {
    const inputElem = document.getElementById('userInput');
    const message = inputElem.value;
    inputElem.value = '';

    const chatWindow = document.getElementById('chatWindow');
    chatWindow.innerHTML += `<p>${userId}: ${message}</p>`;
    scrollToBottom();

    if (message.trim().toLowerCase().startsWith('@faxium')) {
        sendFaxiumMessage(message, 'User');
        return; // Return early to prevent further processing
    }

    setTimeout(() => {
        const commandResponse = parseCollectiveCommand(message);
        let response;
        if (commandResponse) {
            response = commandResponse;
            chatWindow.innerHTML += `<p>Collective: ${commandResponse}</p>`;
            scrollToBottom();
        } else {
            response = getResponse(message);
            chatWindow.innerHTML += `<p>Collective: ${response}</p>`;
            scrollToBottom();
        }

        const timestamp = new Date().toISOString();

        // Prepare updated conversation data
        const newEntry = [message, formatResponse(userId, state, populations, mainHeading, completedProjects, homePage, userCompletedProjects), timestamp];

        // Append new entry to existing conversationData
        if (!conversationData) {
            conversationData = []; // Initialize if it doesn't exist
        }
        conversationData.push(newEntry);

        const jsonResponse = {
            userId: userId,
            state: state,
            populations: populations,
            mainHeading: mainHeading,
            completedProjects: completedProjects,
            homePage: homePage,
            userCompletedProjects: userCompletedProjects,
            conversationData: conversationData
        };

        const jsonString = JSON.stringify(jsonResponse, null, 2);
        const formattedResponse = `${escapeHtml(jsonString)}`;

        updateJSONDisplay();
    }, 1000);
}

// Helper function to format the response
function formatResponse(userId, state, populations, mainHeading, completedProjects, homePage, userCompletedProjects) {
    return JSON.stringify({
        userId: userId,
        state: state,
        populations: populations,
        mainHeading: mainHeading,
        completedProjects: completedProjects,
        homePage: homePage,
        userCompletedProjects: userCompletedProjects,
        conversationData: [] // Omitting nested conversationData for simplicity
    }, null, 2);
}




// Utility function to escape HTML special characters
function escapeHtml(text) {
    return text
        .replace(/&/g, '')
        .replace(/</g, '')
        .replace(/>/g, '')
        .replace(/"/g, '')
        .replace(/pre/g, '')
        .replace(/\n/g, '')
        .replace(/'/g, '');

}











function isRedundant(message) {
    return conversationData.some(entry => entry[0] === message);
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

function updateJSONDisplay() {
  // Your existing code to update the JSON editor
  const jsonEditor = document.getElementById('jsonEditor');
  const combinedData = {
    conversationData: conversationData,
    userData: {
      id: userId,
      state: state,
      mainHeading: mainHeading,
      populations: populations,
      completedProjects: userCompletedProjects,
      homePage: homePage
    }
  };
  jsonEditor.value = JSON.stringify(combinedData, null, 2);
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
    if (!data.userData || typeof data.userData.id !== 'string' || typeof data.userData.state !== 'object' || typeof data.userData.mainHeading !== 'object' || typeof data.userData.populations !== 'object' || typeof data.userData.homePage !== 'string' || !Array.isArray(data.userData.completedProjects)) {
        return false;
    }
    return true;
}


function postMessageToAllFrames(win, message) {
    // Iterate through all iframes in the current window/frame and post the message recursively
    for (let i = 0; i < win.frames.length; i++) {
        win.frames[i].postMessage(message, 'https://luminafields.com/');
        postMessageToAllFrames(win.frames[i], message); // Recursive call for nested iframes
    }
}

function importBaseDataSet(event) {
    const files = event.target.files;
    if (files.length === 0) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
        try {
            const data = JSON.parse(event.target.result);

            if (isValidDataFormat(data)) {
                // Update global variables
                conversationData = data.conversationData;
                userId = data.userData.id;
                state = data.userData.state;
                mainHeading = data.userData.mainHeading;
                populations = data.userData.populations;
                completedProjects = data.userData.completedProjects;
                homePage = data.userData.homePage;

                    const messageUpdate = {
                        conversationData: data.conversationData,
                        userId: data.userData.id,
                        state: data.userData.state,
                        mainHeading: data.userData.mainHeading,
                        populations: data.userData.populations,
                        completedProjects: data.userData.completedProjects,
                        homePage: data.userData.homePage,
                    };

                    postMessageToAllFrames(window.top, messageUpdate); // Start from the top-level window


                // Update UI elements
                updateCharacterFromState(); // Update character appearance based on the state
                updateJSONDisplay(); // Update the JSON editor with the latest data
                parent.postMessage({ action: 'openHome', value: 'openHome' }, 'https://luminafields.com/');
                document.getElementById('loginPlace').style.display = 'none';
                chatWindow.innerHTML += '<font style="color:lightgreen;">' + userId + ' is logged in.</font><br>';

            } else {
                alert('Invalid data format.');
            }
        } catch (error) {
            alert('Error reading the file: ' + error.message);
        }
    };
    reader.readAsText(files[0]);
}



function scrollToBottom() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.scrollTop = chatWindow.scrollHeight;
}


  function postMessageToParent(value, category) {
    const message = {};
    message[category] = value;
    window.parent.postMessage(message, 'https://luminafields.com/');
  }


  function updateCharacterFromState() {
      document.getElementById('hairLayer').src = state.hair;
      document.getElementById('glassesLayer').src = state.glasses;
      document.getElementById('bodyLayer').src = state.body;
      document.getElementById('outerLayer').src = state.outer;
  }


    window.addEventListener('message', function(event) {

        if (event.data.action === 'faxiumContent') {
          alert("Test1 PAssed");
            faxiumResponses = event.data.faxiumContent;
        }
        if (event.data.action === 'collectiveContent') {
            baseData = event.data.collectiveContent;
            alert('works');
        }
        if (event.data.action === 'hair') {
            state.hair = event.data.value;
            updateCharacterFromState();
            updateJSONDisplay();
        }
        if (event.data.action === 'glasses') {
            state.glasses = event.data.value;
            updateCharacterFromState();
            updateJSONDisplay();
        }
        if (event.data.action === 'body') {
            state.body = event.data.value;
            updateCharacterFromState();
            updateJSONDisplay();
        }
        if (event.data.action === 'outer') {
            state.outer = event.data.value;
            updateCharacterFromState();
            updateJSONDisplay();
        }
    }, false);





    function handleUserInput() {
    const userInputField = document.getElementById('userInput');
    const message = userInputField.value;
    if (message) {
        sendFaxiumMessage(message, 'User');
        userInputField.value = '';  // Clear the input field
    }
}

function sendFaxiumMessage(message, sender) {
    const chatWindow = document.getElementById('chatWindow');
    let response;

    // Convert the message to lowercase for case-insensitive checks
    const lowerCaseMessage = message.toLowerCase();

    // Check if the message starts with '@faxium' (case-insensitive and ignoring spaces)
    if (lowerCaseMessage.startsWith('@faxium')) {
        // Remove '@faxium' from the message (case-insensitive and ignoring spaces)
        const faxiumMessage = message.replace(/^@\s*faxium\s+/i, '').trim();

        // Initialize the maximum allowed Levenshtein distance
        const maxDistance = 7;

        // Check if the faxiumMessage is similar to any of the predefined questions
        let closestQuestion = null;

        for (const question of Object.keys(faxiumResponses)) {
            const distance = levenshtein(faxiumMessage, question.toLowerCase());
            if (distance <= maxDistance && (closestQuestion === null || distance < levenshtein(faxiumMessage, closestQuestion.toLowerCase()))) {
                closestQuestion = question;
            }
        }

        if (closestQuestion) {
            response = "Faxium: " + faxiumResponses[closestQuestion];
        } else {
            response = "Faxium: I'm sorry, I couldn't understand your question.";
        }
    } else {
        response = "Collective: " + getResponse(message);
    }

    setTimeout(() => {
        chatWindow.innerHTML += '<p>' + response + '</p>';
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 1000); // 1-second delay
}




let htmlContent;
const bookFrame5 = document.getElementById('bookFrame5');

// Define the file URL you want to read (assuming you need this for some other part of your code)
const url = './peep.html';

// Function to update iframes with HTML content
function updateIframes() {
  // Get the HTML content from the textarea
  htmlContent = rawHtmlTextarea.value;
  
  // Update the srcdoc property of bookFrame5 if it exists and is an iframe
  if (bookFrame5 && bookFrame5.tagName.toLowerCase() === 'iframe') {
    bookFrame5.srcdoc = htmlContent;
  }

  // Update the JSON editor or any other necessary parts of your application
  updateJSONDisplay();
}


document.addEventListener('DOMContentLoaded', function() {
chatWindow.innerHTML += '<p>Current Topic: Toxic Validation <button class="open-modal" onclick="startQuest()">Quiz Me</button></p> ';
});
