document.addEventListener('DOMContentLoaded', () => {
    const config = {
        src: '../peeps.png',
        rows: 7,
        cols: 15
    };

    const checkboxes = [
        { id: 'flip/deep', label: 'HDWYG', index: 0 },
        { id: 'gifs', label: 'Humor', index: 1 },
        { id: 'games', label: 'Lumie', index: 2 },
        { id: 'games/gorillas/index', label: 'Gorillas', index: 3 },
        { id: 'shapes', label: 'Shapes', index: 4 },
        { id: 'logic', label: 'Hearing', index: 5 },
        { id: '../peepBasic', label: 'Agents', index: 6 },
        { id: 'readGLB', label: 'GLB Reader', index: 7 },
        { id: 'avatar', label: 'GLB Avatar', index: 8 },
        { id: 'face', label: 'Face', index: 9 },
        { id: 'list/index', label: 'TikTok', index: 10 },
        { id: 'quiz/narc2', label: 'Narcissism', index: 11 },
        { id: '../demo/index', label: 'Watcher', index: 12 },
        { id: 'scales', label: 'Sexism', index: 13 },
        { id: 'sing', label: 'Pitch Match', index: 14 },
        { id: 'quiz/quiz', label: 'Learn', index: 15 }



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
