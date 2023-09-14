
let countImage = 0;

function nextPages() {
  let allImages = [
    "../pics/trantum.png",
    "../pics/ventura.png",
    "../pics/occidentica.png",
    "../pics/eventus.png",
    "../pics/collective.png",
    "../pics/abzimuth.png",
    "../pics/ironcoast.png",
    "../pics/faxium.png",
    "../pics/mercado.png"
  ];

  // Select the .screen > .screen-image element
  const screenImage = document.querySelector('.screen > .screen-image');

  if (countImage != 9) {
    document.body.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url('" + allImages[countImage] + "')";
    screenImage.style.backgroundImage = "url('" + allImages[countImage] + "')";
    countImage += 1;
  } else {
    countImage = 0;
  }
}

setInterval(() => {
  nextPages();
}, 8000);








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
  const {
    rows,
    cols } =
  config;
  const {
    naturalWidth: width,
    naturalHeight: height } =
  img;
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
      rectHeight] }));


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
  while (availablePeeps.length) {
    // setting random tween progress spreads the peeps out
    addPeepToCrowd().walk.progress(Math.random());
  }
}

function addPeepToCrowd() {
  const peep = removeRandomFromArray(availablePeeps);
  const walk = getRandomFromArray(walks)({
    peep,
    props: resetPeep({
      peep,
      stage }) }).

  eventCallback('onComplete', () => {
    removePeepFromCrowd(peep);
    addPeepToCrowd();
  });

  peep.walk = walk;

  crowd.push(peep);
  crowd.sort((a, b) => a.anchorY - b.anchorY);

  return peep;
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


function updateCharacterFromState() {
    document.getElementById('hairLayer').src = state.hair;
    document.getElementById('glassesLayer').src = state.glasses;
    document.getElementById('bodyLayer').src = state.body;
    document.getElementById('outerLayer').src = state.outer;
    updateStateInput();
}


let state2;

window.addEventListener('message', function(event) {
    if (event.data.userId && event.data.state) {
        state2 = event.data.state;

        // Decode the state string into the state object
        const decodedState = decodeState(state2);
           if (decodedState) {
               state2 = decodedState;
               updateCharacterFromState();
           }
        // Send a message back to the parent to stop the loop
        window.parent.postMessage({ action: 'stopLoop' }, '*');
    }
}, false);



function decodeState(stateString) {
    try {
        return JSON.parse(atob(stateString));
    } catch (error) {
        console.error("Error decoding Base64 string:", stateString, error);
        return null;
    }
}





function downloadStufs() {

    // URL of the base.json file
    const fileURL = 'https://www.luminafields.com/models/base.json';

    // Fetch the content of the file
    fetch(fileURL)
        .then(response => response.blob())
        .then(blob => {
            // Create a link element for download
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'base.json';

            // Append the link to the document and trigger the download
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        })
        .catch(error => {
            console.error("Error downloading the file:", error);
        });

}


let stateString = '';


  let state = {
       hair: './hair/hair1.png',
       glasses: './glasses/glasses1.png',
       body: './body/body1.png',
       outer: './outer/outer1.png'
   };

   function updateStateInput() {
       stateString = btoa(JSON.stringify(state));
       document.getElementById('stateInput').value = stateString;
   }


  //Array building scriptsrc

//for glasses
  const glassesImages = [];
  for(let i = -1; i < 11; i++) {
    glassesImages.push(`./glasses/glasses${i}.png`);
  }
  let glassesOptions = '';
  for(let img of glassesImages) {
    glassesOptions += `<option value="${img}">Glasses ${glassesImages.indexOf(img) + 1}</option>`;
  }
  const select = document.getElementById('glassesDropdown');
  select.innerHTML = glassesOptions;

//for hair
  const hairImages = [];
  for(let i = 0; i < 4; i++) {
    hairImages.push(`./hair/hair${i}.png`);
  }
  let hairOptions = '';
  for(let img of hairImages) {
    hairOptions += `<option value="${img}">Hair ${hairImages.indexOf(img) + 1}</option>`;
  }
  const select1 = document.getElementById('hairDropdown');
  select1.innerHTML = hairOptions;

//for body
  const bodyImages = [];
  for(let i = 0; i < 12; i++) {
    bodyImages.push(`./body/body${i}.png`);
  }
  let bodyOptions = '';
  for(let img of bodyImages) {
    bodyOptions += `<option value="${img}">Body ${bodyImages.indexOf(img) + 1}</option>`;
  }
  const select2 = document.getElementById('bodyDropdown');
  select2.innerHTML = bodyOptions;

  //for outer
    const outerImages = [];
    for(let i = 0; i < 4; i++) {
      outerImages.push(`./outer/outer${i}.png`);
    }
    let outerOptions = '';
    for(let img of outerImages) {
      outerOptions += `<option value="${img}">Outer ${outerImages.indexOf(img) + 1}</option>`;
    }
    const select3 = document.getElementById('outerDropdown');
    select3.innerHTML = outerOptions;



// Add for new categories
  function changeHair() {
    const hairDropdown = document.getElementById('hairDropdown');
    const hairLayer = document.getElementById('hairLayer');
    hairLayer.src = hairDropdown.value;
    state.hair = hairDropdown.value;
    updateStateInput();
  }

  function changeGlasses() {
    const glassesDropdown = document.getElementById('glassesDropdown');
    const glassesLayer = document.getElementById('glassesLayer');
    glassesLayer.src = glassesDropdown.value;
    state.glasses = glassesDropdown.value;
    updateStateInput();
  }

  function changeBody() {
    const bodyDropdown = document.getElementById('bodyDropdown');
    const bodyLayer = document.getElementById('bodyLayer');
    bodyLayer.src = bodyDropdown.value;
    state.body = bodyDropdown.value;
    updateStateInput();
  }

  function changeOuter() {
    const outerDropdown = document.getElementById('outerDropdown');
    const outerLayer = document.getElementById('outerLayer');
    outerLayer.src = outerDropdown.value;
    state.outer = outerDropdown.value;
    updateStateInput();
  }
