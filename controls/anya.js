

let jumpHeight = airPoints; // The height of the jump

let jumpHeight2 = (airPoints) + 6; // The height of the jump










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
    let speed = speedPoints; // or whatever your speed value is
    let movement = direction.multiplyScalar(speed);


    let distance = anya.position.distanceTo(moveDestination);

    if (distance < 0.001 || distance === Infinity || isMovingAwayFromDestination(anya.position, moveDestination, movement)) {
        isAnyaMoving = false;
        switchToAnimation(0); // Switch back to idle animation
        return;
    }

    anya.position.add(movement);

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


function throwPotion() {
    if (!potion || !anya) return;
if (potionAmountNum < 1) return;
    // Get Anya's hand position
    const anyaHand = anya.getObjectByName('LeftHand');
    if (anyaHand) {
        let handPosition = new THREE.Vector3();
        anyaHand.getWorldPosition(handPosition);

        // Make the potion visible and position it in Anya's hand
        potion.traverse((object) => {
            if (object.isMesh) {
                object.material.opacity = 1; // Make visible
            }
        });
        potion.position.set(handPosition.x, handPosition.y, handPosition.z);
        scene.add(potion); // Detach the potion from Anya's hand

        // Calculate the direction Anya is facing
        let throwDirection = anya.getWorldDirection(new THREE.Vector3()).normalize();

        // Create a timeline for the throw
        let tl = gsap.timeline();

        // First part of the timeline: move the potion up and forward
        tl.to(potion.position, {
            x: potion.position.x + throwDirection.x * 1.7, // Forward distance during the ascent
            y: handPosition.y + 1.4, // Height of the arch
            z: potion.position.z + throwDirection.z * 1.7, // Forward distance during the ascent
            duration: 0.25,
            ease: "power1.in"
        });

        // Second part of the timeline: move the potion forward and down
        tl.to(potion.position, {
            x: potion.position.x + throwDirection.x * 4.5, // Total forward distance
            y: 0.16, // Ground level
            z: potion.position.z + throwDirection.z * 4.5, // Total forward distance
            duration: 0.25,
            ease: "power1.out",
            onComplete: growPowercap // Call growPowercap when the potion animation completes
        });

        // Animate the potion's rotation to end up straight up
        tl.to(potion.rotation, {
            x: 0, // End up facing straight up
            y: 0, // Adjust as needed for correct orientation
            z: 0, // Adjust as needed for correct orientation
            duration: 0.5,
            ease: "none"
        }, "<"); // Start rotation animation at the same time as position animation
    }
}





function growPowercap() {
    loader.load('https://luminafields.com/powercaps.glb', function (gltf) {
        let powercap = gltf.scene;
        powercap.scale.set(0.1, 0.1, 0.1); // Start small

        // Position the powercap where the potion landed
        powercap.position.set(potion.position.x, 0.8, potion.position.z); // Adjust Y to ground level

if (potionAmountNum > 0) {

  scene.add(powercap);
  potionAmountNum -= 1;
  document.getElementById('superJump').style.display = 'block';
}

        // Animate the powercap growing
        gsap.to(powercap.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 10,
            ease: "power1.inOut"
        });

        // Optionally, add a light or other effects as needed
        let light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(0, 5, 0);
        powercap.add(light);
    });
}









function checkCollision() {
    if (!anya || !knife || !gateway || !potion) {
        // If anya or knife are not yet loaded, exit the function
        return;
    }


    const knifePosition = new THREE.Vector3();
    const gatewayPosition = new THREE.Vector3();
    const potionPosition = new THREE.Vector3();


    // Get the world position of anya and knife
    anya.getWorldPosition(anyaPosition);
    knife.getWorldPosition(knifePosition);
    gateway.getWorldPosition(gatewayPosition);
    potion.getWorldPosition(potionPosition);


    // Now you can use anyaPosition and knifePosition to check for collision
    // For example, check if the distance between them is less than some threshold
    const distance = anyaPosition.distanceTo(knifePosition);
    const distanceArch = anyaPosition.distanceTo(gatewayPosition);
    const distancePotion = anyaPosition.distanceTo(potionPosition);
    const collisionThreshold = .56; // Set your collision threshold

    if (distance < collisionThreshold) {

      attachKnifeToAnya();
      chatWindow.innerHTML += '<p>Knife:<br><font style="color: lightgreen;">[ATK]</font> Will increase attack by 5<br><font style="color: lightgreen;">[DEF]</font> Will increase defense by 1<br><font style="color: lightblue;">[MP]</font> Will increase mana by 0<br><font style="color: lightblue;">[HP]</font> Will increase health by 0</p>';
        chatWindow.innerHTML += 'Type for Knife to examine';
      scrollToBottom();
        // Collision detected
        console.log('Collision detected between anya and knife');
    }




    if (distancePotion < collisionThreshold) {
if (anyaHand && Object.keys(anyaHand).length > 0) {
  chatWindow.innerHTML += '<p>Potion:<br><font style="color: lightgreen;">[ATK]</font> Will increase attack by 0<br><font style="color: lightgreen;">[DEF]</font> Will increase defense by 0<br><font style="color: lightblue;">[MP]</font> Will increase mana by 0<br><font style="color: lightblue;">[HP]</font> Will increase health by 0</p>';
    chatWindow.innerHTML += 'Type for Potion to examine';
  scrollToBottom();
    console.log('Collision detected between anya and potion');
}
    }


    if (distanceArch < collisionThreshold) {

      chatWindow.innerHTML += 'You have entered Bawon Samedis Altar';
      if (questionStatus.PlayQuestion3 === true) {
        chatWindow.innerHTML += '<font style="font-weight: 900; color: grey;"><i>Bawon Samedis Speaks: offer the wax light a candle needing a flame..</i></font>';
      }
      if ( candlelight === true ) {
        questStatus.quest4 = true;
      }
      scrollToBottom();
        // Collision detected
        console.log('Collision detected between anya and altar');
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


function throwKnife() {
    if (!knife || !anya) return;

    // Get Anya's hand position
    const anyaHand = anya.getObjectByName('LeftHand');
    if (anyaHand) {
        let handPosition = new THREE.Vector3();
        anyaHand.getWorldPosition(handPosition);

        // Detach the knife from Anya's hand and add it to the scene
        scene.add(knife);
        knife.position.set(handPosition.x, handPosition.y, handPosition.z);

        // Calculate the direction Anya is facing
        let throwDirection = anya.getWorldDirection(new THREE.Vector3()).normalize();

        // Create a timeline for the throw
        let tl = gsap.timeline();

        // First part of the timeline: move the knife up and start rotation
        tl.to(knife.position, {
            x: knife.position.x + throwDirection.x * 2.6,
            y: handPosition.y + 1.7,
            z: knife.position.z + throwDirection.z * 2.6,
            duration: 0.25,
            ease: "power1.in"
        }).to(knife.rotation, {
            y: "+=10", // Rotate multiple times; adjust as necessary
            duration: 0.25,
            ease: "linear"
        }, "-=0.25"); // This ensures rotation starts at the same time as the upward movement

        // Second part of the timeline: move the knife forward, down, and slow rotation
        tl.to(knife.position, {
            x: knife.position.x + throwDirection.x * 6.6,
            y: 0.03, // Ground level
            z: knife.position.z + throwDirection.z * 6.6,
            duration: 0.75,
            ease: "power1.out"
        }).to(knife.rotation, {
            y: "+=2", // Slow down rotation; adjust as necessary
            duration: 0.75,
            ease: "power1.out"
        }, "-=0.75"); // This ensures rotation slows down at the same time as the downward movement
    }
}





function attachPotionToAnya() {
    const anyaHand2 = anya.getObjectByName('LeftHand'); // Replace 'Hand' with the actual hand part name
    if (anyaHand2 && potion) {

        // Attach the potion to Anya's hand
        anyaHand2.add(potion);
        potion.position.set(0, 0.2, 0); // Adjust as necessary
        potion.rotation.z = 180; // Set rotation

    }
}



let isJumpOnCooldown = false;



function mainJump() {

  // Check if the jump is on cooldown
    if (isJumpOnCooldown) {
        console.log('Jump is on cooldown');
        return;
    }

    if (!isAnyaLoaded || !anya || !anya.position) {
        console.error('Anya model not loaded or undefined');
        return;
    }

    // Parameters for the jump
    const duration = Math.max(0.8, Math.min(airPoints / 2, 0.8)); // Duration of the jump in seconds
    const jumpUpDuration = duration / 3;
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

    // Set the cooldown flag and reset it after 2 seconds
       isJumpOnCooldown = true;
       setTimeout(() => {
           isJumpOnCooldown = false;
       }, 2000); // 2000 milliseconds = 2 seconds

}

// Attach the function to the button
document.getElementById('mainJump').addEventListener('click', mainJump);


function mainJump2() {

  // Check if the jump is on cooldown
    if (isJumpOnCooldown) {
        console.log('Jump is on cooldown');
        return;
    }

    // Parameters for the jump
    const duration2 = Math.max(0.8, Math.min(airPoints / 2, 0.8)); // duration2 of the jump in seconds
    const jumpUpduration2 = duration2 / 1;
    const jumpDownduration2 = duration2 * 5.5;

    // Determine Anya's forward direction and speed
    const forwardDirection = moveDestination.clone().sub(anya.position).normalize();
    const forwardSpeed = isAnyaMoving ? 0.06 : 0; // Use the same speed as in updateAnyaMovement

    // Create the jump effect
    gsap.to(anya.position, {
        y: "+=" + jumpHeight2, // Jump up
        duration2: jumpUpduration2,
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
                y: "-=" + jumpHeight2, // Fall down
                duration2: jumpDownduration2,
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

    // Set the cooldown flag and reset it after 2 seconds
       isJumpOnCooldown = true;
       setTimeout(() => {
           isJumpOnCooldown = false;
       }, 2000); // 2000 milliseconds = 2 seconds

document.getElementById('superJump').style.display = 'none';

}





//end
