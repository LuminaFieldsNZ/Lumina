
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
 populations = {};
 mainHeading = {};
let completedProjects = [];
let userCompletedProjects = [];
let conversationData = [];

setTimeout(function() {

    chatWindow.innerHTML += '<p>Collective: Hello, We\'re your <font style="color: lightblue;">AI</font> assistants...  here to support humans in providing ideology perspective</p>';
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


function sendMessage() {
    const inputElem = document.getElementById('userInput');
    const message = inputElem.value;
    inputElem.value = '';

    const chatWindow = document.getElementById('chatWindow');
    chatWindow.innerHTML += `<p>${userId}: ${message}</p>`;
    scrollToBottom();

    // Preprocess and tokenize the message
    const tokens = preprocessAndTokenize(message);

    // Check for fallacies in the user message
    const detectedFallacies = checkForFallacies(tokens);
    if (detectedFallacies.length > 0) {
        let fallacyMessages = detectedFallacies.map(f => `${f.fallacy}:<br>${f.description} ex. "${f.example}"`).join('<br>');
        let fallacyName = detectedFallacies.map(f => `${f.name}`).join('');
        chatWindow.innerHTML += `<p>${fallacyName}: Possible fallacies detected: <br>${fallacyMessages}</p>`;
        scrollToBottom();
    }

    if (message.trim().toLowerCase().startsWith('@faxium')) {
        sendFaxiumMessage(message, 'User');
        return; // Return early to prevent further processing
    }

    setTimeout(() => {
        let response = getResponse(message);
        chatWindow.innerHTML += `<p>Collective: ${response}</p>`;
        scrollToBottom();

        const timestamp = new Date().toISOString();

        // Prepare updated conversation data
        const newEntry = [message, formatResponse(userId, state, populations, mainHeading, completedProjects, userCompletedProjects), timestamp];

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
            userCompletedProjects: userCompletedProjects,
            conversationData: conversationData
        };

        const jsonString = JSON.stringify(jsonResponse, null, 2);
        const formattedResponse = escapeHtml(jsonString);

        updateJSONDisplay();
        scanForEmotionWords();
        testData();
        
        // Update the UI with the new population data
        updateData(populations, 'totalPopulations', 'avgPopulations');
        updateProgressBars(populations);

    }, 1000);
}





function checkForFallacies(tokens) {
    const detectedFallacies = [];
    fallacies.forEach(fallacy => {
        if (detectPattern(tokens, fallacy.fallacy)) {
            const example = getExample(fallacy.fallacy);
            detectedFallacies.push({ name: fallacy.name, description: fallacy.description, fallacy: fallacy.fallacy, example: example });
        }
    });
    console.log(`Detected fallacies:`, detectedFallacies);
    return detectedFallacies;
}

function preprocessAndTokenize(message) {
    return message
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove punctuation but keep words
        .split(/\s+/)
        .filter(token => token.length > 0); // Remove empty tokens
}


function detectPattern(tokens, fallacyType) {
    // Define expanded patterns for each fallacy type
    const patterns = {
        "Ad Hominem": /(\b(fool|incompetent|dropout|mess things up|ridiculous|idiot|dumb|stupid|unqualified|inept)\b)/i,
        "Straw Man": /(\b(ban all|control us|be vegans|force everyone|throw money|limit freedom|dictate choices|restrict options|enforce beliefs|impose regulations)\b)/i,
        "Appeal to Authority": /(\b(professor|CEO|author|scientist|celebrity|expert|specialist|authority|leader|figurehead)\b)/i,
        "False Dilemma": /(\b(either|or|choose between|either this or that|only two options|no middle ground|black or white)\b)/i,
        "Slippery Slope": /(\b(society will collapse|total environmental destruction|chaos will ensue|inevitable disaster|catastrophe is coming|slippery slope|chain reaction)\b)/i,
        "Circular Reasoning": /(\b(because it says so|always right|the law is just|trustworthy|president is correct|proven to work|self-evident|without question)\b)/i,
        "Hasty Generalization": /(\b(everyone|all|must be|only|always|never|every case|one size fits all|generalize|sweepingly)\b)/i,
        "Red Herring": /(\b(worry about the environment|your personal issues|what you're wearing|vacation plans|traffic problem|distraction|irrelevant matter|off-topic)\b)/i,
        "Bandwagon Fallacy": /(\b(everyone's doing it|popular|friends believe|viral|everyone agrees|trending|social proof|mass appeal)\b)/i,
        "Post Hoc Ergo Propter Hoc": /(\b(store made me sick|rooster causes the sun to rise|new tires caused breakdown|storm caused by policy|record sales due to employee|caused by|blamed on|after this, therefore because of this)\b)/i,
        "Appeal to Emotion": /(\b(think of the children|heartless|sad|feel good|break hearts|emotional|fear-mongering|sympathy|compassion|empathize)\b)/i,
        "Begging the Question": /(\b(because it's illegal|it's proven to work|the best|necessary|assumed|justified|inherently true|presumed)\b)/i,
        "False Equivalence": /(\b(eating meat is murder|not voting is the same|skipping class is failing|being late is irresponsible|not liking policy is against organization|equating|comparing|false equivalence)\b)/i,
        "No True Scotsman": /(\b(real gamer|true environmentalist|real expert|true friend|authentic|genuine|true member|proper)\b)/i,
        "Genetic Fallacy": /(\b(from that group|from that country|where she was raised|unreliable source|that manufacturer|origin|background|source|heritage)\b)/i,
        "Tu Quoque": /(\b(smoke too|waste money|eat junk food|never on time|never studied|you do it too|hypocrisy|double standard|you too)\b)/i,
        "Appeal to Tradition": /(\b(always done it|been around for centuries|ancestors did it|always followed rules|part of our heritage|traditional|time-honored|conventional|customary)\b)/i,
        "Appeal to Ignorance": /(\b(no one has proven|must be real|no proof|must be valid|must be true|unproven|lacking evidence|assumed true)\b)/i,
        "False Cause": /(\b(rooster causes the sun to rise|sales increased due to software|lucky shirt brings good luck|tea is the cure|red brings good grades|causal link|causes|due to|attributed to)\b)/i,
        "Loaded Question": /(\b(stopped cheating|always lie|taking responsibility|ignoring duties|inconsistent promises|presumed guilt|question loaded|inherently assuming)\b)/i,
        "Cherry Picking": /(\b(ignoring successes|opposite|disregarding other evidence|negative reviews|selective evidence|biased choice|only favorable)\b)/i,
        "Black or White": /(\b(complete support|reject entirely|agree with everything|hero or villain|with us or against us|either or|no middle ground|polarized)\b)/i,
        "Guilt by Association": /(\b(notorious criminal|conspiracy theories|questionable crowd|controversial organization|problematic group|associated with|linked to|tied to|affiliated with)\b)/i,
        "Burden of Proof": /(\b(prove false|your responsibility|must be correct|prove incorrect|up to you|prove it|onus on you|prove validity)\b)/i,
        "Middle Ground": /(\b(compromise|meet halfway|find a middle ground|settle in the middle|satisfies both sides|balanced|moderate|middle position)\b)/i,
        "Personal Incredulity": /(\b(cant understand|must be impossible|hard to believe|beyond comprehension|cant imagine|incredible|unbelievable|implausible)\b)/i,
        "Anecdotal Evidence": /(\b(know someone|friend had a great experience|seen people succeed|had a positive outcome|personal story|individual case|personal testimony|anecdote)\b)/i,
        "Appeal to Nature": /(\b(natural|better for you|best option|always superior|cant be harmful|innate|organic|pure|natural goodness)\b)/i,
        "False Analogy": /(\b(absurdly wrong|false analogy|misleading|oversimplification|inaccurate comparison|flawed analogy|not comparable|improper comparison)\b)/i,
    };


    const pattern = patterns[fallacyType];

    if (!pattern) {
        console.log(`No pattern defined for fallacy type: ${fallacyType}`);
        return false;
    }

    const text = tokens.join(' ');

    return pattern.test(text);
}



function getExample(fallacyType) {
    // Find a relevant example from fallacyExamples
    const fallacy = fallacyExamples.find(f => f.fallacy === fallacyType);
    return fallacy ? fallacy.examples[0] : 'No example available';
}




// Helper function to format the response
function formatResponse(userId, state, populations, mainHeading, completedProjects, userCompletedProjects) {
    return JSON.stringify({
        userId: userId,
        state: state,
        populations: populations,
        mainHeading: mainHeading,
        completedProjects: completedProjects,
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
    if (!data.userData || typeof data.userData.id !== 'string' || typeof data.userData.state !== 'object' || typeof data.userData.mainHeading !== 'object' || typeof data.userData.populations !== 'object' || !Array.isArray(data.userData.completedProjects)) {
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
                        completedProjects: data.userData.completedProjects,
                    };

                    postMessageToAllFrames(window.top, messageUpdate); // Start from the top-level window


                // Update UI elements
                updateCharacterFromState(); // Update character appearance based on the state
                updateJSONDisplay(); // Update the JSON editor with the latest data
                parent.postMessage({ action: 'openHome', value: 'openHome' }, '*');
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
    window.parent.postMessage(message, '*');
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



document.addEventListener('DOMContentLoaded', function() {
    chatWindow.innerHTML += '<font style="font-size: 12px;">v3.1 copyright 2024</font>';
    });