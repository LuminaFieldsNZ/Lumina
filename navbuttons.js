
document.addEventListener('DOMContentLoaded', function () {
  splashActive();
  document.getElementById('bookFrame6').src = 'peep.html';
  document.getElementById('bookFrame7').src = 'icons/index.html';
});





function peepMake(){
  document.getElementById("peeps").style.display = "block";
  document.getElementById("schedule").style.display = "none";
  document.getElementById("energyAudit").style.display = "none";
  document.getElementById("splash").style.display = "none";
  document.getElementById("settingsMain").style.display = "none";
  document.getElementById("hugs").style.display = "none";


  navLumi.classList.add("active");
  navMess.classList.remove("active");
  navHome.classList.remove("active");
  navSchedule.classList.remove("active");
  navAudit.classList.remove("active");
  navSettings.classList.remove("active");

}

function messBot(){
  document.getElementById("schedule").style.display = "block";
  document.getElementById("peeps").style.display = "none";
  document.getElementById("energyAudit").style.display = "none";
  document.getElementById("splash").style.display = "none";
  document.getElementById("settingsMain").style.display = "none";
  document.getElementById("hugs").style.display = "none";


  navMess.classList.add("active");
  navLumi.classList.remove("active");
  navHome.classList.remove("active");
  navSchedule.classList.remove("active");
  navAudit.classList.remove("active");
  navSettings.classList.remove("active");

}



function energyAuditActive(){
  document.getElementById("energyAudit").style.display = "block";
  navLumi.classList.remove("active");
  document.getElementById("peeps").style.display = "none";
  document.getElementById("splash").style.display = "none";
  document.getElementById("settingsMain").style.display = "none";
  document.getElementById("schedule").style.display = "none";
  document.getElementById("hugs").style.display = "none";

  navAudit.classList.add("active");
  navHome.classList.remove("active");
  navMess.classList.remove("active");
  navSchedule.classList.remove("active");
  navSettings.classList.remove("active");
}

function scheduleActive(){
  document.getElementById('bookFrame7').src = 'icons/index.html';
  document.getElementById("hugs").style.display = "block";
  document.getElementById("schedule").style.display = "none";
  document.getElementById("peeps").style.display = "none";
  document.getElementById("energyAudit").style.display = "none";
  document.getElementById("splash").style.display = "none";
  document.getElementById("settingsMain").style.display = "none";

  navHome.classList.remove("active");
  navSchedule.classList.add("active");
  navLumi.classList.remove("active");
  navMess.classList.remove("active");
  navAudit.classList.remove("active");
  navSettings.classList.remove("active");
}

function splashActive(){
  document.getElementById("energyAudit").style.display = "none";
  document.getElementById("splash").style.display = "block";
  navLumi.classList.remove("active");
  document.getElementById("peeps").style.display = "none";
  document.getElementById("settingsMain").style.display = "none";
  document.getElementById("schedule").style.display = "none";
  document.getElementById("hugs").style.display = "none";

  navHome.classList.add("active");
  navMess.classList.remove("active");
  navAudit.classList.remove("active");
  navSchedule.classList.remove("active");
  navSettings.classList.remove("active");
}

function settingsActive(){
  document.getElementById("energyAudit").style.display = "none";
  document.getElementById("splash").style.display = "none";
  navLumi.classList.remove("active");
  document.getElementById("peeps").style.display = "none";
  document.getElementById("settingsMain").style.display = "block";
  document.getElementById("schedule").style.display = "none";
  document.getElementById("hugs").style.display = "none";

  navSettings.classList.add("active");
  navHome.classList.remove("active");
  navAudit.classList.remove("active");
  navMess.classList.remove("active");
  navSchedule.classList.remove("active");
}


// Define the SVG as a string
const svgIcon = `
<a onclick="settingsActive();">
<svg class="link-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-settings" viewBox="0 0 24 24">
    <defs />
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
</svg>
</a>
`;

// Function to insert SVG into a dynamic div
function insertSvg(containerId) {
const container = document.getElementById(containerId);
if (container) {
    container.innerHTML = svgIcon;
} else {
    console.error('Container not found');
}
}


// Define the SVG as a string
const msgIcon = `
<a onclick="messBot();">
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle">
<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
</a>
`;

// Function to insert SVG into a dynamic div
function insertSvg2(containerId) {
const container = document.getElementById(containerId);
if (container) {
    container.innerHTML = msgIcon;
} else {
    console.error('Container not found');
}
}

// Define the SVG as a string
const audIcon = `
<a onclick="energyAuditActive();">
<svg class="link-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-pie-chart" viewBox="0 0 24 24">
<defs /><path d="M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z" />
</svg>
</a>
`;

// Function to insert SVG into a dynamic div
function insertSvg3(containerId) {
const container = document.getElementById(containerId);
if (container) {
    container.innerHTML = audIcon;
} else {
    console.error('Container not found');
}
}

// Define the SVG as a string
const lumIcon = `
<a style="width:14px: height:14px;" onclick="peepMake();addCompletedModule(2);">
<svg style="background-color: #fff; border-radius: 30%; width:14px; height:14px;" class="fine" viewBox="0 0 44 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="fine-emotion" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="fine">
                            <g class="matrix" transform="translate(22.000000, 32.000000)">
                             <g class="face-container">
                              <g class="face" transform="translate(-9, -12)">
                                <g class="face-upAndDown">
                                <g class="eyes">
                                <ellipse class="right-eye" fill="#2C0E0F" cx="16.0941176" cy="1.75609756" rx="1.90588235" ry="1.75609756" data-original-cx="16.0941176" data-original-cy="1.75609756"></ellipse>
                                <ellipse class="left-eye" fill="#2C0E0F" cx="1.90588235" cy="1.75609756" rx="1.90588235" ry="1.75609756" data-original-cx="1.90588235" data-original-cy="1.75609756"></ellipse></g>
                                <path d="M6.18823529,4.90499997 C6.18823529,5.95249999 7.48721095,7 9.08957864,7 C10.6919463,7 11.990922,5.95249999 11.990922,4.90499997" id="mouth" stroke="#2C0E0F" stroke-linecap="round" stroke-linejoin="round"></path>
                                </g>
                            </g>
                            </g>
                          </g>
                        </g>
                    </g>
                  </svg>
</a>
`;

// Function to insert SVG into a dynamic div
function insertSvg4(containerId) {
const container = document.getElementById(containerId);
if (container) {
    container.innerHTML = lumIcon;
} else {
    console.error('Container not found');
}
}

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
insertSvg('svgIcon');
insertSvg2('msgIcon');
insertSvg3('audIcon');
insertSvg4('lumIcon');
});















// Function to start the quest and display a random toxic validation question
function startQuest() {
  // Filter questions that contain the word "toxic"
  const toxicQuestions = baseData.filter(item => item[0].toLowerCase().includes('lumie')); 

  // Randomly select one question from the filtered list
  const randomIndex = Math.floor(Math.random() * toxicQuestions.length);
  const selectedQuestion = toxicQuestions[randomIndex];

  // Display the selected question and answer in the chat window
  const chatWindow3 = document.getElementById('chatWindow');

  

  let typingContainer2 = createTypingContainer();

  
        // Append response to the text content within the container
        typingContainer2.querySelector('#text-content').innerHTML = `<p>${selectedQuestion[1]}</p>`;

  // Append the container to the chat window
  chatWindow3.appendChild(typingContainer2);

  scrollToBottom();
}

setInterval(startQuest, 345000);


