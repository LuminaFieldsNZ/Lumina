


const svgTemplates = {
  sad: `
    <svg class="sad" width="44px" height="44px" viewBox="0 0 44 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g id="sad" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(0, 0)">
        <g id="face" transform="translate(13.000000, 20.000000)">
          <g class="face">
            <path d="M7,4 C7,5.1045695 7.8954305,6 9,6 C10.1045695,6 11,5.1045695 11,4" class="mouth" stroke="#2C0E0F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform="translate(9.000000, 5.000000) rotate(-180.000000) translate(-9.000000, -5.000000)"></path>
            <ellipse class="right-eye" fill="#2C0E0F" cx="16.0941176" cy="1.75609756" rx="1.90588235" ry="1.75609756"></ellipse>
            <ellipse class="left-eye" fill="#2C0E0F" cx="1.90588235" cy="1.75609756" rx="1.90588235" ry="1.75609756"></ellipse>
          </g>
        </g>
      </g>
    </svg>
  `,
  neutral: `
    <svg class="neutral" width="44px" height="44px" viewBox="0 0 44 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g>
        <g class="face">
          <g transform="translate(13.000000, 20.000000)" fill="#2C0E0F">
            <g class="mouth">
              <g transform="translate(9, 5)">
                <rect x="-2" y="0" width="4" height="2" rx="2"></rect>
              </g>
            </g>
            <ellipse class="right-eye" cx="16.0941176" cy="1.75" rx="1.90588235" ry="1.75"></ellipse>
            <ellipse class="left-eye" cx="1.90588235" cy="1.75" rx="1.90588235" ry="1.75"></ellipse>
          </g>
        </g>
      </g>
    </svg>
  `,
  fine: `
    <svg class="fine" width="44px" height="44px" viewBox="0 0 44 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g id="fine-emotion" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="fine">
          <g class="matrix" transform="translate(22.000000, 32.000000)">
            <g class="face-container">
              <g class="face" transform="translate(-9, -12)">
                <g class="eyes">
                  <ellipse class="right-eye" fill="#2C0E0F" cx="16.0941176" cy="1.75609756" rx="1.90588235" ry="1.75609756"></ellipse>
                  <ellipse class="left-eye" fill="#2C0E0F" cx="1.90588235" cy="1.75609756" rx="1.90588235" ry="1.75609756"></ellipse>
                </g>
                <path d="M6.18823529,4.90499997 C6.18823529,5.95249999 7.48721095,7 9.08957864,7 C10.6919463,7 11.990922,5.95249999 11.990922,4.90499997" id="mouth" stroke="#2C0E0F" stroke-linecap="round" stroke-linejoin="round"></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  `,
  happy: `
    <svg class="happy" width="44px" height="44px" viewBox="0 0 44 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g id="Happy" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(0, 0)">
        <g class="scaleFace">
          <g class="face">
            <ellipse id="Eye-right" fill="#2C0E0F" cx="29.0875" cy="21.75" rx="1.89926471" ry="1.75"></ellipse>
            <ellipse id="Eye-left" fill="#2C0E0F" cx="14.8992647" cy="21.75" rx="1.89926471" ry="1.75"></ellipse>
            <path d="M21.8941176,27.8819633 C24.8588235,27.8819632 25.4941176,25.5404999 25.4941176,24.5648901 C25.4941176,23.5892803 24.4352941,23.9795242 22.1058824,23.9795242 C19.7764706,23.9795242 18.2941176,23.5892803 18.2941176,24.5648901 C18.2941176,25.5404999 18.9294118,27.8819633 21.8941176,27.8819633 Z" id="Mouth" fill="#2C0E0F"></path>
            <ellipse id="Tung" fill="#E23D18" cx="21.8941176" cy="26.4390244" rx="1.69411765" ry="0.780487805"></ellipse>
          </g>
        </g>
      </g>
    </svg>
  `
};

const modules = [
  {
    id: 'module1',
    header: 'User Profile',
    content: `Download JSON file: We don't believe in saving your data or hosting data online.
               We believe you should be in charge of your data, so when you download your .json file
               you're holding all the memory of Lumina interactions. You'll be prompted to update your name
               and move to the next module.`,
    buttonAction: 'exportData();addCompletedModule(1);'
  },
  {
    id: 'module2',
    header: 'Unique Identity',
    content: `Once you've downloaded your profile.json file, you should navigate to the settings <b>[GEAR]</b> icon page.
               Click the [CHOOSE FILE] button, and select your profile.json file to upload.
               Here you can see and modify all of the data inside your profile.
               Upload your recently downloaded profile.json file, to login then navigate to the animated logo button. <i>Top Left of screen</i> - 
               design your avatar, then navigate to chat <b>[MESSAGE]</b> icon.`
  },
  {
    id: 'module3',
    header: 'Getting Started',
    content: `You're ready to apply yourself. The <b>[CHAT]</b> interface will navigate you through everything Lumina Fields. 
    You can use your voice or the standard keyobard, try telling the Lumies a little about your day and why you chose to be exactly where you are now. 
    Once you've done that, navigate with the <b>[MODULE]</b> button to view your <i>Heading</i>.`
  },
  {
    id: 'module4',
    header: 'Mental Image',
    content: `Let us walk you through a logic puzzle to begin data gathering. <b>Reminder! </b><i>Lumie response will be locked to Quest narrative until completion</i>`,
    display: 'none'
  },
  {
    id: 'module991',
    header: 'Learning Ego',
    content: `Module 911 Complete.`,
    display: 'none'
  }
];

function createModule(module) {
  const moduleWrapper = document.createElement('div');
  moduleWrapper.className = 'project-box-wrapper';
  moduleWrapper.id = `${module.id}xx`;
  moduleWrapper.style.display = module.display || 'block';
  moduleWrapper.style.position = 'relative';

  const moduleBox = document.createElement('div');
  moduleBox.className = 'project-box';
  moduleBox.id = module.id;
  moduleBox.style.backgroundColor = '#f8db82'; // Fixed background color

  const header = document.createElement('div');
  header.className = 'project-box-header';

  const daysLeft = document.createElement('div');
  daysLeft.className = 'days-left';
  daysLeft.id = `${module.id}a`;
  daysLeft.style.color = 'rgba(199, 60, 32, 1)';
  daysLeft.textContent = 'Incomplete';

  header.appendChild(daysLeft);

  const contentHeader = document.createElement('div');
  contentHeader.className = 'project-box-content-header';

  const boxContentHeader = document.createElement('p');
  boxContentHeader.className = 'box-content-header';
  boxContentHeader.textContent = module.header;

  const boxContentSubheader = document.createElement('p');
  boxContentSubheader.className = 'box-content-subheader';
  boxContentSubheader.style.marginBottom = '60px';
  boxContentSubheader.innerHTML = `${module.content} ${module.buttonAction ? `<br><br><button class="open-modal" onclick="${module.buttonAction}">Download</button>` : ''}`;

  contentHeader.appendChild(boxContentHeader);
  contentHeader.appendChild(boxContentSubheader);

  moduleBox.appendChild(header);
  moduleBox.appendChild(contentHeader);

  // Add the random emotion SVG to the module
  const svgContainer = document.createElement('div');
  svgContainer.className = 'svg-container';
  const svg = getRandomEmotion();
  svgContainer.innerHTML = svg;

  // Ensure there are eye elements before adding data attributes
  const rightEye = svgContainer.querySelector('.right-eye');
  const leftEye = svgContainer.querySelector('.left-eye');
  if (rightEye && leftEye) {
    rightEye.setAttribute('data-original-cx', rightEye.getAttribute('cx'));
    rightEye.setAttribute('data-original-cy', rightEye.getAttribute('cy'));
    leftEye.setAttribute('data-original-cx', leftEye.getAttribute('cx'));
    leftEye.setAttribute('data-original-cy', leftEye.getAttribute('cy'));
  }

  moduleBox.appendChild(svgContainer);
  moduleWrapper.appendChild(moduleBox);

  return moduleWrapper;
}

// Add modules to the DOM
function addModules() {
  const splash = document.getElementById('splash');
  modules.forEach(module => {
    splash.appendChild(createModule(module));
  });
}

// Get a random emotion SVG
function getRandomEmotion() {
  const emotions = ['sad', 'neutral', 'fine', 'happy'];
  const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
  return svgTemplates[randomEmotion];
}

function moveEyes(event) {
  const svgContainers = document.querySelectorAll('.svg-container');
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  svgContainers.forEach(container => {
    const containerRect = container.getBoundingClientRect();
    const rightEye = container.querySelector('.right-eye');
    const leftEye = container.querySelector('.left-eye');

    if (rightEye && leftEye) {
      const originalRightEyeCX = parseFloat(rightEye.getAttribute('data-original-cx'));
      const originalRightEyeCY = parseFloat(rightEye.getAttribute('data-original-cy'));
      const originalLeftEyeCX = parseFloat(leftEye.getAttribute('data-original-cx'));
      const originalLeftEyeCY = parseFloat(leftEye.getAttribute('data-original-cy'));

      const maxEyeMovement = 5;
      const offsetX = mouseX - (containerRect.left + containerRect.width / 2);
      const offsetY = mouseY - (containerRect.top + containerRect.height / 2);

      const rightEyeOffsetX = Math.min(maxEyeMovement, offsetX / 50);
      const rightEyeOffsetY = Math.min(maxEyeMovement, offsetY / 50);
      const leftEyeOffsetX = Math.min(maxEyeMovement, offsetX / 50);
      const leftEyeOffsetY = Math.min(maxEyeMovement, offsetY / 50);

      rightEye.setAttribute('cx', originalRightEyeCX + rightEyeOffsetX);
      rightEye.setAttribute('cy', originalRightEyeCY + rightEyeOffsetY);
      leftEye.setAttribute('cx', originalLeftEyeCX + leftEyeOffsetX);
      leftEye.setAttribute('cy', originalLeftEyeCY + leftEyeOffsetY);

      // Reset the eyes after 2 seconds
      setTimeout(() => {
        rightEye.setAttribute('cx', originalRightEyeCX);
        rightEye.setAttribute('cy', originalRightEyeCY);
        leftEye.setAttribute('cx', originalLeftEyeCX);
        leftEye.setAttribute('cy', originalLeftEyeCY);
      }, 2000);
    }
  });
}

// Ensure the DOM is loaded before adding the modules and event listeners
document.addEventListener('DOMContentLoaded', () => {
  addModules();
  document.getElementById('splash').addEventListener('click', moveEyes);
});