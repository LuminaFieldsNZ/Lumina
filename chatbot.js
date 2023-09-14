import { GlobalState, GlobalMethods } from './peepsMain.js';
import { BaseData } from './base.json';



const baseData[] = BaseData;

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
let state = "";
let populations = {};
let mainHeading = {};
let completedProjects = [];
let userCompletedProjects = [];
let conversationData = [];

const thinkingElem = document.createElement('p');

chatWindow.appendChild(thinkingElem);
setTimeout(function() {
  thinkingElem.classList.add('thinking');
  thinkingElem.innerHTML = 'Loading...';
}, 2100);
setTimeout(function() {
    // Remove the "thinking" element
    chatWindow.removeChild(thinkingElem);

    chatWindow.innerHTML += '<p>Collective: Hello, I\'m your AI assistant... use the field below to chat or type commands such as: <font style="color: lightblue;">cmd [all]</font> to view a complete list.</p>';
    scrollToBottom();
}, 4300);

function showCommands() {
  const thinkingElem = document.createElement('p');
  chatWindow.appendChild(thinkingElem);
  setTimeout(function() {
    thinkingElem.classList.add('thinking');
    thinkingElem.innerHTML = 'Loading...';
  }, 100);
    setTimeout(function() {
      thinkingElem.remove();
        chatWindow.innerHTML += '<p>Commands:<br><font style="color: lightblue;">[add]</font> Will increase a quantity<br><font style="color: lightblue;">[subtract]</font> Will decrease a quantity<br><font style="color: lightblue;">[set]</font> Will reset value to specified amount</p>';
        scrollToBottom();
    }, 2300);
}


function exportData() {
    updateJSONDisplay(); // Update the JSON editor with the latest data
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonEditor.value);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "exportedData.json");
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

    const thinkingElem = document.createElement('p');
    thinkingElem.classList.add('thinking');
    thinkingElem.innerHTML = 'Collective';
    chatWindow.appendChild(thinkingElem);

    setTimeout(() => {
        chatWindow.removeChild(thinkingElem);

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

        const timestamp = new Date().toISOString();

        if (!isRedundant(message, response)) {
            conversationData.push([message, response, timestamp]);
        }

        updateJSONDisplay();
    }, 1000);
}







function isRedundant(question, answer) {
    return conversationData.some(entry => entry[0] === question && entry[1] === answer);
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
    if (!data.userData || typeof data.userData.id !== 'string' || typeof data.userData.state !== 'string' || typeof data.userData.mainHeading !== 'object' || typeof data.userData.populations !== 'object' || !Array.isArray(data.userData.completedProjects)) {
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


function importBaseDataSet(event) {
  clearInterval(intervalId); // Clear the interval before importing data
  const files = event.target.files;
  if (files.length === 0) {
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    try {
      const data = JSON.parse(event.target.result);
      if (isValidDataFormat(data)) {
        conversationData = data.conversationData;
        updateUserData(data.userData);
        updateCharacterFromState(); // Manually update character appearance
        updateJSONDisplay();
        startLoop(); // Restart the loop after importing data
      } else {
        alert('Invalid data format.');
      }
    } catch (error) {
      alert('Error reading the file.');
    }
  };
  reader.readAsText(files[0]);
}



function sendFaxiumMessage(message, sender) {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.innerHTML += '<p>' + sender + ': ' + message + '</p>';
    scrollToBottom();
}

function scrollToBottom() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.scrollTop = chatWindow.scrollHeight;
}


  function postMessageToParent(value, category) {
    const message = {};
    message[category] = value;
    window.parent.postMessage(message, '*');
  }
