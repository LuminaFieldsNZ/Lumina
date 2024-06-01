// Tiny Slider

var slider = tns({
  container: ".slider",
  items: 3,
  speed: 500,
  mouseDrag: true,
  autoplay: false,
  center: true,
  loop: false,
  nav: false,
  controlsContainer: "#custom-control",
  controlsPosition: "bottom",
});

// ScrollReveal JS

ScrollReveal({ distance: "30px", easing: "ease-in" });

ScrollReveal().reveal(".title", {
  delay: 300,
  origin: "top",
});

ScrollReveal().reveal(".paragraph", {
  delay: 800,
  origin: "top",
});

ScrollReveal().reveal("#form", {
  delay: 1200,
  origin: "bottom",
});

function sendEmail() {
  var emailAddress = 'luminafieldsnz@gmail.com';
  var subject = 'Sign me up to your newsletter';
  var body = 'Welcome to LuminaFields.com - Our newsletter will keep you up to date on everything artificial, from Camp Lumina, to what\'s new in the field. Paid members get access to private tutoring, daily mentorship, and code assistance.';
  
  var mailtoLink = 'mailto:' + encodeURIComponent(emailAddress) + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  
  window.location.href = mailtoLink;
}


// Vanilla-Tilt JS

var VanillaTilt = (function () {
  "use strict";



  class VanillaTilt {
    constructor(element, settings = {}) {
      if (!(element instanceof Node)) {
        throw (
          "Can't initialize VanillaTilt because " + element + " is not a Node."
        );
      }

      this.width = null;
      this.height = null;
      this.clientWidth = null;
      this.clientHeight = null;
      this.left = null;
      this.top = null;

      // for Gyroscope sampling
      this.gammazero = null;
      this.betazero = null;
      this.lastgammazero = null;
      this.lastbetazero = null;

      this.transitionTimeout = null;
      this.updateCall = null;
      this.event = null;

      this.updateBind = this.update.bind(this);
      this.resetBind = this.reset.bind(this);

      this.element = element;
      this.settings = this.extendSettings(settings);

      this.reverse = this.settings.reverse ? -1 : 1;
      this.resetToStart = VanillaTilt.isSettingTrue(
        this.settings["reset-to-start"]
      );
      this.glare = VanillaTilt.isSettingTrue(this.settings.glare);
      this.glarePrerender = VanillaTilt.isSettingTrue(
        this.settings["glare-prerender"]
      );
      this.fullPageListening = VanillaTilt.isSettingTrue(
        this.settings["full-page-listening"]
      );
      this.gyroscope = VanillaTilt.isSettingTrue(this.settings.gyroscope);
      this.gyroscopeSamples = this.settings.gyroscopeSamples;

      this.elementListener = this.getElementListener();

      if (this.glare) {
        this.prepareGlare();
      }

      if (this.fullPageListening) {
        this.updateClientSize();
      }

      this.addEventListeners();
      this.reset();

      if (this.resetToStart === false) {
        this.settings.startX = 0;
        this.settings.startY = 0;
      }
    }

    static isSettingTrue(setting) {
      return setting === "" || setting === true || setting === 1;
    }

    /**
     * Method returns element what will be listen mouse events
     * @return {Node}
     */
    getElementListener() {
      if (this.fullPageListening) {
        return window.document;
      }

      if (typeof this.settings["mouse-event-element"] === "string") {
        const mouseEventElement = document.querySelector(
          this.settings["mouse-event-element"]
        );

        if (mouseEventElement) {
          return mouseEventElement;
        }
      }

      if (this.settings["mouse-event-element"] instanceof Node) {
        return this.settings["mouse-event-element"];
      }

      return this.element;
    }

    /**
     * Method set listen methods for this.elementListener
     * @return {Node}
     */
    addEventListeners() {
      this.onMouseEnterBind = this.onMouseEnter.bind(this);
      this.onMouseMoveBind = this.onMouseMove.bind(this);
      this.onMouseLeaveBind = this.onMouseLeave.bind(this);
      this.onWindowResizeBind = this.onWindowResize.bind(this);
      this.onDeviceOrientationBind = this.onDeviceOrientation.bind(this);

      this.elementListener.addEventListener(
        "mouseenter",
        this.onMouseEnterBind
      );
      this.elementListener.addEventListener(
        "mouseleave",
        this.onMouseLeaveBind
      );
      this.elementListener.addEventListener("mousemove", this.onMouseMoveBind);

      if (this.glare || this.fullPageListening) {
        window.addEventListener("resize", this.onWindowResizeBind);
      }

      if (this.gyroscope) {
        window.addEventListener(
          "deviceorientation",
          this.onDeviceOrientationBind
        );
      }
    }

    /**
     * Method remove event listeners from current this.elementListener
     */
    removeEventListeners() {
      this.elementListener.removeEventListener(
        "mouseenter",
        this.onMouseEnterBind
      );
      this.elementListener.removeEventListener(
        "mouseleave",
        this.onMouseLeaveBind
      );
      this.elementListener.removeEventListener(
        "mousemove",
        this.onMouseMoveBind
      );

      if (this.gyroscope) {
        window.removeEventListener(
          "deviceorientation",
          this.onDeviceOrientationBind
        );
      }

      if (this.glare || this.fullPageListening) {
        window.removeEventListener("resize", this.onWindowResizeBind);
      }
    }

    destroy() {
      clearTimeout(this.transitionTimeout);
      if (this.updateCall !== null) {
        cancelAnimationFrame(this.updateCall);
      }

      this.element.style.willChange = "";
      this.element.style.transition = "";
      this.element.style.transform = "";
      this.resetGlare();

      this.removeEventListeners();
      this.element.vanillaTilt = null;
      delete this.element.vanillaTilt;

      this.element = null;
    }

    onDeviceOrientation(event) {
      if (event.gamma === null || event.beta === null) {
        return;
      }

      this.updateElementPosition();

      if (this.gyroscopeSamples > 0) {
        this.lastgammazero = this.gammazero;
        this.lastbetazero = this.betazero;

        if (this.gammazero === null) {
          this.gammazero = event.gamma;
          this.betazero = event.beta;
        } else {
          this.gammazero = (event.gamma + this.lastgammazero) / 2;
          this.betazero = (event.beta + this.lastbetazero) / 2;
        }

        this.gyroscopeSamples -= 1;
      }

      const totalAngleX =
        this.settings.gyroscopeMaxAngleX - this.settings.gyroscopeMinAngleX;
      const totalAngleY =
        this.settings.gyroscopeMaxAngleY - this.settings.gyroscopeMinAngleY;

      const degreesPerPixelX = totalAngleX / this.width;
      const degreesPerPixelY = totalAngleY / this.height;

      const angleX =
        event.gamma - (this.settings.gyroscopeMinAngleX + this.gammazero);
      const angleY =
        event.beta - (this.settings.gyroscopeMinAngleY + this.betazero);

      const posX = angleX / degreesPerPixelX;
      const posY = angleY / degreesPerPixelY;

      if (this.updateCall !== null) {
        cancelAnimationFrame(this.updateCall);
      }

      this.event = {
        clientX: posX + this.left,
        clientY: posY + this.top,
      };

      this.updateCall = requestAnimationFrame(this.updateBind);
    }

    onMouseEnter() {
      this.updateElementPosition();
      this.element.style.willChange = "transform";
      this.setTransition();
    }

    onMouseMove(event) {
      if (this.updateCall !== null) {
        cancelAnimationFrame(this.updateCall);
      }

      this.event = event;
      this.updateCall = requestAnimationFrame(this.updateBind);
    }

    onMouseLeave() {
      this.setTransition();

      if (this.settings.reset) {
        requestAnimationFrame(this.resetBind);
      }
    }

    reset() {
      this.onMouseEnter();

      if (this.fullPageListening) {
        this.event = {
          clientX:
            ((this.settings.startX + this.settings.max) /
              (2 * this.settings.max)) *
            this.clientWidth,
          clientY:
            ((this.settings.startY + this.settings.max) /
              (2 * this.settings.max)) *
            this.clientHeight,
        };
      } else {
        this.event = {
          clientX:
            this.left +
            ((this.settings.startX + this.settings.max) /
              (2 * this.settings.max)) *
              this.width,
          clientY:
            this.top +
            ((this.settings.startY + this.settings.max) /
              (2 * this.settings.max)) *
              this.height,
        };
      }

      let backupScale = this.settings.scale;
      this.settings.scale = 1;
      this.update();
      this.settings.scale = backupScale;
      this.resetGlare();
    }

    resetGlare() {
      if (this.glare) {
        this.glareElement.style.transform =
          "rotate(180deg) translate(-50%, -50%)";
        this.glareElement.style.opacity = "0";
      }
    }

    getValues() {
      let x, y;

      if (this.fullPageListening) {
        x = this.event.clientX / this.clientWidth;
        y = this.event.clientY / this.clientHeight;
      } else {
        x = (this.event.clientX - this.left) / this.width;
        y = (this.event.clientY - this.top) / this.height;
      }

      x = Math.min(Math.max(x, 0), 1);
      y = Math.min(Math.max(y, 0), 1);

      let tiltX = (
        this.reverse *
        (this.settings.max - x * this.settings.max * 2)
      ).toFixed(2);
      let tiltY = (
        this.reverse *
        (y * this.settings.max * 2 - this.settings.max)
      ).toFixed(2);
      let angle =
        Math.atan2(
          this.event.clientX - (this.left + this.width / 2),
          -(this.event.clientY - (this.top + this.height / 2))
        ) *
        (180 / Math.PI);

      return {
        tiltX: tiltX,
        tiltY: tiltY,
        percentageX: x * 100,
        percentageY: y * 100,
        angle: angle,
      };
    }

    updateElementPosition() {
      let rect = this.element.getBoundingClientRect();

      this.width = this.element.offsetWidth;
      this.height = this.element.offsetHeight;
      this.left = rect.left;
      this.top = rect.top;
    }

    update() {
      let values = this.getValues();

      this.element.style.transform =
        "perspective(" +
        this.settings.perspective +
        "px) " +
        "rotateX(" +
        (this.settings.axis === "x" ? 0 : values.tiltY) +
        "deg) " +
        "rotateY(" +
        (this.settings.axis === "y" ? 0 : values.tiltX) +
        "deg) " +
        "scale3d(" +
        this.settings.scale +
        ", " +
        this.settings.scale +
        ", " +
        this.settings.scale +
        ")";

      if (this.glare) {
        this.glareElement.style.transform = `rotate(${values.angle}deg) translate(-50%, -50%)`;
        this.glareElement.style.opacity = `${
          (values.percentageY * this.settings["max-glare"]) / 100
        }`;
      }

      this.element.dispatchEvent(
        new CustomEvent("tiltChange", {
          detail: values,
        })
      );

      this.updateCall = null;
    }

    /**
     * Appends the glare element (if glarePrerender equals false)
     * and sets the default style
     */
    prepareGlare() {
      // If option pre-render is enabled we assume all html/css is present for an optimal glare effect.
      if (!this.glarePrerender) {
        // Create glare element
        const jsTiltGlare = document.createElement("div");
        jsTiltGlare.classList.add("js-tilt-glare");

        const jsTiltGlareInner = document.createElement("div");
        jsTiltGlareInner.classList.add("js-tilt-glare-inner");

        jsTiltGlare.appendChild(jsTiltGlareInner);
        this.element.appendChild(jsTiltGlare);
      }

      this.glareElementWrapper = this.element.querySelector(".js-tilt-glare");
      this.glareElement = this.element.querySelector(".js-tilt-glare-inner");

      if (this.glarePrerender) {
        return;
      }

      Object.assign(this.glareElementWrapper.style, {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        "pointer-events": "none",
        "border-radius": "inherit",
      });

      Object.assign(this.glareElement.style, {
        position: "absolute",
        top: "50%",
        left: "50%",
        "pointer-events": "none",
        "background-image": `linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)`,
        transform: "rotate(180deg) translate(-50%, -50%)",
        "transform-origin": "0% 0%",
        opacity: "0",
      });

      this.updateGlareSize();
    }

    updateGlareSize() {
      if (this.glare) {
        const glareSize =
          (this.element.offsetWidth > this.element.offsetHeight
            ? this.element.offsetWidth
            : this.element.offsetHeight) * 2;

        Object.assign(this.glareElement.style, {
          width: `${glareSize}px`,
          height: `${glareSize}px`,
        });
      }
    }

    updateClientSize() {
      this.clientWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

      this.clientHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    }

    onWindowResize() {
      this.updateGlareSize();
      this.updateClientSize();
    }

    setTransition() {
      clearTimeout(this.transitionTimeout);
      this.element.style.transition =
        this.settings.speed + "ms " + this.settings.easing;
      if (this.glare)
        this.glareElement.style.transition = `opacity ${this.settings.speed}ms ${this.settings.easing}`;

      this.transitionTimeout = setTimeout(() => {
        this.element.style.transition = "";
        if (this.glare) {
          this.glareElement.style.transition = "";
        }
      }, this.settings.speed);
    }

    extendSettings(settings) {
      let defaultSettings = {
        reverse: false,
        max: 10,
        startX: 0,
        startY: 0,
        perspective: 1000,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        scale: 1,
        speed: 300,
        transition: true,
        axis: null,
        glare: false,
        "max-glare": 1,
        "glare-prerender": false,
        "full-page-listening": false,
        "mouse-event-element": null,
        reset: true,
        "reset-to-start": true,
        gyroscope: true,
        gyroscopeMinAngleX: -45,
        gyroscopeMaxAngleX: 45,
        gyroscopeMinAngleY: -45,
        gyroscopeMaxAngleY: 45,
        gyroscopeSamples: 10,
      };

      let newSettings = {};
      for (var property in defaultSettings) {
        if (property in settings) {
          newSettings[property] = settings[property];
        } else if (this.element.hasAttribute("data-tilt-" + property)) {
          let attribute = this.element.getAttribute("data-tilt-" + property);
          try {
            newSettings[property] = JSON.parse(attribute);
          } catch (e) {
            newSettings[property] = attribute;
          }
        } else {
          newSettings[property] = defaultSettings[property];
        }
      }

      return newSettings;
    }

    static init(elements, settings) {
      if (elements instanceof Node) {
        elements = [elements];
      }

      if (elements instanceof NodeList) {
        elements = [].slice.call(elements);
      }

      if (!(elements instanceof Array)) {
        return;
      }

      elements.forEach((element) => {
        if (!("vanillaTilt" in element)) {
          element.vanillaTilt = new VanillaTilt(element, settings);
        }
      });
    }
  }

  if (typeof document !== "undefined") {
    /* expose the class to window */
    window.VanillaTilt = VanillaTilt;

    VanillaTilt.init(document.querySelectorAll("[data-tilt]"));
  }

  return VanillaTilt;
})();



let scene, camera, renderer, model, mixer, action, delta;
let clock = new THREE.Clock();
let animations, currentAnimationIndex = 0;
let spine, neck;
let mouse = new THREE.Vector2();
let targetRotation = new THREE.Vector3();
let allowHeadTracking = true;

function render() {
  delta = clock.getDelta();
  if (mixer) {
    mixer.update(delta);
  }
  if (spine && neck && allowHeadTracking) {
    spine.rotation.y += 0.3 * (targetRotation.y - spine.rotation.y);
    neck.rotation.y += 0.3 * (targetRotation.y - neck.rotation.y);
    spine.rotation.x += 0.3 * (targetRotation.x - spine.rotation.x);
    neck.rotation.x += 0.3 * (targetRotation.x - neck.rotation.x);
  }
  renderer.render(scene, camera);
}


document.addEventListener('DOMContentLoaded', (event) => {
  init();
});


document.addEventListener('click', function () {
  // Stop the current animation
  action.stop();

  // Set the current animation to index 6 (animation 7)
  currentAnimationIndex = 6;
  action = mixer.clipAction(animations[currentAnimationIndex]);

  // Set the animation to play once and play it
  action.setLoop(THREE.LoopOnce);
  action.reset();
  action.play();

  // Disable head tracking during the new animation
  allowHeadTracking = false;

  // Set a timeout to restart the entire animation (including idle) after the click event
  setTimeout(() => {
    // Allow head tracking to resume after the click event
    allowHeadTracking = true;

    // Revert to the idle animation
    action = mixer.clipAction(animations[0]); // Assuming the idle animation is at index 0
    action.setLoop(THREE.LoopRepeat);
    action.play();
  }, action._clip.duration * 1000); // Assuming action._clip.duration gives the duration of the current animation in seconds
});

  
  
  document.addEventListener('mousemove', function (event) {
    // Only update targetRotation if head tracking is allowed
    if (allowHeadTracking) {
      mouse.x = (event.clientX / window.innerWidth);
      mouse.y = (event.clientY / window.innerHeight);
      targetRotation.x = (mouse.y);
      targetRotation.y = (mouse.x);
    }
  });
  



function init() {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 0, 16);
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 4);
  camera.lookAt(0, 0, 0);

  let ambient = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambient);
  let pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.position.z = 2500;
  scene.add(pointLight);

  let loader = new THREE.GLTFLoader();
  loader.load('https://luminafields.com/micheal.glb', function (gltf) {
    model = gltf.scene;
    scene.add(model);
    model.position.y = -1.2;
    model.position.z = 2.2;

    mixer = new THREE.AnimationMixer(model);
    animations = gltf.animations;
    action = mixer.clipAction(animations[currentAnimationIndex]);
    action.setLoop(THREE.LoopRepeat);
    action.play();

    spine = model.getObjectByName('Spine'); // Replace 'Spine' with the actual name of the spine bone/mesh
    neck = model.getObjectByName('Neck'); // Replace 'Neck' with the actual name of the neck bone/mesh
  });

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById("app").appendChild(renderer.domElement);

  gsap.ticker.add(render);

}



const mainHeadings = [
  "Explorer",
  "Voyager",
  "Captain",
  "Merchant",
  "Shipwright",
  "Fisherman",
  "Smuggler",
  "Arbiter",
  "Sailor"
];

const populations = [
  "Progressive",
  "Socialist",
  "Idealist",
  "Globalist",
  "Conservative",
  "Economist",
  "Realist",
  "Nationalist",
  "Populist"
];

const mainHeadingsStatements = [
  "Always seeks new horizons and is driven by curiosity and adventure.",
  "Embarks on long journeys, embracing the unknown and the vast sea.",
  "Leads with confidence and ensures the crew stays on course.",
  "Navigates the waters of trade, always looking for prosperous exchanges.",
  "Builds and repairs ships, ensuring they are seaworthy and strong.",
  "Patiently casts nets, understanding the rhythms of the sea.",
  "Operates in the shadows, finding ways to bypass the rules.",
  "Resolves conflicts and ensures fairness among the crew.",
  "Knows the ship intimately, performing essential tasks to keep it afloat."
];

const populationsStatements = [
  "Embraces change and innovation, constantly pushing for societal advancement.",
  "Believes in collective ownership and a society structured around equality.",
  "Guided by high ideals and visions of a better world.",
  "Sees the world as interconnected and values international cooperation.",
  "Values tradition and seeks to preserve established practices.",
  "Focused on economic efficiency and market-based solutions.",
  "Grounded in practical considerations and the reality of situations.",
  "Prioritizes the interests and culture of their own nation.",
  "Champions the common people against the elite."
];

document.getElementById('mainHeading').addEventListener('input', updateMainHeadingValue);
document.getElementById('populations').addEventListener('input', updatePopulationsValue);

function updateMainHeadingValue() {
  const mainHeadingIndex = document.getElementById('mainHeading').value;
  document.getElementById('mainHeadingValue').innerText = mainHeadings[mainHeadingIndex];
  updateDescription();
}

function updatePopulationsValue() {
  const populationsIndex = document.getElementById('populations').value;
  document.getElementById('populationsValue').innerText = populations[populationsIndex];
  updateDescription();
}

function updateDescription() {
  const mainHeadingIndex = document.getElementById('mainHeading').value;
  const populationsIndex = document.getElementById('populations').value;
  
  const mainHeading = mainHeadings[mainHeadingIndex];
  const population = populations[populationsIndex];
  
  const mainHeadingStatement = mainHeadingsStatements[mainHeadingIndex];
  const populationStatement = populationsStatements[populationsIndex];
  
  const description = `The ${mainHeading} ${mainHeadingStatement} This represents the ${population} population: ${populationStatement}`;
  
  document.getElementById('descriptionText').innerText = description;
}

// Initialize values on load
updateMainHeadingValue();
updatePopulationsValue();
updateDescription();
