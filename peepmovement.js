    // Create multiple peeps
    let numberOfPeeps = 3; // You can change this to the desired number of peeps
    let peeps = [];

    const peepImages = [
        'micheal.png',
        'crycella.png',
        'anya.png'
    ];


    for (let i = 0; i < numberOfPeeps; i++) {
        const peepImg = new Image();
        peepImg.src = peepImages[i % peepImages.length];
        document.body.appendChild(peepImg);
        peepImg.onclick = function() {
    sitDown(peep);
};


        // Style the image
        peepImg.style.position = 'absolute';
        peepImg.style.bottom = '20px'; // negative margin for bounce
        peepImg.style.zIndex = '9999';

        let peep = {
            img: peepImg,
            x: Math.random() * window.innerWidth,
            speed: (window.innerWidth / 6) * (0.1 + Math.random() * 0.8), // random speed between 20% to 100% of original speed
            direction: 1, // random starting direction
            bouncing: 0,
            bounceSpeed: 1, // random bounce speed between 10% to 100% of original speed
            isFrozen: false, // flag to indicate if the peep is frozen
            wallHits: 0, // Counter for wall hits
            hideTime: 8000, // Initial hiding time (8 seconds)
        };

        peeps.push(peep);
    }

    function sitDown(peep) {
      peep.speed = 580;
      peep.hideTime = 200000;
    }




    function hideMe(peep) {
        peep.img.style.transition = 'bottom 1s linear'; // Add a transition for smooth movement
        peep.img.style.bottom = '-260px'; // Move the peep off the bottom of the screen
        setTimeout(() => {
            peep.img.style.visibility = 'visible'; // Unhide the peep after a timer
            peep.isFrozen = false; // Reset the frozen state
            peep.img.style.bottom = '20px'; // Reset the peep's position
        }, peep.hideTime);
    }

    function animate() {
        for (let peep of peeps) {
            if (!peep.isFrozen) {
                // Update peep's position
                peep.x += peep.speed * peep.direction * (1/60); // assuming 60 frames per second
                peep.img.style.left = peep.x + 'px';

                // Bounce effect
                let bounceValue = -20 + peep.bouncing;
                peep.img.style.bottom = bounceValue + 'px';
                peep.bouncing += peep.bounceSpeed;

                if (Math.abs(peep.bouncing) > 10) {
                    peep.bounceSpeed = -peep.bounceSpeed;
                }

                // Reverse direction and flip image when reaching the window edges
                if (peep.x > window.innerWidth || peep.x < 0) {
                    peep.direction = -peep.direction;
                    peep.img.style.transform = peep.direction === 1 ? 'scaleX(1)' : 'scaleX(-1)'; // flip the image

                    peep.wallHits++; // Increment wall hit counter

                    // Check if it's the 5th wall hit
                    if (peep.wallHits % 2 === 0) {
                        peep.isFrozen = true; // set the flag to true when the peep bounces
                        hideMe(peep); // Move and unhide the peep

                        // Double the hiding time for each subsequent hit
                        peep.hideTime *= 2;
                    }
                }
            }
        }

        requestAnimationFrame(animate);
    }


    // Start animation when the first peep image is loaded
    peeps[0].img.onload = function() {
        requestAnimationFrame(animate);
    }
