document.addEventListener('DOMContentLoaded', () => {
    const config = {
        src: '../peeps.png',
        rows: 7,
        cols: 15
    };

    const checkboxes = [
        { id: 'list/index', label: 'TikTok', index: 0 },
        { id: 'gifs', label: 'Humor', index: 1 },
        { id: 'games', label: 'Games', index: 2 },
        { id: 'scales', label: 'Sexism', index: 3 },
        { id: 'readGLB', label: 'GLBRead', index: 4 },
        { id: 'avatar', label: 'Avatar', index: 5 },
        { id: 'face', label: 'Face', index: 6 }
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
