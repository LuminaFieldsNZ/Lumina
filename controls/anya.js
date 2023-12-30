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
