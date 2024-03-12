let checkLogin = false;
let inventory;
document.getElementById("backstory").innerHTML = `
<h2>Avery Warner</h2>
<p> Water Purification Expert: An employee focused on the purification of water used in the distillation process, ensuring that only the purest water is employed to create the highest quality products.</p>
<h3>Backstory:</h3>
<p>Avery, the Water Purification Expert, developed a passion for water science and purification techniques early in their career. Their commitment to ensuring the distillery's water purity led them to become an indispensable member of the Bramble Twist Botanicals team. Avery's expertise in water purification has been vital in maintaining the highest standards for the water used in the distillation process.</p>
<h3>Personality:</h3>
<p>Avery Warner navigates the distillery with the measured tread of a scientist, their every step guided by an unwavering devotion to the purity of water. Methodical precision runs through their veins, evident in the meticulous attention they pay to protocols and procedures. Each valve turn, each filter change, is a carefully orchestrated dance, a ritual ensuring only the most pristine water graces the Bramble Twist distillation process. This dedication fuels their tenacity, an unyielding spirit that refuses to settle for anything less than perfection. When faced with opposition, particularly from Dakota Calligaris, whose contrasting methods spark frequent clashes, Avery stands firm, their principles etched in every fiber of their being. Yet, beneath the surface of unwavering resolve lies a wellspring of resourcefulness. Faced with unforeseen challenges, Avery taps into a hidden reservoir of ingenuity, devising innovative solutions that push the boundaries of water purification. However, a veil of secrecy shrouds their methods, hinting at past experiences that have instilled a guarded nature. Whispers of hidden research papers and obscure patents add to the enigma, fueling speculation about the true depths of Avery's expertise and the motivations that might drive them to consider sabotage. Remember, Avery is a paradox - a meticulous guardian of purity cloaked in secrecy, their actions driven by unwavering principles, a thirst for innovation, and the lingering echoes of a past shrouded in mystery. As you navigate the intricate world of Bramble Twist Botanicals, remember the water that flows through its veins holds secrets, and none may be deeper than those held by Avery Warner.</p>
<h3>Day-to-Day Glimpse:</h3>
<p>Avery's days are dedicated to overseeing the purification of water used in the distillation process. They meticulously monitor and optimize the water purification systems, ensuring that only the purest water is employed to create the highest quality distilled products.</p>
<h3>Relationships:</h3>
<p>Avery and Dakota Calligaris have a deep dislike for one another due to their constant conflicting opinions on the best practices for ensuring the purity of the water and equipment in the distillery. Their disagreements often lead to tense interactions, as they both strive to uphold their respective standards for water and equipment cleanliness. Despite working towards a common goal, their differing approaches have created a palpable animosity between them. Avery gets along well with Sklar Banks as they often share insights and work collaboratively together regarding water purification and its history.</p>
<h3>Motivation to Poison a Batch:</h3>
<p>A reason for Avery to consider poisoning a batch could be linked to their personal vendetta against Dakota Calligaris. Avery feels they have faced unjust mistreatment by Bramble Twist Botanicals for choosing to listen to Dakota over them. They have contemplated sabotage as a means of seeking retribution. This motivation could stem from a perceived lack of support or recognition for their expertise in water purification, leading to feelings of resentment and a desire to retaliate against the distillery and Dakota.</p>
<h3>Secret Connection Hint:</h3>
<p>A subtle hint to Avery's secret connection could be a hidden research paper or patent related to an innovative water purification technique that holds significance to their motivations and expertise.</p>

`;

  
    document.addEventListener('DOMContentLoaded', function() {
        // Automatically load player1.json on page load
        loadPlayerJson();
    });


    function loadPlayerJson() {
        fetch('players/player4.json') // Replace with the actual path to player1.json on your server
            .then(response => response.json())
            .then(playerData => {
                // Handle the loaded player data as needed
                handlePlayerData(playerData);
                updateAppWithData(playerData);

            checkLogin = true;
            if (checkLogin === true){
                const chatWindow = document.getElementById('chatWindow');
                chatWindow.innerHTML += '<font style="color:lightgreen;">' + userId + ' is logged in.</font><br>';


// Initial message from Profane
setTimeout(function() {

    
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
    
        const initialMessage = '<p>Profane: ' + greeting + ' ' + userId + '. ' + message + '</p>';
        chatWindow.innerHTML += initialMessage;
        scrollToBottom();
    }, 2300);

            }
            })
            .catch(error => {
                console.error('Error loading player1.json:', error);
            });
    }

    function handlePlayerData(playerData) {
        // Implement your logic to handle the player data here
        console.log('Loaded Player Data:', playerData);
        // For example, update the userData and display
        updateUserData(playerData.userData);
        updateJSONDisplay();
    }
// Slide 2
let scene2, camera2, renderer2, controls2, model2;

initSlide2();
animate2();

function initSlide2() {
    scene2 = new THREE.Scene();

    camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera2.position.z = 0.5;

    renderer2 = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer2.setSize(window.innerWidth, window.innerHeight);

    const canvasContainer2 = document.getElementById('carousel-slide-2');
    const canvasElement2 = renderer2.domElement;
    canvasContainer2.appendChild(canvasElement2);

    let ambientLight2 = new THREE.AmbientLight(0xffffff, 3.5);
    scene2.add(ambientLight2);

    let directionalLight2 = new THREE.DirectionalLight(0xffffff, 3.8);
    directionalLight2.position.set(50, 100, 50);
    scene2.add(directionalLight2);

    let spotlight2 = new THREE.SpotLight(0xffffff, 1, 10000, Math.PI / 4, 0.5, 2);
    spotlight2.position.set(0, 100, 0);
    let spotlightTarget2 = new THREE.Object3D();
    spotlightTarget2.position.set(0, 0, 0);
    scene2.add(spotlightTarget2);
    spotlight2.target = spotlightTarget2;
    scene2.add(spotlight2);

    let inventory2 = 'https://mfglife.github.io/distillery.glb';

    const loader2 = new THREE.GLTFLoader();
    loader2.load(inventory2, function (gltf) {
        model2 = gltf.scene;
        scene2.add(model2);
    });

    controls2 = new THREE.OrbitControls(camera2, canvasElement2);
}

function animate2() {
    requestAnimationFrame(animate2);
    controls2.update();
    renderer2.render(scene2, camera2);
}

window.addEventListener('resize', function () {
    camera2.aspect = window.innerWidth / window.innerHeight;
    camera2.updateProjectionMatrix();
    renderer2.setSize(window.innerWidth, window.innerHeight);
});

// Slide 3
let scene3, camera3, renderer3, controls3, model3;

initSlide3();
animate3();

function initSlide3() {
    scene3 = new THREE.Scene();

    camera3 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera3.position.z = 0.5;

    renderer3 = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer3.setSize(window.innerWidth, window.innerHeight);

    const canvasContainer3 = document.getElementById('carousel-slide-3');
    const canvasElement3 = renderer3.domElement;
    canvasContainer3.appendChild(canvasElement3);

    let ambientLight3 = new THREE.AmbientLight(0xffffff, 3.5);
    scene3.add(ambientLight3);

    let directionalLight3 = new THREE.DirectionalLight(0xffffff, 3.8);
    directionalLight3.position.set(50, 100, 50);
    scene3.add(directionalLight3);

    let spotlight3 = new THREE.SpotLight(0xffffff, 1, 10000, Math.PI / 4, 0.5, 2);
    spotlight3.position.set(0, 100, 0);
    let spotlightTarget3 = new THREE.Object3D();
    spotlightTarget3.position.set(0, 0, 0);
    scene3.add(spotlightTarget3);
    spotlight3.target = spotlightTarget3;
    scene3.add(spotlight3);

    let inventory3 = 'https://luminafields.com/altar.glb';

    const loader3 = new THREE.GLTFLoader();
    loader3.load(inventory3, function (gltf) {
        model3 = gltf.scene;
        model3.position.x -= 0.2; // Move the model to the left by 0.2 units for slide 3
        scene3.add(model3);
    });

    controls3 = new THREE.OrbitControls(camera3, canvasElement3);
}

function animate3() {
    requestAnimationFrame(animate3);
    controls3.update();
    renderer3.render(scene3, camera3);
}

window.addEventListener('resize', function () {
    camera3.aspect = window.innerWidth / window.innerHeight;
    camera3.updateProjectionMatrix();
    renderer3.setSize(window.innerWidth, window.innerHeight);
});

// Slide 4
let scene4, camera4, renderer4, controls4, model4;

initSlide4();
animate4();

function initSlide4() {
    scene4 = new THREE.Scene();

    camera4 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera4.position.z = 0.5;

    renderer4 = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer4.setSize(window.innerWidth, window.innerHeight);

    const canvasContainer4 = document.getElementById('carousel-slide-4');
    const canvasElement4 = renderer4.domElement;
    canvasContainer4.appendChild(canvasElement4);

    let ambientLight4 = new THREE.AmbientLight(0xffffff, 3.5);
    scene4.add(ambientLight4);

    let directionalLight4 = new THREE.DirectionalLight(0xffffff, 3.8);
    directionalLight4.position.set(50, 100, 50);
    scene4.add(directionalLight4);

    let spotlight4 = new THREE.SpotLight(0xffffff, 1, 10000, Math.PI / 4, 0.5, 2);
    spotlight4.position.set(0, 100, 0);
    let spotlightTarget4 = new THREE.Object3D();
    spotlightTarget4.position.set(0, 0, 0);
    scene4.add(spotlightTarget4);
    spotlight4.target = spotlightTarget4;
    scene4.add(spotlight4);

    let inventory4 = 'https://luminafields.com/gateway.glb';

    const loader4 = new THREE.GLTFLoader();
    loader4.load(inventory4, function (gltf) {
        model4 = gltf.scene;
        model4.position.x -= 0.2; // Move the model to the left by 0.2 units for slide 4
        scene4.add(model4);
    });

    controls4 = new THREE.OrbitControls(camera4, canvasElement4);
}

function animate4() {
    requestAnimationFrame(animate4);
    controls4.update();
    renderer4.render(scene4, camera4);
}

window.addEventListener('resize', function () {
    camera4.aspect = window.innerWidth / window.innerHeight;
    camera4.updateProjectionMatrix();
    renderer4.setSize(window.innerWidth, window.innerHeight);
});
