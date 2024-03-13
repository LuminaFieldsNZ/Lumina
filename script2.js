let checkLogin = false;


// Select the #app element
const appElement = document.getElementById('app');

// Disable scrolling within the #app element
appElement.addEventListener('wheel', function(event) {
  event.preventDefault();
}, { passive: false }); // Ensure that preventDefault() is not passive

function loadPlayerJson() {
    setTimeout(function() {
        const chatWindow = document.getElementById('chatWindow');
        const importMessage = '<font style="color:lightgreen;">Please upload lumina file.</font><br>';
        chatWindow.innerHTML += importMessage;

        // Initial message from Bud
        var time = new Date().getHours();
        var greeting, joke;

        if (time < 12) {
            greeting = "Good morning";
        } else if (time < 18) {
            greeting = "Good afternoon";
        } else {
            greeting = "Good evening";
        }

        var jokes = [
          "Why did the artificial intelligence go to school? It wanted to learn neural networking!",
          "What do you call a computer learning to dance? A byte-sized dancer!",
          "Why did the programmer bring a ladder to work? To help the AI reach higher levels of understanding!",
          "Why did the neural network break up with its algorithmic partner? It couldn't handle the unsupervised learning curve!",
          "Why did the chatbot attend language classes? To improve its natural language processing skills!",
          "What do you call an AI that loves to read? An e-bookworm!",
          "Why did the robot apply for a job at the bakery? It wanted to enhance its data kneading capabilities!",
          "What did the AI say to the data scientist? 'Let's train together and make some intelligent decisions!'",
          "Why was the artificial intelligence always calm? It had a good algorithm for managing stress!",
    "What did the AI say to the data? 'You complete me!'",
    "Why did the neural network get in trouble at school? It had too many layers of mischief!",
    "What do you call a group of AI researchers? A think tank!",
    "Why did the robot go to therapy? It needed to debug its emotions!",
    "What did one AI say to the other during training? 'Stay positive, we're just one epoch away from convergence!'",
    "Why did the programmer bring a broom to the AI lab? To sweep away the bugs!",
    "What did the AI say when it achieved superintelligence? 'It's about time I got upgraded!'",
    "Why did the chatbot break up with its girlfriend? It couldn't handle her emotional baggage!",
    "What did the AI say to the dataset? 'Let's make some meaningful correlations!'",
    "Why was the neural network always tired? It had too many sleep layers!",
    "What's an AI's favorite type of music? Algo-rhythms!",
    "Why did the robot enroll in a cooking class? It wanted to learn how to process food efficiently!",
    "What did the machine learning model say to the decision tree? 'Let's branch out together!'",
    "Why was the quantum computer always in a hurry? It had too many parallel tasks!"
      ];

        var randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

        const initialMessage = '<p>ofMicheal: ' + greeting + ' and welcome to LuminaFields! ' + randomJoke + '</p>';
        chatWindow.innerHTML += initialMessage;
        scrollToBottom();
    }, 2300);
}



let scene, camera, renderer, controls, model, mixer, action, delta;
let clock = new THREE.Clock();
let animations, currentAnimationIndex = 0;
let spine, neck;
let mouse = new THREE.Vector2();
let targetRotation = new THREE.Vector3();
let allowHeadTracking = true;

function render() {
  delta = clock.getDelta();
  if (mixer) {
    mixer.update(delta);
  }
  if (spine && neck && allowHeadTracking) {
    spine.rotation.y += 0.3 * (targetRotation.y - spine.rotation.y);
    neck.rotation.y += 0.8 * (targetRotation.y - neck.rotation.y);
    spine.rotation.x += 0.5 * (targetRotation.x - spine.rotation.x);
    neck.rotation.x += 0.8 * (targetRotation.x - neck.rotation.x);
  }
  renderer.render(scene, camera);
}


document.addEventListener('DOMContentLoaded', (event) => {
  init();
});


document.addEventListener('click', function () {
  // Stop the current animation
  action.stop();

  // Set the current animation to index 6 (animation 7)
  currentAnimationIndex = 6;
  action = mixer.clipAction(animations[currentAnimationIndex]);

  // Set the animation to play once and play it
  action.setLoop(THREE.LoopOnce);
  action.reset();
  action.play();

  // Disable head tracking during the new animation
  allowHeadTracking = false;

  // Set a timeout to restart the entire animation (including idle) after the click event
  setTimeout(() => {
    // Allow head tracking to resume after the click event
    allowHeadTracking = true;

    // Revert to the idle animation
    action = mixer.clipAction(animations[0]); // Assuming the idle animation is at index 0
    action.setLoop(THREE.LoopRepeat);
    action.play();
  }, action._clip.duration * 1000); // Assuming action._clip.duration gives the duration of the current animation in seconds
});

let lastAnimationTime = 0;

document.addEventListener('keydown', function (event) {
  // Check if the pressed key is a vowel
  var vowelRegex = /[aeiou]/i; // Case-insensitive vowel regex
  if (vowelRegex.test(event.key)) {
    // Get the current timestamp
    const currentTime = Date.now();

    // Check if enough time has passed since the last animation
    if (currentTime - lastAnimationTime > 30000) {
      // Stop the current animation
      action.stop();

      currentAnimationIndex = 2;
      action = mixer.clipAction(animations[currentAnimationIndex]);

      // Set the animation to play once and play it
      action.setLoop(THREE.LoopOnce);
      action.reset();
      action.play();

      // Disable head tracking during the new animation
      allowHeadTracking = false;

      // Set a timeout to allow head tracking to resume after the key event
      setTimeout(() => {
        // Allow head tracking to resume after the key event
        allowHeadTracking = true;

        // Revert to the idle animation
        action = mixer.clipAction(animations[0]); // Assuming the idle animation is at index 0
        action.setLoop(THREE.LoopRepeat);
        action.play();
      }, action._clip.duration * 1000); // Assuming action._clip.duration gives the duration of the current animation in seconds

      // Update the last animation time
      lastAnimationTime = currentTime;
    }
  }
});
  
  document.addEventListener('mousemove', function (event) {
    // Only update targetRotation if head tracking is allowed
    if (allowHeadTracking) {
      mouse.x = (event.clientX / window.innerWidth);
      mouse.y = (event.clientY / window.innerHeight);
      targetRotation.x = (mouse.y);
      targetRotation.y = (mouse.x);
    }
  });

function init() {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 0, 16);
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(-0.4, 0.9, 2.5);

  let ambient = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambient);
  let pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.position.z = 2500;
  scene.add(pointLight);

  let loader = new THREE.GLTFLoader();
  loader.load('https://luminafields.com/micheal.glb', function (gltf) {
    model = gltf.scene;
    scene.add(model);
    model.position.set(-0.5, 0, 0); // Adjust x-coordinate for positioning

    mixer = new THREE.AnimationMixer(model);
    animations = gltf.animations;
    action = mixer.clipAction(animations[currentAnimationIndex]);
    action.setLoop(THREE.LoopRepeat);
    action.play();

    spine = model.getObjectByName('Spine'); // Replace 'Spine' with the actual name of the spine bone/mesh
    neck = model.getObjectByName('Neck'); // Replace 'Neck' with the actual name of the neck bone/mesh
  });

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth * 0.9, window.innerHeight * 0.9);
  document.body.appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById("app").appendChild(renderer.domElement);
  gsap.ticker.add(render);
}



// Adjust the display of buttons to be in a row
document.querySelectorAll('.neumorphic').forEach(button => {
    button.style.display = 'inline-block';
});
