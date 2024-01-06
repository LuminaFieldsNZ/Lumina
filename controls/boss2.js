let dragon_boss1, dragon_bossMixer1, mixer3, dragonFlight1, dragonAnimations1;
let loaderBoss2 = new THREE.GLTFLoader();

loaderBoss2.load('https://luminafields.com/monster2.glb', function (gltf) {
    dragon_boss1 = gltf.scene;
    scene.add(dragon_boss1);
    dragon_boss1.scale.set(1.5, 1.5, 1.5);
    dragon_boss1.position.z += 79.2;

    mixer3 = new THREE.AnimationMixer(dragon_boss1);
    dragonAnimations1 = gltf.animations;

    if (dragonAnimations1) {
        action3 = mixer3.clipAction(dragonAnimations1[0]);
        action3.play();
    } else {
        console.error('No animations found in boss2.glb');
    }
});

function updateDragonBehavior1() {
    if (markers.length === 0) {
        if (dragonFlight1) {
            dragonFlight1 = false;
        }
        return;
    }

    let closestMarker1 = null;
    let closestDistance1 = Infinity;

    markers.forEach((marker) => {
        const distance = getDistance(dragon_boss1, marker);
        if (distance < closestDistance1) {
            closestDistance1 = distance;
            closestMarker1 = marker;
        }
    });

    if (closestDistance1 < 0.5) {
        scene.remove(closestMarker1);
        markers = markers.filter(marker => marker !== closestMarker1);
    } else {
        movedragon_bossTowardsMarker1(closestMarker1);
    }
}

function movedragon_bossTowardsMarker1(marker) {
    const dragon_bossSpeed1 = 0.035;
    const movementThreshold1 = 2;

    const directionToMarker1 = marker.position.clone().sub(dragon_boss1.position);
    const distanceToMarker1 = directionToMarker1.length();

    if (distanceToMarker1 > movementThreshold1) {
        const normalizedDirection1 = directionToMarker1.normalize();
        const dragon_bossMovement1 = normalizedDirection1.multiplyScalar(dragon_bossSpeed1);
        dragon_boss1.position.add(dragon_bossMovement1);
        dragon_boss1.lookAt(marker.position);

        if (!dragon_boss1.isMoving) {
            action3.stop();
            action3 = mixer3.clipAction(dragonAnimations1[2]);
            action3.play();
            dragon_boss1.isMoving = true;
        }
    } else if (dragon_boss1.isMoving) {
        action3.stop();
        action3 = mixer3.clipAction(dragonAnimations1[2]);
        action3.play();
        dragon_boss1.isMoving = false;
    }
}

let isCollisionAnimationPlaying = false;

function checkCollision3() {
    if (isCollisionAnimationPlaying) {
        return; // Skip collision check if an animation is playing
    }

    const distance = dragon_boss1.position.distanceTo(anyaPosition);
    const collisionThresholdClose1 = 8;

    if (distance < collisionThresholdClose1) {
        if (!isAnyaMoving) {
            isCollisionAnimationPlaying = true;

            action3.stop();
            action3 = mixer3.clipAction(dragonAnimations1[2]);
            action3.setLoop(THREE.LoopOnce);
            action3.play();
             // Ensure the animation stops when finished       action3.clampWhenFinished = true;

            setTimeout(() => {
                hitpoints -= 30;
                isCollisionAnimationPlaying = false; // Reset flag after animation
            }, 6000);
        }
    }
}

setInterval(checkCollision3, 500);
