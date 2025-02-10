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

// Create the sun and moon
const sunGeometry = new THREE.SphereGeometry(10, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(0, 100, -200);
scene.add(sun);

const moonGeometry = new THREE.SphereGeometry(8, 32, 32);
const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xdddddd });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(0, -100, -200);
scene.add(moon);

// Function to create the starry night sky
function createStarrySky() {
    const starCount = 5000; // Increased number of stars
    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];

    for (let i = 0; i < starCount; i++) {
        const x = (Math.random() - 0.5) * 2000; // Spread over larger area
        const y = Math.random() * 800; // Higher in the sky
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1.5, // Increased star size
        transparent: true,
        opacity: 0.9
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Twinkling effect
    function animateStars() {
        let positions = starGeometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin(performance.now() * 0.0005 + i) * 0.1;
        }
        starGeometry.attributes.position.needsUpdate = true;
        requestAnimationFrame(animateStars);
    }

    animateStars();
}

// Function to create shooting stars
function createShootingStars() {
    const shootingStars = [];
    const maxShootingStars = 5;

    for (let i = 0; i < maxShootingStars; i++) {
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const geometry = new THREE.SphereGeometry(0.5, 8, 8);
        const star = new THREE.Mesh(geometry, material);
        star.visible = false; // Hide initially
        shootingStars.push(star);
        scene.add(star);
    }

    function animateShootingStars() {
        shootingStars.forEach(star => {
            if (!star.visible) {
                // Start a new shooting star
                star.position.set(Math.random() * 600 - 300, Math.random() * 200 + 100, -500);
                star.visible = true;
            }

            // Move shooting star
            star.position.x -= 2;
            star.position.y -= 1;
            star.position.z += 5;

            // If out of bounds, reset
            if (star.position.z > 200) {
                star.visible = false;
            }
        });

        requestAnimationFrame(animateShootingStars);
    }

    animateShootingStars();
}

// Day-night cycle
function dayNightCycle() {
    const dayDuration = 60000; // 60 seconds for a full day-night cycle
    const startTime = performance.now();

    function animate() {
        const elapsedTime = performance.now() - startTime;
        const t = (elapsedTime % dayDuration) / dayDuration;

        // Rotate the sun and moon around the scene
        sun.position.x = Math.cos(t * Math.PI * 2) * 200;
        sun.position.y = Math.sin(t * Math.PI * 2) * 200;

        moon.position.x = Math.cos(t * Math.PI * 2 + Math.PI) * 200;
        moon.position.y = Math.sin(t * Math.PI * 2 + Math.PI) * 200;

        // Transition background color
        const dayColor = new THREE.Color(0x87CEEB); // Sky blue
        const nightColor = new THREE.Color(0x000010); // Deep night blue
        scene.background = nightColor.clone().lerp(dayColor, Math.sin(t * Math.PI));

        requestAnimationFrame(animate);
    }

    animate();
}

// Remove the texture background and use a dark sky color
scene.background = new THREE.Color(0x000010); // Deep night sky blue

// Create the sky
createStarrySky();
createShootingStars();
dayNightCycle();


  
// Create multiple grass blade geometries for variety
const createBladeGeometries = () => [
    new THREE.PlaneGeometry(0.08, 0.25), // Thin, short
    new THREE.PlaneGeometry(0.1, 0.35),  // Medium
    new THREE.PlaneGeometry(0.12, 0.45), // Thick, tall
    new THREE.PlaneGeometry(0.07, 0.3),  // Thin, medium-tall
    new THREE.PlaneGeometry(0.11, 0.28)  // Thick, short
  ];
  
  // Create materials with different colors
  const grassMaterials = [
    new THREE.MeshBasicMaterial({ color: 0x2d5a27, side: THREE.DoubleSide }), // Base green
    new THREE.MeshBasicMaterial({ color: 0x1f4d1f, side: THREE.DoubleSide }), // Darker green
    new THREE.MeshBasicMaterial({ color: 0x3d7a3d, side: THREE.DoubleSide }), // Lighter green
    new THREE.MeshBasicMaterial({ color: 0x2d6d1f, side: THREE.DoubleSide }), // Olive green
    new THREE.MeshBasicMaterial({ color: 0x1f3d1f, side: THREE.DoubleSide })  // Deep green
  ];
  
  const bladeCount = 20000;
  const geometries = createBladeGeometries();
  const chunks = 25; // Number of terrain chunks for clustered variation
  
  // Create instanced meshes for each geometry-material combination
  const instancedMeshes = [];
  geometries.forEach(geometry => {
    grassMaterials.forEach(material => {
      instancedMeshes.push(
        new THREE.InstancedMesh(
          geometry,
          material,
          Math.floor(bladeCount / (geometries.length * grassMaterials.length))
        )
      );
    });
  });
  
  const matrix = new THREE.Matrix4();
  const dummy = new THREE.Object3D();
  
  // Create a noise function for natural clustering
  const createNoiseGrid = (size) => {
    const grid = [];
    for (let i = 0; i < size; i++) {
      grid[i] = [];
      for (let j = 0; j < size; j++) {
        grid[i][j] = Math.random();
      }
    }
    return grid;
  };
  
  const noiseGrid = createNoiseGrid(chunks);
  
  // Distribute grass blades with clustered variations
  instancedMeshes.forEach((instancedMesh) => {
    const instanceCount = instancedMesh.count;
    
    for (let instanceIndex = 0; instanceIndex < instanceCount; instanceIndex++) {
      // Random position within ground plane bounds
      const x = (Math.random() - 0.5) * 480;
      const z = (Math.random() - 0.5) * 480;
      
      // Determine which chunk this position belongs to
      const chunkX = Math.floor((x + 240) / (480 / chunks));
      const chunkZ = Math.floor((z + 240) / (480 / chunks));
      
      // Use noise value to influence variations
      const noiseValue = noiseGrid[Math.min(chunkX, chunks - 1)][Math.min(chunkZ, chunks - 1)];
      
      // Position slightly above ground level with height variation
      const heightVariation = noiseValue * 0.1;
      dummy.position.set(x, -1.05 + heightVariation, z);
      
      // Rotation with clustered variation
      dummy.rotation.y = Math.random() * Math.PI * 2;
      dummy.rotation.x = (Math.random() * 0.2 - 0.1) * (1 + noiseValue);
      
      // Scale variation based on chunk
      const baseScale = 0.8 + (noiseValue * 0.4);
      const randomScale = baseScale + (Math.random() * 0.2);
      dummy.scale.set(randomScale, randomScale, randomScale);
      
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(instanceIndex, dummy.matrix);
    }
    
    instancedMesh.instanceMatrix.needsUpdate = true;
  });
  
  // Create the base ground plane
  const groundGeometry = new THREE.PlaneGeometry(500, 500);
  const groundMaterial = new THREE.MeshBasicMaterial({
    color: 0x1a3300,
    side: THREE.DoubleSide
  });
  const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.position.y = -1.2;
  
  // Add everything to scene
  scene.add(groundMesh);
  instancedMeshes.forEach(mesh => scene.add(mesh));
  

    // Load model
    loadModel();

    // Initialize renderer
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById("app").appendChild(renderer.domElement);
    
    gsap.ticker.add(render);



    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-1, 0, 4);
    camera.lookAt(1, 0, 0);

    // Add OrbitControls (now globally available)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI / 2;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
  
    // Ambient Light
       let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
       scene.add(ambientLight);
  
       // Directional Light
       let directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
       directionalLight.position.set(50, 100, 50); // Adjust position as needed
       scene.add(directionalLight);
  
  
       // Adjust Spotlight
       let spotlight = new THREE.SpotLight(0xffffff, 1, 10000, Math.PI / 4, 0.5, 2);
       spotlight.position.set(0, 100, 0); // Adjust position as needed
       let spotlightTarget = new THREE.Object3D();
       spotlightTarget.position.set(0, 0, 0); // Set target position
       scene.add(spotlightTarget);
       spotlight.target = spotlightTarget;
       scene.add(spotlight);



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

        // Store the idle animation separately
        let idleAnimation = animations[0];
        currentAction = mixer.clipAction(idleAnimation);
        currentAction.play();

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

function playAnimation(index) {
    if (!mixer || !animations[index]) return;

    const newAction = mixer.clipAction(animations[index]);
    
    if (currentAction) {
        // Proper crossfade between animations
        newAction.reset();
        newAction.setLoop(THREE.LoopOnce, 1);
        newAction.clampWhenFinished = true;
        newAction.crossFadeFrom(currentAction, 0.5, true);
        newAction.play();
    }

    currentAction = newAction;

    // Only add the finished listener for non-idle animations
    if (index !== 0) {
        const onFinished = function(e) {
            if (e.action === currentAction) {
                mixer.removeEventListener('finished', onFinished);
                
                // Smoothly transition back to idle
                const idleAction = mixer.clipAction(animations[0]);
                idleAction.reset();
                idleAction.setLoop(THREE.LoopRepeat);
                idleAction.crossFadeFrom(currentAction, 0.5, true);
                idleAction.play();
                
                currentAction = idleAction;
            }
        };
        
        mixer.addEventListener('finished', onFinished);
    }
}

// Add a global variable to track the current action
let currentAction;
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
