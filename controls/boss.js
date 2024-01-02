let dragon_boss, dragon_bossMixer, mixer2, dragonFlight, dragonAnimations;
let hitpoints = 100; // Initial hitpoints
let loader = new THREE.GLTFLoader();
const anyaPosition = new THREE.Vector3();




loader.load('https://luminafields.com/red.glb', function (gltf) {
    dragon_boss = gltf.scene;
    scene.add(dragon_boss);
    dragon_boss.scale.set(3, 3, 3);
    dragon_boss.position.z += -36.2;

    mixer2 = new THREE.AnimationMixer(dragon_boss);
    dragonAnimations = gltf.animations;

    if (dragonAnimations) {
        action2 = mixer2.clipAction(dragonAnimations[2]);
        action2.play();
    } else {
        console.error('No animations found in red.glb');
    }
});


function updateDragonBehavior() {
    if (markers.length === 0) {
        // If there are no markers, make sure dragon_boss is in the idle state
        if (dragonFlight) {
            dragonFlight = false;
        }
        return;
    }

    let closestMarker = null;
    let closestDistance = Infinity;

    // Find the closest marker to dragon_boss
    markers.forEach((marker) => {
        const distance = getDistance(dragon_boss, marker);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestMarker = marker;
        }
    });

    // Check if dragon_boss is close enough to the marker
    if (closestDistance < 0.5) { // Adjust the threshold as needed
        // Remove the reached marker
        scene.remove(closestMarker);
        markers = markers.filter(marker => marker !== closestMarker);

    } else {

      document.getElementById('hitPoints').innerHTML = hitpoints;
        // Move dragon_boss towards the closest marker
        movedragon_bossTowardsMarker(closestMarker);
    }
}

function movedragon_bossTowardsMarker(marker) {
    const dragon_bossSpeed = 0.04; // Adjust speed as necessary
    const movementThreshold = 2; // Threshold to determine if dragon is moving or idle

    // Calculate direction to the marker
    const directionToMarker = marker.position.clone().sub(dragon_boss.position);
    const distanceToMarker = directionToMarker.length();

    if (distanceToMarker > movementThreshold) {
        // Dragon is moving towards the marker
        const normalizedDirection = directionToMarker.normalize();
        const dragon_bossMovement = normalizedDirection.multiplyScalar(dragon_bossSpeed);
        dragon_boss.position.add(dragon_bossMovement);
        dragon_boss.lookAt(marker.position);

        if (!dragon_boss.isMoving) {
            // Switch to walking animation if not already moving
            action2.stop();
            action2 = mixer2.clipAction(dragonAnimations[3]); // Replace with the index of walking animation
            action2.play();
            dragon_boss.isMoving = true;
        }
    } else if (dragon_boss.isMoving) {
        // Dragon has reached the marker or is very close
        // Switch to idle animation if currently moving
        action2.stop();
        action2 = mixer2.clipAction(dragonAnimations[2]); // Replace with the index of idle animation
        action2.play();
        dragon_boss.isMoving = false;

        // Optionally, handle the last marker reached scenario
        // e.g., remove the marker, disable it, or take other appropriate action
    }
}





function checkCollision2() {
    const distance = dragon_boss.position.distanceTo(anyaPosition);

    // Adjust these thresholds based on the actual scale of your game objects and world
    const collisionThresholdClose = 2;

    if (distance < collisionThresholdClose) {
        if (!isAnyaMoving){
            anyaAction.stop();
            anyaAction = anyaMixer.clipAction(anyaAnimations[6]); // Assuming this is Anya's defensive animation
            anyaAction.setLoop(THREE.LoopOnce);
            anyaAction.play();

            // Play dragon's attack animation once
            action2.stop();
            action2 = mixer2.clipAction(dragonAnimations[4]); // Assuming this is the dragon's attack animation
            action2.setLoop(THREE.LoopOnce);
            action2.play();

            // Deduct hitpoints after 3 seconds
            setTimeout(() => {
                hitpoints -= 20;
                // Additional logic (if any) to execute after hitpoints are deducted
            }, 5000);

            questStatus.quest2 = true;
        }
    }

    if (hitpoints <= 0) {
        alert("Game Over");
        window.location.reload();
    }
}





setInterval(checkCollision2, 1000); // Check collision every second

function render() {
    // Call updateDragonBehavior and other render logic
    requestAnimationFrame(render);
}

render(); // Start the render loop
