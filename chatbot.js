// Define initial responses
let faxiumResponses = {
    "Hello": "Hey, it's Faxium here!"
  };
  
  // Define initial base data
  let baseData = [
    ["hello", "Hi there!", ""],
    ["how old is the earth", "The Earth is approximately 4.54 billion years old.", ""]
  ];
  
  // Function to clear cookies and reset the page
  function exitAll() {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
    document.body.innerHTML = '';
  }
  
  // Global variables
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
  
  // Initial chat window message
  setTimeout(function() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.innerHTML += '<p>Collective: Hello, We\'re your <font style="color: lightblue;">AI</font> assistants... here to support humans in providing ideology perspective</p>';
    scrollToBottom();
  }, 4300);
  
  // Function to show command list
  function showCommands() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.innerHTML += '<p>Commands:<br><font style="color: lightblue;">[add]</font> Will increase a quantity<br><font style="color: lightblue;">[subtract]</font> Will decrease a quantity<br><font style="color: lightblue;">[set]</font> Will reset value to specified amount<br><font style="color: purple;">[frame]</font> Will create live elements</p>';
    scrollToBottom();
  }
  
  // Function to export data as JSON
  function exportData() {
    updateJSONDisplay(); // Update the JSON editor with the latest data
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(document.getElementById('jsonEditor').value);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "profile.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
  
  // Function to handle user messages
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
      const newEntry = [message, formatResponse(), timestamp];
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
  
  // Function to format the response (excluding conversationData)
  function formatResponse() {
    return JSON.stringify({
      userId: userId,
      state: state,
      populations: populations,
      mainHeading: mainHeading,
      completedProjects: completedProjects,
      userCompletedProjects: userCompletedProjects
    }, null, 2);
  }
  
  // Function to escape HTML special characters
  function escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/\n/g, '<br>');
  }
  
  // Function to check if a message is redundant
  function isRedundant(message) {
    return conversationData.some(entry => entry[0] === message);
  }
  
  // Function to get a response based on message
  function getResponse(message) {
    let response = searchInData(message, baseData);
    if (!response) {
      response = searchInData(message, conversationData);
    }
    return response || "I can't answer that until you provide me with an Updated OS.";
  }
  
  // Function to search for a response in data
  function searchInData(message, data) {
    const closestQuestion = getClosestQuestion(message, data);
    return data.find(entry => entry[0] === closestQuestion)?.[1] || null;
  }
  
  // Function to update JSON display
  function updateJSONDisplay() {
    const jsonEditor = document.getElementById('jsonEditor');
    if (jsonEditor) {
      const combinedData = {
        conversationData: conversationData,
        userData: {
          id: userId,
          state: state,
          mainHeading: mainHeading,
          populations: populations,
          completedProjects: completedProjects
        }
      };
  
      // Update the JSON editor with the new data
      jsonEditor.value = JSON.stringify(combinedData, null, 2);
  
      // Automatically update the modules when completedProjects is detected
      if (Array.isArray(completedProjects)) {
        completedProjects.forEach(moduleNumber => {
          updateModule(moduleNumber);
        });
      }
  
      checkUsername();
      
    } else {
      console.error("JSON editor element not found.");
    }
  }
  
  // Function to validate data format
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
  
  // Function to post messages to all frames
  function postMessageToAllFrames(win, message) {
    for (let i = 0; i < win.frames.length; i++) {
      win.frames[i].postMessage(message, '*');
      postMessageToAllFrames(win.frames[i], message); // Recursive call for nested iframes
    }
  }
  
  // Function to import base data set from a file
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
          completedProjects = data.userData.completedProjects || [];
  
          // Apply completed projects
          applyCompletedProjects(completedProjects);
  
          updateCharacterFromState();
          updateJSONDisplay();
          parent.postMessage({ action: 'openHome', value: 'openHome' }, '*');
          document.getElementById('loginPlace').style.display = 'none';
          const chatWindow = document.getElementById('chatWindow');
          chatWindow.innerHTML += `<font style="color:lightgreen;">${userId} is logged in.</font><br>`;
        } else {
          alert('Invalid data format.');
        }
      } catch (error) {
        alert('Error reading the file: ' + error.message);
      }
    };
    reader.readAsText(files[0]);
  }
  
  // Function to scroll the chat window to the bottom
  function scrollToBottom() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
  
  // Function to post a message to the parent window
  function postMessageToParent(value, category) {
    const message = {};
    message[category] = value;
    window.parent.postMessage(message, '*');
  }
  
  // Function to update character appearance from state
  function updateCharacterFromState() {
    document.getElementById('hairLayer').src = state.hair;
    document.getElementById('glassesLayer').src = state.glasses;
    document.getElementById('bodyLayer').src = state.body;
    document.getElementById('outerLayer').src = state.outer;
  }
  
  // Event listener for incoming messages
  window.addEventListener('message', function(event) {
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
  
  // Function to handle user input
  function handleUserInput() {
    const userInputField = document.getElementById('userInput');
    const message = userInputField.value;
    if (message) {
      sendFaxiumMessage(message, 'User');
      userInputField.value = '';  // Clear the input field
    }
  }
  
  // Function to send Faxium messages
  function sendFaxiumMessage(message, sender) {
    const chatWindow = document.getElementById('chatWindow');
    let response;
  
    // Convert the message to lowercase for case-insensitive checks
    const lowerCaseMessage = message.toLowerCase();
  
    // Check if the message starts with '@faxium'
    if (lowerCaseMessage.startsWith('@faxium')) {
      const faxiumMessage = message.replace(/^@\s*faxium\s+/i, '').trim();
      const maxDistance = 7;
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
      chatWindow.innerHTML += `<p>${response}</p>`;
      scrollToBottom();
    }, 1000); // 1-second delay
  }
  
  // Add version info on page load
  document.addEventListener('DOMContentLoaded', function() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.innerHTML += '<font style="font-size: 12px;">v3.1 copyright 2024</font>';
  });
  
  // Function to check username
  function checkUsername() {
    if (userId === "Guest") {
      let newUsername = prompt("Your current username is 'Guest'. Please enter a new username:");
      if (newUsername) {
        userId = newUsername;
      } else {
        alert("Username cannot be empty. Please enter a valid username.");
      }
      updateJSONDisplay();
    }
  }
  

// Function to update a module
// Object to keep track of update counts for each module
const updateCounts = {};

// Function to update a module
function updateModule(moduleNumber) {
  const moduleId = `module${moduleNumber}`;
  const moduleAId = `${moduleId}a`;

  // Initialize the update count for this module if not already set
  if (!updateCounts[moduleNumber]) {
    updateCounts[moduleNumber] = 0;
  }

  // Check if the module has been updated less than 3 times
  if (updateCounts[moduleNumber] < 1) {
    const moduleElement = document.getElementById(moduleId);
    const moduleAElement = document.getElementById(moduleAId);

    if (moduleElement && moduleAElement) {
      moduleAElement.innerHTML = 'Complete';
      moduleElement.style.backgroundColor = 'lightgreen';
      updateCounts[moduleNumber]++; // Increment the update count
      console.log(`Module ${moduleNumber} updated successfully. Update count: ${updateCounts[moduleNumber]}`);
    } else {
      if (!moduleElement) {
        console.error(`Element with ID ${moduleId} not found.`);
      }
      if (!moduleAElement) {
        console.error(`Element with ID ${moduleAId} not found.`);
      }
      console.error(`Failed to update module ${moduleNumber}.`);
    }

    updateJSONDisplay(); // Ensure this is not causing unintended side effects
  } else {
    console.log(`Module ${moduleNumber} has already been updated 3 times.`);
  }
}


  
  // Function to update all modules
  function updateModules() {
    const totalModules = 10; // Replace with your actual number of modules
    console.log(`Updating modules from 1 to ${totalModules}`);
  
    for (let moduleNumber = 1; moduleNumber <= totalModules; moduleNumber++) {
      updateModule(moduleNumber);
    }
  }
  
  // Function to apply completed projects
  function applyCompletedProjects(completedProjects) {
    if (Array.isArray(completedProjects)) {
      completedProjects.forEach(moduleNumber => {
        updateModule(moduleNumber);  // Update the module based on completion status
      });
    } else {
      console.error("Invalid completedProjects format, expected an array.");
    }
  }
  
  // Function to add a completed module
  function addCompletedModule(moduleNumber) {
    if (typeof moduleNumber === 'number' && moduleNumber > 0 && !completedProjects.includes(moduleNumber)) {
      completedProjects.push(moduleNumber);
      console.log(`Module ${moduleNumber} added to completed projects.`);
      
      // Update the module display
      updateModule(moduleNumber);
  
      // Log updated state
      console.log("User ID:", userId);
      console.log("State:", state);
      console.log("Populations:", populations);
      console.log("Main Heading:", mainHeading);
      console.log("Completed Projects:", completedProjects);
    } else {
      console.log(`Invalid module number or module ${moduleNumber} is already completed.`);
    }
    updateJSONDisplay();
  }
  
  // Example usage of addCompletedModule
  // addCompletedModule(3);  // Adds module 3 to completedProjects
  