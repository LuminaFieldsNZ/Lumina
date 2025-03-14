document.addEventListener('DOMContentLoaded', () => {
    const config = {
        src: '../peeps.png',
        rows: 7,
        cols: 15
    };

    const checkboxes = [
        { id: 'games/sounds/index', label: 'Sounds', index: 0 },
        { id: 'gifs', label: 'Humor', index: 1 },
        { id: 'games', label: 'Lumie', index: 2 },
        { id: 'games/sling/index', label: 'Slingshot', index: 3 },
        { id: 'shapes', label: 'Shapes', index: 4 },
        { id: 'games/tictactoe/index', label: 'TicTacToe', index: 5 },
        { id: 'games/peep/count2', label: 'FindPeep', index: 6 },
        { id: 'games/memory/index', label: 'Memory', index: 7 },
        { id: 'games/crossy/index', label: 'Crossy', index: 8 },
        { id: 'games/match/index', label: 'Match', index: 9 },
        { id: 'games/alphabet/index', label: 'Alphabet', index: 10 },
        { id: 'games/threetactoe/index2', label: 'ThreeTacToe', index: 11 },
        { id: 'games/connect4/index', label: 'Connect4', index: 12 },
        { id: 'games/stacker/index', label: 'Stacker', index: 13 },
        { id: 'sing', label: 'Pitch Match', index: 14 },
        { id: 'games/colorcrush/index', label: 'ColorCrush', index: 15 },
        { id: 'logic', label: 'Hearing', index: 16 },
        { id: 'games/minesweeper/index', label: 'Minesweeper', index: 17 },
        { id: 'avatar', label: 'GLB Avatar', index: 18 },
        { id: 'face', label: 'Face', index: 19 },
        { id: 'games/ninja/index', label: 'Ninja', index: 20 },
        { id: 'games/jackpot/index', label: 'Jackpot', index: 21 },
        { id: 'games/tetris/index', label: 'Tetris', index: 22 },
        { id: 'games/marble/index', label: 'Marble', index: 23 },
        { id: 'flip/deep', label: 'HDWYG', index: 24 }









        // Add more checkboxes here as needed
    ];

    const container = document.getElementById('checkbox-container');
    const img = new Image();
    img.src = config.src;

    img.onload = () => {
        // Calculate sprite dimensions
        const rectWidth = img.naturalWidth / config.cols; // Width of each sprite
        const rectHeight = img.naturalHeight / config.rows; // Height of each sprite

        checkboxes.forEach(checkbox => {
            // Calculate row and column based on index
            const row = Math.floor(checkbox.index / config.cols);
            const col = checkbox.index % config.cols;

            // Calculate background position
            const backgroundPositionX = -col * rectWidth + 'px';
            const backgroundPositionY = -row * rectHeight + 'px';

            // Create checkbox wrapper
            const checkboxWrapper = document.createElement('label');
            checkboxWrapper.className = 'checkbox-wrapper'; // Add scaling class here
            checkboxWrapper.style.backgroundImage = `url(${img.src})`;
            checkboxWrapper.style.backgroundPosition = `${backgroundPositionX} ${backgroundPositionY}`;
            checkboxWrapper.style.width = `${rectWidth}px`;  // Use calculated sprite width
            checkboxWrapper.style.height = `${rectHeight}px`; // Use calculated sprite height
            checkboxWrapper.style.backgroundSize = `${img.naturalWidth}px ${img.naturalHeight}px`; // Ensure the background image scales correctly
            checkboxWrapper.style.display = 'inline-block'; // Ensure sprites display inline


            // Add checkbox and label
            checkboxWrapper.innerHTML = `
                <input type="checkbox" class="checkbox-input" id="${checkbox.id}" />
                <span class="checkbox-tile">
                  <span class="checkbox-icon"></span>
                  <span class="checkbox-label">${checkbox.label}</span>
                </span>
            `;
            container.appendChild(checkboxWrapper);
        });
    };

    container.addEventListener('change', (event) => {
        if (event.target.classList.contains('checkbox-input')) {
            const checkboxId = event.target.id;
            const url = `../tools/${checkboxId}.html`;
            window.location.href = url;
        }
    });
});
