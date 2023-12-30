let dragon_boss, dragon_bossMixer, mixer2, dragonFlight;
let hitpoints = 999; // Initial hitpoints
let loader = new THREE.GLTFLoader();
const anyaPosition = new THREE.Vector3();
let animationDuration = 1.8;
let animationSpeed = 0.9;




loader.load('https://luminafields.com/dragon2.glb', function (gltf) {
    dragon_boss = gltf.scene;
    scene.add(dragon_boss);
    dragon_boss.scale.set(2, 2, 2);
    dragon_boss.position.y += 5.2;
    dragon_boss.position.z += -30.2;

    mixer2 = new THREE.AnimationMixer(dragon_boss);
    const dragonAnimations = gltf.animations;

    if (dragonAnimations && dragonAnimations.length > 0) {
        action2 = mixer2.clipAction(dragonAnimations[0]);
        action2.timeScale = animationSpeed; // Set the animation speed to half
        action2.play();
    } else {
        console.error('No animations found in dragon2.glb');
    }
});


function updateDragonBehavior() {
    if (markers.length === 0) {
        // If there are no markers, make sure dragon_boss is in the idle state
        if (dragonFlight) {
            dragonFlight = false;
        }
        return;
    }

    let closestMarker = null;
    let closestDistance = Infinity;

    // Find the closest marker to dragon_boss
    markers.forEach((marker) => {
        const distance = getDistance(dragon_boss, marker);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestMarker = marker;
        }
    });

    // Check if dragon_boss is close enough to the marker
    if (closestDistance < 0.5) { // Adjust the threshold as needed
        // Remove the reached marker
        scene.remove(closestMarker);
        markers = markers.filter(marker => marker !== closestMarker);

        // If there are no more markers, set dragon_boss to idle
        if (markers.length === 0) {
            dragonFlight = false;
        }
    } else {

      document.getElementById('hitPoints').innerHTML = hitpoints;
        // Move dragon_boss towards the closest marker
        movedragon_bossTowardsMarker(closestMarker);
    }
}

function movedragon_bossTowardsMarker(marker) {
    const dragon_bossSpeed = 0.04; // Adjust speed as necessary
    const directionTodragon_boss = marker.position.clone().sub(dragon_boss.position).normalize();
    const dragon_bossMovement = directionTodragon_boss.multiplyScalar(dragon_bossSpeed);
    dragon_boss.position.add(dragon_bossMovement);
    dragon_boss.lookAt(marker.position);

    // Check if dragon_boss is already running, if not, trigger running animation
    if (!dragonFlight) {
        dragonFlight = true;
        startInterval();
    }
}



function checkCollision2() {
  const distance = dragon_boss.position.distanceTo(anyaPosition);

  // Adjust these thresholds based on the actual scale of your game objects and world
  const collisionThresholdClose = 2;
  const collisionThresholdMedium = 4;
  const collisionThresholdFar = 8;

  if (distance < collisionThresholdClose) {
      hitpoints -= 5;
        anyaAction.stop();
        anyaAction = anyaMixer.clipAction(anyaAnimations[4]);
            anyaAction.setLoop(THREE.LoopOnce);
        anyaAction.play();
  } else if (distance < collisionThresholdMedium) {
      hitpoints -= 3;
      anyaAction.stop();
      anyaAction = anyaMixer.clipAction(anyaAnimations[2]);
          anyaAction.setLoop(THREE.LoopOnce);
      anyaAction.play();
  } else if (distance < collisionThresholdFar) {
      hitpoints -= 1;
  }

  // Debug log
  console.log(`Distance: ${distance}, Hitpoints: ${hitpoints}`);

  if (hitpoints <= 0) {
         alert("Game Over");
         window.location.reload();
  }
}



setInterval(checkCollision2, 1000); // Check collision every second

function render() {
    // Call updateDragonBehavior and other render logic
    requestAnimationFrame(render);
}

render(); // Start the render loop
