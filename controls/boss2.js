let dragon_boss1, dragon_bossMixer1, mixer3, dragonFlight1, dragonAnimations1;
let loaderBoss2 = new THREE.GLTFLoader();

loaderBoss2.load('https://luminafields.com/boss2.glb', function (gltf) {
    dragon_boss1 = gltf.scene;
    scene.add(dragon_boss1);
    dragon_boss1.scale.set(2.5, 2.5, 2.5);
    dragon_boss1.position.z += 66.2;

    mixer3 = new THREE.AnimationMixer(dragon_boss1);
    dragonAnimations1 = gltf.animations;

    if (dragonAnimations1) {
        action3 = mixer3.clipAction(dragonAnimations1[2]);
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
            action3 = mixer3.clipAction(dragonAnimations1[3]);
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

function checkCollision3() {
    const distance = dragon_boss1.position.distanceTo(anyaPosition);
    const collisionThresholdClose1 = 2;

    if (distance < collisionThresholdClose1) {
        if (!isAnyaMoving){
            anyaAction1.stop();
            anyaAction1 = anyaMixer1.clipAction(anyaAnimations1[6]);
            anyaAction1.setLoop(THREE.LoopOnce);
            anyaAction1.play();

            action3.stop();
            action3 = mixer3.clipAction(dragonAnimations1[4]);
            action3.setLoop(THREE.LoopOnce);
            action3.play();

            setTimeout(() => {
                hitpoints -= 10;
            }, 3000);

        }
    }
}

setInterval(checkCollision3, 1000);
