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
    chatWindow.style.opacity = "1"; // Hide the element
    app.style.opacity = "1"; // Hide the element

    setTimeout(function() {
    
        // Check if the element exists
        if (chatWindow) {
            chatWindow.style.opacity = ".1"; // Hide the element
            app.style.opacity = ".1"; // Hide the element
        }
    }, 6000); // Wait for 3 seconds (3000 milliseconds)
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
    chatWindow.style.opacity = "1"; // Hide the element
    app.style.opacity = "1"; // Hide the element
    setTimeout(function() {
    
        // Check if the element exists
        if (chatWindow) {
            chatWindow.style.opacity = ".1"; // Hide the element
            app.style.opacity = ".1"; // Hide the element
        }
    }, 6000); // Wait for 3 seconds (3000 milliseconds)
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
    let combinedRotationX = (y * Math.PI * 0.12)-50;
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
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 0, 16);
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-1, 0, 4);
    camera.lookAt(1, 0, 0);

    let ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);
    let pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.z = 2500;
    scene.add(pointLight);

    let loader = new THREE.GLTFLoader();
    loader.load('https://luminafieldsnz.github.io/Lumina/tools/salmon/micheal.glb', function (gltf) {
        model = gltf.scene;
        scene.add(model);
        model.position.y = -1.2;
        model.position.z = 2.2;

        mixer = new THREE.AnimationMixer(model);
        animations = gltf.animations;

        // Set the initial action to idle animation
        action = mixer.clipAction(animations[0]);
        action.setLoop(THREE.LoopRepeat);
        action.play();

        spine = model.getObjectByName('Spine'); // Replace 'Spine' with the actual name of the spine bone/mesh
        neck = model.getObjectByName('Neck'); // Replace 'Neck' with the actual name of the neck bone/mesh
        leftEye = model.getObjectByName('LeftEye'); // Replace 'LeftEye' with the actual name of the left eye bone/mesh
        rightEye = model.getObjectByName('RightEye'); // Replace 'RightEye' with the actual name of the right eye bone/mesh

        // Start the random animation loop
        setTimeout(randomAnimation, 10000);
        
    });

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById("app").appendChild(renderer.domElement);

    gsap.ticker.add(render);
}

function randomAnimation() {
    // Stop the current animation and transition to the new one
    if (action) {
        action.crossFadeTo(mixer.clipAction(animations[currentAnimationIndex]), 0.5, true);
    }

    // Set the current animation to a random index
    currentAnimationIndex = Math.floor(Math.random() * animations.length);
    let nextAction = mixer.clipAction(animations[currentAnimationIndex]);

    // Set the animation to play once
    nextAction.setLoop(THREE.LoopOnce);
    nextAction.reset();
    nextAction.play();

    // When the animation ends, revert to the idle animation
    nextAction.clampWhenFinished = true;
    mixer.addEventListener('finished', onAnimationFinished);

    // Set a timeout to run the next random animation after 40 seconds
    setTimeout(randomAnimation, 400000);
}

function onAnimationFinished(event) {
    if (event.action === mixer.clipAction(animations[currentAnimationIndex])) {
        // Remove the event listener to avoid multiple triggers
        mixer.removeEventListener('finished', onAnimationFinished);

        // Revert to the idle animation (assuming idle is at index 0)
        let idleAction = mixer.clipAction(animations[0]);
        idleAction.reset();
        idleAction.setLoop(THREE.LoopRepeat);
        idleAction.play();

        // Blend back to the idle animation smoothly
        event.action.crossFadeTo(idleAction, 0.5, false);
    }
}
