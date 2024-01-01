// Global variables
let scene, camera, renderer, controls;
let model, crycella, felix, mixer, anyaMixer, anyaAction, action2, action;
let city, computers, newAction, delta, distanceArch;
let felixMixer, animationIndex, animationIndex2, crycellaMixer, crycellaAction;
let clock = new THREE.Clock();
let animations, crycellaAnimations, felixAction, currentAnimation = 0;
let spine, neck, powercap, anya, knife, knifePosition;
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
let anyaAnimations;
let isAnyaLoaded = false;
let isKnifeLoaded = false;
let walkAnimationIndex; // The index of the walk animation in the gltf.animations array
let moveDestination = new THREE.Vector3();
let isAnyaMoving = false;
let animationDuration2 = 3; // Default duration
let isWalking = false;






gsap.ticker.add(render);

document.addEventListener('DOMContentLoaded', (event) => {
  init();

  dropdown.addEventListener('change', function() {
    let selectedValue = parseInt(this.value);
    changeAnimation(selectedValue);
  });
});







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
            periodicUpdate2();
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
            if (potionAmountNum < 2){
              potionAmountNum += 1;
            }
            crycellaMessage();
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
