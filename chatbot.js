// Initialize user data with default values
let userData = {
    id: "Newcomer",
    state: "00001",
    mainHeading: {
        explorer: 1,
        voyager: 0,
        captain: 0,
        merchant: 0,
        shipwright: 0,
        fisherman: 0,
        smuggler: 0,
        arbiter: 0,
        sailor: 0
    },
    populations: {
        progressive: 100,
        socialist: 100,
        idealist: 100,
        globalist: 100,
        conservative: 100,
        economist: 1000,
        realist: 1000,
        nationalist: 100,
        populist: 100
    },
    completedProjects: [],
    userCompletedProjects: [],
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
        state: userData.state,
        mainHeading: userData.mainHeading,
        populations: userData.populations,
        completedProjects: userData.userCompletedProjects
    }
};

// Initialize base data
let baseData = [
    ["hello", "Hi there!", ""],
    ["how old is the earth", "The Earth is approximately 4.54 billion years old.", ""]
];

window.onload = function() {
    loadPlayerJson();

    clearStorage();
};




function clearStorage() {
    document.cookie.split(";").forEach(cookie => {
        const name = cookie.split("=")[0];
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
    localStorage.clear();
    sessionStorage.clear();
}


function updateModuleProgress(updatedExperience) {
    const modules = [
        "explorer",
        "voyager",
        "captain",
        "merchant",
        "shipwright",
        "fisherman",
        "smuggler",
        "arbiter",
        "sailor"
    ];

    modules.forEach((module) => {
        const progressBar = document.querySelector(`.${module}-progress`);
        const percentage = (updatedExperience[module] / getMaxExperience(updatedExperience)) * 100;

        // Update progress bar width
        progressBar.style.width = `${Math.round(percentage)}%`;

        // Set background color based on percentage
        progressBar.style.backgroundColor = getProgressBarColor(percentage);

        // Update the corresponding percentage text
        const percentageText = document.getElementById(`${module}bp`);
        percentageText.textContent = `${Math.round(percentage)}%`;

        // Update the font element with the current experience value
        const experienceFont = document.getElementById(module);
        experienceFont.textContent = updatedExperience[module];
    });
}

function getProgressBarColor(percentage) {
    if (percentage < 50) return 'red';
    if (percentage < 75) return 'yellow';
    return 'green';
}

// Function to get the maximum experience value
function getMaxExperience(experience) {
    return Math.max(...Object.values(experience));
}


updateModuleProgress(userData.mainHeading);


function updatePopulations(updatedPopulations) {
    for (let populationType in updatedPopulations) {
        const progressBar = document.querySelector(`.${populationType}-progress`);
        const percentage = (updatedPopulations[populationType] / getMaxPopulation(updatedPopulations)) * 100;

        // Update progress bar width
        progressBar.style.width = `${Math.round(percentage)}%`;

        // Set background color based on percentage
        progressBar.style.backgroundColor = getProgressBarColor(percentage);

        // Update the corresponding percentage text
        const percentageText = document.getElementById(`${populationType}bp`);
        percentageText.textContent = `${Math.round(percentage)}%`;

        // Update the font element with the current population value
        const populationFont = document.getElementById(populationType);
        populationFont.textContent = updatedPopulations[populationType];
    }
}



function getProgressBarColor(percentage) {
    if (percentage < 50) return 'red';
    if (percentage < 75) return 'yellow';
    return 'green';
}

function updatePercentages(avg, dataObj) {
    for (let key in dataObj) {
        const percentage = (dataObj[key] / avg) * 100;
        const progressBar = document.querySelector(`.${key}-progress`);
        progressBar.style.width = `${Math.round(percentage)}%`;

        // Set background color directly
        progressBar.style.backgroundColor = getProgressBarColor(percentage);
    }
}


// Function to get the maximum population value
function getMaxPopulation(populations) {
    return Math.max(...Object.values(populations));
  }
  


function updateAppWithData(playerData) {
    // Implement your logic to update the entire app with the player data here
    console.log('Updating app with Player Data:', playerData);

    // Ensure the playerData structure is as expected
    if (playerData.userData && playerData.userData.populations) {
        // Update populations data
        updatePopulations(playerData.userData.populations);
        updateModuleProgress(playerData.userData.mainHeading);
        updateUserData(playerData.userData);
        console.log('App updated successfully.');
    } else {
        console.error('Invalid Player Data structure. Check the player1.json format.');
    }
}





function getDeviceType() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        return "mobile";
    } else if (navigator.userAgent.indexOf('Mac OS X') !== -1) {
        return "Apple";
    } else if (navigator.appVersion.indexOf("Win") !== -1) {
        return "Windows";
    } else {
        return "default";
    }
  }




// Create a "thinking" element
const thinkingElem = document.createElement('p');



// Function to export data as JSON
function exportData() {
    // Get the JSON data from the jsonEditor value
    const jsonData = jsonEditor.value;

    // Create a data URI for the JSON data
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonData);

    // Create a download anchor element
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "playerData.json");

    // Append the anchor element to the document body and trigger the download
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();

    // Clean up the anchor element
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
      populations[category];
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
        mainHeading[category];
    } else {
        console.error("Invalid category:", category);
    }
}


function parseCollectiveCommand(data) {

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
    chatWindow.innerHTML += '<p>' + userData.id + ': ' + message + '</p>'; // Display userData.id in the chat window
    scrollToBottom();

    const thinkingElem = document.createElement('p');
    thinkingElem.classList.add('thinking');
    thinkingElem.innerHTML = botName;
    chatWindow.appendChild(thinkingElem);

    setTimeout(() => {
        chatWindow.removeChild(thinkingElem);

        const commandResponse = parseCollectiveCommand(message);
        let response;
        if (commandResponse) {
            response = commandResponse;
            chatWindow.innerHTML += '<p>' + botName + ': ' + commandResponse + '</p>';
            scrollToBottom();
        } else {
            response = getResponse(message);
            chatWindow.innerHTML += '<p>' + botName + ': ' + response + '</p>';
            scrollToBottom();
        }

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
    if (!data.userData || typeof data.userData.id !== 'string' || typeof data.userData.state !== 'string' || typeof data.userData.mainHeading !== 'object' || typeof data.userData.populations !== 'object' || !Array.isArray(data.userData.completedProjects)) {
        return false;
    }
    return true;
}

// Function to update user data
function updateUserData(userData) {
    userId = userData.id;
    state = userData.state;
    mainHeading = userData.mainHeading;
    populations = userData.populations;
    userCompletedProjects = userData.completedProjects;
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

                // Update global user ID
                if (userData && userData.id) {
                    trackUserId(userData.id); // Update the global user ID
                }

                // Update existing variables with values from imported data
                userData = userData || {};
                userData.conversationData = conversationData || [];
                userData.completedProjects = userData.completedProjects || [];
                userData.populations = userData.populations || {};
                userData.mainHeading = userData.mainHeading || {};

                // Update all variables with values from imported userData
                state = userData.state || state;
                mainHeading = userData.mainHeading || mainHeading;
                populations = userData.populations || populations;
                userCompletedProjects = userData.completedProjects || userCompletedProjects;

                // Update populations data and progress bars after assigning actual values
                updatePopulations(populations);

                // Update module progress with the new mainHeading data
                updateModuleProgress(mainHeading);

                // Update displayed username in the chat window
                const chatWindow = document.getElementById('chatWindow');
                chatWindow.innerHTML += '<p>Logged in as: ' + userData.id + '</p>';

                // Update JSON display after modifying the variables
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

  let intervalId;

  function updateJSONEditor() {
    // Construct updatedData with the updated userData
    const updatedData = {
        conversationData: userData.conversationData,
        userData: {
            id: userId, // Using the globally tracked user ID
            state: userData.state,
            mainHeading: userData.mainHeading,
            populations: userData.populations,
            completedProjects: userData.userCompletedProjects
        }
    };

    // Update JSON editor with the updatedData
    jsonEditor.value = JSON.stringify(updatedData, null, 2);
}


