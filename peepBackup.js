let state = {
  hair: './hair/hair0.png',
  glasses: './glasses/glasses0.png',
  body: './body/body0.png',
  outer: './outer/outer0.png'
};

const config = {
  src: 'peeps.png',
  rows: 15,
  cols: 7
};

// UTILS
const randomRange = (min, max) => min + Math.random() * (max - min);
const randomIndex = array => randomRange(0, array.length) | 0;
const removeFromArray = (array, i) => array.splice(i, 1)[0];
const removeItemFromArray = (array, item) => removeFromArray(array, array.indexOf(item));
const removeRandomFromArray = array => removeFromArray(array, randomIndex(array));
const getRandomFromArray = (array) => array[randomIndex(array) | 0];

// CLASSES
class Peep {
  constructor({ image, rect }) {
    this.image = image;
    this.setRect(rect);
    this.x = 0;
    this.y = 0;
    this.anchorY = 0;
    this.scaleX = 1;
    this.animation = null;
    this.bounceSize = 0;
    this.bounceDirection = 1; // 1 for up, -1 for down
    this.bounceSpeed = 2; // Adjust speed of bouncing
    this.isBeingDragged = false;
  }

  setRect(rect) {
    this.rect = rect;
    this.width = rect[2];
    this.height = rect[3];
    this.drawArgs = [
      this.image,
      ...rect,
      0, 0, this.width, this.height
    ];
  }

  render(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.scaleX, 1);
    ctx.drawImage(...this.drawArgs);
    ctx.restore();
  }

  animateBounce() {
    // Bounce animation logic
    this.y += this.bounceSpeed * this.bounceDirection;
    if (this.y > this.initialY + this.bounceSize || this.y < this.initialY - this.bounceSize) {
      this.bounceDirection *= -1;
    }
  }

  startBouncing(size) {
    this.bounceSize = size;
    this.initialY = this.y; // Set the initial y position
    this.bounceDirection = 1;
    this.bounceSpeed = 2; // Adjust speed if needed
  }

  stopAnimation() {
    if (this.animation) {
      this.animation.kill();
      this.animation = null;
    }
  }

  startAnimation() {
    // Example animation for flipping and moving
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(this, { x: this.x + 200, duration: 8 })
      .to(this, { scaleX: -1, duration: 0 })
      .to(this, { x: this.x, duration: 1 })
      .to(this, { scaleX: 1, duration: 0 });
    this.animation = tl;
  }
}

// MAIN
const img = document.createElement('img');
img.onload = init;
img.src = config.src;

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const stage = {
  width: 0,
  height: 0
};

const allPeeps = [];
const availablePeeps = [];
const crowd = [];
let clickCount = 0;
let activePeeps = [];

function init() {
  createPeeps();
  resize();
  gsap.ticker.add(render);
  window.addEventListener('resize', resize);
  canvas.addEventListener('click', onCanvasClick);
}

function createPeeps() {
  const { rows, cols } = config;
  const { naturalWidth: width, naturalHeight: height } = img;
  const total = rows * cols;
  const rectWidth = width / rows;
  const rectHeight = height / cols;

  for (let i = 0; i < total; i++) {
    allPeeps.push(new Peep({
      image: img,
      rect: [
        i % rows * rectWidth,
        (i / rows | 0) * rectHeight,
        rectWidth,
        rectHeight
      ]
    }));
  }
}

function resize() {
  stage.width = canvas.clientWidth;
  stage.height = canvas.clientHeight;
  canvas.width = stage.width * devicePixelRatio;
  canvas.height = stage.height * devicePixelRatio;

  crowd.forEach(peep => {
    peep.stopAnimation();
  });

  crowd.length = 0;
  availablePeeps.length = 0;
  availablePeeps.push(...allPeeps);
}

function addPeepToCrowd(peep = removeRandomFromArray(availablePeeps)) {
  peep.stopAnimation();
  crowd.push(peep);
  crowd.sort((a, b) => a.anchorY - b.anchorY);
  makePeepDraggable(peep); // Make sure new peep is draggable
  return peep;
}

function createPeep(x, y) {
  const peep = addPeepToCrowd();
  peep.x = x;
  peep.y = y;
  activePeeps.push(peep); // Ensure new peep is added to activePeeps
  return peep;
}


function removePeepFromCrowd(peep) {
  removeItemFromArray(crowd, peep);
  availablePeeps.push(peep);
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  ctx.save();
  ctx.scale(devicePixelRatio, devicePixelRatio);

  crowd.forEach(peep => {
    if (peep.bounceSize > 0) {
      peep.animateBounce();
    }
    peep.render(ctx);
  });

  ctx.restore();
}



function onCanvasClick(event) {
  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;

  activePeeps.forEach(peep => {
    const rect = peep.rect;
    const peepRect = {
      x: peep.x,
      y: peep.y,
      width: rect[2],
      height: rect[3]
    };

    if (mouseX >= peepRect.x && mouseX <= peepRect.x + peepRect.width &&
        mouseY >= peepRect.y && mouseY <= peepRect.y + peepRect.height) {
      
      clickCount++;
      
      switch (clickCount) {
        case 1:
          peep.startAnimation();
          break;
        case 2:
          peep.startBouncing(randomRange(20, 100)); // Adjust bounds as needed
          break;
        case 3:
          peep.startBouncing(50); // Fixed bounce size
          break;
        case 4:
          peep.stopAnimation();
          clickCount = 0; // Reset click count
          break;
      }
    }
  });
}



let currentDraggedPeep = null; // Global variable to keep track of the currently dragged peep

function makePeepDraggable(peep) {
  let offsetX, offsetY;

  const onMouseMove = (e) => {
    if (currentDraggedPeep) {
      currentDraggedPeep.x = e.clientX - canvas.getBoundingClientRect().left - offsetX;
      currentDraggedPeep.y = e.clientY - canvas.getBoundingClientRect().top - offsetY;
      render();
    }
  };

  const onMouseUp = () => {
    if (currentDraggedPeep) {
      currentDraggedPeep.isBeingDragged = false;
      currentDraggedPeep = null; // Clear the current dragged peep
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  };

  const onMouseDown = (e) => {
    const rect = peep.rect;
    if (e.clientX >= peep.x && e.clientX <= peep.x + rect[2] &&
        e.clientY >= peep.y && e.clientY <= peep.y + rect[3]) {
      if (currentDraggedPeep === null) { // Check if no peep is currently being dragged
        currentDraggedPeep = peep; // Set the current dragged peep
        peep.isBeingDragged = true;
        offsetX = e.clientX - canvas.getBoundingClientRect().left - peep.x;
        offsetY = e.clientY - canvas.getBoundingClientRect().top - peep.y;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      }
    }
  };

  canvas.addEventListener('mousedown', onMouseDown);
}

// Example button click to create and make a new peep draggable
document.getElementById('changeTextureButton').addEventListener('click', () => {
  // Spawn a new peep in the center of the canvas
  const x = (stage.width - 50) / 2; // Adjust based on peep size
  const y = (stage.height - 50) / 2; // Adjust based on peep size
  const newPeep = createPeep(x, y);

  // Add dragging functionality
  makePeepDraggable(newPeep);

  // Add to active peeps
  activePeeps.push(newPeep);
});


const button = document.getElementById('changeTextureButton');

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



function add20Peeps() {
  // Clear previous peeps
  crowd.length = 0;
  activePeeps.length = 0;
  
  for (let i = 0; i < 10; i++) {
    const peep = addPeepToCrowd();
    peep.x = -peep.width; // Start position off-screen left
    peep.y = randomRange(0, stage.height - peep.height); // Random y position

    // Animate peep to walk in from the left
    peep.walk = gsap.timeline({ repeat: -1, yoyo: true });
    peep.walk.to(peep, { x: stage.width / 2 - peep.width / 2, duration: 3 });
    
    // Add to active peeps
    activePeeps.push(peep);
  }

  for (let i = 0; i < 10; i++) {
    const peep = addPeepToCrowd();
    peep.x = stage.width + peep.width; // Start position off-screen right
    peep.y = randomRange(0, stage.height - peep.height); // Random y position

    // Animate peep to walk in from the right
    peep.walk = gsap.timeline({ repeat: -1, yoyo: true });
    peep.walk.to(peep, { x: stage.width / 2 - peep.width / 2, duration: 3 });

    // Add to active peeps
    activePeeps.push(peep);
  }
}


function reverseDirection() {
  crowd.forEach(peep => {
    if (peep.walk) {
      const progress = peep.walk.progress();
      peep.walk.reverse(); // Reverse the timeline
      peep.walk.progress(1 - progress); // Keep the current position but in reverse
    }
  });
}

function doubleSpeed() {
  crowd.forEach(peep => {
    if (peep.walk) {
      peep.walk.timeScale(peep.walk.timeScale() * 2);
    }
  });
}

function spawnCrowd() {
  const numPeeps = 20;
  const numFromLeft = 10;
  const numFromRight = 10;
  const spawnHeight = stage.height * 0.3; // Bottom 30% of screen height
  const offScreenBuffer = 50; // Buffer space off-screen to start and end

  function spawnPeep(isFromLeft) {
    const peep = addPeepToCrowd();
    peep.y = stage.height - spawnHeight + randomRange(0, spawnHeight - peep.height); // Random y position in the bottom 30%
    peep.startBouncing(randomRange(10, 30)); // Random bounce size

    // Initialize the peep's starting position and scale
    if (isFromLeft) {
      peep.x = -peep.width; // Start off-screen left
      peep.scaleX = 1; // Not flipped
    } else {
      peep.x = stage.width; // Start off-screen right
      peep.scaleX = -1; // Flipped horizontally
    }

    // Animate peep to walk across the screen and flip upon reaching the end
    peep.walk = gsap.timeline({ repeat: -1 });
    if (isFromLeft) {
      peep.walk
        .to(peep, { x: stage.width + offScreenBuffer, duration: 3, ease: 'none' }) // Walk to the end
        .call(() => peep.scaleX = -1) // Flip horizontally
        .to(peep, { x: -peep.width - offScreenBuffer, duration: 3, ease: 'none' }) // Walk back to the start
        .call(() => peep.scaleX = 1); // Flip back to normal
    } else {
      peep.walk
        .to(peep, { x: -peep.width - offScreenBuffer, duration: 3, ease: 'none' }) // Walk to the end
        .call(() => peep.scaleX = 1) // Flip horizontally
        .to(peep, { x: stage.width + offScreenBuffer, duration: 3, ease: 'none' }) // Walk back to the start
        .call(() => peep.scaleX = -1); // Flip back to normal
    }

    // Add to active peeps
    activePeeps.push(peep);

    // Make sure the peep is draggable
    makePeepDraggable(peep);
  }

  for (let i = 0; i < numFromLeft; i++) {
    setTimeout(() => spawnPeep(true), randomRange(0, 1000)); // Stagger entry times over 1 second for peeps from the left
  }

  for (let i = 0; i < numFromRight; i++) {
    setTimeout(() => spawnPeep(false), randomRange(0, 1000)); // Stagger entry times over 1 second for peeps from the right
  }
}

// Trigger the function with a button click
document.getElementById('spawnCrowdButton').addEventListener('click', spawnCrowd);
