<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rhythm Game</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        #game-container {
            position: relative;
            width: 600px;
            height: 800px;
            border: 1px solid #000;
            overflow: hidden;
        }
        .falling-note {
            position: absolute;
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
        .Q { background-color: red; }
        .W { background-color: orange; }
        .E { background-color: yellow; }
        .R { background-color: green; }
        .U { background-color: blue; }
        .I { background-color: indigo; }
        .O { background-color: violet; }
        .P { background-color: pink; }
        .indicator {
            display: inline-block;
            width: 40px;
            height: 40px;
            border: 2px solid;
            border-radius: 50%;
            margin: 20px;
            position: relative;
        }
        .glow {
            box-shadow: 0 0 10px #fff;
        }
    </style>
</head>
<body>
    <div id="game-container"></div>
    <div class="indicator Q" data-key="Q"></div>
    <div class="indicator W" data-key="W"></div>
    <div class="indicator E" data-key="E"></div>
    <div class="indicator R" data-key="R"></div>
    <div class="indicator U" data-key="U"></div>
    <div class="indicator I" data-key="I"></div>
    <div class="indicator O" data-key="O"></div>
    <div class="indicator P" data-key="P"></div>
    <audio id="audio" src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" preload="auto"></audio>

    <script>
        const indicators = document.querySelectorAll('.indicator');
        const audio = document.getElementById('audio');
        const keys = ['Q', 'W', 'E', 'R', 'U', 'I', 'O', 'P'];
        let notes = [];
        let score = 0;

        // Function to create falling notes
        function createNote() {
            const noteKey = keys[Math.floor(Math.random() * keys.length)];
            const noteDiv = document.createElement('div');
            noteDiv.classList.add('falling-note', noteKey);

            // Align note with the corresponding indicator
            const indicator = document.querySelector(`.indicator.${noteKey}`);
            const indicatorRect = indicator.getBoundingClientRect();
            const containerRect = document.getElementById('game-container').getBoundingClientRect();
            const noteLeft = indicatorRect.left - containerRect.left + (indicatorRect.width / 2) - 20; // Center the note

            noteDiv.style.left = `${noteLeft}px`; // Set the left position
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
                    const indicator = document.querySelector(`.indicator.${keyPressed}`);
                    if (indicator) {
                        // Only score if the note color matches the indicator color
                        score++;
                        console.log("Score: ", score); // Log the score
                    }
                    note.div.remove(); // Remove the note if the correct key is pressed
                    clearInterval(note.interval);
                    notes.splice(index, 1); // Remove from notes array
                }
            });
        }

        // Glow effect for indicators
        function glowIndicator(indicator) {
            indicator.classList.add('glow');
            setTimeout(() => {
                indicator.classList.remove('glow');
            }, 500); // Glow for 0.5 seconds
        }

        // Start game function
        function startGame() {
            audio.play().catch(error => {
                console.log("Playback failed: ", error); // Handle any playback errors
            });
            
            setInterval(createNote, 1000); // Create a new note every second
            document.removeEventListener('click', startGame); // Remove the event listener after starting
        }

        // Add event listeners for keyboard input and mobile clicks
        document.addEventListener('keydown', (event) => {
            checkKey(event);
            const keyPressed = event.key.toUpperCase();
            const indicator = document.querySelector(`.indicator.${keyPressed}`);
            if (indicator) {
                glowIndicator(indicator); // Add glow effect on key press
            }
        });

        indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                const keyClicked = indicator.getAttribute('data-key');
                checkKey({ key: keyClicked }); // Simulate key press
                glowIndicator(indicator); // Add glow effect on click
            });
        });

        // Add click event to start the game
        document.addEventListener('click', startGame);
    </script>
</body>
</html>
