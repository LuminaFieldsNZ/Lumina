document.addEventListener('scroll', function () {
    scrollPosition = window.scrollY;
});


let previousMousePosition = { x: 0, y: 0 }; // Store mouse position
let orbOffset = new THREE.Vector3(); // Offset between mouse and orb center
let dragPlane = new THREE.Plane(); // Virtual plane for 3D movement

// This assumes the ground is at y=0. Adjust accordingly if needed.
let groundY = 0;

function onMouseDown(event) {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const newOrbPosition = new THREE.Vector3();

    const intersects = raycaster.intersectObject(orb);

    if (intersects.length > 0) {
        isDragging = true;

        // Store offset from the orb center
        orbOffset.copy(intersects[0].point).sub(orb.position);

        // Lock the orb's current Y position to the ground
        dragPlane.setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 1, 0), newOrbPosition.set(orb.position.x, groundY, orb.position.z));

        previousMousePosition = { x: event.clientX, y: event.clientY };
        controls.enabled = false;
    } else {
        controls.enabled = true;
    }
}

function onMouseMove(event) {
    if (isDragging) {
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        const newOrbPosition = new THREE.Vector3();

        if (raycaster.ray.intersectPlane(dragPlane, newOrbPosition)) {
            // Offset is taken into account
            newOrbPosition.sub(orbOffset);

            // Lock the orb's position to groundY
            newOrbPosition.y = groundY;

            orb.position.copy(newOrbPosition);
            pointLight.position.copy(orb.position);
        }

        controls.enabled = false;
    }
}

function onMouseUp(event) {
    isDragging = false;
    controls.enabled = true;
}

function onTouchStart(event) {
    if (event.touches.length > 0) {
        const touch = event.touches[0];
        const mouse = new THREE.Vector2();
        mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        const newOrbPosition = new THREE.Vector3();

        const intersects = raycaster.intersectObject(orb);

        if (intersects.length > 0) {
            isDragging = true;
            orbOffset.copy(intersects[0].point).sub(orb.position);
            newOrbPosition.y = orb.position.y;

            // Lock the drag plane again on touch start
            dragPlane.setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 1, 0), newOrbPosition.set(orb.position.x, groundY, orb.position.z));

            previousMousePosition = { x: touch.clientX, y: touch.clientY };
            controls.enabled = false;
        } else {
            controls.enabled = true;
        }
    }
}

function onTouchMove(event) {
    if (isDragging && event.touches.length > 0) {
        const touch = event.touches[0];
        const mouse = new THREE.Vector2();
        mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        const newOrbPosition = new THREE.Vector3();

        if (raycaster.ray.intersectPlane(dragPlane, newOrbPosition)) {
            newOrbPosition.sub(orbOffset);
            newOrbPosition.y = groundY;  // Enforce Y position locking to the ground

            orb.position.copy(newOrbPosition);
            pointLight.position.copy(orb.position);
        }

        controls.enabled = false;
    }
}

function onTouchEnd(event) {
    isDragging = false;
    controls.enabled = true;
}




function updateModelTracking() {
    if (!orb || !spine || !neck || !leftEye || !rightEye || !model) return;

    const headCenter = new THREE.Vector3();
    headCenter.setFromMatrixPosition(neck.matrixWorld);

    const targetDirection = new THREE.Vector3();
    targetDirection.subVectors(orb.position, headCenter).normalize();

    // ***Corrected angle calculations and rotation order***
    const angleY = Math.atan2(targetDirection.x, targetDirection.z)  * 0.2;
    const angleX = Math.atan2(-targetDirection.y, Math.sqrt(targetDirection.x * targetDirection.x + targetDirection.z * targetDirection.z))  * 0.6; // Negate targetDirection.y for correct pitch


    spine.rotation.order = "YXZ"; // Set rotation order (important!)
    neck.rotation.order = "YXZ"; // Set rotation order (important!)
    leftEye.rotation.order = "YXZ"; // Set rotation order (important!)
    rightEye.rotation.order = "YXZ"; // Set rotation order (important!)

    spine.rotation.y = initialModelRotation.y + angleY;
    spine.rotation.x = initialModelRotation.x + angleX;
    neck.rotation.y = initialModelRotation.y + angleY;
    neck.rotation.x = initialModelRotation.x + angleX;
    leftEye.rotation.y = initialModelRotation.y + angleY;
    leftEye.rotation.x = initialModelRotation.x + angleX;
    rightEye.rotation.y = initialModelRotation.y + angleY;
    rightEye.rotation.x = initialModelRotation.x + angleX;


    const MAX_ROTATION_X = Math.PI / 4;
    const MAX_ROTATION_Y = Math.PI / 4;

    // Apply limits *relative* to initial rotation
    spine.rotation.x = Math.max(initialModelRotation.x - MAX_ROTATION_X, Math.min(initialModelRotation.x + MAX_ROTATION_X, spine.rotation.x));
    neck.rotation.x = Math.max(initialModelRotation.x - MAX_ROTATION_X, Math.min(initialModelRotation.x + MAX_ROTATION_X, neck.rotation.x));
    leftEye.rotation.x = Math.max(initialModelRotation.x - MAX_ROTATION_X, Math.min(initialModelRotation.x + MAX_ROTATION_X, leftEye.rotation.x));
    rightEye.rotation.x = Math.max(initialModelRotation.x - MAX_ROTATION_X, Math.min(initialModelRotation.x + MAX_ROTATION_X, rightEye.rotation.x));

    spine.rotation.y = Math.max(initialModelRotation.y - MAX_ROTATION_Y, Math.min(initialModelRotation.y + MAX_ROTATION_Y, spine.rotation.y));
    neck.rotation.y = Math.max(initialModelRotation.y - MAX_ROTATION_Y, Math.min(initialModelRotation.y + MAX_ROTATION_Y, neck.rotation.y));
    leftEye.rotation.y = Math.max(initialModelRotation.y - MAX_ROTATION_Y, Math.min(initialModelRotation.y + MAX_ROTATION_Y, leftEye.rotation.y));
    rightEye.rotation.y = Math.max(initialModelRotation.y - MAX_ROTATION_Y, Math.min(initialModelRotation.y + MAX_ROTATION_Y, rightEye.rotation.y));

}

