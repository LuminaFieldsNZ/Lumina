

function init() {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 0, 26);
  const loader5 = new THREE.TextureLoader();

  loader5.load('https://i.imgur.com/F3Qn6D9.jpeg', function(texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.background = texture;
  });
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 3, 6);
  camera.lookAt(0, 0, 0);

  // Ambient Light
     let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
     scene.add(ambientLight);

     // Directional Light
     let directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
     directionalLight.position.set(50, 100, 50); // Adjust position as needed
     scene.add(directionalLight);

     // Adjust camera far plane
     camera.far = 10000; // Set this according to the size of your scene
     camera.updateProjectionMatrix();

     // Adjust Spotlight
     let spotlight = new THREE.SpotLight(0xffffff, 1, 10000, Math.PI / 4, 0.5, 2);
     spotlight.position.set(0, 100, 0); // Adjust position as needed
     let spotlightTarget = new THREE.Object3D();
     spotlightTarget.position.set(0, 0, 0); // Set target position
     scene.add(spotlightTarget);
     spotlight.target = spotlightTarget;
     scene.add(spotlight);

     // Load the texture
     let textureLoader = new THREE.TextureLoader();
     textureLoader.load('https://i.imgur.com/k6vp66z.jpeg', function(texture) {
         // Texture is loaded and can be used
         let planeMaterial = new THREE.MeshBasicMaterial({
             side: THREE.DoubleSide,
             map: texture
         });

         // Create the plane geometry
         let planeGeometry = new THREE.PlaneGeometry(500, 500); // Adjust size as needed

         // Create the plane mesh
         let planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
         planeMesh.rotation.x = -Math.PI / 2; // Rotate to horizontal
         planeMesh.position.set(0, 0, 0); // Adjust position as needed
         planeMesh.visible = true; // Make the plane visible for debugging
         scene.add(planeMesh);

         // Define a mathematical plane for raycasting
         let plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0); // Plane at y = 0
     });


  let loader = new THREE.GLTFLoader();
  loader.load('https://luminafields.com/micheal.glb', function (gltf) {
    model = gltf.scene;
    scene.add(model);
    model.position.x += 3.6;
    mixer = new THREE.AnimationMixer(model);
    animations = gltf.animations;
    action = mixer.clipAction(animations[0]);
    action.setLoop(THREE.LoopRepeat);
    action.play();

    spine = model.getObjectByName('Spine');
    neck = model.getObjectByName('Neck');


  });


  loader.load('https://luminafields.com/city.glb', function (gltf) {
  city = gltf.scene;
  city.scale.set(0, 0, 0); // Adjust the 100 factor as needed
  scene.add(city);
  city.position.y += 0.2;
  // Perform any additional setup for the city model here
});


loader.load('https://luminafields.com/anya.glb', function (gltf) {
anya = gltf.scene;
scene.add(anya);
anya.scale.set(.8, .8, .8); // Adjust the 100 factor as needed
anya.position.x += -0.6;
anyaAnimations = gltf.animations; // Store animations

// ... after loading the gltf
if (gltf.animations) {
    walkAnimationIndex = gltf.animations.findIndex(anim => anim.name === 'walk'); // Replace 'walk' with the actual name of the walk animation
}

// Create an animation mixer for the anya model
    anyaMixer = new THREE.AnimationMixer(anya);

    // Assuming the first animation is the one you want to play
    if (gltf.animations && gltf.animations.length > 0) {
        anyaAction = anyaMixer.clipAction(gltf.animations[0]);
        anyaAction.play();
    } else {
        console.error('No animations found in anya.glb');
    }

 isAnyaLoaded = true;
// Perform any additional setup for the city model here
});

loader.load('https://luminafields.com/FelixGLB.glb', function (gltf) {
    felix = gltf.scene;
    scene.add(felix);
    felix.scale.set(.5, .5, .4); // Adjust the size as needed
    felix.position.x += 1.1;
    felix.position.z += 0.5;
    felix.rotation.y = 225;

    felixMixer = new THREE.AnimationMixer(felix);
    felixAnimations = gltf.animations; // Store Felix's animations in a global array

    // Play the first animation by default (if it exists)
    if (felixAnimations && felixAnimations.length > 0) {
        felixAction = felixMixer.clipAction(felixAnimations[0]);
        felixAction.play();
    } else {
        console.error('No animations found in FelixGLB.glb');
    }
    // ... rest of your setup for Felix
});


loader.load('https://luminafields.com/crycella.glb', function (gltf) {
    crycella = gltf.scene;
    scene.add(crycella);
    crycella.scale.set(.9, .9, .9); // Adjust the 100 factor as needed
    crycella.position.set(crycellaFixedPosition.x, crycellaFixedPosition.y, crycellaFixedPosition.z);
    crycella.rotation.y = THREE.Math.degToRad(crycellaFixedRotationY);

    // Create an animation mixer for the crycella model
    crycellaMixer = new THREE.AnimationMixer(crycella);

    if (gltf.animations && gltf.animations.length > 0) {
        crycellaAction = crycellaMixer.clipAction(gltf.animations[0]);
        crycellaAction.play();
    } else {
        console.error('No animations found in crycella.glb');
    }
});


loader.load('https://luminafields.com/booth.glb', function (gltf) {
booth = gltf.scene;
scene.add(booth);
booth.scale.set(3, 3, 3); // Adjust the 100 factor as needed
booth.rotation.y = 40;
booth.position.z += 6;
booth.position.x += 2;
booth.position.y += 1.6;
// Perform any additional setup for the city model here
});










loader.load('https://luminafields.com/knife.glb', function (gltf) {
  isKnifeLoaded = true;
knife = gltf.scene;
scene.add(knife);
knife.scale.set(.02, .02, .02); // Adjust the 100 factor as needed
knife.position.x += -6.2;
knife.position.z += 0.9;

// Perform any additional setup for the city model here
});

loader.load('https://luminafields.com/computers.glb', function (gltf) {
computers = gltf.scene;
computers.scale.set(5, 5, 5); // Adjust the 100 factor as needed
scene.add(computers);
computers.position.x += -1.2;
computers.position.y -= -0.6;
computers.position.z -= .5;
// Perform any additional setup for the city model here
});

loader.load('https://luminafields.com/altar.glb', function (gltf) {
    altar = gltf.scene;
    altar.scale.set(2, 2, 2); // Adjust the scale as needed
    scene.add(altar);
    altar.position.set(11.2, 1.2, 11.5); // Set position
    altar.rotation.y = 40; // Set rotation

    altar.traverse(function (child) {
        if (child.isMesh) {
            child.material.transparent = true;
            child.material.opacity = 0.9; // Adjust the opacity as needed
        }
    });

    // Perform any additional setup for the altar model here
});


loader.load('https://luminafields.com/gateway.glb', function (gltf) {
gateway = gltf.scene;
gateway.scale.set(4, 4, 4); // Adjust the 100 factor as needed
scene.add(gateway);
gateway.position.x += 11.2;
gateway.position.y += 1.9;
gateway.position.z += 11.5;
gateway.rotation.y = 40;

gateway.traverse(function (child) {
    if (child.isMesh) {
        child.material.transparent = true;
        child.material.opacity = 0.75; // Adjust the opacity as needed
    }
});
// Perform any additional setup for the city model here
});

loader.load('https://luminafields.com/candles.glb', function (gltf) {
candles = gltf.scene;
candles.scale.set(1, 1, 1); // Adjust the 100 factor as needed
scene.add(candles);
candles.position.x += 3.9;
candles.position.y += .4;
candles.position.z += 2.9;
// Perform any additional setup for the city model here
});



loader.load('https://luminafields.com/tree.glb', function (gltf) {
    let tree = gltf.scene;
    tree.scale.set(39, 39, 39);
    tree.position.set(-10.2, -2.15, 0);
    tree.position.y += 11.25;

    let light = new THREE.PointLight(0xffffff, 10, 100000); // Adjust color, intensity, and distance
    light.position.set(0, 5, 0); // Adjust light position relative to the tree
    tree.add(light);

    scene.add(tree);
});

function addRandomTrees(numberOfTrees) {
    const treeGridSize = 35; // Size of the grid
    const halfGridSize = treeGridSize / 2;
    const groundLevelY = 2; // Set this to the elevation where the ground is

    for (let i = 0; i < numberOfTrees; i++) {
        loader.load('https://luminafields.com/tree.glb', function (gltf) {
            let tree = gltf.scene;
            tree.scale.set(9, 9, 9);

            // Random position within the 30x30 grid
            let x = Math.random() * treeGridSize - halfGridSize; // Random X within [-15, 15]
            let z = Math.random() * treeGridSize - halfGridSize; // Random Z within [-15, 15]
            let y = groundLevelY; // Elevation at ground level

            tree.position.set(x, y, z);

            let light = new THREE.PointLight(0xffffff, 1, 100); // Adjust as needed
            light.position.set(0, 5, 0); // Position the light above the tree
            tree.add(light);

            scene.add(tree);
        });
    }
}


addRandomTrees(2);




loader.load('https://luminafields.com/building1.glb', function (gltf) {
building1 = gltf.scene;
building1.scale.set(12, 12, 12); // Adjust the 100 factor as needed
scene.add(building1);
building1.position.x += 5.2;
building1.position.z -= .5;
building1.position.y -= -4.7;
building1.rotation.y = 825;

// Perform any additional setup for the city model here
});

loader.load('https://luminafields.com/hobbitmountain.glb', function (gltf) {
hobbitmountain = gltf.scene;
hobbitmountain.scale.set(25, 25, 25); // Adjust the 100 factor as needed
scene.add(hobbitmountain);
hobbitmountain.position.x += -11.2;
hobbitmountain.position.z -= 25.5;
hobbitmountain.position.y -= -7.5;

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
