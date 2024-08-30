document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = [
        {
            id: 'scales',
            label: 'Sexism',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor">
                  <!-- Base of the scale -->
                  <rect x="60" y="200" width="136" height="16" rx="8" fill="currentColor"/>
                  <!-- Central support column -->
                  <rect x="116" y="80" width="24" height="120" rx="12" fill="currentColor"/>
                  <!-- Beam -->
                  <rect x="60" y="80" width="136" height="16" rx="8" fill="currentColor"/>
                  <!-- Left pan -->
                  <circle cx="80" cy="160" r="24" fill="none" stroke="currentColor" stroke-width="16"/>
                  <line x1="80" y1="80" x2="80" y2="160" stroke="currentColor" stroke-width="16"/>
                  <!-- Right pan -->
                  <circle cx="176" cy="160" r="24" fill="none" stroke="currentColor" stroke-width="16"/>
                  <line x1="176" y1="80" x2="176" y2="160" stroke="currentColor" stroke-width="16"/>
                  <!-- Crossbar on the beam -->
                  <line x1="100" y1="80" x2="156" y2="80" stroke="currentColor" stroke-width="16"/>
                </svg>`
        },
        {
            id: 'checkbox2',
            label: 'Framer',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256">
                    <rect width="256" height="256" fill="none"></rect>
                    <polygon points="56 100 56 168 128 236 128 168 200 168 56 32 200 32 200 100 56 100" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></polygon>
                  </svg>`
        },
        {
            id: 'checkbox3',
            label: 'Sketch',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256">
                    <rect width="256" height="256" fill="none"></rect>
                    <polygon points="72 40 184 40 240 104 128 224 16 104 72 40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></polygon>
                    <polygon points="177.091 104 128 224 78.909 104 128 40 177.091 104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></polygon>
                    <line x1="16" y1="104" x2="240" y2="104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></line>
                  </svg>`
        }
        // Add more checkboxes here as needed
    ];

    const container = document.getElementById('checkbox-container');

    checkboxes.forEach(checkbox => {
        const checkboxWrapper = document.createElement('label');
        checkboxWrapper.className = 'checkbox-wrapper';
        checkboxWrapper.innerHTML = `
            <input type="checkbox" class="checkbox-input" id="${checkbox.id}" />
            <span class="checkbox-tile">
              <span class="checkbox-icon">
                ${checkbox.svg}
              </span>
              <span class="checkbox-label">${checkbox.label}</span>
            </span>
        `;
        container.appendChild(checkboxWrapper);
    });

    container.addEventListener('change', (event) => {
        if (event.target.classList.contains('checkbox-input')) {
            const checkboxId = event.target.id;
            // Construct the URL based on the checkbox ID
            const url = `../tools/${checkboxId}.html`;
            // Redirect the browser to the new URL
            window.location.href = url;
        }
    });
});
