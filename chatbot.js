

let currentStep = -1;

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

  // Global variables for populations and mainHeading
 let populations = {
  progressive: 10,
  socialist: 10,
  idealist: 10,
  globalist: 10,
  conservative: 10,
  economist: 10,
  realist: 10,
  nationalist: 10,
  populist: 10
};

let mainHeading = {
  explorer: 1,
  voyager: 1,
  captain: 1,
  merchant: 1,
  shipwright: 1,
  fisherman: 1,
  smuggler: 1,
  arbiter: 1,
  sailor: 1
};


  let completedProjects = [];
  let userCompletedProjects = [];
  let conversationData = [];
  let totalPopulation = 0;


  function getTotalPopulation(populations) {
    let total2 = 0;
    
    // Loop through the populations object and sum the values
    for (let key in populations) {
      if (populations.hasOwnProperty(key)) {
        total2 += populations[key];
      }
    }
    
    return total2;
  }



    

  
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


// Function to handle user messages
function handleMessage(message) {
  const trimmedMessage = message.trim().toLowerCase();
  
  conditions.forEach(({ keyword, action }) => {
    if (trimmedMessage.includes(keyword)) {
      action();
    }
  });
}

handleMessage(message);


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

      if (currentStep == -1 || currentStep == 4) {
        let response = getResponse(message);
      
        // Create the typing container with the random emotion
        let typingContainer = createTypingContainer();
      
        // Append response to the text content within the container
        typingContainer.querySelector('#text-content').innerHTML = response;
      
        // Append the container to the chat window
        chatWindow.appendChild(typingContainer);
      
        scrollToBottom();
      }
      


      scrollToBottom();
  
      const timestamp = new Date().toISOString();
  
      // Prepare updated conversation data
      const newEntry = [message, formatResponse(), timestamp];
      conversationData.push(newEntry);

  
      updateJSONDisplay();
      scanForEmotionWords();
      testData();
      totalPopulation = getTotalPopulation(populations);
      document.getElementById('mainHeadingAverage').innerHTML = totalPopulation;
  
    }, 50);
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
    return response || "I can't answer that until you provide me with more context.";
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
      response = "Lumie: " + getResponse(message);
    }
  
    setTimeout(() => {
      chatWindow.innerHTML += `<p>${response}</p>`;
      scrollToBottom();
    }, 1000); // 1-second delay
  }
  

  
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
// Global variable to keep track of the number of completed modules
let moduleCount = 0;

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

  // Check if the module has been updated less than 1 time
  if (updateCounts[moduleNumber] < 1) {
    const moduleElement = document.getElementById(moduleId);
    const moduleAElement = document.getElementById(moduleAId);

    if (moduleElement && moduleAElement) {
      moduleAElement.innerHTML = 'Complete';
      moduleAElement.style.color = 'black';
      moduleElement.style.backgroundColor = 'lightgreen';
      updateCounts[moduleNumber]++; // Increment the update count
      moduleCount++; // Increment the global moduleCount
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
    console.log("Total Completed Modules:", moduleCount);
  } else {
    console.log(`Invalid module number or module ${moduleNumber} is already completed.`);
  }
  updateJSONDisplay();
}

  
  // Example usage of addCompletedModule
  // addCompletedModule(3);  // Adds module 3 to completedProjects










  
const svgTemplates2 = {
  sad: `
    <svg class="sad" width="44px" height="44px" viewBox="0 0 44 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="sad" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(0, 0)">
            <g id="face" transform="translate(13.000000, 20.000000)">
                <g class="face">
                <path d="M7,4 C7,5.1045695 7.8954305,6 9,6 C10.1045695,6 11,5.1045695 11,4" class="mouth" stroke="#2C0E0F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform="translate(9.000000, 5.000000) rotate(-180.000000) translate(-9.000000, -5.000000) "></path>
                <ellipse class="right-eye" fill="#2C0E0F" cx="16.0941176" cy="1.75609756" rx="1.90588235" ry="1.75609756"></ellipse>
                <ellipse class="left-eye" fill="#2C0E0F" cx="1.90588235" cy="1.75609756" rx="1.90588235" ry="1.75609756"></ellipse>
              </g>
            </g>
        </g>
    </svg>
  `,
  neutral: `
    <svg class="neutral" width="44px" height="44px" viewBox="0 0 44 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g>
          <g class="face">
            <g transform="translate(13.000000, 20.000000)" fill="#2C0E0F">
              <g class="mouth">
                  <g transform="translate(9, 5)" >
                    <rect x="-2" y="0" width="4" height="2" rx="2"></rect>
                  </g>
                </g>
                <ellipse class="right-eye" cx="16.0941176" cy="1.75" rx="1.90588235" ry="1.75"></ellipse>
                <ellipse class="left-eye" cx="1.90588235" cy="1.75" rx="1.90588235" ry="1.75"></ellipse>
            </g>
          </g>
      </g>
    </svg>
  `,
  fine: `
    <svg class="fine" width="44px" height="44px" viewBox="0 0 44 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g id="fine-emotion" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="fine">
              <g class="matrix" transform="translate(22.000000, 32.000000)">
               <g class="face-container">
                <g class="face" transform="translate(-9, -12)">
                  <g class="face-upAndDown">
                  <g class="eyes">
                  <ellipse class="right-eye" fill="#2C0E0F" cx="16.0941176" cy="1.75609756" rx="1.90588235" ry="1.75609756"></ellipse>
                  <ellipse class="left-eye" fill="#2C0E0F" cx="1.90588235" cy="1.75609756" rx="1.90588235" ry="1.75609756"></ellipse></g>
                  <path d="M6.18823529,4.90499997 C6.18823529,5.95249999 7.48721095,7 9.08957864,7 C10.6919463,7 11.990922,5.95249999 11.990922,4.90499997" id="mouth" stroke="#2C0E0F" stroke-linecap="round" stroke-linejoin="round"></path>
                  </g>
              </g>
              </g>
            </g>
          </g>
      </g>
    </svg>
  `,
  happy: `
    <svg class="happy" width="44px" height="44px" viewBox="0 0 44 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Happy" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(0, 0)">
          <g class="scaleFace">
            <g class="face">  
              <ellipse id="Eye-right" fill="#2C0E0F" cx="29.0875" cy="21.75" rx="1.89926471" ry="1.75"></ellipse>
                <ellipse id="Eye-left" fill="#2C0E0F" cx="14.8992647" cy="21.75" rx="1.89926471" ry="1.75"></ellipse>
                <path d="M21.8941176,27.8819633 C24.8588235,27.8819632 25.4941176,25.5404999 25.4941176,24.5648901 C25.4941176,23.5892803 24.4352941,23.9795242 22.1058824,23.9795242 C19.7764706,23.9795242 18.2941176,23.5892803 18.2941176,24.5648901 C18.2941176,25.5404999 18.9294118,27.8819633 21.8941176,27.8819633 Z" id="Mouth" fill="#2C0E0F"></path>
                <ellipse id="Tung" fill="#E23D18" cx="21.8941176" cy="26.4390244" rx="1.69411765" ry="0.780487805"></ellipse>
            </g>  
        </g>
    </svg>
  `
};


function getRandomEmotion() {
  const emotions = ['sad', 'neutral', 'fine', 'happy'];
  const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
  return svgTemplates2[randomEmotion];
}

// Function to create and return a typing container
function createTypingContainer() {
  const container = document.createElement('div');
  container.className = 'project-box-wrapper';

  const box = document.createElement('div');
  box.className = 'project-box';
  box.style.position = 'relative'; // Allow child absolute positioning within this box
  box.style.backgroundColor = '#f8db82';
  box.style.fontSize = '1.3em';
// Automatically adjust height based on content
box.style.height = 'auto';

// Add 40px margins to the top and bottom
box.style.marginTop = '40px';
box.style.marginBottom = '40px';

  // Text Content Element
  const textContent = document.createElement('div');
  textContent.className = 'text-content';
  textContent.id = 'text-content'; // Add an ID for easy access
  
  // Set intro message here
  textContent.innerHTML = `We <b>Lumies</b> are singularity neurons connecting humans with AI.`;

  // Add text content to the box
  box.appendChild(textContent);

  // Add random emotion SVG
  const svgContainer = document.createElement('div');
  svgContainer.className = 'svg-container';
  svgContainer.innerHTML = getRandomEmotion();

  // Set the absolute positioning of the face to bottom-left of the chat window
  svgContainer.style.position = 'absolute'; // Correct absolute positioning
  svgContainer.style.marginBottom = '60px'; // Position it at the bottom
  svgContainer.style.left = '0';   // Position it on the left
  svgContainer.style.zIndex = '999'; // Ensure it's on top of other content

  box.appendChild(svgContainer);

  // Add data attributes to the eyes to track original positions
  const rightEye = svgContainer.querySelector('.right-eye');
  const leftEye = svgContainer.querySelector('.left-eye');
  
  if (rightEye && leftEye) {
    rightEye.setAttribute('data-original-cx', rightEye.getAttribute('cx'));
    rightEye.setAttribute('data-original-cy', rightEye.getAttribute('cy'));
    leftEye.setAttribute('data-original-cx', leftEye.getAttribute('cx'));
    leftEye.setAttribute('data-original-cy', leftEye.getAttribute('cy'));
  }

  container.appendChild(box);
  return container;
}

// Initialize the container and typing animation
function init() {
  const container = document.getElementById('chatWindow');

  // Ensure the container exists
  if (container) {
    // Create the typing container and append it to the DOM
    setTimeout(() => {
      const typingContainer = createTypingContainer();
      container.appendChild(typingContainer);
    }, 500); // 500 milliseconds = 0.5 seconds
  } else {
    console.error("Container element not found.");
  }
}

// Function to move the eyes based on the mouse click position
function moveEyes(event) {
  const svgContainers = document.querySelectorAll('.svg-container');
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  svgContainers.forEach(container => {
    const containerRect = container.getBoundingClientRect();
    const rightEye = container.querySelector('.right-eye');
    const leftEye = container.querySelector('.left-eye');

    if (rightEye && leftEye) {
      const originalRightEyeCX = parseFloat(rightEye.getAttribute('data-original-cx'));
      const originalRightEyeCY = parseFloat(rightEye.getAttribute('data-original-cy'));
      const originalLeftEyeCX = parseFloat(leftEye.getAttribute('data-original-cx'));
      const originalLeftEyeCY = parseFloat(leftEye.getAttribute('data-original-cy'));

      const maxEyeMovement = 5;
      const offsetX = mouseX - (containerRect.left + containerRect.width / 2);
      const offsetY = mouseY - (containerRect.top + containerRect.height / 2);

      const rightEyeOffsetX = Math.min(maxEyeMovement, offsetX / 50);
      const rightEyeOffsetY = Math.min(maxEyeMovement, offsetY / 50);
      const leftEyeOffsetX = Math.min(maxEyeMovement, offsetX / 50);
      const leftEyeOffsetY = Math.min(maxEyeMovement, offsetY / 50);

      rightEye.setAttribute('cx', originalRightEyeCX + rightEyeOffsetX);
      rightEye.setAttribute('cy', originalRightEyeCY + rightEyeOffsetY);
      leftEye.setAttribute('cx', originalLeftEyeCX + leftEyeOffsetX);
      leftEye.setAttribute('cy', originalLeftEyeCY + leftEyeOffsetY);

      // Reset eyes after a delay
      setTimeout(() => {
        rightEye.setAttribute('cx', originalRightEyeCX);
        rightEye.setAttribute('cy', originalRightEyeCY);
        leftEye.setAttribute('cx', originalLeftEyeCX);
        leftEye.setAttribute('cy', originalLeftEyeCY);
      }, 2000);
    }
  });
}

// Start the script
init();

// Add event listener to track click location
document.addEventListener('click', moveEyes);
