let scene, camera, renderer, controls, model, mixer, action, delta;
let clock = new THREE.Clock();
let animations, currentAnimationIndex = 0;
let spine, neck;
let mouse = new THREE.Vector2();
let targetRotation = new THREE.Vector3();
let allowHeadTracking = true;
let dropdown = document.getElementById('animation-selector');
let dropdownRect;

gsap.ticker.add(render);

document.addEventListener('DOMContentLoaded', (event) => {
  init();

  document.addEventListener('click', changeAnimation);
  document.addEventListener('touchstart', changeAnimation);

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('touchmove', onTouchMove);
});

function render() {
  delta = clock.getDelta();
  if (mixer) {
    mixer.update(delta);
  }
  if (spine && neck && allowHeadTracking) {
    spine.rotation.y += 0.01 * (targetRotation.y - spine.rotation.y);
    neck.rotation.y += 0.05 * (targetRotation.y - neck.rotation.y);
    spine.rotation.x += 0.09 * (targetRotation.x - spine.rotation.x);
    neck.rotation.x += 0.09 * (targetRotation.x - neck.rotation.x);
  }

  dropdownRect = dropdown.getBoundingClientRect();
  let dropdownScreenPos = {
    x: (dropdownRect.left + dropdownRect.width / 2) / window.innerWidth,
    y: (dropdownRect.top + dropdownRect.height / 2) / window.innerHeight
  };
  mouse.x = (dropdownScreenPos.x * 2) - 1;
  mouse.y = (dropdownScreenPos.y * 2) - 1;

  renderer.render(scene, camera);
}

function onMouseMove(event) {
  updateMousePosition(event.clientX, event.clientY);
}

function onTouchMove(event) {
  if (event.touches.length > 0) {
    updateMousePosition(event.touches[0].clientX, event.touches[0].clientY);
  }
}

function updateMousePosition(x, y) {
  mouse.x = (x / window.innerWidth) * 2 - 1;
  mouse.y = (y / window.innerHeight) * 2 - 1;
  targetRotation.x = (mouse.y * 0.5) * Math.PI;
  targetRotation.y = (mouse.x * 0.5) * Math.PI;
}

function init() {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 0, 16);
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 4);
  camera.lookAt(0, 0, 0);

  let ambient = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambient);
  let pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.position.z = 2500;
  scene.add(pointLight);

  let loader = new THREE.GLTFLoader();
  loader.load('https://luminafields.com/micheal3.glb', function (gltf) {
    model = gltf.scene;
    scene.add(model);
    model.position.y = -0.7;

    mixer = new THREE.AnimationMixer(model);
    animations = gltf.animations;
    action = mixer.clipAction(animations[currentAnimationIndex]);
    action.setLoop(THREE.LoopRepeat);
    action.play();

    spine = model.getObjectByName('Spine');
    neck = model.getObjectByName('Neck');
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
})();
