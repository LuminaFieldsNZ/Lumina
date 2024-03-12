// Global variables for circle detection
let startPosition = null;
let checkpointClockwise = 0;
let checkpointCounterClockwise = 0;


// Function to create a green dot marker
function createGreenDotMarker(position) {
    const geometry = new THREE.SphereGeometry(0.08, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const dot = new THREE.Mesh(geometry, material);
    dot.position.copy(position);
    scene.add(dot);

    markers.push(dot); // Add the new marker to the array

}






// Function to change animation based on selected animation
function changeAnimation(selectedAnimation) {
    if (mixer && animations[selectedAnimation]) {
        action.stop();
        currentAnimation = selectedAnimation;
        action = mixer.clipAction(animations[currentAnimation]);
        action.setLoop(THREE.LoopRepeat);
        action.play();
    }
}

function changeCrycellaAnimation(selectedAnimation) {
    if (crycellaMixer && animations[selectedAnimation]) {
        crycellaAction.stop();
        crycellaAction = crycellaMixer.clipAction(crycellaAnimations[selectedAnimation]);
        crycellaAction.setLoop(THREE.LoopRepeat);
        crycellaAction.play();

    }
}




(function makeDropdownMovable() {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  let elmnt = document.getElementById("dropdown-container");
  let handle = document.getElementById("drag-handle");

  handle.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
trackCircleMovement(e.clientX, e.clientY);
  }


  
  let totalAngleChange = 0;
  let lastTriggerTime = 0;
  const triggerThreshold = 4 * Math.PI; // Increase for more deliberate movement
  const debounceTime = 1000; // Cooldown time in milliseconds
  
  function trackCircleMovement(currentX, currentY) {
      if (!startPosition) {
          startPosition = { x: currentX, y: currentY };
          return;
      }
  
      let angle = Math.atan2(currentY - startPosition.y, currentX - startPosition.x);
      totalAngleChange += angle;
  
      let currentTime = new Date().getTime();
      if (Math.abs(totalAngleChange) >= triggerThreshold && currentTime - lastTriggerTime > debounceTime) {
          if (totalAngleChange > 0) {
              spellOne(); // Clockwise
          } else {
              spellTwo(); // Counterclockwise
          }
  
          // Reset for next detection
          totalAngleChange = 0;
          startPosition = null;
          lastTriggerTime = currentTime;
      }
  }
  


  function updateAnyaPosition(screenX, screenY) {
      worldPosition = screenToWorld(screenX, screenY, camera, plane);
      if (worldPosition) {
          moveAnyaToPosition(worldPosition);
      }
  }



  function screenToWorld(x, y, camera, plane) {
      let mouse = new THREE.Vector2();
      mouse.x = (x / window.innerWidth) * 2 - 1;
      mouse.y = -(y / window.innerHeight) * 2 + 1;

      let raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      // Assuming 'plane' is a THREE.Plane object positioned in the world
      let target = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, target);
      return target;
  }




  function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
      document.ontouchend = null;
      document.ontouchmove = null;

      // Calculate the screen position of the center of the draggable element
      let rect = elmnt.getBoundingClientRect();
      let screenX = rect.left + rect.width / 2;
      let screenY = rect.top + rect.height / 2;

      // Convert screen coordinates to normalized device coordinates
      let x = (screenX / window.innerWidth) * 2 - 1;
      let y = -(screenY / window.innerHeight) * 2 + 1;

      // Set up a raycaster
      let raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

      // Define a plane at Anya's height
      let plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -anya.position.y);

      // Find where the ray intersects the plane
      let target = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(plane, target)) {
          moveAnyaToPosition(target);
          createGreenDotMarker(target);
      }
  }



handle.addEventListener('touchstart', dragStart, false);
handle.addEventListener('touchend', dragEnd, false);
handle.addEventListener('touchmove', drag, false);

function dragStart(e) {
    e.preventDefault();
    if (e.touches.length == 1) { // Only deal with one finger
        var touch = e.touches[0]; // Get the information for finger #1
        pos3 = touch.pageX;
        pos4 = touch.pageY;
        trackCircleMovement(touch.pageX, touch.pageY);
    }
}

function drag(e) {
    e.preventDefault();
    if (e.touches.length == 1) {
        var touch = e.touches[0];

        // Calculate new position of the element
        pos1 = pos3 - touch.pageX;
        pos2 = pos4 - touch.pageY;
        pos3 = touch.pageX;
        pos4 = touch.pageY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    }
}

function dragEnd(e) {
    e.preventDefault();

    // Resetting the drag event handlers
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchmove = null;

    // Calculate the screen position of the center of the draggable element
    let rect = elmnt.getBoundingClientRect();
    let screenX = rect.left + rect.width / 2;
    let screenY = rect.top + rect.height / 2;

    // Convert screen coordinates to normalized device coordinates
    let x = (screenX / window.innerWidth) * 2 - 1;
    let y = -(screenY / window.innerHeight) * 2 + 1;

    // Set up a raycaster
    let raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

    // Define a plane at Anya's height
    let plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -anya.position.y);

    // Find where the ray intersects the plane
    let target = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(plane, target)) {
        moveAnyaToPosition(target);
        createGreenDotMarker(target);
    }

    // Here you can also reset the drag handle's position if needed
}

})();


function spellOne() {
    console.log("Spell One Activated!");
}

function spellTwo() {
    console.log("Spell Two Activated!");
}
