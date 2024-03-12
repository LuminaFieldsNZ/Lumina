let checkLogin = false;
let inventory;
document.getElementById("backstory").innerHTML = `
<h1>Dakota Calligaris</h1>
    
    <h2>Sanitization Supervisor</h2>
    <p>An employee who is fixated on maintaining impeccable cleanliness within the distillery. They are responsible for overseeing the sanitization of all equipment used in the distillation process, ensuring that every component is kept in a pristine condition.</p>

    <h2>Backstory</h2>
    <p>Dakota Calligaris, the Sanitization Supervisor, developed a keen interest in maintaining cleanliness and hygiene from an early age. Their commitment to ensuring impeccable cleanliness within the distillery led them to become an essential figure at Bramble Twist Botanicals. Dakota's expertise in overseeing the sanitization of all equipment used in the distillation process has been vital in upholding the highest standards of hygiene at the distillery.</p>

    <h2>Personality</h2>
    <p>In the sterile symphony of Bramble Twist, Dakota Calligaris moves with the measured tread of a guardian, every step echoing their unwavering vigilance over the pristine domain of cleanliness. Hygiene runs in their veins, a meticulous dance of protocols and procedures is their daily ritual. Each sanitized surface, each gleaming instrument, sings a silent hymn to their methodical nature, a testament to their unwavering belief that order forms the foundation of quality. Yet, beneath the calm exterior lies a simmering well of competitiveness. Whispers of rivals and threats to their role can spark a fierce determination to prove their indispensability. Any disruption to their established methods - be it a colleague's suggestion or a modernization effort Dakota deems unsubstantiated - can trigger inflexibility, their voice rising in defense of the well-worn path. This rigidity can create friction, particularly with Avery, whose focus on water purity clashes with Dakota's emphasis on equipment cleanliness. However, this same tenacity fosters a strong alliance with Taylor, their shared dedication to quality forming a bridge across departmental divides. Remember, Dakota is a paradox - a meticulous guardian of order, fueled by an undercurrent of competitiveness, their actions driven by an unwavering belief that true quality lies in the relentless pursuit of pristine sanitation. As you navigate the intricate world of Bramble Twist Botanicals, remember that the gleaming surfaces hold their secrets, and none may be deeper than the vigilant spirit of Dakota Calligaris.</p>

    <h2>Day-to-Day Glimpse</h2>
    <p>Dakota's days are dedicated to meticulously supervising the sanitization of all equipment used in the distillation process. They ensure that every component is kept in a pristine condition, adhering to strict cleanliness protocols and industry standards. Dakota also leads training sessions to educate employees on proper sanitization procedures.</p>

    <h2>Relationships</h2>
    <p>Dakota has a strained relationship with Avery, the Water Purification Expert, due to their constant conflicting opinions on the best practices for ensuring the purity of the water and equipment in the distillery. This strained relationship often leads to tense interactions, as they both strive to uphold their respective standards for cleanliness. Dakota is friendly with Taylor Banks, the Quality Assurance Chemist, where they often support each other’s concepts professionally to guarantee the quality of Bramble Twist’s products.</p>

    <h2>Motivation to Poison a Batch</h2>
    <p>A reason for Dakota to consider poisoning a batch could be linked to a desire for professional advancement. If they feel that their expertise in sanitization is undervalued or if they perceive a threat to the cleanliness standards, they might contemplate sabotage as a drastic measure to prove the importance of their role in maintaining hygiene within the distillery.</p>

`;

  
    document.addEventListener('DOMContentLoaded', function() {
        // Automatically load player1.json on page load
        loadPlayerJson();
    });


    function loadPlayerJson() {
        fetch('players/player6.json') // Replace with the actual path to player1.json on your server
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

    let inventory2 = 'https://mfglife.github.io/key.glb';

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
