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
  // Enhanced logging
  console.log(`Anya ready state: ${isAnyaLoaded}, Anya object: ${anya}, Anya position: ${anya?.position}`);

  if (!isAnyaLoaded || !anya || !anya.position || isNaN(anya.position.x) || anya.position.x === Infinity) {
      console.error('Invalid or undefined position detected, resetting Anya');
      if (anya && anya.position) {
        anya.position.set(0, 0, 0);
      }
      return;
  }

  let distance = anya.position.distanceTo(moveDestination);
  console.log(`Distance to destination: ${distance}, Move destination: X: ${moveDestination.x}, Y: ${moveDestination.y}, Z: ${moveDestination.z}`);

  if (distance < 0.1 || distance === Infinity) {
      isAnyaMoving = false;
      // Reset animation if needed...
      return;
  }

  let step = Math.min(distance / (1 * animationDuration2), 0.05);
  anya.position.lerp(moveDestination, step);
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
    const collisionThreshold = .56; // Set your collision threshold

    if (distance < collisionThreshold) {
      attachKnifeToAnya();
        // Collision detected
        console.log('Collision detected between anya and knife');
    }
}


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

       console.log('Anya position before move:', anya.position);
      // ... movement logic ...
        mixer.update(delta);
        console.log('Anya position after move:', anya.position);

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


        // Apply rotations to spine and neck
        spine.rotation.y += 0.4 * (targetRotation.y - spine.rotation.y);
        neck.rotation.y += 0.3 * (targetRotation.y - neck.rotation.y);
        spine.rotation.x += 0.4 * (targetRotation.x - spine.rotation.x);
        neck.rotation.x += 0.4 * (targetRotation.x - neck.rotation.x);
    }

 checkCollision();

 // Update Anya's movement
     updateAnyaMovement();

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


  // Ambient Light
     let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
     scene.add(ambientLight);

     // Directional Light
     let directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
     directionalLight.position.set(50, 100, 50); // Adjust position as needed
     scene.add(directionalLight);

     // Adjust camera far plane
     camera.far = 10000; // Set this according to the size of your scene
     camera.updateProjectionMatrix();

     // Adjust Spotlight
     let spotlight = new THREE.SpotLight(0xffffff, 1, 10000, Math.PI / 4, 0.5, 2);
     spotlight.position.set(0, 100, 0); // Adjust position as needed
     let spotlightTarget = new THREE.Object3D();
     spotlightTarget.position.set(0, 0, 0); // Set target position
     scene.add(spotlightTarget);
     spotlight.target = spotlightTarget;
     scene.add(spotlight);

     // Grid Helper
     const gridSize = 500;
     const gridDivisions = 520;
     const gridHelper = new THREE.GridHelper(gridSize, gridDivisions);
     scene.add(gridHelper);

     // Create and add the plane to the scene for raycasting
     let planeGeometry = new THREE.PlaneGeometry(500, 500); // Adjust size as needed
     let planeMaterial = new THREE.MeshBasicMaterial({
         color: 0x00ff00,
         side: THREE.DoubleSide,
         transparent: true,
         opacity: 0.5
     });     let planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
     planeMesh.rotation.x = -Math.PI / 2; // Rotate to horizontal
     planeMesh.position.set(0, 0, 0); // Adjust position as needed
     planeMesh.visible = true; // Make the plane visible for debugging
     scene.add(planeMesh);

     // Define a mathematical plane for raycasting
     plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0); // Plane at y = 0

  let loader = new THREE.GLTFLoader();
  loader.load('https://luminafields.com/micheal3.glb', function (gltf) {
    model = gltf.scene;
    scene.add(model);
    model.position.x += 3.6;
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
  city.scale.set(0, 0, 0); // Adjust the 100 factor as needed
  scene.add(city);
  city.position.y += 0.2;
  // Perform any additional setup for the city model here
});


loader.load('https://luminafields.com/AnyaR.glb', function (gltf) {
anya = gltf.scene;
scene.add(anya);
anya.scale.set(.8, .8, .8); // Adjust the 100 factor as needed
anya.position.x += -0.6;
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

 isAnyaLoaded = true;
// Perform any additional setup for the city model here
});

loader.load('https://luminafields.com/FelixGLB.glb', function (gltf) {
felix = gltf.scene;
scene.add(felix);
felix.scale.set(.5, .5, .4); // Adjust the 100 factor as needed
felix.position.x += 1.1;
felix.position.z += 0.5;
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
knife.position.x += -6.2;
knife.position.z += 0.9;

// Perform any additional setup for the city model here
});

loader.load('https://luminafields.com/computers.glb', function (gltf) {
computers = gltf.scene;
computers.scale.set(5, 5, 5); // Adjust the 100 factor as needed
scene.add(computers);
computers.position.x += -1.2;
computers.position.y -= -0.6;
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





loader.load('https://luminafields.com/tree.glb', function (gltf) {
    let tree = gltf.scene;
    tree.scale.set(9, 9, 9);
    tree.position.set(-10.2, -2.15, 0);
    tree.position.y -= -4.25;

    let light = new THREE.PointLight(0xffffff, 10, 100000); // Adjust color, intensity, and distance
    light.position.set(0, 5, 0); // Adjust light position relative to the tree
    tree.add(light);

    scene.add(tree);
});

function addRandomTrees(numberOfTrees) {
    const treeGridSize = 35; // Size of the grid
    const halfGridSize = treeGridSize / 2;
    const groundLevelY = 2; // Set this to the elevation where the ground is

    for (let i = 0; i < numberOfTrees; i++) {
        loader.load('https://luminafields.com/tree.glb', function (gltf) {
            let tree = gltf.scene;
            tree.scale.set(9, 9, 9);

            // Random position within the 30x30 grid
            let x = Math.random() * treeGridSize - halfGridSize; // Random X within [-15, 15]
            let z = Math.random() * treeGridSize - halfGridSize; // Random Z within [-15, 15]
            let y = groundLevelY; // Elevation at ground level

            tree.position.set(x, y, z);

            let light = new THREE.PointLight(0xffffff, 1, 100); // Adjust as needed
            light.position.set(0, 5, 0); // Position the light above the tree
            tree.add(light);

            scene.add(tree);
        });
    }
}


addRandomTrees(9);




loader.load('https://luminafields.com/building1.glb', function (gltf) {
building1 = gltf.scene;
building1.scale.set(12, 12, 12); // Adjust the 100 factor as needed
scene.add(building1);
building1.position.x += 5.2;
building1.position.z -= .5;
building1.position.y -= -4.7;
building1.rotation.y = 825;

// Perform any additional setup for the city model here
});

loader.load('https://luminafields.com/hobbitmountain.glb', function (gltf) {
hobbitmountain = gltf.scene;
hobbitmountain.scale.set(25, 25, 25); // Adjust the 100 factor as needed
scene.add(hobbitmountain);
hobbitmountain.position.x += -11.2;
hobbitmountain.position.z -= 25.5;
hobbitmountain.position.y -= -7.5;

// Perform any additional setup for the city model here
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







// Function to create a green dot marker
function createGreenDotMarker(position) {
    const geometry = new THREE.SphereGeometry(0.08, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const dot = new THREE.Mesh(geometry, material);
    dot.position.copy(position);
    scene.add(dot);
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

  // Touch event handlers specifically for the drag-handle
handle.addEventListener('touchstart', handleTouchStart, false);
handle.addEventListener('touchmove', handleTouchMove, false);
handle.addEventListener('touchend', handleTouchEnd, false);

function handleTouchStart(e) {
    e.preventDefault();
    if (e.touches.length == 1) {
        var touch = e.touches[0];
        pos3 = touch.pageX;
        pos4 = touch.pageY;
    }
}

function handleTouchMove(e) {
    e.preventDefault();
    if (e.touches.length == 1) {
        var touch = e.touches[0];
        var newPos1 = pos3 - touch.pageX;
        var newPos2 = pos4 - touch.pageY;
        pos3 = touch.pageX;
        pos4 = touch.pageY;

        // Move the drag-handle
        handle.style.top = (handle.offsetTop - newPos2) + "px";
        handle.style.left = (handle.offsetLeft - newPos1) + "px";

        // Update Anya's position based on the drag-handle's new position
        updateAnyaPosition(touch.pageX, touch.pageY);
    }
}

function handleTouchEnd(e) {
    e.preventDefault();
    // Code for handling the end of the touch event
    // Optionally, you can update Anya's final position here
}

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.ontouchend = function(event) { closeDragElement(event.changedTouches[0]) };
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

  function updateAnyaPosition(screenX, screenY) {
      let worldPosition = screenToWorld(screenX, screenY, camera, plane);
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
    }
}

function drag(e) {
    e.preventDefault();
    if (e.touches.length == 1) {
        var touch = e.touches[0];
        updateAnyaPosition(touch.pageX, touch.pageY);
    }
}

function dragEnd(e) {
    e.preventDefault();

    // Calculate the screen position of the center of the draggable element
    let rect = elmnt.getBoundingClientRect();
    let screenX = rect.left + rect.width / 2;
    let screenY = rect.top + rect.height / 2;

    // Get the 3D position corresponding to the screen position
    let worldPosition = screenToWorld(screenX, screenY, camera, plane);

    // Create and place the green dot marker at the 3D position
    if (worldPosition) {
        createGreenDotMarker(worldPosition);
    }

    // Additional code for ending drag, if any...
}





})();
