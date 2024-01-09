let closestMarker1 = null;
let closestDistance1 = Infinity;

function transitionToState(newState) {
    if (currentDragonState !== newState) {
        // Stop any ongoing animation before transitioning to a new state
        if (action3) {
            action3.stop();
        }

        currentDragonState = newState;
        switch (newState) {
            case DragonState.IDLE:
                handleIdleState();
                break;
            case DragonState.CHASING:
                handleChasingState();
                break;
            case DragonState.COLLIDING:
                handleCollisionState();
                break;
            // ... other states as needed ...
        }
    }
}

function handleDragonState() {
    // This function is now streamlined as transitionToState already handles state changes
    switch (currentDragonState) {
        case DragonState.CHASING:
            if (markers.length > 0) {
                updateDragonBehavior1();
            }
            break;
        case DragonState.COLLIDING:
            handleCollisionState();
            break;
        // Other states as needed...
    }
}

function handleIdleState() {
    playDragonAnimation(1); // Assuming animation index 1 is idle
}

function handleChasingState() {
    playDragonAnimation(2); // Assuming animation index 2 is chasing
}

function playDragonAnimation(animationIndex) {
    if (dragonAnimations1) {
        action3 = mixer3.clipAction(dragonAnimations1[animationIndex]);
        action3.setLoop(THREE.LoopRepeat);
        action3.play();
    } else {
        console.error('No animations found in monster2.glb');
    }
}



function updateDragonBehavior1() {
    if (markers.length === 0) {
        transitionToState(DragonState.IDLE);
        return;
    }

    closestMarker1 = null;
    closestDistance1 = Infinity;

    markers.forEach((marker) => {
        const distance = getDistance(dragon_boss1, marker);
        if (distance < closestDistance1) {
            closestDistance1 = distance;
            closestMarker1 = marker;
        }
    });

    if (closestMarker1) {
        if (closestDistance1 < 1.75) {
            handleMarkerInteraction(closestMarker1);
        } else {
            movedragon_bossTowardsMarker1(closestMarker1);
        }
    }
}


function movedragon_bossTowardsMarker1(marker) {

    if (currentDragonState === DragonState.COLLIDING) {
        return;
    }
    const dragon_bossSpeed1 = 0.012; // Set the dragon's speed

    const directionToMarker1 = marker.position.clone().sub(dragon_boss1.position);
    const distanceToMarker1 = directionToMarker1.length();

    if (distanceToMarker1 > 0.5) {
        // Move towards the marker
        const normalizedDirection1 = directionToMarker1.normalize();
        const dragon_bossMovement1 = normalizedDirection1.multiplyScalar(dragon_bossSpeed1);
        dragon_boss1.position.add(dragon_bossMovement1);
        
        // Make the dragon look at the marker's position
        dragon_boss1.lookAt(marker.position);
    }
}


function handleMarkerInteraction(marker) {
    // Remove the marker and perform any additional logic needed upon reaching the marker
    scene.remove(marker);
    markers = markers.filter(m => m !== marker);
}

function handleCollisionState() {
    const currentTime = Date.now();
    if (currentDragonState !== DragonState.COLLIDING) {
        lastHitTime = currentTime; // Initialize the last hit time
    }
    playDragonAnimation(3); // Assuming animation index 1 is for collision

    if (currentTime - lastHitTime > 1000) {
        hitpoints -= 5;
        lastHitTime = currentTime;
    }
}


let lastHitTime = 0; // Timestamp of the last hit

function checkCollision3() {
    const distanceToAnya = dragon_boss1.position.distanceTo(anyaPosition);
    const collisionThreshold = 5.2; // Adjust this threshold as necessary

    if (distanceToAnya < collisionThreshold) {
        transitionToState(DragonState.COLLIDING);
    } else {
        // When not in collision range, always chase markers if they exist
        if (markers.length > 0) {
            transitionToState(DragonState.CHASING);
        } else {
            transitionToState(DragonState.IDLE);
        }
    }
}



function handleCollisionWithAnya() {
    const currentTime = Date.now();

    // Switch to COLLIDING state if not already colliding
    if (currentDragonState !== DragonState.COLLIDING) {
        transitionToState(DragonState.COLLIDING);
        lastHitTime = currentTime; // Initialize the last hit time
    }

    // Deduct hitpoints if enough time has passed
    if (currentTime - lastHitTime > 1800) {
        hitpoints -= 5;
        lastHitTime = currentTime; // Update the last hit time
    }
}




