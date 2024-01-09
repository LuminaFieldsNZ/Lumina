

let randomDestination = null;

function generateRandomDestination() {
    // Define the boundaries of the area in which the dragon can move
    const minX = -20; // adjust these values according to your scene
    const maxX = 20;
    const minZ = -20;
    const maxZ = 20;

    const x = Math.random() * (maxX - minX) + minX;
    const z = Math.random() * (maxZ - minZ) + minZ;

    return new THREE.Vector3(x, dragon_boss.position.y, z); // assuming y is constant
}

function updateDragonBehavior() {
    if (!dragon_boss) {
        return;
    }

    // Generate a random destination if not already set or if the dragon has reached its destination
    if (!randomDestination || dragon_boss.position.distanceTo(randomDestination) < 1) {
        randomDestination = generateRandomDestination();
        if (dragon_boss.isMoving) {
            action2.stop();
            action2 = mixer2.clipAction(dragonAnimations[2]); // Idle animation
            action2.play();
            dragon_boss.isMoving = false;
        }
    } else {
        // Move dragon boss towards the random destination
        movedragon_bossTowardsDestination(randomDestination);
    }
}

function movedragon_bossTowardsDestination(destination) {
    const dragon_bossSpeed = 0.08; // Adjust speed as necessary
    const directionToDestination = destination.clone().sub(dragon_boss.position).normalize();
    const dragon_bossMovement = directionToDestination.multiplyScalar(dragon_bossSpeed);
    dragon_boss.position.add(dragon_bossMovement);
    dragon_boss.lookAt(destination);

    if (!dragon_boss.isMoving) {
        action2.stop();
        action2 = mixer2.clipAction(dragonAnimations[3]); // Walking animation
        action2.play();
        dragon_boss.isMoving = true;
    }
}



function checkCollision2() {
    
    distanceBoss2 = dragon_boss.position.distanceTo(anyaPosition);

    // Adjust these thresholds based on the actual scale of your game objects and world
    const collisionThresholdClose = 1.25;

    if (distanceBoss2 < collisionThresholdClose) {
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

                const currentTime = Date.now();

// Deduct hitpoints if enough time has passed
if (currentTime - lastHitTime > 250) {
    hitpoints -= 2;
    lastHitTime = currentTime; // Update the last hit time
}
            questStatus.quest2 = true;
            alert('quest complete, go back to Micheal');
        }
    }
}


