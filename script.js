// Global variables
let scene, camera, renderer, controls, potion, gateway, anyaHand;
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
let knifeCount = 0;

let dragon_boss1, mixer3, dragonAnimations1;
let loaderBoss2 = new THREE.GLTFLoader();
let dragon_bossSpeed1 = 0.025;
let currentDragonState = "idle";

const DragonState = {
    IDLE: 'idle',
    CHASING: 'chasing',
    COLLIDING: 'colliding'
};

let dragon_boss, dragon_bossMixer, mixer2, dragonAnimations;
let hitpoints = 100; // Initial hitpoints
let loader = new THREE.GLTFLoader();
const anyaPosition = new THREE.Vector3();
let distanceBoss;



loader.load('https://luminafields.com/red.glb', function (gltf) {
    dragon_boss = gltf.scene;
    scene.add(dragon_boss);
    dragon_boss.scale.set(1.2, 1.2, 1.2);
    dragon_boss.position.z += -6.2;
    dragon_boss.position.x += 6.2;

    mixer2 = new THREE.AnimationMixer(dragon_boss);
    dragonAnimations = gltf.animations;

    if (dragonAnimations) {
        action2 = mixer2.clipAction(dragonAnimations[2]);
        action2.play();
    } else {
        console.error('No animations found in red.glb');
    }
});


loaderBoss2.load('https://luminafields.com/monster2.glb', function (gltf) {
    dragon_boss1 = gltf.scene;
    scene.add(dragon_boss1);
    dragon_boss1.scale.set(1, 1, 1);
    dragon_boss1.position.z += 9.2;

    mixer3 = new THREE.AnimationMixer(dragon_boss1);
    dragonAnimations1 = gltf.animations;
    action3 = mixer3.clipAction(dragonAnimations1[1]);
    action3.play();

});




gsap.ticker.add(render);

document.addEventListener('DOMContentLoaded', (event) => {
  init();

  dropdown.addEventListener('change', function() {
    let selectedValue = parseInt(this.value);

    if (anyaMixer) {
        anyaAction.stop();
        anyaAction = anyaMixer.clipAction(anyaAnimations[selectedValue]);
        anyaAction.play();
    }

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
    updateCharacterTracking(felix, anyaWorldPos, new THREE.Vector3(0, 0, 0)); // Adjust initial facing direction if different
    updateCharacterTracking(crycella, anyaWorldPos, new THREE.Vector3(0, 0, 0)); // Adjust initial facing direction if different
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
            changeCrycellaAnimation(5); // Close collision animation for Crycella
            if (potionAmountNum < 2){
              potionAmountNum = 1;
            }
            crycellaMessage();
            crycellaMessage2();
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







function updateScene() {
  countEmojisAndUpdate();
  countEmotionKeywordsAndUpdate();
  countKeywordsForNationsAndUpdate();
  updateFelixBehavior();
  updateStats();
  checkDistanceAndTriggerActions();
  updateHeadTracking();
  checkCollision();
  updateDragonBehavior();
  updateDragonBehavior1();
  checkCollision2();
  checkCollision3(); // Check for collisions if not chasing
  handleDragonState(); // Handle the current state of the dragon


  if (hitpoints <= 0) {
    alert("Game Over");
    window.location.reload();
}
}


function render() {
    currentTime = Date.now(); // Update current time
    delta = clock.getDelta();

    // Update positions
    if (anya) {
        anya.getWorldPosition(anyaPosition);
    }

    // Update all mixers
    [mixer, anyaMixer, felixMixer, crycellaMixer, mixer2, mixer3].forEach(m => {
        if (m) m.update(delta);
    });

    // Scene updates
    updateScene();

    // Additional behavior updates
    if (isAnyaMoving) updateAnyaMovement();

    // Finally, render the scene
    renderer.render(scene, camera);
}
