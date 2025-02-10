let scene, camera, renderer, model, mixer, action, delta;
let clock = new THREE.Clock();
let animations, currentAnimationIndex = 0;
let spine, neck, leftEye, rightEye;
let dragPosition = { x: 0, y: 0 };
let allowHeadTracking = true;

function render() {
    delta = clock.getDelta();
    if (mixer) {
        mixer.update(delta);
    }
    if (spine && neck && leftEye && rightEye && allowHeadTracking) {
        updateModelTracking();
    }
    renderer.render(scene, camera);
}

document.addEventListener('DOMContentLoaded', (event) => {
    init();
});

document.addEventListener('scroll', function () {
    scrollPosition = window.scrollY;
});

// Draggable form
let isDragging = false;


// Mouse events
dragHandle.addEventListener('mousedown', function (e) {
    isDragging = true;
    offsetX = e.clientX - draggableForm.offsetLeft;
    offsetY = e.clientY - draggableForm.offsetTop;
    dragHandle.style.cursor = 'grabbing';
});

// Mouse move event
document.addEventListener('mousemove', function (e) {
    if (isDragging) {
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        // Boundaries to prevent dragging off-screen
        newX = Math.max(0, Math.min(window.innerWidth - draggableForm.offsetWidth, newX));
        newY = Math.max(0, Math.min(window.innerHeight - draggableForm.offsetHeight, newY));

        draggableForm.style.left = newX + 'px';
        draggableForm.style.top = newY + 'px';
        dragPosition.x = newX;
        dragPosition.y = newY;
    }
});

// Mouse up event
document.addEventListener('mouseup', function () {
    isDragging = false;
    dragHandle.style.cursor = 'grab';
});

// Touch events for mobile/tablet
dragHandle.addEventListener('touchstart', function (e) {
    isDragging = true;
    let touch = e.touches[0];
    offsetX = touch.clientX - draggableForm.offsetLeft;
    offsetY = touch.clientY - draggableForm.offsetTop;
    dragHandle.style.cursor = 'grabbing';
    e.preventDefault(); // Prevents default touch behavior
});

// Touch move event
document.addEventListener('touchmove', function (e) {
    if (isDragging) {
        let touch = e.touches[0];
        let newX = touch.clientX - offsetX;
        let newY = touch.clientY - offsetY;

        // Boundaries to prevent dragging off-screen
        newX = Math.max(0, Math.min(window.innerWidth - draggableForm.offsetWidth, newX));
        newY = Math.max(0, Math.min(window.innerHeight - draggableForm.offsetHeight, newY));

        draggableForm.style.left = newX + 'px';
        draggableForm.style.top = newY + 'px';
        dragPosition.x = newX;
        dragPosition.y = newY;
    }
});

// Touch end event
document.addEventListener('touchend', function () {
    isDragging = false;
    dragHandle.style.cursor = 'grab';
});


// Update model tracking
function updateModelTracking() {
    let formCenterX = dragPosition.x + draggableForm.offsetWidth / 2;
    let formCenterY = dragPosition.y + draggableForm.offsetHeight / 2;

    // Convert form position to normalized device coordinates (-1 to 1)
    let x = (formCenterX / window.innerWidth) * 2 - 1;
    let y = (formCenterY / window.innerHeight) * 2 - 1;

    // Combine scroll and drag inputs for rotations
    let combinedRotationX = (y * Math.PI * 0.12)-49.8;
    let combinedRotationY = x * Math.PI * 0.12;

    // Apply rotations to model bones based on combined input
    if (spine) {
        spine.rotation.x = combinedRotationX;
        spine.rotation.y = combinedRotationY;
    }
    if (neck) {
        neck.rotation.x = combinedRotationX;
        neck.rotation.y = combinedRotationY;
    }
    if (leftEye) {
        leftEye.rotation.x = combinedRotationX;
        leftEye.rotation.y = combinedRotationY;
    }
    if (rightEye) {
        rightEye.rotation.x = combinedRotationX;
        rightEye.rotation.y = combinedRotationY;
    }
}

function init() {
    // Initialize scene and camera
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 0, 16);
    
    camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(1, 0, 4);
    camera.lookAt(-1, 0, 0);

    // Add lights
    scene.add(new THREE.AmbientLight(0xffffff, 1));
    let pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.z = 2500;
    scene.add(pointLight);

    // Load model
    loadModel();

    // Initialize renderer
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById("app").appendChild(renderer.domElement);
    
    gsap.ticker.add(render);
}

async function loadModel() {
    const loader = new THREE.GLTFLoader();
    try {
        const gltf = await new Promise((resolve, reject) => {
            loader.load('https://luminafieldsnz.github.io/Lumina/tools/salmon/micheal.glb', resolve, undefined, reject);
        });
        
        model = gltf.scene;
        scene.add(model);
        model.position.set(0, -1.2, 1.2);

        mixer = new THREE.AnimationMixer(model);
        animations = gltf.animations;

        if (animations.length > 0) {
            action = mixer.clipAction(animations[0]);
            action.setLoop(THREE.LoopRepeat);
            action.play();
        }

        spine = model.getObjectByName('Spine');
        neck = model.getObjectByName('Neck');
        leftEye = model.getObjectByName('LeftEye');
        rightEye = model.getObjectByName('RightEye');
        
        populateAnimations();
        onModelLoaded();
    } catch (error) {
        console.error('Error loading model:', error);
    }
}

function populateAnimations() {
    const animationSelector = document.getElementById('animationSelector');
    if (!animations || animations.length === 0 || !animationSelector) return;
    
    animationSelector.innerHTML = '<option value="">Select Animation</option>';
    animations.forEach((anim, index) => {
        let option = document.createElement('option');
        option.value = index;
        option.textContent = anim.name || `Animation ${index + 1}`;
        animationSelector.appendChild(option);
    });
    
    animationSelector.addEventListener('change', function () {
        let selectedIndex = parseInt(this.value);
        if (!isNaN(selectedIndex)) {
            playAnimation(selectedIndex);
        }
    });
}

function playAnimation(index) {
    if (mixer && animations[index]) {
        if (action) {
            action.fadeOut(0.5);
        }

        action = mixer.clipAction(animations[index]);
        action.reset().setLoop(THREE.LoopOnce, 1).fadeIn(0.5).play();

        // Keep last frame instead of returning to T-pose
        action.clampWhenFinished = true;
        action.enabled = true;

        // Remove old event listener and add a new one
        mixer.removeEventListener('finished', onAnimationFinished);
        mixer.addEventListener('finished', onAnimationFinished);

        function onAnimationFinished(event) {
            if (event.action === action) {
                let idleAction = mixer.clipAction(animations[0]);
                idleAction.reset().fadeIn(0.5).play();
                
                // Smooth crossfade to idle
                action.crossFadeTo(idleAction, 0.5, false);
            }
        }
    }
}


function createEyeCovers() {
    console.log("Creating eye covers...");

    if (!model) {
        console.log("Model not loaded yet. Cannot create eye covers.");
        return;
    }

    let leftEyeObj = model.getObjectByName('LeftEye');
    let rightEyeObj = model.getObjectByName('RightEye');

    if (!leftEyeObj || !rightEyeObj) {
        console.log("LeftEye or RightEye not found.");
        return;
    }

    const geometry = new THREE.PlaneGeometry(0.6, 0.3);
    const material = new THREE.MeshBasicMaterial({ color: 0x8B4513, side: THREE.DoubleSide, opacity: 1, transparent: false });

    leftEyeCover = new THREE.Mesh(geometry, material);
    rightEyeCover = new THREE.Mesh(geometry, material);

    leftEyeCover.position.set(leftEyeObj.position.x, leftEyeObj.position.y, leftEyeObj.position.z);
    rightEyeCover.position.set(rightEyeObj.position.x, rightEyeObj.position.y, rightEyeObj.position.z);

    leftEyeCover.rotation.x = Math.PI / 2; 
    rightEyeCover.rotation.x = Math.PI / 2;

    scene.add(leftEyeCover);
    scene.add(rightEyeCover);

    console.log("Eye covers created and positioned.");
}


let talkingTween = null; // Store GSAP animation

function animateTalking(isTalking, totalDuration) {
    if (talkingTween) {
        talkingTween.kill(); // Stop any existing animation
    }

    model.traverse((child) => {
        if (child.isMesh && child.morphTargetDictionary) {
            let mouthIndex = child.morphTargetDictionary["mouthOpen"];
            if (mouthIndex !== undefined) {
                // Repeat the mouth animation indefinitely if talking
                talkingTween = gsap.to(child.morphTargetInfluences, {
                    [mouthIndex]: isTalking ? 1 : 0, // Mouth open or close based on talking state
                    duration: Math.random() * 0.5 + 0.5, // Random duration between 0.5 and 1 second
                    repeat: isTalking ? -1 : 0, // Repeat infinitely if talking
                    yoyo: true, // Reverse the animation (open-close-open)
                    ease: "power1.inOut", // Smooth easing
                    onRepeat: () => {
                        // Set random duration for each repeat (smooth and varying speed)
                        talkingTween.duration(Math.random() * 0.5 + 0.5); // Randomize speed for each cycle
                    }
                });
            }
        }
    });
}






let blinkInterval = null;

function startBlinkSequence() {
    console.log("Starting blink sequence...");

    if (!leftEye || !rightEye) {
        console.log("Left or Right eye not found. Cannot start blink sequence.");
        return;
    }

    if (blinkInterval) {
        console.log("Blink sequence already running.");
        return;
    }

    // Start a new blink interval
    blinkInterval = setInterval(() => {
        console.log("Blink triggered!");

        // Randomize blink duration between 0.15 and 0.3 seconds
        let blinkDuration = Math.random() * 0.15 + 0.15; // Random duration between 0.15 and 0.3 seconds

        // Randomize blink interval between 1.5 and 2.5 seconds
        let blinkIntervalDuration = Math.random() * 200 + 14500; // Random interval between 1.5 and 2.5 seconds

        // Make the left and right eye mesh objects scale down to simulate closing the eye
        gsap.fromTo(leftEye.scale, { y: 1 }, { 
            y: 0, 
            duration: blinkDuration,
            yoyo: true,  
            repeat: 1, 
            ease: "power1.inOut"
        });

        gsap.fromTo(rightEye.scale, { y: 1 }, { 
            y: 0,  
            duration: blinkDuration,
            yoyo: true, 
            repeat: 1, 
            ease: "power1.inOut"
        });

        // Reset the blink interval to continue with the randomized timing
        clearInterval(blinkInterval);
        blinkInterval = setInterval(() => {
            console.log("Blink triggered!");
            gsap.fromTo(leftEye.scale, { y: 1 }, { 
                y: 0, 
                duration: blinkDuration,
                yoyo: true,  
                repeat: 1, 
                ease: "power1.inOut"
            });

            gsap.fromTo(rightEye.scale, { y: 1 }, { 
                y: 0,  
                duration: blinkDuration,
                yoyo: true, 
                repeat: 1, 
                ease: "power1.inOut"
            });
        }, blinkIntervalDuration);

    }, 1500); // Trigger blink every 1.5 seconds (adjustable)
}

// Stop the blink sequence
function stopBlinkSequence() {
    if (blinkInterval) {
        console.log("Stopping blink sequence...");
        clearInterval(blinkInterval);
        blinkInterval = null;
    } else {
        console.log("No blink sequence running to stop.");
    }
}

// Function to blink 3 times fast
function blinkThreeTimesFast() {
    console.log("Blinking 3 times fast...");

    let blinkCount = 0;
    let blinkDuration = 0.1;  // Fast blink duration (0.1 seconds)

    function blinkOnce() {
        console.log(`Blink #${blinkCount + 1}`);

        gsap.to(leftEye.scale, { 
            y: 0, 
            duration: blinkDuration,
            yoyo: true,  
            repeat: 1, 
            ease: "power1.inOut"
        });

        gsap.to(rightEye.scale, { 
            y: 0,  
            duration: blinkDuration,
            yoyo: true, 
            repeat: 1, 
            ease: "power1.inOut"
        });

        blinkCount++;

        if (blinkCount < 3) {
            setTimeout(blinkOnce, 200); // Delay 200ms before the next blink
        }
    }

    blinkOnce(); // Start the blink sequence
}

// Initialize the model and bind the eye objects
function onModelLoaded() {
    console.log("Model loaded successfully.");

    // Directly grab the eye objects from the model and make sure they're available
    leftEye = model.getObjectByName('LeftEye');
    rightEye = model.getObjectByName('RightEye');

    if (!leftEye || !rightEye) {
        console.log("Failed to find LeftEye or RightEye.");
        return;
    }

    // Start the blink animation once the model is fully loaded
    startBlinkSequence();
}
