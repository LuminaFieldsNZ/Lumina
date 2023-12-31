

















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









function getDistance(object1, object2) {
    if (!object1 || !object2) return Infinity;

    const position1 = new THREE.Vector3();
    const position2 = new THREE.Vector3();

    object1.getWorldPosition(position1);
    object2.getWorldPosition(position2);

    return position1.distanceTo(position2);
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





function mainJump() {
    if (!isAnyaLoaded || !anya || !anya.position) {
        console.error('Anya model not loaded or undefined');
        return;
    }

    // Parameters for the jump
    const jumpHeight = 5; // The height of the jump
    const duration = 1.5; // Duration of the jump in seconds
    const jumpUpDuration = duration / 2;
    const jumpDownDuration = duration / 2;

    // Determine Anya's forward direction and speed
    const forwardDirection = moveDestination.clone().sub(anya.position).normalize();
    const forwardSpeed = isAnyaMoving ? 0.06 : 0; // Use the same speed as in updateAnyaMovement

    // Create the jump effect
    gsap.to(anya.position, {
        y: "+=" + jumpHeight, // Jump up
        duration: jumpUpDuration,
        ease: "power2.out",
        onUpdate: () => {
            if (isAnyaMoving) {
                // Continue moving forward while jumping up
                let forwardMovement = forwardDirection.clone().multiplyScalar(forwardSpeed * gsap.ticker.deltaRatio());
                anya.position.add(forwardMovement);
            }
        },
        onComplete: () => {
            gsap.to(anya.position, {
                y: "-=" + jumpHeight, // Fall down
                duration: jumpDownDuration,
                ease: "power2.in",
                onUpdate: () => {
                    if (isAnyaMoving) {
                        // Continue moving forward while jumping down
                        let forwardMovement = forwardDirection.clone().multiplyScalar(forwardSpeed * gsap.ticker.deltaRatio());
                        anya.position.add(forwardMovement);
                    }
                }
            });
        }
    });
}


// Attach the function to the button
document.getElementById('mainJump').addEventListener('click', mainJump);
