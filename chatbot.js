

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
     hair: './hair/hair2.png',
     glasses: './glasses/glasses0.png',
     body: './body/body0.png',
     outer: './outer/outer0.png'
 };
let completedProjects = [];
let homePage = "";
let userCompletedProjects = [];
let conversationData = [];







setTimeout(function() {
    const greetingElement = document.getElementById('greeting');
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    let greeting;

    if (currentHour >= 5 && currentHour < 12) {
      greeting = 'Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = 'Afternoon';
    } else {
      greeting = 'Evening';
    }

    greetingElement.textContent = greeting;
    scrollToBottom();
}, 2200);

function showCommands() {
        chatWindow.innerHTML += '<p>Commands:<br><font style="color: lightblue;">[add]</font> Will increase a quantity<br><font style="color: lightblue;">[subtract]</font> Will decrease a quantity<br><font style="color: lightblue;">[set]</font> Will reset value to specified amount<br><font style="color: purple;">[frame]</font> Will create live elements</p>';
        scrollToBottom();
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

function sendMessage2() {
  const inputElem2 = document.getElementById('userNameChange');
  userId = inputElem2.value;
  chatWindow.innerHTML += '<p>Collective: Hello again ' + userId + '</p>';
  scrollToBottom();
}

function sendMessage(textareaValue) {
    const message = textareaValue;

    // Ensure chatWindow exists and then update its content
      const chatWindow = document.getElementById('chatWindow');
      if (chatWindow) {
          const newMessage = document.createElement('p');
          newMessage.textContent = userId + ': ' + message;
          chatWindow.appendChild(newMessage);
          scrollToBottom(chatWindow);
      }


    setTimeout(() => {
        if (message.trim().toLowerCase().startsWith('<frame>')) {
            sendHTMLMessage(message, 'User');
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
  state: ${JSON.stringify(state)},
  conversationData: ${JSON.stringify(conversationData)}
}`;
            conversationData.push([message, response, timestamp]);
        }

    }, 1000);
}



function updateChatWindow(sender, message) {
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow) {
        const messageElement = document.createElement('p');
        messageElement.textContent = `${sender}: ${message}`;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to the bottom
    }
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
        win.frames[i].postMessage(message, '*');
        postMessageToAllFrames(win.frames[i], message); // Recursive call for nested iframes
    }
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




    window.addEventListener('message', function(event) {

        if (event.data.action === 'collectiveContent') {
            baseData = event.data.collectiveContent;
        }

    }, false);
