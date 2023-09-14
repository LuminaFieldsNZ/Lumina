// Global object to store all variables
const GlobalState = {
    baseData: [["","",""]],
    countImage: 0,
    state: {
        hair: './hair/hair0.png',
        glasses: './glasses/glasses0.png',
        body: './body/body0.png',
        outer: './outer/outer0.png'
    },
    userId: "Guest",
    populations: {},
    mainHeading: {},
    completedProjects: [],
    userCompletedProjects: [],
    conversationData: [],
    // ... any other variables you want to include
};

// Methods to access and modify the global state
const GlobalMethods = {
    getState: function() {
        return GlobalState;
    },
    setState: function(newState) {
        Object.assign(GlobalState, newState);
    },
    // ... any other methods you want to include
};

// Listen for messages from iframes
window.addEventListener('message', function(event) {
    const data = event.data;

    if (data.action === 'getState') {
        event.source.postMessage({
            action: 'updateState',
            state: GlobalMethods.getState()
        }, event.origin);
    } else if (data.action === 'setState' && data.newState) {
        GlobalMethods.setState(data.newState);
    }
    // ... handle other message types as needed
});

// Send the global state to all iframes
function broadcastStateToIframes() {
    const iframes = document.querySelectorAll('iframe');
    const state = GlobalMethods.getState();

    iframes.forEach(iframe => {
        iframe.contentWindow.postMessage({
            action: 'updateState',
            state: state
        }, '*');
    });
}

// Call this function whenever the global state changes
function onStateChange() {
    broadcastStateToIframes();
}







function updateCharacterFromState() {
    document.getElementById('hairLayer').src = GlobalState.state.hair;
    document.getElementById('glassesLayer').src = GlobalState.state.glasses;
    document.getElementById('bodyLayer').src = GlobalState.state.body;
    document.getElementById('outerLayer').src = GlobalState.state.outer;
}




function downloadStufs() {

    // URL of the base.json file
    const fileURL = 'https://www.luminafields.com/models/base.json';

    // Fetch the content of the file
    fetch(fileURL)
        .then(response => response.blob())
        .then(blob => {
            // Create a link element for download
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'base.json';

            // Append the link to the document and trigger the download
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        })
        .catch(error => {
            console.error("Error downloading the file:", error);
        });

}





  //Array building scriptsrc

  function createImageDropdown(category, numImages) {
    const images = [];
    for (let i = 0; i < numImages; i++) {
      images.push(`./${category}/${category}${i}.png`);
    }

    let options = '';
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      options += `<option value="${image}">${category.charAt(0).toUpperCase() + category.slice(1)} ${i + 1}</option>`;
    }

    const select = document.getElementById(`${category}Dropdown`);
    select.innerHTML = options;
  }


  createImageDropdown('glasses', 11);
  createImageDropdown('hair', 26);
  createImageDropdown('body', 12);
  createImageDropdown('outer', 4);

  function changeImage(category) {
      const dropdown = document.getElementById(`${category}Dropdown`);
      const imageLayer = document.getElementById(`${category}Layer`);
      state[category] = dropdown.value; // Update the state

      // Update the image layer source
      imageLayer.src = dropdown.value;

      // Send messages to the parent window
      window.parent.postMessage({ action: `state.${category}`, value: dropdown.value }, '*');
      window.parent.postMessage({ action: "updateJSONDisplay" }, '*');
  }






// Add for new categories
  function changeHair() {
    const hairDropdown = document.getElementById('hairDropdown');
    const hairLayer = document.getElementById('hairLayer');
    hairLayer.src = hairDropdown.value;
    state.hair = hairDropdown.value;
    window.parent.postMessage({ action: 'state.hair',value:  GlobalState.state.hair }, '*');
  }

  function changeGlasses() {
    const glassesDropdown = document.getElementById('glassesDropdown');
    const glassesLayer = document.getElementById('glassesLayer');
    glassesLayer.src = glassesDropdown.value;
    state.glasses = glassesDropdown.value;
    window.parent.postMessage({ action: 'state.glasses', value:  GlobalState.state.glasses }, '*');
  }

  function changeBody() {
    const bodyDropdown = document.getElementById('bodyDropdown');
    const bodyLayer = document.getElementById('bodyLayer');
    bodyLayer.src = bodyDropdown.value;
    state.body = bodyDropdown.value;
    window.parent.postMessage({ action: 'state.body', value: GlobalState.state.body }, '*');
  }

  function changeOuter() {
    const outerDropdown = document.getElementById('outerDropdown');
    const outerLayer = document.getElementById('outerLayer');
    outerLayer.src = outerDropdown.value;
    state.outer = outerDropdown.value;
    window.parent.postMessage({ action: 'state.outer', value: GlobalState.state.outer }, '*');
  }
