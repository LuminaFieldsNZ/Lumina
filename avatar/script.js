let scene, camera, renderer, controls, model, mixer, action, city, snowman, computers, delta;
let clock = new THREE.Clock();
let animations, currentAnimationIndex = 0;
let spine, neck;
let targetRotation = new THREE.Vector3();
let allowHeadTracking = true;
let dropdown = document.getElementById('animation-selector');
let dropdownRect;

let isSnowmanMoving = false;
let lastSnowmanMoveTime = Date.now();

gsap.ticker.add(render);

document.addEventListener('DOMContentLoaded', (event) => {
  init();

  document.addEventListener('click', changeAnimation);
  document.addEventListener('touchstart', changeAnimation);

  dropdown.addEventListener('change', function() {
    let selectedValue = parseInt(this.value);
    changeAnimation(selectedValue);
  });
});

function render() {
    delta = clock.getDelta();
    if (mixer) {
        mixer.update(delta);
    }

    if (spine && neck && allowHeadTracking) {
        let focusX, focusY;
        const currentTime = Date.now();

        if (snowman && (isSnowmanMoving || currentTime - lastSnowmanMoveTime < 3000)) {
            // Calculate focus point from snowman's position
            const snowmanScreenPos = toScreenPosition(snowman, camera);
            focusX = (snowmanScreenPos.x / window.innerWidth) * 2 - 1;
            focusY = -(snowmanScreenPos.y / window.innerHeight) * 2 + 1;
        } else {
            // Calculate focus point from dropdown's position
            dropdownRect = dropdown.getBoundingClientRect();
            focusX = ((dropdownRect.left + dropdownRect.width / 2) / window.innerWidth) * 2 - 1;
            focusY = -((dropdownRect.top + dropdownRect.height / 2) / window.innerHeight) * -2;
        }

        targetRotation.x = focusY;
        targetRotation.y = focusX;

        // Apply rotations to spine and neck
        spine.rotation.y += 0.4 * (targetRotation.y - spine.rotation.y);
        neck.rotation.y += 0.3 * (targetRotation.y - neck.rotation.y);
        spine.rotation.x += 0.4 * (targetRotation.x - spine.rotation.x);
        neck.rotation.x += 0.4 * (targetRotation.x - neck.rotation.x);
    }

    renderer.render(scene, camera);
}



function toScreenPosition(obj, camera) {
    const vector = new THREE.Vector3();
    const canvas = renderer.domElement;

    obj.updateMatrixWorld();
    vector.setFromMatrixPosition(obj.matrixWorld);
    vector.project(camera);

    vector.x = (vector.x + 1) * canvas.width / 2;
    vector.y = -(vector.y - 1) * canvas.height / 2;

    return { x: vector.x, y: vector.y };
}


function init() {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 0, 16);
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 3, 6);
  camera.lookAt(0, 0, 0);

  let ambient = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambient);
  let pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.position.z = 2500;
  scene.add(pointLight);

  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 1024;  // Shadow map resolution width
  pointLight.shadow.mapSize.height = 1024; // Shadow map resolution height

  // Spotlight setup
let spotlight = new THREE.SpotLight(0xffffff, 1); // White light with full intensity
spotlight.position.set(0, 12500, 0); // Adjust the position as needed

// Creating a target object for the spotlight
let spotlightTarget = new THREE.Object3D();
spotlightTarget.position.set(0, 0, 0); // Set this to the center or focus area of your city
scene.add(spotlightTarget);

spotlight.target = spotlightTarget;

// Adjust these properties as needed
spotlight.angle = Math.PI / 4;
spotlight.penumbra = 0.5;
spotlight.decay = 2;
spotlight.distance = 0; // No limit to the distance of the light


scene.add(spotlight);


  let loader = new THREE.GLTFLoader();
  loader.load('https://luminafields.com/micheal3.glb', function (gltf) {
    model = gltf.scene;
    scene.add(model);
    model.position.y = -0.7;
    mixer = new THREE.AnimationMixer(model);
    animations = gltf.animations;
    action = mixer.clipAction(animations[1]);
    action.setLoop(THREE.LoopRepeat);
    action.play();

    spine = model.getObjectByName('Spine');
    neck = model.getObjectByName('Neck');


  });


  loader.load('https://luminafields.com/city.glb', function (gltf) {
  city = gltf.scene;
  city.scale.set(60, 60, 60); // Adjust the 100 factor as needed
  scene.add(city);
  city.position.y += 8.2;
  // Perform any additional setup for the city model here
});

loader.load('https://luminafields.com/snowman.glb', function (gltf) {
snowman = gltf.scene;
snowman.scale.set(3, 3, 3); // Adjust the 100 factor as needed
scene.add(snowman);
snowman.position.x += 2.2;
snowman.rotation.y = 525;

// Perform any additional setup for the city model here
});

loader.load('https://luminafields.com/computers.glb', function (gltf) {
computers = gltf.scene;
computers.scale.set(5, 5, 5); // Adjust the 100 factor as needed
scene.add(computers);
computers.position.x += -1.2;
computers.position.y -= .1;
computers.position.z -= .5;
// Perform any additional setup for the city model here
});

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById("app").appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  dropdown.addEventListener('change', function() {
    let selectedValue = parseInt(this.value);
    changeAnimation(selectedValue);
  });
}

function changeAnimation(animationIndex) {
  if (mixer && animations[animationIndex]) {
    action.stop();
    currentAnimationIndex = animationIndex;
    action = mixer.clipAction(animations[currentAnimationIndex]);
    action.setLoop(THREE.LoopRepeat);
    action.play();
  }
}

(function makeDropdownMovable() {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  let elmnt = document.getElementById("dropdown-container");
  let handle = document.getElementById("drag-handle");

  handle.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }


handle.addEventListener('touchstart', dragStart, false);
handle.addEventListener('touchend', dragEnd, false);
handle.addEventListener('touchmove', drag, false);

function dragStart(e) {
    e.preventDefault();
    if (e.touches.length == 1) { // Only deal with one finger
        var touch = e.touches[0]; // Get the information for finger #1
        pos3 = touch.pageX;
        pos4 = touch.pageY;
    }
}

function drag(e) {
    e.preventDefault();
    if (e.touches.length == 1) { // Only deal with one finger
        var touch = e.touches[0]; // Get the information for finger #1
        pos1 = pos3 - touch.pageX;
        pos2 = pos4 - touch.pageY;
        pos3 = touch.pageX;
        pos4 = touch.pageY;
        // Move your element
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
}

function dragEnd(e) {
    e.preventDefault();
    // Stop moving when finger is removed
}


function onDocumentMouseMove(event) {
    if (isSnowmanMoving) {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        // Create a raycaster
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);

        // Define a horizontal plane at the snowman's height
        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -snowman.position.y);

        // Find where the ray intersects the plane
        const target = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, target);

        if (target) {
            // Move snowman to the intersection point
            snowman.position.x = target.x;
            snowman.position.z = target.z;
        }

        lastSnowmanMoveTime = Date.now();
    }
}


function onDocumentMouseDown(event) {
    // Check if the dropdown or its children are clicked
    if (event.target.closest('#dropdown-container')) {
        // Click is inside dropdown, do not proceed with dragging logic
        return;
    }

    // Calculate mouse position in normalized device coordinates
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Set up a raycaster
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // Check if the snowman is intersected by the ray
    const intersects = raycaster.intersectObject(snowman, true);

    if (intersects.length > 0) {
        // The snowman was clicked
        isSnowmanMoving = true;
        controls.enabled = false;
        event.preventDefault(); // Prevent default only if snowman is clicked
    }
}



function onDocumentMouseUp(event) {
    isSnowmanMoving = false;
    controls.enabled = true;
}

document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('mouseup', onDocumentMouseUp, false);


})();
