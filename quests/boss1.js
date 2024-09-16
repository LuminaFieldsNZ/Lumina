const config = {
  src: 'peeps.png',
  rows: 7,
  cols: 15
};

let checkboxes = [
  { id: 'boss', label: 'Rachel', index: 0 },
  { id: 'shake', label: 'Mark', index: 1 },
  { id: 'fade-out', label: 'Clyde', index: 2 }
  // Add more checkboxes here as needed
];

// Function to append an element to the body
function appendToBody(htmlString, uniqueId) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  if (uniqueId) {
    const firstChild = tempDiv.firstElementChild;
    if (firstChild) {
      firstChild.id = uniqueId; // Apply ID to the element itself
      document.body.appendChild(firstChild); // Append to body
    } else {
      console.error('No element found to append.');
    }
  } else {
    document.body.appendChild(tempDiv.firstElementChild);
  }
}

function removeFromBody(uniqueId) {
  const element = document.getElementById(uniqueId);
  if (element) {
    element.remove();
  }
}

function removeCheckboxes() {
  // Remove all checkboxes within the container
  const container = document.getElementById('dynamicBoss1');
  if (container) {
    container.innerHTML = '';
  }
}

// Define the boss1 HTML content
const boss1 = `
<div class="image-container3 questBoss flipped" id="dynamicBoss1" onclick="shake2('questBoss');">
</div>
`;

function createCheckboxes() {
  // Get the container element after it has been added to the DOM
  const container = document.getElementById('dynamicBoss1');
  if (container) {
    const img = new Image();
    img.src = config.src;
    img.onload = () => {
      // Define the scaling factor
      const screenWidth = window.innerWidth;
      const scaleFactor = screenWidth < 850 ? 0.5 : 1;

      // Calculate the dimensions and position based on the scaling factor
      const rectWidth = (img.naturalWidth / config.cols) * scaleFactor;
      const rectHeight = (img.naturalHeight / config.rows) * scaleFactor;

      // Loop through checkboxes to create and style them
      checkboxes.forEach((checkbox, index) => {
        const row = Math.floor(checkbox.index / config.cols);
        const col = checkbox.index % config.cols;
        const backgroundPositionX = -col * rectWidth + 'px';
        const backgroundPositionY = -row * rectHeight + 'px';

        // Create and style the checkbox wrapper
        const checkboxWrapper = document.createElement('label');
        checkboxWrapper.className = 'checkbox-wrapper';
        checkboxWrapper.id = `${checkbox.id}`;
        checkboxWrapper.style.backgroundImage = `url(${img.src})`;
        checkboxWrapper.style.backgroundPosition = `${backgroundPositionX} ${backgroundPositionY}`;
        checkboxWrapper.style.width = `${rectWidth}px`;
        checkboxWrapper.style.height = `${rectHeight}px`;
        checkboxWrapper.style.backgroundSize = `${img.naturalWidth * scaleFactor}px ${img.naturalHeight * scaleFactor}px`;
        checkboxWrapper.style.display = 'inline-block';
        checkboxWrapper.style.marginLeft = `${index * (screenWidth < 850 ? 40 : 80)}px`;

        // Append the checkbox wrapper to the container
        container.appendChild(checkboxWrapper);
      });
    };
  } else {
    console.error('Element with ID dynamicBoss1 not found.');
  }
}

// Switch boss function
function switchBoss(...indices) {
  // Remove old checkboxes
  removeCheckboxes();

  // Update the checkboxes array with new indices, adding new ones if necessary
  checkboxes = indices.map((index, i) => ({
    id: `checkbox-${i}`, // Use unique ID for each checkbox
    label: `Label ${i + 1}`, // Generate a label (optional)
    index
  }));

  // Recreate the checkboxes with the new indices
  createCheckboxes();
}


appendToBody(boss1, 'dynamicBoss1');
createCheckboxes();
hideDynamicBoss1();



// Functions for animations
function shake(className) {
  const elements = document.getElementsByClassName(className);
  for (let element of elements) {
    element.classList.remove('shake-animation');
    void element.offsetWidth;
    element.classList.add('shake-animation');
  }
}

function shake2(className) {
  const elements = document.getElementsByClassName(className);
  for (let element of elements) {
    element.classList.remove('shake2-animation');
    void element.offsetWidth;
    element.classList.add('shake2-animation');
  }
}

function jump(className) {
  const elements = document.getElementsByClassName(className);
  for (let element of elements) {
    element.classList.remove('jump-animation');
    void element.offsetWidth;
    element.classList.add('jump-animation');
  }
}

function fadeIn(className) {
  const elements = document.getElementsByClassName(className);
  for (let element of elements) {
    element.style.opacity = 0;
    element.style.transition = 'opacity 1s';
    setTimeout(() => {
      element.style.opacity = 1;
    }, 0);
  }
}

function fadeOut(className) {
  const elements = document.getElementsByClassName(className);
  for (let element of elements) {
    element.style.transition = 'opacity 1s';
    element.style.opacity = 0;
  }
}




function appendToBody(htmlString, uniqueId) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  if (uniqueId) {
    tempDiv.firstElementChild.id = uniqueId;
  }
  document.body.appendChild(tempDiv.firstElementChild);
}

function removeFromBody(uniqueId) {
  const element = document.getElementById(uniqueId);
  if (element) {
    element.remove();
  }
}






// switchBoss(47);
// appendToBody(boss1, 'dynamicBoss1');
// removeFromBody('profilePic');
// removeFromBody('dynamicBoss1');
// shake('questPlayer');
// jump('questBoss');
// fadeIn('questPlayer');
// fadeOut('questBoss');
