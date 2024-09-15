const player1 = `
<div class="image-container2 questPlayer" id="dynamicPlayer1" onclick="shake('questPlayer');">
    <img src="./body/body0.png" id="bodyLayer" class="layer" style="z-index: 1;">
    <img src="./head.png" alt="Head" class="layer" style="z-index: 2;">
    <img id="glassesLayer" class="layer" style="z-index: 3;">
    <img id="hairLayer" class="layer" style="z-index: 4;">
    <img src="./outer/outer0.png" id="outerLayer" class="layer" style="z-index: 5;">
  </div>
`;

const boss1 = `
<div class="image-container3 questBoss flipped" id="dynamicBoss1" onclick="shake2('questBoss');">
    <img src="./body/body0.png" id="bodyLayer" class="layer" style="z-index: 1;">
    <img src="./head.png" alt="Head" class="layer" style="z-index: 2;">
    <img src="./glasses/glasses9.png" id="glassesLayer" class="layer" style="z-index: 3;">
    <img src="./hair/hair28.png" id="hairLayer" class="layer" style="z-index: 4;">
    <img src="./outer/outer9.png" id="outerLayer" class="layer" style="z-index: 5;">
  </div>
`;


// Shake Function (Targeting by class name)
function shake(className) {
    const elements = document.getElementsByClassName(className);
    for (let element of elements) {
      // Ensure the animation plays each time
      element.classList.remove('shake-animation');
      void element.offsetWidth; // Trigger reflow
      element.classList.add('shake-animation');
    }
  }

function shake2(className) {
    const elements = document.getElementsByClassName(className);
    for (let element of elements) {
      // Ensure the animation plays each time
      element.classList.remove('shake2-animation');
      void element.offsetWidth; // Trigger reflow
      element.classList.add('shake2-animation');
    }
  }
  


  // Function to apply the jump animation
function jump(className) {
    const elements = document.getElementsByClassName(className);
    for (let element of elements) {
      // Ensure the animation plays each time
      element.classList.remove('jump-animation');
      void element.offsetWidth; // Trigger reflow
      element.classList.add('jump-animation');
    }
  }
  
  
  // Fade In Function (Targeting by class name)
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
  
  // Fade Out Function (Targeting by class name)
  function fadeOut(className) {
    const elements = document.getElementsByClassName(className);
    for (let element of elements) {
      element.style.transition = 'opacity 1s';
      element.style.opacity = 0;
    }
  }




// Function to append an element to the body
function appendToBody(htmlString, uniqueId) {
  // Create a new div element
  const tempDiv = document.createElement('div');
  
  // Assign the inner HTML to the div
  tempDiv.innerHTML = htmlString;
  
  // Set an ID to the div if provided (useful for removing it later)
  if (uniqueId) {
    tempDiv.firstElementChild.id = uniqueId;  // Apply ID to the element itself, not the wrapper
  }
  
  // Append the element to the body
  document.body.appendChild(tempDiv.firstElementChild);
}
  
  // Function to remove an element by its ID
  function removeFromBody(uniqueId) {
    const element = document.getElementById(uniqueId);
    if (element) {
      element.remove();
    }
  }
  
  // appendToBody(player1, 'dynamicPlayer1');
  // appendToBody(boss1, 'dynamicBoss1');
  // removeFromBody('dynamicPlayer1');
  // removeFromBody('dynamicBoss1');
  // shake('questPlayer');
  // jump('questBoss');
  // fadeIn('questPlayer');
  // fadeOut('questBoss');
  
  

  