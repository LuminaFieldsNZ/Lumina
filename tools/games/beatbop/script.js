const indicators = document.querySelectorAll('.indicator');
const audio = document.getElementById('audio');
const keys = ['Q', 'W', 'E', 'R', 'U', 'I', 'O', 'P'];
let notes = [];

// Audio setup
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
const source = audioContext.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioContext.destination);

// Configure analyser
analyser.fftSize = 2048;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

let isGameStarted = false;

// Function to create falling notes based on audio data
function createNote() {
    if (!isGameStarted) return;

    // Get frequency data
    analyser.getByteFrequencyData(dataArray);

    // Determine which key to generate based on frequency data
    let maxIndex = 0;
    let maxValue = 0;

    // Analyze frequency data to determine the most prominent frequency
    for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i] > maxValue) {
            maxValue = dataArray[i];
            maxIndex = i;
        }
    }

    // Map frequency index to a key
    const noteKey = keys[Math.floor((maxIndex / bufferLength) * keys.length)];

    // Create the falling note
    const indicatorIndex = keys.indexOf(noteKey);
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('falling-note', noteKey);

    // Set horizontal position to match the indicator
    const indicatorPosition = (indicatorIndex * (600 / keys.length)) + 10; // 10px offset for centering
    noteDiv.style.left = `${indicatorPosition}px`;
    noteDiv.style.top = '0px'; // Start at the top
    document.getElementById('game-container').appendChild(noteDiv);

    let fallInterval = setInterval(() => {
        let top = parseInt(window.getComputedStyle(noteDiv).getPropertyValue("top"));
        if (top < 800) {
            noteDiv.style.top = `${top + 5}px`; // Move the note down
        } else {
            clearInterval(fallInterval);
            noteDiv.remove(); // Remove the note if it falls past the bottom
        }
    }, 100);

    notes.push({ div: noteDiv, key: noteKey, interval: fallInterval });
}

// Function to check key presses
function checkKey(event) {
    const keyPressed = event.key.toUpperCase();
    notes.forEach((note, index) => {
        if (note.key === keyPressed) {
            note.div.remove(); // Remove the note if the correct key is pressed
            clearInterval(note.interval);
            notes.splice(index, 1); // Remove from notes array
            // Add scoring or feedback logic here
        }
    });
}

// Start game function
function startGame() {
    audio.play().catch(error => {
        console.log("Playback failed: ", error); // Handle any playback errors
    });

    // Start note creation at regular intervals
    setInterval(createNote, 100); // Create a new note based on audio analysis
    document.removeEventListener('click', startGame); // Remove the event listener after starting
    isGameStarted = true;
}

// Add event listeners for keyboard input and mobile clicks
document.addEventListener('keydown', checkKey);
indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
        const keyClicked = indicator.getAttribute('data-key');
        checkKey({ key: keyClicked }); // Simulate key press
    });
});

// Add click event to start the game
document.addEventListener('click', startGame);
