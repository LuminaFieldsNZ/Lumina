let userID2;
let state2;

window.addEventListener('message', function(event) {
    if (event.data.userId && event.data.state) {
        userID2 = event.data.userId;
        state2 = event.data.state;

        // Update the iframe content
        document.getElementById('state2').innerText = state2;
        document.getElementById('userID2').innerText = userID2;

        // Send a message back to the parent to stop the loop
        window.parent.postMessage({ action: 'stopLoop' }, '*');
    }
}, false);

function exportSave() {
    window.parent.postMessage({ action: 'exportData' }, '*');
}

function updateDis(){
  window.parent.postMessage({ action: 'updateJSONDisplay' }, '*');
}

class Character {
    constructor() {
        this.element = document.querySelector('.character:not(.framed)')
        this.axis = document.querySelectorAll('div[class$=rotation]')

        this.state = {
            selected: false,
            left: parseInt(this.element.style.left) || 0,
            top: parseInt(this.element.style.top) || 0,
            leftPx: 0,
            topPx: 0,
            rotation: {
                x: -35,
                y: -40,
                z: 22
            }
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleMove2 = this.handleMove2.bind(this)
        this.handleRotation = this.handleRotation.bind(this)
        this.handleChromeRightClick = this.handleChromeRightClick.bind(this)
        this.getDelta = this.getDelta.bind(this)

        this.init()
    }

    handleClick() {

        // variable that will store the function so that we can erase the event listener later

        let listenCLick;

        this.element.classList.add('selected')
        gui.domElements.frame.classList.add('visible')
        gui.domElements.voiceIndicator.classList.add('visible')

        console.log('click bound')
        window.addEventListener('click', listenCLick = (e) => {

            if (e.button === 2) {

            // if click on the map then unselect

            } else if (!e.target.parentElement.parentElement.parentElement.parentElement){

                console.log('fuuf')
                this.state.selected = false;

                gui.domElements.frame.classList.remove('visible');
                gui.domElements.voiceIndicator.classList.remove('visible');

                this.element.classList.remove('selected');

                window.removeEventListener('click', listenCLick);
                window.removeEventListener('contextmenu', this.handleChromeRightClick)

            // if click on the character

            } else if (e.target.parentElement.parentElement.parentElement.parentElement.className !== 'hud-container') {

                console.log('i am already selected fuckin asshole');

                sounds.beep.play()
                sounds.marineWhat[Math.floor(Math.random() * 4)].play()

                // reset voice indicator animation

                gui.domElements.voiceIndicator.classList.remove('animated');
                setTimeout(() => {
                    gui.domElements.voiceIndicator.classList.add('animated');
                }, 10)

                console.log(e.target.parentElement.parentElement.parentElement.parentElement);

            }

        })
    }

    // Chrome way to listen right clicks

    handleChromeRightClick(e) {

        gui.domElements.moveCursor.classList.add('visible')

        setTimeout(() => {
            gui.domElements.moveCursor.classList.remove('visible')
        }, 450)

        console.log('click triggered')

        // Binds the cursor's position to move indicator's translate value

        gui.domElements.moveCursor.style.left = e.clientX + "px"
        gui.domElements.moveCursor.style.top = e.clientY + "px"

        // Reset animation on voice indicator

        gui.domElements.voiceIndicator.classList.remove('animated');
        setTimeout(() => {
            gui.domElements.voiceIndicator.classList.add('animated');
        }, 10)

        sounds.marineYes[Math.floor(Math.random() * 3)].play()

        this.handleRotation(e.clientX, e.clientY)
        this.handleMove2(e.clientX, e.clientY)
    }

    // here comes the awful part

    handleRotation (x, y) {

        // here we calculate the angle between the mouse cursor and the trooper

        const delta = this.getDelta(x, y)

        console.log('deltaX: ' + delta[0] + ' deltaY: ' + delta[1])

        const tan = delta[1] / delta[0]
        const alpha = Math.atan(tan)

        let deg = alpha * 57.2958
        let turnX, turnY, turnZ, zCorrection = 0

        // quick math to retrieve the absolute angle

        if (this.leftPx > x && this.topPx > y) {

            deg += 90
            deg *= -1
            turnY = deg

        } else if (this.leftPx < x && this.topPx > y) {

            deg = 90 - deg
            deg += 180
            deg = 360 - deg

        } else if (this.leftPx < x && this.topPx < y) {

            deg = 90 - deg

        } else {

            deg = 90 - deg
            deg *= -1
        }

        // and then we apply a set of values to the rotating axis of our trooper

        if (deg < 22 && deg > -22) {
            turnX = -20
            turnY = 0
            turnZ = 0
        } else if (deg < -22 && deg > -67) {
            turnX = -15
            turnY = -45
            turnZ = 11

        } else if (deg < -67 && deg > -112) {
            turnX = 0
            turnY = -90
            turnZ = 0
            zCorrection = 10

        } else if (deg < -112 && deg > -157) {
            turnX = 15
            turnY = -135
            turnZ = -11

        } else if (deg < -157 || deg > 157) {
            turnX = 20
            turnY = -180
            turnZ = 0

        } else if (deg < 157 && deg > 112) {
            turnX = 15
            turnY = 135
            turnZ = 11

        } else if (deg < 112 && deg > 67) {
            turnX = 0
            turnY = 90
            turnZ = 0
            zCorrection = -10

        } else if (deg < 67 && deg > 22) {
            turnX = -15
            turnY = 45
            turnZ = -11

        }

        // that are bound here

        this.state.rotation = {x: turnX, y: turnY, z: turnZ}
        this.axis[0].style.transform = `rotateZ(${turnZ}deg)`
        this.axis[1].style.transform = `rotateY(${turnY}deg)`
        this.axis[2].style.transform = `rotateX(${turnX}deg) rotateZ(${zCorrection}deg)`

        console.log('angle: ' + deg)
        console.log(`turnX: ${turnX}, turnY: ${turnY}, turnZ: ${turnZ}`);

    }

    // method based on translate for good perf

    handleMove2 (destX, destY) {

        const delta = this.getDelta(destX, destY);

        // calculates the distance bewteen the cursor and the trooper

        let absDelta = Math.round(Math.sqrt(Math.pow(delta[0], 2) + Math.pow(delta[1], 2)))
        console.log('absDelta: ' + absDelta + '\n');

        if (destX < this.leftPx) {
            absDelta += 200
        }

        // variable that enable the calculation of the walking time

        const mvTime = absDelta / 400

        this.element.classList.toggle('animated');

        const percentX = destX / window.innerWidth * 100;
        const percentY = destY / window.innerHeight * 100;

        this.state.left = percentX;
        this.state.top = percentY;

        this.element.style.transform = `scale(0.5) translate(${this.state.left * 2}vw, ${this.state.top * 2}vh)`;
        this.element.style.transitionDuration = `${mvTime}s`

        setTimeout(() => {
            this.element.classList.toggle('animated');
        }, mvTime * 1000);

    }

    // get the distance on x and y between click point and character

    getDelta(x, y) {

        const limit = this.element.style.transform.indexOf(',')

        this.leftPx = parseInt(this.element.style.transform.slice(10, limit).replace('translate(', '')) * 6.6
        this.topPx = parseInt(this.element.style.transform.slice(limit + 1).replace(')', '')) * 4.9

        console.log('leftPx value: ' + this.leftPx);

        const deltaX = Math.round(Math.abs(this.leftPx - x))
        const deltaY = Math.round(Math.abs(this.topPx - y))

        return [deltaX, deltaY]
    }

    init() {

        this.element.addEventListener('click', () => {
            if (!this.state.selected) {
                this.state.selected = true;
                this.handleClick()
                window.addEventListener('contextmenu', this.handleChromeRightClick)
            }
        })
    }
}

class GUI {
    constructor () {
        this.domElements = {
            moveCursor: document.querySelector('.move-indicator'),
            frame: document.querySelector('.frame'),
            voiceIndicator: document.querySelector('.voice-indicator'),
            actionButtons: document.querySelectorAll('.btn-group button'),
            selectionIndicator: document.querySelector('.pannel-inner-3 button'),
            mainButtons: document.querySelectorAll('.pannel-inner-2 button'),
            tutoScreen: document.querySelector('.tuto-screen'),
            tutoTexts: document.querySelectorAll('.tuto-screen p'),
            skipButton: document.querySelector('.tuto-screen button'),
            shutUp: document.querySelector('.shut-up')
        }

        this.tutoDisplay = this.tutoDisplay.bind(this)
        this.handleButtonClick = this.handleButtonClick.bind(this)

        this.init()
    }

    // futuristric sounds for the interface

    handleButtonClick() {
        this.domElements.actionButtons.forEach((button) => {
            button.addEventListener('click', () => {
                 sounds.beep.play()
            })
        })
        this.domElements.mainButtons.forEach((button) => {
            button.addEventListener('click', () => {
                sounds.beep.play()
            })
        })
    }

    tutoDisplay() {

        let step = 0;
        let nextScreen;

        const hideScreen = () => {
            this.domElements.tutoScreen.classList.remove('visible');
            setTimeout(() => {
                this.domElements.tutoScreen.style.display = 'none';
            }, 500)
        }
        const hideText = () => {
            this.domElements.tutoTexts[step].classList.remove('visible');
            setTimeout(() => {
                this.domElements.tutoTexts[step].style.display = 'none';
            }, 20)
        }
        const displayText = () => {
            this.domElements.tutoTexts[step].style.display = 'block';
            setTimeout(() => {
                this.domElements.tutoTexts[step].classList.add('visible');
            }, 20)

        }

        this.domElements.tutoScreen.classList.add('visible')

        this.domElements.skipButton.addEventListener('click', () => {
            hideScreen()
            sounds.beep.play()
        })

        this.domElements.tutoScreen.addEventListener('click', nextScreen = () => {

            sounds.beep2.play()

            console.log(step);

            hideText()
            step += 1;

            if (step > 0) {

                this.domElements.skipButton.style.display = 'none';
            }

            if (step > this.domElements.tutoTexts.length - 1) {

                hideScreen()
                this.domElements.tutoScreen.removeEventListener('click', nextScreen);
            }

            displayText()
        })
    }

    init() {

        this.handleButtonClick()

        setTimeout(this.tutoDisplay, 1000)


        this.domElements.shutUp.addEventListener('click', () => {
            sounds.music.pause()
            setTimeout(() => {
                this.domElements.shutUp.firstElementChild.href = './index.html'
            }, 100)
        })

        this.domElements.actionButtons.forEach((button) => {
            button.addEventListener('click', () => {
                this.domElements.actionButtons.forEach(button => button.classList.remove('active'))
                button.classList.add('active')
            })
        })
        window.addEventListener('load', () => {
            for (let sound in sounds) {
                sounds[sound].volume = 0.2
                console.log(sound)
            }
            sounds.music.volume = 0.01
            sounds.music.loop = true;
            setTimeout(() => {
                sounds.music.play()
            }, 1000)
        })

        // catch the visited status not to show tutorial each time

        // sessionStorage.setItem('visited', 'true')
    }
}

const character = new Character();
const gui = new GUI();

const sounds = {
    beep: new Audio('./sounds/beep.wav'),
    beep2: new Audio('./sounds/beep.wav'),
    music: new Audio('./sounds/beep.wav'),
    marineWhat: [
        new Audio('./sounds/beep.wav'),
        new Audio('./sounds/beep.wav'),
        new Audio('./sounds/beep.wav'),
        new Audio('./sounds/beep.wav'),
    ],
    marineYes: [
        new Audio('./sounds/beep.wav'),
        new Audio('./sounds/beep.wav'),
        new Audio('./sounds/beep.wav')
    ]
}
