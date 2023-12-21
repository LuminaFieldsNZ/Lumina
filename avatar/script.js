/* --------------------------
* THREE JS EXPERIMENT
* Waving Character
* -------------------------- */

/* --------------------------
* GENERAL VARIABLES
* -------------------------- */

let scene,
  camera,
  renderer,
  controls,
  model,
  mixer,
  action,
  delta;

let clock = new THREE.Clock();

let waveButton = document.querySelector('.wave-button');

// Add Greensock Ticker
gsap.ticker.add(render);


/* --------------------------
 * INIT
 * -------------------------- */

function init() {

  /**
   * Scene
   */
  scene = new THREE.Scene();
  /**
  scene.background = new THREE.Color(0xffffff);
   */
  scene.fog = new THREE.Fog(0x000000, 0, 16);


  /**
   * Camera
   */

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 0, 4);
  camera.lookAt(0, 0, 0);


  /**
   * Ambient Light
   */

  // Ambient Light
  ambient = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambient);


  /**
   * POINT LIGHTS
   */

  pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.position.z = 2500;
  scene.add(pointLight);

  var pointLight2 = new THREE.PointLight(0xffffff, 1);
  camera.add(pointLight2);

  var pointLight3 = new THREE.PointLight(0xffffff, 0.5);
  pointLight3.position.x = - 1000;
  pointLight3.position.z = 1000;
  scene.add(pointLight3);


  /**
   * Load Character
   */

  var loader = new THREE.GLTFLoader();

  loader.load('https://luminafields.com/micheal2.glb', function (gltf) {

    model = gltf.scene;
    model.traverse(o => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });

    scene.add(model);
    model.position.y = -0.7


    /**
     * Load Character Animations
     */

    mixer = new THREE.AnimationMixer(model);
    action = mixer.clipAction(gltf.animations[0]);
    action.setLoop(THREE.LoopOnce);
    action.play();

    /**
     * Add Event Listeners For Interactivity
     */


     model.traverse(o => {

       if (o.isMesh) {
         o.castShadow = true;
         o.receiveShadow = true;
       }
       // Reference the neck and waist bones
       if (o.isBone && o.name === 'Neck') {
         neck = o;
       }
       if (o.isBone && o.name === 'Spine') {
         waist = o;
       }
     });

    document.addEventListener('mousedown', characterWave, false);
    document.addEventListener("touchstart", characterWave, false);

    function characterWave(event) {
      // Total duration of the clip
      let clipDuration = action._clip.duration;

      // Allow the action to restart a little before the end of the animation
      if (action.time >= clipDuration  - 1.25) {
          action.stop();
          action.play();
      }
    }

    document.addEventListener('mousemove', function (e) {
      var mousecoords = getMousePos(e);
      if (neck && waist) {

        moveJoint(mousecoords, neck, 50);
        moveJoint(mousecoords, waist, 30);
      }
    });

    function getMousePos(e) {
      return { x: e.clientX, y: e.clientY };
    }

    function moveJoint(mouse, joint, degreeLimit) {
      let degrees = getMouseDegrees(mouse.x, mouse.y, degreeLimit);
      joint.rotation.y = THREE.Math.degToRad(degrees.x);
      joint.rotation.x = THREE.Math.degToRad(degrees.y);
    }

    function getMouseDegrees(x, y, degreeLimit) {
      let dx = 0,
      dy = 0,
      xdiff,
      xPercentage,
      ydiff,
      yPercentage;

      let w = { x: window.innerWidth, y: window.innerHeight };

      // Left (Rotates neck left between 0 and -degreeLimit)
      // 1. If cursor is in the left half of screen
      if (x <= w.x / 2) {
        // 2. Get the difference between middle of screen and cursor position
        xdiff = w.x / 2 - x;
        // 3. Find the percentage of that difference (percentage toward edge of screen)
        xPercentage = xdiff / (w.x / 2) * 100;
        // 4. Convert that to a percentage of the maximum rotation we allow for the neck
        dx = degreeLimit * xPercentage / 100 * -1;
      }

      // Right (Rotates neck right between 0 and degreeLimit)
      if (x >= w.x / 2) {
        xdiff = x - w.x / 2;
        xPercentage = xdiff / (w.x / 2) * 100;
        dx = degreeLimit * xPercentage / 100;
      }
      // Up (Rotates neck up between 0 and -degreeLimit)
      if (y <= w.y / 2) {
        ydiff = w.y / 2 - y;
        yPercentage = ydiff / (w.y / 2) * 100;
        // Note that I cut degreeLimit in half when she looks up
        dy = degreeLimit * 0.5 * yPercentage / 100 * -1;
      }
      // Down (Rotates neck down between 0 and degreeLimit)
      if (y >= w.y / 2) {
        ydiff = y - w.y / 2;
        yPercentage = ydiff / (w.y / 2) * 100;
        dy = degreeLimit * yPercentage / 100;
      }
      return { x: dx, y: dy };
    }


  }, undefined, function (error) {

    console.error(error);

  });


  /**
   * RENDERER
   */

   renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable transparency
 renderer.setSize(window.innerWidth, window.innerHeight);
 document.body.appendChild(renderer.domElement);

  // Shadow maps
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Navigation Controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.keyPanSpeed = 100;

  controls.update();

  renderer.setSize(window.innerWidth, window.innerHeight);

  // Set the renderer to render at native device ratios
  renderer.setPixelRatio(window.devicePixelRatio);

  // Add the threejs scene to the app div
  document.getElementById("app").appendChild(renderer.domElement);


  /* --------------------------
  * BEGIN RENDER
  * -------------------------- */
  render();
}


/* --------------------------
 * RENDER THE SCENE
 * -------------------------- */

function render() {
  delta = clock.getDelta();

  if (mixer != null) {
    mixer.update(delta);
  };

  renderer.render(scene, camera);
}

init();
