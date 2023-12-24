let scene, camera, renderer, controls, model, mixer, mixer2, anyaMixer, anyaAction, animation2, action2, action, city, snowman, computers, delta;
let felixMixer, felixAction, crycellaMixer, crycellaAction;
let clock = new THREE.Clock();
let animations, currentAnimationIndex = 0;
let spine, neck, anya, knife, anyaPosition, knifePosition;
let targetRotation = new THREE.Vector3();
let allowHeadTracking = true;
let dropdown = document.getElementById('animation-selector');
let dropdownRect;
let dragon_bossMixer;
let isSnowmanMoving = false;
let lastSnowmanMoveTime = Date.now();
let lastRestartTime = 0; // Keep track of the last time the animation was restarted
let animationDuration = 2.9; // Duration to play before restarting
let animationSpeed = 0.2; // Speed of the animation (half speed)

gsap.ticker.add(render);

document.addEventListener('DOMContentLoaded', (event) => {
  init();

  document.addEventListener('click', changeAnimation);
  document.addEventListener('touchstart', changeAnimation);

  dropdown.addEventListener('change', function() {
    let selectedValue = parseInt(this.value);
    changeAnimation(selectedValue);
  });
});



let anyaAnimations;
let isAnyaLoaded = false;
let isKnifeLoaded = false;
let walkAnimationIndex; // The index of the walk animation in the gltf.animations array
let moveDestination = new THREE.Vector3();
let isAnyaMoving = false;
let animationDuration2 = 1; // Default duration
let isWalking = false;

function startWalking() {
    if (!isWalking && walkAnimationIndex !== undefined) {
        anyaAction.stop();
        anyaAction = anyaMixer.clipAction(gltf.animations[walkAnimationIndex]);
        anyaAction.play();
        isWalking = true;

        // Set a timeout to switch back to the first animation
        setTimeout(() => {
            anyaAction.stop();
            anyaAction = anyaMixer.clipAction(gltf.animations[0]);
            anyaAction.play();
            isWalking = false;
        }, 1000); // Switch back after 1 second
    }
}


function switchToAnimation(animationIndex, playOnce = false) {
    if (anyaMixer && anyaAnimations[1]) {
        anyaAction.stop();
        anyaAction = anyaMixer.clipAction(anyaAnimations[0]);
        if (playOnce) {
            anyaAction.setLoop(THREE.LoopOnce);
            anyaAction.clampWhenFinished = true;
        }
        anyaAction.play();
    }
}

function onAnimationFinished(event) {
    // Remove the listener to prevent it from firing multiple times
    event.action.removeEventListener('finished', onAnimationFinished);

    // Switch back to the idle animation
    switchToAnimation(0); // Assuming the first animation is the idle animation
}

function updateAnyaMovement() {
    if (!isAnyaMoving) return;

    let distance = anya.position.distanceTo(moveDestination);
    if (distance < 0.1) {
        // Anya has reached the destination
        isAnyaMoving = false;
        anyaAction.stop();
        anyaAction = anyaMixer.clipAction(anyaAnimations[1]); // Return to the first animation
        anyaAction.play();
        return;
    }

    // Calculate step based on duration and frame rate
    let step = distance / (1 * animationDuration2);
    anya.position.lerp(moveDestination, step);

    // Rotate Anya towards the destination
    anya.lookAt(moveDestination);
}

function moveAnyaToPosition(worldPosition) {
    // Constrain within 1200x1200 plane
    worldPosition.clamp(new THREE.Vector3(-600, anya.position.y, -600), new THREE.Vector3(600, anya.position.y, 600));

    let distance = anya.position.distanceTo(worldPosition);
   moveDestination.copy(worldPosition);
   isAnyaMoving = true;

   let animationIndex = distance < 90 ? 1 : 2; // Choose animation based on distance
   animationDuration2 = distance < 90 ? 2 : 2.2; // Set duration based on distance

   // Play the selected animation
   anyaAction.stop();
   anyaAction = anyaMixer.clipAction(anyaAnimations[1]);
   anyaAction.setLoop(THREE.LoopOnce);
   anyaAction.play();

   // Use the onFinished callback of the mixer to switch back to idle
   anyaMixer.addEventListener('finished', () => {
       // Ensure this callback only runs once per animation play
       anyaMixer.removeEventListener('finished', arguments.callee);

       // Switch back to idle animation
       anyaAction.stop();
       anyaAction = anyaMixer.clipAction(anyaAnimations[0]); // Idle animation
       anyaAction.play();
   });

}



function checkCollision() {
    if (!anya || !knife) {
        // If anya or knife are not yet loaded, exit the function
        return;
    }

    const anyaPosition = new THREE.Vector3();
    const knifePosition = new THREE.Vector3();

    // Get the world position of anya and knife
    anya.getWorldPosition(anyaPosition);
    knife.getWorldPosition(knifePosition);

    // Now you can use anyaPosition and knifePosition to check for collision
    // For example, check if the distance between them is less than some threshold
    const distance = anyaPosition.distanceTo(knifePosition);
    const collisionThreshold = 1.0; // Set your collision threshold

    if (distance < collisionThreshold) {
      attachKnifeToAnya();
        // Collision detected
        console.log('Collision detected between anya and knife');
    }
}

const collisionThreshold = 1.0; // Adjust based on your scale

function attachKnifeToAnya() {
    const anyaHand = anya.getObjectByName('LeftHand'); // Replace 'Hand' with the actual hand part name
    if (anyaHand) {
        anyaHand.add(knife);
        knife.position.set(-.55, -.20, 0); // Adjust as necessary
        knife.rotation.y = 625;
    }
}





function render() {
    delta = clock.getDelta();
    if (mixer) {
        mixer.update(delta);
    }
    // Update the anya mixer
       if (anyaMixer) {
           anyaMixer.update(delta);
       }
       if (felixMixer) {
           felixMixer.update(delta);
       }
       if (crycellaMixer) {
           crycellaMixer.update(delta);
       }
    if (mixer2) {
        // Update the elapsed time since the last restart
        lastRestartTime += delta;

        // Check if the specified duration has passed
        if (lastRestartTime >= animationDuration / animationSpeed) {
            action2.reset().play(); // Restart the animation
            lastRestartTime = 0; // Reset the timer
        }

        mixer2.update(delta); // Continue to update the mixer
    }

    if (spine && neck && allowHeadTracking) {
        let focusX, focusY;
        const currentTime = Date.now();

        if (snowman && (isSnowmanMoving || currentTime - lastSnowmanMoveTime < 3000)) {
            // Calculate focus point from snowman's position
            const snowmanScreenPos = toScreenPosition(snowman, camera);
            focusX = (snowmanScreenPos.x / window.innerWidth) * 2 - 1;
            focusY = -(snowmanScreenPos.y / window.innerHeight) * 2 + 1;
        } else {
            // Calculate focus point from dropdown's position
            dropdownRect = dropdown.getBoundingClientRect();
            focusX = ((dropdownRect.left + dropdownRect.width / 2) / window.innerWidth) * 2 - 1;
            focusY = -((dropdownRect.top + dropdownRect.height / 2) / window.innerHeight) * -2;
        }

        targetRotation.x = focusY;
        targetRotation.y = focusX;

        // Apply rotations to spine and neck
        spine.rotation.y += 0.4 * (targetRotation.y - spine.rotation.y);
        neck.rotation.y += 0.3 * (targetRotation.y - neck.rotation.y);
        spine.rotation.x += 0.4 * (targetRotation.x - spine.rotation.x);
        neck.rotation.x += 0.4 * (targetRotation.x - neck.rotation.x);
    }

 checkCollision();
 // Update Anya's movement
     updateAnyaMovement();
 camera.lookAt(anya.position);

 renderer.render(scene, camera);
}



function toScreenPosition(obj, camera) {
    const vector = new THREE.Vector3();
    const canvas = renderer.domElement;

    obj.updateMatrixWorld();
    vector.setFromMatrixPosition(obj.matrixWorld);
    vector.project(camera);

    vector.x = (vector.x + 1) * canvas.width / 2;
    vector.y = -(vector.y - 1) * canvas.height / 2;

    return { x: vector.x, y: vector.y };
}


function init() {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 0, 16);
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 3, 6);
  camera.lookAt(0, 0, 0);

  let ambient = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambient);
  let pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.position.z = 2500;
  scene.add(pointLight);

  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 1024;  // Shadow map resolution width
  pointLight.shadow.mapSize.height = 1024; // Shadow map resolution height

  // Spotlight setup
let spotlight = new THREE.SpotLight(0xffffff, 1); // White light with full intensity
spotlight.position.set(0, 12500, 0); // Adjust the position as needed

// Creating a target object for the spotlight
let spotlightTarget = new THREE.Object3D();
spotlightTarget.position.set(0, 0, 0); // Set this to the center or focus area of your city
scene.add(spotlightTarget);

spotlight.target = spotlightTarget;

// Adjust these properties as needed
spotlight.angle = Math.PI / 4;
spotlight.penumbra = 0.5;
spotlight.decay = 2;
spotlight.distance = 0; // No limit to the distance of the light


scene.add(spotlight);


  let loader = new THREE.GLTFLoader();
  loader.load('https://luminafields.com/micheal3.glb', function (gltf) {
    model = gltf.scene;
    scene.add(model);
    model.position.y = -0.7;
    mixer = new THREE.AnimationMixer(model);
    animations = gltf.animations;
    action = mixer.clipAction(animations[1]);
    action.setLoop(THREE.LoopRepeat);
    action.play();

    spine = model.getObjectByName('Spine');
    neck = model.getObjectByName('Neck');


  });


  loader.load('https://luminafields.com/city.glb', function (gltf) {
  city = gltf.scene;
  city.scale.set(60, 60, 60); // Adjust the 100 factor as needed
  scene.add(city);
  city.position.y += 8.2;
  // Perform any additional setup for the city model here
});

loader.load('https://luminafields.com/snowman.glb', function (gltf) {
snowman = gltf.scene;
snowman.scale.set(3, 3, 3); // Adjust the 100 factor as needed
scene.add(snowman);
snowman.position.x += 2.2;
snowman.rotation.y = 525;

// Perform any additional setup for the city model here
});

loader.load('https://luminafields.com/AnyaR.glb', function (gltf) {
  isAnyaLoaded = true;
anya = gltf.scene;
scene.add(anya);
anya.scale.set(.8, .8, .8); // Adjust the 100 factor as needed
anya.position.x += -0.6;
anya.position.y = -0.7;
anyaAnimations = gltf.animations; // Store animations
// ... after loading the gltf
if (gltf.animations) {
    walkAnimationIndex = gltf.animations.findIndex(anim => anim.name === 'walk'); // Replace 'walk' with the actual name of the walk animation
}

// Create an animation mixer for the anya model
    anyaMixer = new THREE.AnimationMixer(anya);

    // Assuming the first animation is the one you want to play
    if (gltf.animations && gltf.animations.length > 0) {
        anyaAction = anyaMixer.clipAction(gltf.animations[0]);
        anyaAction.play();
    } else {
        console.error('No animations found in AnyaR.glb');
    }

// Perform any additional setup for the city model here
});

loader.load('https://luminafields.com/FelixGLB.glb', function (gltf) {
felix = gltf.scene;
scene.add(felix);
felix.scale.set(.5, .5, .4); // Adjust the 100 factor as needed
felix.position.x += 1.1;
felix.position.z += 0.5;
felix.position.y = -0.7;
felix.rotation.y = 225;

// Create an animation mixer for the felix model
    felixMixer = new THREE.AnimationMixer(felix);

    // Assuming the first animation is the one you want to play
    if (gltf.animations && gltf.animations.length > 0) {
        felixAction = felixMixer.clipAction(gltf.animations[0]);
        felixAction.play();
    } else {
        console.error('No animations found in felixGLB.glb');
    }

// Perform any additional setup for the city model here
});

loader.load('https://luminafields.com/CrycellaFinal.glb', function (gltf) {
crycella = gltf.scene;
scene.add(crycella);
crycella.scale.set(.9, .9, .9); // Adjust the 100 factor as needed
crycella.position.x += 0.8;
crycella.position.y = -0.7;
crycella.rotation.y = 125;

// Create an animation mixer for the crycella model
    crycellaMixer = new THREE.AnimationMixer(crycella);

    // Assuming the first animation is the one you want to play
    if (gltf.animations && gltf.animations.length > 0) {
        crycellaAction = crycellaMixer.clipAction(gltf.animations[0]);
        crycellaAction.play();
    } else {
        console.error('No animations found in CrycellaFinal.glb');
    }

// Perform any additional setup for the city model here
});

loader.load('https://luminafields.com/knife.glb', function (gltf) {
  isKnifeLoaded = true;
knife = gltf.scene;
scene.add(knife);
knife.scale.set(.02, .02, .02); // Adjust the 100 factor as needed
knife.position.x += -1.2;
knife.position.z += 0.9;
knife.position.y = -0.7;

// Perform any additional setup for the city model here
});

loader.load('https://luminafields.com/computers.glb', function (gltf) {
computers = gltf.scene;
computers.scale.set(5, 5, 5); // Adjust the 100 factor as needed
scene.add(computers);
computers.position.x += -1.2;
computers.position.y -= .1;
computers.position.z -= .5;
// Perform any additional setup for the city model here
});

loader.load('https://luminafields.com/dragon2.glb', function (gltf) {
    dragon_boss = gltf.scene;
    scene.add(dragon_boss);
    dragon_boss.scale.set(8, 8, 8);
    dragon_boss.position.y += 5.2;
    dragon_boss.position.z += -30.2;

    mixer2 = new THREE.AnimationMixer(dragon_boss);
    const dragonAnimations = gltf.animations;

    if (dragonAnimations && dragonAnimations.length > 0) {
        action2 = mixer2.clipAction(dragonAnimations[0]);
        action2.timeScale = animationSpeed; // Set the animation speed to half
        action2.play();
    } else {
        console.error('No animations found in dragon2.glb');
    }
});





// Handle dragon boss animation selector changes
const dragonBossDropdown = document.getElementById('dragon-boss-animation-selector');
dragonBossDropdown.addEventListener('change', function() {
    const selectedValue = parseInt(this.value);
    changeDragonBossAnimation(selectedValue);
});


function changeDragonBossAnimation(animationIndex) {
if (dragon_bossMixer && animations[animationIndex]) {
    const action = dragon_bossMixer.clipAction(animations[animationIndex]);
    action.reset();
    action.play();
}
}


  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById("app").appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  dropdown.addEventListener('change', function() {
    let selectedValue = parseInt(this.value);
    changeAnimation(selectedValue);
  });
}

function changeAnimation(animationIndex) {
  if (mixer && animations[animationIndex]) {
    action.stop();
    currentAnimationIndex = animationIndex;
    action = mixer.clipAction(animations[currentAnimationIndex]);
    action.setLoop(THREE.LoopRepeat);
    action.play();
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
  }


  // Helper function to convert screen coordinates to world coordinates
  function screenToWorld(x, y, camera) {
      let vec = new THREE.Vector3(
          (x / window.innerWidth) * 2 - 1,
          - (y / window.innerHeight) * 2 + 1,
          0.5 ); // z position for the vector
      vec.unproject(camera);
      let dir = vec.sub(camera.position).normalize();
      let distance = - camera.position.z / dir.z;
      let pos = camera.position.clone().add(dir.multiplyScalar(distance));
      return pos;
  }


  function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;

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
          // Update Anya's target position to the intersection point
          moveAnyaToPosition(target);
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
    }
}

function drag(e) {
    e.preventDefault();
    if (e.touches.length == 1) { // Only deal with one finger
        var touch = e.touches[0]; // Get the information for finger #1
        pos1 = pos3 - touch.pageX;
        pos2 = pos4 - touch.pageY;
        pos3 = touch.pageX;
        pos4 = touch.pageY;
        // Move your element
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
}

function dragEnd(e) {
    e.preventDefault();
    // Stop moving when finger is removed
}


function onDocumentMouseMove(event) {
    if (!isSnowmanMoving) return;

    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Create a raycaster
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);

    // Define a horizontal plane at the snowman's height
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -snowman.position.y);

    // Find where the ray intersects the plane
    const target = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, target);

    if (target) {
        // Move snowman to the intersection point
        snowman.position.x = target.x;
        snowman.position.z = target.z;
    }
}



function onDocumentMouseDown(event) {
    // Check if the dropdown or its children are clicked
    if (event.target.closest('#dropdown-container')) {
        // Click is inside dropdown, do not proceed with dragging logic
        return;
    }

    // Calculate mouse position in normalized device coordinates
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Set up a raycaster
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // Check if the snowman is intersected by the ray
    const intersects = raycaster.intersectObject(snowman, true);

    if (intersects.length > 0) {
        // The snowman was clicked
        isSnowmanMoving = true;
        controls.enabled = false;
        event.preventDefault(); // Prevent default only if snowman is clicked
    }
}





function onDocumentMouseUp(event) {
    isSnowmanMoving = false;
    controls.enabled = true;
}

document.addEventListener('mouseup', onDocumentMouseUp, false);










})();
