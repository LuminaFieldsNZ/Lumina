// Global variables
let scene, camera, renderer, controls;
let model, crycella, felix, mixer, anyaMixer, anyaAction, action2, action;
let city, computers, newAction, delta;
let felixMixer, animationIndex, animationIndex2, crycellaMixer, crycellaAction;
let clock = new THREE.Clock();
let animations, crycellaAnimations, felixAction, currentAnimation = 0;
let spine, neck, anya, knife, knifePosition;
let targetRotation = new THREE.Vector3();
let dropdown = document.getElementById('animation-selector');
let lastRestartTime = 0;
const closeCollisionThreshold = 0.96;
const farCollisionThreshold = 4.86;
let currentTime = Date.now();
const crycellaFixedPosition = new THREE.Vector3(0.8, 0, 5);
const crycellaFixedRotationY = 160;
let markers = []; // Array to store green dot markers
let felixIsRunning = false;

gsap.ticker.add(render);

document.addEventListener('DOMContentLoaded', (event) => {
  init();

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
let animationDuration2 = 3; // Default duration
let isWalking = false;



function checkCollision(object1, object2, threshold) {
    if (!object1 || !object2) {
        return false;
    }

    const position1 = new THREE.Vector3();
    const position2 = new THREE.Vector3();
    object1.getWorldPosition(position1);
    object2.getWorldPosition(position2);
    const distance = position1.distanceTo(position2);

    return distance < threshold;
}


function updateHeadTracking() {

  if (!anya || !felix || !crycella) {
       return; // Exit if any models are undefined
   }
    // Anya's world position
    const anyaWorldPos = new THREE.Vector3();
    anya.getWorldPosition(anyaWorldPos);

    // Update tracking for each character
    updateCharacterTracking(model, anyaWorldPos, new THREE.Vector3(0, 0, 1)); // Assuming model faces along positive Z-axis initially
    updateCharacterTracking(felix, anyaWorldPos, new THREE.Vector3(0, 0, -.25)); // Adjust initial facing direction if different
    updateCharacterTracking(crycella, anyaWorldPos, new THREE.Vector3(0, 0, -1)); // Adjust initial facing direction if different
}

function updateCharacterTracking(character, targetPosition, initialFacingDirection) {
    if (!character) {
        return;
    }

    // Getting spine and neck bones
    const spine = character.getObjectByName('Spine');
    const neck = character.getObjectByName('Neck');

    if (!spine || !neck) {
        return;
    }

    // Calculate direction to target from character's head
    const headWorldPos = new THREE.Vector3();
    neck.getWorldPosition(headWorldPos);
    const directionToTarget = targetPosition.clone().sub(headWorldPos).normalize();

    // Adjust for initial facing direction
    const adjustedDirectionToTarget = directionToTarget.clone().applyQuaternion(
        new THREE.Quaternion().setFromUnitVectors(initialFacingDirection, new THREE.Vector3(0, 0, 1))
    );

    // Determine rotations based on adjusted direction
    const targetYRotation = Math.atan2(adjustedDirectionToTarget.x, adjustedDirectionToTarget.z);
    const targetXRotation = -Math.asin(adjustedDirectionToTarget.y);

    // Apply rotation with smoothing
    spine.rotation.y += 0.3 * (targetYRotation - spine.rotation.y);
    neck.rotation.y += 0.3 * (targetYRotation - neck.rotation.y);
    spine.rotation.x += 0.3 * (targetXRotation - spine.rotation.x);
    neck.rotation.x += 0.3 * (targetXRotation - neck.rotation.x);
}



function resetAnimation() {
    // Stop the current animation and reset to the idle animation
    action.stop();
    action = mixer.clipAction(animations[0]);
    action.setLoop(THREE.LoopRepeat);
    action.play();
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
    if (!isAnyaLoaded || !anya || !anya.position || isNaN(anya.position.x) || anya.position.x === Infinity) {
        console.error('Invalid or undefined position detected, resetting Anya');
        if (anya && anya.position) {
            anya.position.set(0, 0, 0);
        }
        return;
    }

    let direction = moveDestination.clone().sub(anya.position).normalize();
    let speed = 0.06; // or whatever your speed value is
    let movement = direction.multiplyScalar(speed);

    // Log direction, speed, and movement values
    console.log(`Direction: ${direction.x}, ${direction.y}, ${direction.z}, Speed: ${speed}`);

    let distance = anya.position.distanceTo(moveDestination);

    if (distance < 0.001 || distance === Infinity || isMovingAwayFromDestination(anya.position, moveDestination, movement)) {
        isAnyaMoving = false;
        switchToAnimation(0); // Switch back to idle animation
        return;
    }

    anya.position.add(movement);

    // After updating the position
    console.log(`Updated Anya position: x=${anya.position.x}, y=${anya.position.y}, z=${anya.position.z}`);

    // Make Anya face the destination
    anya.lookAt(moveDestination);
}


function isMovingAwayFromDestination(currentPosition, destination, movement) {
    let nextPosition = currentPosition.clone().add(movement);
    return nextPosition.distanceTo(destination) > currentPosition.distanceTo(destination);
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
   anyaAction = anyaMixer.clipAction(anyaAnimations[5]);
   anyaAction.setLoop(THREE.LoopRepeat);
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






function updateFelixBehavior() {
    if (markers.length === 0) {
        // If there are no markers, make sure Felix is in the idle state
        if (felixIsRunning) {
            felixIsRunning = false;
            switchToFelixAnimation(0); // Switch to idle animation
        }
        return;
    }

    let closestMarker = null;
    let closestDistance = Infinity;

    // Find the closest marker to Felix
    markers.forEach((marker) => {
        const distance = getDistance(felix, marker);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestMarker = marker;
        }
    });

    // Check if Felix is close enough to the marker
    if (closestDistance < 0.5) { // Adjust the threshold as needed
        // Remove the reached marker
        scene.remove(closestMarker);
        markers = markers.filter(marker => marker !== closestMarker);

        // If there are no more markers, set Felix to idle
        if (markers.length === 0) {
            felixIsRunning = false;
            switchToFelixAnimation(0); // Switch to idle animation
        }
    } else {
        // Move Felix towards the closest marker
        moveFelixTowardsMarker(closestMarker);
    }
}

function moveFelixTowardsMarker(marker) {
    const felixSpeed = 0.02; // Adjust speed as necessary
    const directionToFelix = marker.position.clone().sub(felix.position).normalize();
    const felixMovement = directionToFelix.multiplyScalar(felixSpeed);
    felix.position.add(felixMovement);
    felix.lookAt(marker.position);

    // Check if Felix is already running, if not, trigger running animation
    if (!felixIsRunning) {
        felixIsRunning = true;
        switchToFelixAnimation(2); // Assuming animation index 1 is running
    }
}


function switchToFelixAnimation(animationIndex) {
    if (!felixMixer || !felixAnimations || felixAnimations.length <= animationIndex) {
        console.error('Felix mixer, animations not defined, or animation index out of range.');
        return;
    }

    if (felixAction) {
        felixAction.stop();
    }

    felixAction = felixMixer.clipAction(felixAnimations[animationIndex]);
    felixAction.play();
}



function triggerAnimation() {
    // Switch to the desired animation (assumed to be index 2)
    switchToFelixAnimation(1);

    // Set a timeout to switch back to idle animation (assumed to be index 1)
    setTimeout(() => {
        switchToFelixAnimation(2); // Switch back to idle animation
    }, 3000); // Assuming animation[2] takes less than 4 seconds to complete
}




function checkCollision() {
    if (!anya || !knife) {
        // If anya or knife are not yet loaded, exit the function
        return;
    }

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
      chatWindow.innerHTML += '<p>Knife:<br><font style="color: lightgreen;">[ATK]</font> Will increase attack by 5<br><font style="color: lightgreen;">[DEF]</font> Will increase defense by 1<br><font style="color: lightblue;">[MP]</font> Will increase mana by 0<br><font style="color: lightblue;">[HP]</font> Will increase health by 0</p>';
        chatWindow.innerHTML += 'Search for Knife to examine';
      scrollToBottom();
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

let lastAlertTime = 0;

function getDistance(object1, object2) {
    if (!object1 || !object2) return Infinity;

    const position1 = new THREE.Vector3();
    const position2 = new THREE.Vector3();

    object1.getWorldPosition(position1);
    object2.getWorldPosition(position2);

    return position1.distanceTo(position2);
}







let isInCloseRangeMainModel = false;
let isInFarRangeMainModel = false;
let isInCloseRangeCrycella = false;
let isInFarRangeCrycella = false;

function checkDistanceAndTriggerActions() {
    const distanceToMainModel = getDistance(anya, model);
    const distanceToCrycella = getDistance(anya, crycella);

    // Collision logic for the main model
    if (distanceToMainModel < closeCollisionThreshold) {
        if (!isInCloseRangeMainModel) {
            isInCloseRangeMainModel = true;
            changeAnimation(4); // Close collision animation
            isInFarRangeMainModel = false; // Reset far collision state
        }
    } else if (distanceToMainModel < farCollisionThreshold) {
        if (!isInFarRangeMainModel && !isInCloseRangeMainModel) {
            isInFarRangeMainModel = true;
            changeAnimation(6); // Far collision animation
        }
    } else {
        if (isInCloseRangeMainModel || isInFarRangeMainModel) {
            isInCloseRangeMainModel = false;
            isInFarRangeMainModel = false;
            changeAnimation(0); // No collision animation
        }
    }

    // Collision logic for Crycella
    if (distanceToCrycella < closeCollisionThreshold) {
        if (!isInCloseRangeCrycella) {
            isInCloseRangeCrycella = true;
            changeCrycellaAnimation(4); // Close collision animation for Crycella
            isInFarRangeCrycella = false; // Reset far collision state
        }
    } else if (distanceToCrycella < farCollisionThreshold) {
        if (!isInFarRangeCrycella && !isInCloseRangeCrycella) {
            isInFarRangeCrycella = true;
            changeCrycellaAnimation(6); // Far collision animation for Crycella
        }
    } else {
        if (isInCloseRangeCrycella || isInFarRangeCrycella) {
            isInCloseRangeCrycella = false;
            isInFarRangeCrycella = false;
            changeCrycellaAnimation(0); // No collision animation for Crycella
        }
    }
}










function render() {

      currentTime = Date.now(); // Update current time
      delta = clock.getDelta();
      if (anya) {
              anya.getWorldPosition(anyaPosition);
     // Make the camera always look at Anya           camera.lookAt(anyaPosition);
          }
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

    if (crycella) {
       crycella.position.set(crycellaFixedPosition.x, crycellaFixedPosition.y, crycellaFixedPosition.z);
       crycella.rotation.y = THREE.Math.degToRad(crycellaFixedRotationY);

   }
    checkDistanceAndTriggerActions();

    // Update head tracking
    updateHeadTracking();
 checkCollision();

 if (isAnyaMoving) {
     updateAnyaMovement();
 }

updateFelixBehavior();
updateDragonBehavior();


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
