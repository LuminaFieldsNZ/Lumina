let scene, camera, renderer, model, mixer, action, delta;
let clock = new THREE.Clock();
let animations, currentAnimationIndex = 0;
let spine, neck, leftEye, rightEye;
let dragPosition = { x: 0, y: 0 };
let allowHeadTracking = true;
let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
let directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
let orb, pointLight;
let isDragging = false;
let offsetX = 0, offsetY = 0;
let groundMesh;
let groundGeometry;
let groundMaterial, transitionFactor, startTime, dayDuration;
let initialModelRotation = new THREE.Euler(); // Store initial rotation


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


let previousMousePosition = { x: 0, y: 0 }; // Store mouse position
let orbOffset = new THREE.Vector3(); // Offset between mouse and orb center
let dragPlane = new THREE.Plane(); // Virtual plane for 3D movement

// This assumes the ground is at y=0. Adjust accordingly if needed.
let groundY = 0;

function onMouseDown(event) {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const newOrbPosition = new THREE.Vector3();

    const intersects = raycaster.intersectObject(orb);

    if (intersects.length > 0) {
        isDragging = true;

        // Store offset from the orb center
        orbOffset.copy(intersects[0].point).sub(orb.position);

        // Lock the orb's current Y position to the ground
        dragPlane.setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 1, 0), newOrbPosition.set(orb.position.x, groundY, orb.position.z));

        previousMousePosition = { x: event.clientX, y: event.clientY };
        controls.enabled = false;
    } else {
        controls.enabled = true;
    }
}

function onMouseMove(event) {
    if (isDragging) {
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        const newOrbPosition = new THREE.Vector3();

        if (raycaster.ray.intersectPlane(dragPlane, newOrbPosition)) {
            // Offset is taken into account
            newOrbPosition.sub(orbOffset);

            // Lock the orb's position to groundY
            newOrbPosition.y = groundY;

            orb.position.copy(newOrbPosition);
            pointLight.position.copy(orb.position);
        }

        controls.enabled = false;
    }
}

function onMouseUp(event) {
    isDragging = false;
    controls.enabled = true;
}

function onTouchStart(event) {
    if (event.touches.length > 0) {
        const touch = event.touches[0];
        const mouse = new THREE.Vector2();
        mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        const newOrbPosition = new THREE.Vector3();

        const intersects = raycaster.intersectObject(orb);

        if (intersects.length > 0) {
            isDragging = true;
            orbOffset.copy(intersects[0].point).sub(orb.position);
            newOrbPosition.y = orb.position.y;

            // Lock the drag plane again on touch start
            dragPlane.setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 1, 0), newOrbPosition.set(orb.position.x, groundY, orb.position.z));

            previousMousePosition = { x: touch.clientX, y: touch.clientY };
            controls.enabled = false;
        } else {
            controls.enabled = true;
        }
    }
}

function onTouchMove(event) {
    if (isDragging && event.touches.length > 0) {
        const touch = event.touches[0];
        const mouse = new THREE.Vector2();
        mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        const newOrbPosition = new THREE.Vector3();

        if (raycaster.ray.intersectPlane(dragPlane, newOrbPosition)) {
            newOrbPosition.sub(orbOffset);
            newOrbPosition.y = groundY;  // Enforce Y position locking to the ground

            orb.position.copy(newOrbPosition);
            pointLight.position.copy(orb.position);
        }

        controls.enabled = false;
    }
}

function onTouchEnd(event) {
    isDragging = false;
    controls.enabled = true;
}




function updateModelTracking() {
    if (!orb || !spine || !neck || !leftEye || !rightEye || !model) return;

    const headCenter = new THREE.Vector3();
    headCenter.setFromMatrixPosition(neck.matrixWorld);

    const targetDirection = new THREE.Vector3();
    targetDirection.subVectors(orb.position, headCenter).normalize();

    // ***Corrected angle calculations and rotation order***
    const angleY = Math.atan2(targetDirection.x, targetDirection.z)  * 0.2;
    const angleX = Math.atan2(-targetDirection.y, Math.sqrt(targetDirection.x * targetDirection.x + targetDirection.z * targetDirection.z))  * 0.6; // Negate targetDirection.y for correct pitch


    spine.rotation.order = "YXZ"; // Set rotation order (important!)
    neck.rotation.order = "YXZ"; // Set rotation order (important!)
    leftEye.rotation.order = "YXZ"; // Set rotation order (important!)
    rightEye.rotation.order = "YXZ"; // Set rotation order (important!)

    spine.rotation.y = initialModelRotation.y + angleY;
    spine.rotation.x = initialModelRotation.x + angleX;
    neck.rotation.y = initialModelRotation.y + angleY;
    neck.rotation.x = initialModelRotation.x + angleX;
    leftEye.rotation.y = initialModelRotation.y + angleY;
    leftEye.rotation.x = initialModelRotation.x + angleX;
    rightEye.rotation.y = initialModelRotation.y + angleY;
    rightEye.rotation.x = initialModelRotation.x + angleX;


    const MAX_ROTATION_X = Math.PI / 4;
    const MAX_ROTATION_Y = Math.PI / 4;

    // Apply limits *relative* to initial rotation
    spine.rotation.x = Math.max(initialModelRotation.x - MAX_ROTATION_X, Math.min(initialModelRotation.x + MAX_ROTATION_X, spine.rotation.x));
    neck.rotation.x = Math.max(initialModelRotation.x - MAX_ROTATION_X, Math.min(initialModelRotation.x + MAX_ROTATION_X, neck.rotation.x));
    leftEye.rotation.x = Math.max(initialModelRotation.x - MAX_ROTATION_X, Math.min(initialModelRotation.x + MAX_ROTATION_X, leftEye.rotation.x));
    rightEye.rotation.x = Math.max(initialModelRotation.x - MAX_ROTATION_X, Math.min(initialModelRotation.x + MAX_ROTATION_X, rightEye.rotation.x));

    spine.rotation.y = Math.max(initialModelRotation.y - MAX_ROTATION_Y, Math.min(initialModelRotation.y + MAX_ROTATION_Y, spine.rotation.y));
    neck.rotation.y = Math.max(initialModelRotation.y - MAX_ROTATION_Y, Math.min(initialModelRotation.y + MAX_ROTATION_Y, neck.rotation.y));
    leftEye.rotation.y = Math.max(initialModelRotation.y - MAX_ROTATION_Y, Math.min(initialModelRotation.y + MAX_ROTATION_Y, leftEye.rotation.y));
    rightEye.rotation.y = Math.max(initialModelRotation.y - MAX_ROTATION_Y, Math.min(initialModelRotation.y + MAX_ROTATION_Y, rightEye.rotation.y));

}





function init() {
// Initialize scene and camera
scene = new THREE.Scene();

let floatingSpeed = 0.5; // Speed of floating oscillation
let floatingAmplitude = 0.1; // Smaller amplitude to avoid large height changes

let baseHeight = Math.random() * 0.2 - 0; // Random height between 0.4 and 1.4
let targetHeight = baseHeight; // Initial target height

// Create the orb
const orbGeometry = new THREE.SphereGeometry(0.2, 32, 32); // Smaller orb
const orbMaterial = new THREE.MeshBasicMaterial({ color: 0xf8db82 }); // Yellow orb
orb = new THREE.Mesh(orbGeometry, orbMaterial);

orb.position.set(-1.1, baseHeight, 2.2); // Adjust x, y, z as needed
scene.add(orb);

// Add a point light that follows the orb
pointLight = new THREE.PointLight(0xf8db82, 8, 100); // Yellow light
pointLight.position.set(orb.position.x, orb.position.y, orb.position.z);
scene.add(pointLight);

// Function to smoothly animate the orb
function animateOrb() {
    const time = clock.elapsedTime;

    // Update target height periodically
    if (time % 2 < 0.02) { // Change height every ~2 seconds for more dynamic movement
        targetHeight = baseHeight + (Math.random() - 0.5) * floatingAmplitude * 4; 
    }

    // Ensure the target height stays within bounds
    if (targetHeight < 0 || targetHeight > 0.7) {
        targetHeight = 0.25; // Reset to 0.25 if out of bounds
    }

    // Smooth transition using lerp (only affecting Y-axis)
    orb.position.y = THREE.MathUtils.lerp(orb.position.y, targetHeight, floatingSpeed * clock.getDelta());

    // Preserve the original Z position to prevent movement in that axis
    orb.position.z = orb.position.z; 

    // Update the light position to follow the orb
    pointLight.position.set(orb.position.x, orb.position.y, orb.position.z);
}





// Create the sun geometry
const sunGeometry = new THREE.SphereGeometry(50, 32, 32);
const sunMaterial = new THREE.MeshStandardMaterial({
    color: 0xffff00,  // Sun color
    emissive: 0xffff00,  // Glow effect (yellow)
    emissiveIntensity: 60000,  // Higher emissive intensity for blinding brightness
    roughness: 0.1,  // Less rough surface for shininess
    metalness: 1.0,  // Shiny, metallic look
});

// Create the sun mesh
const sun = new THREE.Mesh(sunGeometry, sunMaterial);

// Position the sun in 3D space
sun.position.set(0, 500, -800);  // Elevated and moved back
scene.add(sun);

// Add a point light at the sun's position to simulate light emission
const sunLight = new THREE.PointLight(0xffff00, 5, 1000);  // Bright yellow light
sunLight.position.set(0, 3500, -800);  // Same position as the sun
scene.add(sunLight);


// Create the moon geometry
const moonGeometry = new THREE.SphereGeometry(8, 32, 32);
const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xdddddd });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(0, -100, -200);
scene.add(moon);

// Function to create the starry night sky
function createStarrySky() {
    const starCount = 100; // Increased number of stars for a denser sky
    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    const starColors = [];

    for (let i = 0; i < starCount; i++) {

        const x = (Math.random() - 0.5) * 20;
        const z = (Math.random() - 0.5) * 20;
        const y = -0.2; // Higher in the sky
        starVertices.push(x, y, z);

        // Randomize star colors with hints of white, blue, purple, and green
        const color = new THREE.Color();
        const colorChoice = Math.random();
        if (colorChoice < 0.7) {
            color.set(0xffffff); // White
        } else if (colorChoice < 0.85) {
            color.set(0x00ffff); // Blue
        } else if (colorChoice < 0.95) {
            color.set(0xff00ff); // Purple
        } else {
            color.set(0x00ff00); // Green
        }
        starColors.push(color.r, color.g, color.b);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
        size: 0.015, // Larger star size
        vertexColors: true, // Enable vertex colors
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending, // Additive blending for a glowing effect
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Twinkling effect
    function animateStars() {
        let positions = starGeometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin(performance.now() * 0.0005 + i) * 0.01;
        }
        starGeometry.attributes.position.needsUpdate = true;
        requestAnimationFrame(animateStars);
    }

    animateStars();
}




// Day-night cycle with longer night duration
function dayNightCycle() {
    dayDuration = 12000; // 12 seconds for a full day-night cycle
    startTime = performance.now();

    // Initialize fog
    const fogColor = 0x000000; // Black fog for night
    const fog = new THREE.Fog(fogColor, 0, 16); // Near = 0, Far = 16
    scene.fog = fog;

    // ***LIGHTING ADJUSTMENTS***
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // Dimmer ambient at night
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Increase intensity
    directionalLight.position.set(50, 100, 50);
    directionalLight.castShadow = true; // If you're using shadows
    scene.add(directionalLight);


    const sunLight = new THREE.PointLight(0xffff00, 2, 1000); // Sun light (increase intensity)
    sunLight.position.set(0, 500, -800);
    scene.add(sunLight);


}


// Remove the texture background and use a dark sky color
scene.background = new THREE.Color(0x000010); // Deep night sky blue

// Create the sky
createStarrySky();
dayNightCycle();

  
// Create multiple grass blade geometries for variety
const createBladeGeometries = () => [
    new THREE.PlaneGeometry(0.08 * 0.2, 0.15), // Thin, short (60% width reduction)
    new THREE.PlaneGeometry(0.1 * 0.2, 0.25),  // Medium (60% width reduction)
    new THREE.PlaneGeometry(0.12 * 0.2, 0.29), // Thick, tall (60% width reduction)
    new THREE.PlaneGeometry(0.07 * 0.2, 0.13),  // Thin, medium-tall (60% width reduction)
    new THREE.PlaneGeometry(0.11 * 0.2, 0.18)  // Thick, short (60% width reduction)
];
  
  // Create materials with different colors
  const grassMaterials = [
    new THREE.MeshBasicMaterial({ color: 0x2d5a27, side: THREE.DoubleSide }), // Base green
    new THREE.MeshBasicMaterial({ color: 0x1f4d1f, side: THREE.DoubleSide }), // Darker green
    new THREE.MeshBasicMaterial({ color: 0x3d7a3d, side: THREE.DoubleSide }), // Lighter green
    new THREE.MeshBasicMaterial({ color: 0x2d6d1f, side: THREE.DoubleSide }), // Olive green
    new THREE.MeshBasicMaterial({ color: 0x1f3d1f, side: THREE.DoubleSide })  // Deep green
  ];
  
  const bladeCount = 40000;
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
      const x = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      
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
   groundGeometry = new THREE.PlaneGeometry(20, 20);
   groundMaterial = new THREE.MeshBasicMaterial({
    color: 0x1a3300,
    side: THREE.DoubleSide
  });
   groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.position.y = -1.2;
  
  // Add everything to scene
  scene.add(groundMesh);
  instancedMeshes.forEach(mesh => scene.add(mesh));
  
  const loadButton = document.getElementById('loadButton');
  loadButton.addEventListener('click', () => {
      scene.remove(model); // Remove previous model
      loadModel('https://models.readyplayer.me/67aa0c388d7d582f9c1da176.glb'); // User
    });

  loadModel('https://luminafieldsnz.github.io/Lumina/tools/salmon/micheal.glb'); // Initial model load



    // Initialize renderer
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById("app").appendChild(renderer.domElement);
    
    gsap.ticker.add(render);



    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 4);
    camera.lookAt(0, 0, 0);

    // Add OrbitControls (now globally available)
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 500;
    controls.maxPolarAngle = Math.PI / 2;



function animate() {
    const elapsedTime = performance.now() - startTime;
    const t = (elapsedTime % dayDuration) / dayDuration; // Time in the cycle

    // Sun's independent circular orbit (no change in direction)
    const sunOrbitRadius = 200;
    const sunAngle = t * Math.PI * 2; // Full circle over the cycle for the sun
    const sunX = Math.cos(sunAngle) * sunOrbitRadius;
    const sunY = Math.sin(sunAngle) * sunOrbitRadius;

    // Moon's elliptical orbit (non-linear movement)
    const moonOrbitRadiusX = 200; // Horizontal radius for the moon
    const moonOrbitRadiusY = 100; // Vertical radius for the moon
    const moonAngle = t * Math.PI * 2; // Full cycle for the moon (independent)
    const moonX = Math.cos(moonAngle) * moonOrbitRadiusX;
    const moonY = Math.sin(moonAngle) * moonOrbitRadiusY;

    // Set sun and moon positions
    sun.position.x = sunX;
    sun.position.y = sunY;
    moon.position.x = moonX;
    moon.position.y = moonY;

    // Adjust the lighting based on the sun's position
    const dayColor = new THREE.Color(0x87CEEB); // Sky blue for day
    const nightColor = new THREE.Color(0x000010); // Deep night blue for night

    // Smooth transition based on the sun's position
    scene.background = nightColor.clone().lerp(dayColor, transitionFactor);

    // Adjust fog density based on time of day
// ***LIGHTING UPDATES DURING DAY/NIGHT CYCLE***
transitionFactor = Math.sin(sunAngle); // 0 at night, 1 at day

// Ambient Light: Adjust intensity
ambientLight.intensity = 0.2 + transitionFactor * 0.3; // Increase during day

// Directional Light: Adjust intensity and color slightly
directionalLight.intensity = 0.5 + transitionFactor * 0.5; // Increase during day

// Sun Light: Adjust intensity (most important)
sunLight.intensity = 2 + transitionFactor * 8; // Brighter during the day


        // Add event listeners for mouse and touch interactions
// Event listeners (modified)
window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mouseup', onMouseUp, false);

window.addEventListener('touchstart', onTouchStart, false);
window.addEventListener('touchmove', onTouchMove, false);
window.addEventListener('touchend', onTouchEnd, false);

    // Request the next animation frame
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    animateOrb(); // Update orb's floating animation

}

animate();
  
    // Ambient Light
       scene.add(ambientLight);
  
       // Directional Light
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


async function loadModel(glbPath) {
    const loader = new THREE.GLTFLoader();
    try {
        const gltf = await new Promise((resolve, reject) => {
            loader.load(glbPath, resolve, undefined, reject);
        });

        model = gltf.scene;
        scene.add(model);
        model.position.set(0, -1.2, 1.2);

        mixer = new THREE.AnimationMixer(model);
        animations = gltf.animations;

        let idleAnimation = animations[0];
        currentAction = mixer.clipAction(idleAnimation);
        currentAction.play();

        spine = model.getObjectByName('Spine');
        neck = model.getObjectByName('Neck');
        leftEye = model.getObjectByName('LeftEye');
        rightEye = model.getObjectByName('RightEye');

        // ***Set initial rotation BEFORE capturing it***
        model.rotation.order = "YXZ"; // Set rotation order (important!)
        model.rotation.y = 0;        // Initial yaw (horizontal)
        model.rotation.x = 0;        // Initial pitch (vertical) - looking at ground
        model.rotation.z = 0;        // Initial roll (twisting)

        initialModelRotation.copy(model.rotation); // *Now* capture the rotation

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

    leftEye = model.getObjectByName('LeftEye');
    rightEye = model.getObjectByName('RightEye');

    if (!leftEye || !rightEye) {
        console.log("Failed to find LeftEye or RightEye.");
        return;
    }

    startBlinkSequence();
}
