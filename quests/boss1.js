const config = {
  src: 'peeps.png',
  rows: 7,
  cols: 15
};

const checkboxes = [
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

let scaleFactor = 1;

// Define the boss1 HTML content
const boss1 = `
<div class="image-container3 questBoss flipped" id="dynamicBoss1" onclick="shake2('questBoss');">
</div>
`;

// Append the boss1 HTML content to the body
appendToBody(boss1, 'dynamicBoss1');
hideDynamicBoss1();


// Get the container element after it has been added to the DOM
const container = document.getElementById('dynamicBoss1');

if (container) {
  const img = new Image();
  img.src = config.src;

  img.onload = () => {
    // Define the scaling factor
    const screenWidth = window.innerWidth;

    if (screenWidth < 850) {
      scaleFactor = 0.5; // Scale down for smaller screens
    }  
    // Calculate the dimensions and position based on the scaling factor
    const rectWidth = (img.naturalWidth / config.cols) * scaleFactor;
    const rectHeight = (img.naturalHeight / config.rows) * scaleFactor;
  
    // Loop through checkboxes to create and style them
    checkboxes.forEach((checkbox, index) => {
      const row = Math.floor(checkbox.index / config.cols);
      const col = checkbox.index % config.cols;
      // Calculate the background position with scaling factor
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
      if (screenWidth < 850) {
        checkboxWrapper.style.marginLeft = `${index * 40}px`; // Adjust the spacing as needed
      }  else {
        checkboxWrapper.style.marginLeft = `${index * 120}px`; // Adjust the spacing as needed
      }
  
      // Append the checkbox wrapper to the container
      container.appendChild(checkboxWrapper);
    });
  };
  

} else {
  console.error('Element with ID dynamicBoss1 not found.');
}

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


function removeCheckboxById(checkboxId) {
  // Find the checkbox wrapper element by its ID
  const checkboxWrapper = document.getElementById(checkboxId);
  
  if (checkboxWrapper) {
    // Remove the checkbox wrapper from the container
    checkboxWrapper.remove();
  } else {
    console.error(`Checkbox with ID "${checkboxId}" not found.`);
  }
}




// Uncomment and test as needed
// appendToBody(boss1, 'dynamicBoss1');
// removeFromBody('profilePic');
// removeFromBody('dynamicBoss1');
// shake('questPlayer');
// jump('questBoss');
// fadeIn('questPlayer');
// fadeOut('questBoss');
