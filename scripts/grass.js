const svgString = `...`; // Your SVG data as a string
const loader = new THREE.SVGLoader();
const paths = loader.parse(svgString).paths;

// Process paths to create a Three.js mesh


const grassMaterial = new THREE.MeshBasicMaterial({ map: grassTexture, side: THREE.DoubleSide });
const grassGeometry = new THREE.PlaneGeometry(1, 1); // Size as per your requirement
const grass = new THREE.Mesh(grassGeometry, grassMaterial);
scene.add(grass);


gsap.to(grass.rotation, { y: 0.1, repeat: -1, yoyo: true, ease: 'sine.inOut', duration: 1 });
