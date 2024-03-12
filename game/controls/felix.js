












function updateFelixBehavior() {
    if (redMarkers.length === 0) {
        // If there are no redMarkers, make sure Felix is in the idle state
        if (felixIsRunning) {
            felixIsRunning = false;
            switchToFelixAnimation(0); // Switch to idle animation
        }
        return;
    }

    let closestMarker = null;
    let closestDistance = Infinity;

    // Find the closest marker to Felix
    redMarkers.forEach((marker) => {
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
        redMarkers = redMarkers.filter(marker => marker !== closestMarker);

        // If there are no more redMarkers, set Felix to idle
        if (redMarkers.length === 0) {
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
