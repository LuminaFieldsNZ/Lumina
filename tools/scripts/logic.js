
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const transcriptionArea = document.getElementById('userInput');
const historyDiv = document.getElementById('history');
const newWordInput = document.getElementById('newWordInput');
const addWordButton = document.getElementById('addWordButton');
const countersDiv = document.getElementById('counters');
const countHistoryDiv = document.getElementById('countHistory');

// Static array to store word counts
const wordData = [
    'Men', 'Women', 'female', 'child', 'narcissist', 'narcissism', 'toxic', 'validation', 'god', 'lord', 'christ', 'bible'
].map(word => ({ word: word, count: 0 }));

// Array to store historical deleted counts
const deletedNumbers = [];

// Function to initialize counters for predefined words
const initializeCounters = () => {
    wordData.forEach(entry => {
        const counterDiv = document.createElement('div');
        counterDiv.className = 'counter';
        counterDiv.id = `counter${entry.word}`;
        counterDiv.innerHTML = `${entry.word}: <span id="count${entry.word}">0</span>`;
        countersDiv.appendChild(counterDiv);
    });
};

// Function to add a new word to the static array and update the display
const addWord = (word) => {
    word = word.trim();
    if (word && !wordData.some(entry => entry.word === word)) {
        wordData.push({ word: word, count: 0 });
        const counterDiv = document.createElement('div');
        counterDiv.className = 'counter';
        counterDiv.id = `counter${word}`;
        counterDiv.innerHTML = `${word}: <span id="count${word}">0</span>`;
        countersDiv.appendChild(counterDiv);
    }
};

// Function to update the counters on the page
const updateCounters = () => {
    wordData.forEach(entry => {
        const countElement = document.getElementById(`count${entry.word}`);
        if (countElement) {
            countElement.textContent = entry.count;
        }
    });
};

// Function to update existing entry or add new entry in deletedNumbers
const updateDeletedNumbers = (word, count) => {
    const existingEntry = deletedNumbers.find(entry => entry.word === word);
    if (existingEntry) {
        existingEntry.count += count;
    } else {
        deletedNumbers.push({ word: word, count: count });
    }
};

// Function to record and display historical deleted counts
const recordDeletedCounts = () => {
    const timestamp = new Date().toLocaleTimeString();
    const historyItem = document.createElement('div');
    historyItem.className = 'count-history-item';

    let countsText = `${timestamp}: `;
    deletedNumbers.forEach(entry => {
        countsText += `${entry.word}(${entry.count}) `;
    });

    historyItem.textContent = countsText;
    countHistoryDiv.appendChild(historyItem);
    countHistoryDiv.scrollTop = countHistoryDiv.scrollHeight; // Auto-scroll to the bottom
};

// Function to update counters and record counts
const updateCountersAndRecord = () => {
    updateCounters(); // Ensure counters are updated
    recordDeletedCounts(); // Record the deleted counts
};

// Function to highlight words in the text
const highlightWords = (text) => {
    const words = wordData.map(entry => entry.word);
    const regex = new RegExp(`\\b(${words.join('|')})\\b`, 'gi');
    return text.replace(regex, (match) => {
        return `<span class="highlight">${match}</span>`;
    });
};

// Function to add transcribed text to history
const addToHistory = (text) => {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.innerHTML = highlightWords(text);
    historyDiv.appendChild(historyItem);
    historyDiv.scrollTop = historyDiv.scrollHeight; // Auto-scroll to the bottom
};


addWordButton.addEventListener('click', () => {
    const newWord = newWordInput.value;
    if (newWord) {
        addWord(newWord);
        newWordInput.value = '';
    }
});

let recognition;
if (window.SpeechRecognition || window.webkitSpeechRecognition) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
        let transcript = '';
        let isFinal = false;
    
        // Loop through results
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                isFinal = true;
            }
        }
    
        transcriptionArea.value = transcript;
    
        // Update chat history
        addToHistory(transcript);
    
        // Only send the message when the transcription is final
        if (isFinal) {
            sendMessage();
            
            // After sending the message, you can clear the transcriptionArea if needed:
            transcriptionArea.value = '';
        }
    
        // Track deletions and updates
        wordData.forEach(entry => {
            const regex = new RegExp(`\\b${entry.word}\\b`, 'gi');
            const matchCount = (transcript.match(regex) || []).length;
    
            if (entry.count > matchCount) {
                const deletedCount = entry.count - matchCount;
                updateDeletedNumbers(entry.word, deletedCount);
            }
    
            entry.count = matchCount;
        });
    
        updateCountersAndRecord(); // Ensure counters are updated and historical counts are recorded
    };
    

    recognition.onstart = () => {
        startButton.disabled = true;
        stopButton.disabled = false;
    };

    recognition.onend = () => {
        startButton.disabled = false;
        stopButton.disabled = true;
    };

    startButton.addEventListener('click', () => {
        recognition.start();
    });

    stopButton.addEventListener('click', () => {
        recognition.stop();
    });

} else {
    alert('Speech Recognition API is not supported in this browser.');
}

// Initialize counters for predefined words
initializeCounters();






