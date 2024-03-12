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
        const importMessage = '<font style="color:lightgreen;">Please upload a dataPack.</font><br>';
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
            "Why did the marijuana plant go to therapy? It had too many high thoughts.",
            "What do you call a stoned gardener? A pot-plant-er.",
            "Why don't plants play hide and seek with marijuana plants? Because they always get found in the pot.",
            "What's a marijuana plant's favorite movie? The Lord of the Rings: The Two Tokes.",
            "Why did the marijuana plant fail the job interview? It couldn't stop talking about its pot-ential.",
            "How does a marijuana plant party? It turns up the weed and hits the dance floor.",
            "What's a marijuana plant's favorite snack? Weedies!",
            "Why did the marijuana plant always get invited to parties? It was a real hit!",
        "What's a stoner's favorite type of footwear? High heels!",
        "Why did the marijuana plant break up with its girlfriend? It just couldn't commit to a pot-ential relationship.",
        "What do you call a group of stoners stuck on a deserted island? The High-larious Five!",
        "How do marijuana plants make friends? They just leaf a good impression!",
        "What's a marijuana plant's favorite game? Weedopoly!",
        "Why did the marijuana plant get promoted? It was outstanding in its field!",
        "What's a stoner's favorite board game? Ganja-grams!",
        "Why did the marijuana plant become a lawyer? It had a high degree of success!",
        "What do you call a marijuana plant with a law degree? A high-functioning attorney!",
        "Why was the marijuana plant so good at math? It was always multiplying!",
        "How did the marijuana plant win the race? It took a shortcut through the pot-hole!",
        "What do you call a marijuana plant with a broken leg? A pot-cast!",
        "Why did the marijuana plant go to space? It wanted to be a little higher!",
        "What's a marijuana plant's favorite subject in school? History, because it's rooted in the past!",
        "Why did the marijuana plant go to the bar? It heard they had a great pot-stirrer!",
        "What's a marijuana plant's favorite type of music? Rock 'n' Roll-ups!",
        "Why did the marijuana plant become a comedian? It had a lot of good pot-laughs!",
        "What's a marijuana plant's favorite TV show? Breaking Bud!",
        "Why did the marijuana plant go to the gym? It wanted to get ripped!"
        ];

        var randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

        const initialMessage = '<p>Bud: ' + greeting + ' and welcome! ' + randomJoke + '</p>';
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
    neck.rotation.y += 0.3 * (targetRotation.y - neck.rotation.y);
    spine.rotation.x += 0.3 * (targetRotation.x - spine.rotation.x);
    neck.rotation.x += 0.3 * (targetRotation.x - neck.rotation.x);
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
  currentAnimationIndex = 2;
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

      currentAnimationIndex = 1;
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
  camera.position.set(0, 1, 3);

  let ambient = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambient);
  let pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.position.z = 2500;
  scene.add(pointLight);

  let loader = new THREE.GLTFLoader();
  loader.load('https://luminafields.com/bud.glb', function (gltf) {
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