




let state = {
    hair: './hair/hair0.png',
    glasses: './glasses/glasses0.png',
    body: './body/body0.png',
    outer: './outer/outer0.png'
};



const config = {
 src: 'peeps.png',
 rows: 15,
 cols: 7 };


// UTILS

const randomRange = (min, max) => min + Math.random() * (max - min);

const randomIndex = array => randomRange(0, array.length) | 0;

const removeFromArray = (array, i) => array.splice(i, 1)[0];

const removeItemFromArray = (array, item) => removeFromArray(array, array.indexOf(item));

const removeRandomFromArray = array => removeFromArray(array, randomIndex(array));

const getRandomFromArray = (array) =>
array[randomIndex(array) | 0];


// TWEEN FACTORIES

const resetPeep = ({ stage, peep }) => {
 const direction = Math.random() > 0.5 ? 1 : -1;
 // using an ease function to skew random to lower values to help hide that peeps have no legs
 const offsetY = 100 - 250 * gsap.parseEase('power2.in')(Math.random());
 const startY = stage.height - peep.height + offsetY;
 let startX;
 let endX;

 if (direction === 1) {
   startX = -peep.width;
   endX = stage.width;
   peep.scaleX = 1;
 } else {
   startX = stage.width + peep.width;
   endX = 0;
   peep.scaleX = -1;
 }

 peep.x = startX;
 peep.y = startY;
 peep.anchorY = startY;

 return {
   startX,
   startY,
   endX };

};

const normalWalk = ({ peep, props }) => {
 const {
   startX,
   startY,
   endX } =
 props;

 const xDuration = 10;
 const yDuration = 0.25;

 const tl = gsap.timeline();
 tl.timeScale(randomRange(0.5, 1.5));
 tl.to(peep, {
   duration: xDuration,
   x: endX,
   ease: 'none' },
 0);
 tl.to(peep, {
   duration: yDuration,
   repeat: xDuration / yDuration,
   yoyo: true,
   y: startY - 10 },
 0);

 return tl;
};

const walks = [
normalWalk];


// CLASSES

class Peep {
 constructor({
   image,
   rect })
 {
   this.image = image;
   this.setRect(rect);

   this.x = 0;
   this.y = 0;
   this.anchorY = 0;
   this.scaleX = 1;
   this.walk = null;
 }

 setRect(rect) {
   this.rect = rect;
   this.width = rect[2];
   this.height = rect[3];

   this.drawArgs = [
   this.image,
   ...rect,
   0, 0, this.width, this.height];

 }

 render(ctx) {
   ctx.save();
   ctx.translate(this.x, this.y);
   ctx.scale(this.scaleX, 1);
   ctx.drawImage(...this.drawArgs);
   ctx.restore();
 }}


// MAIN

const img = document.createElement('img');
img.onload = init;
img.src = config.src;

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const stage = {
 width: 0,
 height: 0 };


const allPeeps = [];
const availablePeeps = [];
const crowd = [];

function init() {
    createPeeps();
  
    // resize also (re)populates the stage
    resize();
  
    gsap.ticker.add(render);
    window.addEventListener('resize', resize);
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
   peep.walk.kill();
 });

 crowd.length = 0;
 availablePeeps.length = 0;
 availablePeeps.push(...allPeeps);

 initCrowd();
}

function initCrowd() {
    // Clear any existing peeps in the crowd
    crowd.length = 0;
    
    // Ensure allPeeps and availablePeeps are properly initialized
    availablePeeps.length = 0;
    availablePeeps.push(...allPeeps);
  
    // Only add the first peep (position 0) to the crowd initially
    const firstPeep = allPeeps[0];
    availablePeeps.splice(availablePeeps.indexOf(firstPeep), 1);
    addPeepToCrowd(firstPeep).walk.progress(Math.random());
  }
  

  function addPeepToCrowd(peep = removeRandomFromArray(availablePeeps)) {
    const walk = getRandomFromArray(walks)({
      peep,
      props: resetPeep({
        peep,
        stage }) });
  
    peep.walk = walk;
  
    walk.eventCallback('onComplete', () => {
      removePeepFromCrowd(peep);
      addPeepToCrowd(); // Continue with random peeps after the first one completes its walk
    });
  
    crowd.push(peep);
    crowd.sort((a, b) => a.anchorY - b.anchorY);
  
    return peep;
  }
  
  
  function handlePeepEnd(peep) {
    removePeepFromCrowd(peep);
    if (Math.random() > 0.5) {
      // Re-add the peep to continue walking
      addPeepToCrowd();
    } else {
      // The peep remains hidden, but the vertical movement ends smoothly
      availablePeeps.push(peep);
    }
  }
  
  

function removePeepFromCrowd(peep) {
 removeItemFromArray(crowd, peep);
 availablePeeps.push(peep);
}

function render() {
 canvas.width = canvas.width;
 ctx.save();
 ctx.scale(devicePixelRatio, devicePixelRatio);

 crowd.forEach(peep => {
   peep.render(ctx);
 });

 ctx.restore();
}

function openSettings() {
 // Directly handle the opening of settings within the same context
 const settingsElement = document.getElementById('settingsModal'); // Assuming you have a settings modal or similar element
 if (settingsElement) {
   settingsElement.style.display = 'block'; // Show the settings modal
 } else {
   console.log('Settings element not found.');
 }
}

document.addEventListener('DOMContentLoaded', function() {
 const peepContent = document.documentElement.outerHTML;
});

function updateLayer(action, value) {
 const elementMap = {
   hair: 'hairLayer',
   glasses: 'glassesLayer',
   body: 'bodyLayer',
   outer: 'outerLayer'
 };
 
 const elementId = elementMap[action];
 if (elementId) {
   const element = document.getElementById(elementId);
   if (element) {
     element.src = value;
   }
 }
}

window.addEventListener('message', function(event) {
 if (event.data.action) {
   updateLayer(event.data.action, event.data.value);
 }
 
 if (event.data.state) {
   const { hair, glasses, body, outer } = event.data.state;
   updateLayer('hair', hair);
   updateLayer('glasses', glasses);
   updateLayer('body', body);
   updateLayer('outer', outer);
 }
}, false);

function clearAllButFirstPeep() {
    while (crowd.length > 4) {
      const peep = crowd.pop();
      peep.walk.kill();
      availablePeeps.push(peep);
    }
  }
  

  function add20Peeps() {
    for (let i = 0; i < 20; i++) {
      addPeepToCrowd();
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


  function runRandomEffect() {
    // Define an array of the available functions
    const effects = [
      clearAllButFirstPeep,
      add20Peeps,
      reverseDirection,
      doubleSpeed
    ];
  
    // Get a random index based on the number of effects
    const randomIndex = Math.floor(Math.random() * effects.length);
  
    // Run the randomly selected effect
    effects[randomIndex]();
  }
  
  // Example: Trigger the random effect on a button click
  document.getElementById('randomEffectButton').addEventListener('click', runRandomEffect);
  
  