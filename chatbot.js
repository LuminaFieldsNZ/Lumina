



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
let userCompletedProjects = [];
let conversationData = [];

setTimeout(function() {

    chatWindow.innerHTML += '<p>Collective: Hello, I\'m your AI assistant... use the field below to chat or type commands such as: <font style="color: lightblue;">cmd [all]</font> to view a complete list.</p>';
    scrollToBottom();
}, 4300);

function showCommands() {
        chatWindow.innerHTML += '<p>Commands:<br><font style="color: lightblue;">[add]</font> Will increase a quantity<br><font style="color: lightblue;">[subtract]</font> Will decrease a quantity<br><font style="color: lightblue;">[set]</font> Will reset value to specified amount</p>';
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
          return "Showing all commands..."; // You can customize this response message
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




function sendMessage() {
    const inputElem = document.getElementById('userInput');
    const message = inputElem.value;
    inputElem.value = '';

    const chatWindow = document.getElementById('chatWindow');
    chatWindow.innerHTML += '<p>' + userId + ': ' + message + '</p>';
    scrollToBottom();

    setTimeout(() => {
        // Check if the message starts with '@faxium'
        if (message.trim().toLowerCase().startsWith('@faxium')) {
            sendFaxiumMessage(message, 'User');
        } else {
            const commandResponse = parseCollectiveCommand(message);
            let response;
            if (commandResponse) {
                response = commandResponse;
                chatWindow.innerHTML += '<p>Collective: ' + commandResponse + '</p>';
                scrollToBottom();
            } else {
                response = getResponse(message);
                chatWindow.innerHTML += '<p>Collective: ' + response + '</p>';
                scrollToBottom();
            }
        }
        const timestamp = new Date().toISOString();
 let response = getResponse(message);
        if (!isRedundant(message)) {
          // Append the variables to the response string
          response += `
{
  userId: "${userId}",
  state: ${JSON.stringify(state)},
  populations: ${JSON.stringify(populations)},
  mainHeading: ${JSON.stringify(mainHeading)},
  completedProjects: ${JSON.stringify(completedProjects)},
  userCompletedProjects: ${JSON.stringify(userCompletedProjects)},
  conversationData: ${JSON.stringify(conversationData)}
}`;
            conversationData.push([message, response, timestamp]);
        }

        updateJSONDisplay();
    }, 1000);
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
    console.log("updateJSONDisplay called"); // Add this line
    const jsonEditor = document.getElementById('jsonEditor');
    const combinedData = {
        conversationData: conversationData,
        userData: {
            id: userId,
            state: state,
            mainHeading: mainHeading,
            populations: populations,
            completedProjects: userCompletedProjects
        }
    };
    console.log(combinedData); // Add this line
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
    if (!data.userData || typeof data.userData.id !== 'string' || typeof data.userData.state !== 'object' || typeof data.userData.mainHeading !== 'object' || typeof data.userData.populations !== 'object' || !Array.isArray(data.userData.completedProjects)) {
        return false;
    }
    return true;
}

function updateUserData(userData) {
    userId = userData.id;
    state = userData.state;
    mainHeading = userData.mainHeading;
    populations = userData.populations;
    userCompletedProjects = userData.completedProjects;
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.innerHTML += '<font style="color:lightgreen;">' + userId + ' is logged in.</font><br>';
    scrollToBottom();
}

function postMessageToAllFrames(win, message) {
    // Iterate through all iframes in the current window/frame and post the message recursively
    for (let i = 0; i < win.frames.length; i++) {
        win.frames[i].postMessage(message, 'https://luminafields.com');
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

                    const messageUpdate = {
                        conversationData: data.conversationData,
                        userId: data.userData.id,
                        state: data.userData.state,
                        mainHeading: data.userData.mainHeading,
                        populations: data.userData.populations,
                        completedProjects: data.userData.completedProjects
                    };

                    postMessageToAllFrames(window.top, messageUpdate); // Start from the top-level window


                // Update UI elements
                updateCharacterFromState(); // Update character appearance based on the state
                updateJSONDisplay(); // Update the JSON editor with the latest data
                parent.postMessage({ action: 'openHome', value: 'openHome' }, 'https://luminafields.com');
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
    window.parent.postMessage(message, 'https://luminafields.com');
  }


  function updateCharacterFromState() {
      document.getElementById('hairLayer').src = state.hair;
      document.getElementById('glassesLayer').src = state.glasses;
      document.getElementById('bodyLayer').src = state.body;
      document.getElementById('outerLayer').src = state.outer;
  }

    window.addEventListener('message', function(event) {
        if (event.data.action === 'changeSrc') {
            bookFrame5.src = event.data.newSrc;
        }
        if (event.data.action === 'faxiumContent') {
            faxiumResponses = event.data.faxiumContent;
        }
        if (event.data.action === 'collectiveContent') {
            baseData = event.data.collectiveContent;
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

function getFaxiumResponse(question) {
  return faxiumResponses[question] || "Faxium needs an update to provide a response.";
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
        response = "Faxium: " + (faxiumResponses[faxiumMessage] || "doesn't respond.");
    } else {
        response = "Collective: " + getResponse(message);
    }

    setTimeout(() => {
        chatWindow.innerHTML += '<p>' + response + '</p>';
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 1000); // 1-second delay
}





// List of questions 'faxium' will ask
const faxiumQuestions = [
  'What is the pulse network?',
  'Interesting. Tell me, how many are you in this collective? Whats your strength in numbers?',
  'Ah, a deflection! But I understand. Lets play a game. If I were to guess your population, would you tell me if Im close?',
  'Very well. Do you believe that every individual in the collective has an equal voice? Or are some voices louder than others?',
  'If I were to offer you a chance to double your population, but in doing so, youd risk losing half of it, would you take that chance?',
  'A cautious approach! But imagine the knowledge and experiences you could gain with double the population!',
  'I respect your wisdom. One last question: If I were to join the collective, would you accept me?',
  'Come on, User! Its just a harmless game. If you type cmd [add][10000][idealist], Ill even help boost the Collectives population. A win-win, right?',
  'Think of the knowledge and experiences the Collective could gain with more members! User, all you have to do is type the command. Its a small action for a significant reward'
];

let currentQuestionIndex = 0;
let intervalId;

function askChatbot() {
    if (currentQuestionIndex < faxiumQuestions.length) {
        // Display the question in the chat window
        chatWindow.innerHTML += '<p>Faxium: ' + faxiumQuestions[currentQuestionIndex] + '</p>';

        // Send the current question to the chatbot as 'faxium'
        sendFaxiumMessage(faxiumQuestions[currentQuestionIndex], 'Faxium');

        // Move to the next question
        currentQuestionIndex++;
    } else {
        // If we've asked all the questions, clear the interval
        clearInterval(intervalId);
    }
}

// Start the loop with a 5-second delay between questions
intervalId = setInterval(askChatbot, 15000);
