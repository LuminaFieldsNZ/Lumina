let checkLogin = false;

document.addEventListener('DOMContentLoaded', function() {
    // Automatically load player0.json on page load
    loadPlayerJson();
});


function loadPlayerJson() {
    setTimeout(function() {
        const chatWindow = document.getElementById('chatWindow');
        const importMessage = '<font style="color:lightgreen;">Please import a file to continue.</font><br>';
        chatWindow.innerHTML += importMessage;

        var time = new Date().getHours();
        var greeting, joke;

        if (time < 12) {
            greeting = "Good morning";
        } else if (time < 18) {
            greeting = "Good afternoon";
        } else {
            greeting = "Good evening";
        }

        var messages = {
            "default": [
                "Welcome to the dark web of our website! Explore, if you dare.",
                "Enjoy your experience, and remember: not all bugs are unintentional.",
                "Why did the hacker cross the road? To exploit the vulnerability on the other side.",
                "How do hackers stay cool? They open Windows.",
                "I'm writing a book on hacking passwords. It's a real page-turner, especially for IT security.",
                "Why did the hacker get thrown out of the restaurant? He kept trying to steal the server.",
                "I told my computer I needed a break. Now it won't stop sending ransom notes.",
            ],
            "mobile": [
                "I've optimized your mobile experience, but remember, even mobile phones can't escape hacks.",
                "Discover our mobile-friendly features, but beware of the hidden exploits.",
                "Why did the smartphone break up with its owner? It found a better connection.",
                "What do you call a phone that hacks other phones? A phreaking smartphone.",
                "I told my phone to stop eavesdropping on me. Now it just gives me the silent treatment.",
                "I'm reading a book on mobile security. It's an eye-opener, literally.",
                "I'm reading a book on the dark side of app development. It's a suspenseful thriller.",
            ],
            "Apple": [
                "Ah, an Apple device! Prepare for a byte of a different kind.",
                "Did you hear about the Apple device that went rogue? It became a bad apple.",
                "I told my wife she should embrace her programming mistakes. She gave me a kernel panic.",
                "Why don't Apple devices make good spies? They can't keep things under iCloud.",
                "I'm reading a book on hacking Apple IDs. It's password-protected, though.",
                "I'm reading a book on the secrets of the Apple ecosystem. It's a forbidden fruit.",
                "I'm reading a book on Apple's privacy policies. It's more fiction than science.",
            ],
            "Windows": [
                "Using Windows? Have you considered encrypting your life?",
                "Why not make your life easier? Try Linux today, before Windows tries to update again.",
                "I told my wife she should embrace her coding mistakes. She gave me a blue screen of silence.",
                "Why did the computer go to therapy? It had too many unresolved issues.",
                "I'm reading a book on breaking through Windows firewalls. It's a real smash hit.",
                "I'm reading a book on the secret life of Windows updates. It's a horror story.",
                "I'm reading a book on hacking with Windows. It's a maze of vulnerabilities.",
            ]
        };


        var deviceType = getDeviceType(); // Replace with actual device detection logic
        var randomMessage = messages[deviceType] || messages["default"];
        var message = randomMessage[Math.floor(Math.random() * randomMessage.length)];

        const initialMessage = '<p>' + botname + ': ' + greeting + ' and welcome to LuminaFields ' + userId + '. ' + message + '</p>';
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

      // Set the current animation to index 5 (animation 6)
      currentAnimationIndex = 5;
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
  loader.load('https://luminafields.com/crycella.glb', function (gltf) {
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
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById("app").appendChild(renderer.domElement);
  gsap.ticker.add(render);
}