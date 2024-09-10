
document.addEventListener('DOMContentLoaded', function () {
  splashActive();
  document.getElementById('bookFrame5').src = 'peepBasic.html';
  document.getElementById('bookFrame6').src = 'peep.html';
  document.getElementById('bookFrame7').src = 'icons/index.html';
});





function peepMake(){
  document.getElementById("peeps").style.display = "block";
  document.getElementById("schedule").style.display = "none";
  document.getElementById("energyAudit").style.display = "none";
  document.getElementById("splash").style.display = "none";
  document.getElementById("settingsMain").style.display = "none";
  navLumi.classList.add("active");
  navMess.classList.remove("active");
  navHome.classList.remove("active");
  navSchedule.classList.remove("active");
  navAudit.classList.remove("active");
  navSettings.classList.remove("active");

}

function messBot(){
  document.getElementById('bookFrame5').src = 'peepBasic.html';
  document.getElementById("schedule").style.display = "block";
  document.getElementById("peeps").style.display = "none";
  document.getElementById("energyAudit").style.display = "none";
  document.getElementById("splash").style.display = "none";
  document.getElementById("settingsMain").style.display = "none";
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


// Function to start the quest and display a random toxic validation question
function startQuest() {
  // Filter questions that contain the word "toxic"
  const toxicQuestions = baseData.filter(item => item[0].toLowerCase().includes('black'));

  // Randomly select one question from the filtered list
  const randomIndex = Math.floor(Math.random() * toxicQuestions.length);
  const selectedQuestion = toxicQuestions[randomIndex];

  // Display the selected question and answer in the chat window
  const chatWindow = document.getElementById('chatWindow');
  chatWindow.innerHTML += `<p><strong>Question:</strong> ${selectedQuestion[0]}</p>`;
  chatWindow.innerHTML += `<p><strong>Answer:</strong> ${selectedQuestion[1]}</p>`;
}


// Define the linear storyline
const storyline = [
  {
    question: "You have just woken up on a small, isolated island. What three objects do you find yourself with?",
    additionalInfo: "Consider whether the items are for survival or naturally with you. Begin your response with 'I woke up finding'..."
  },
  {
    question: "What time of day is it?",
    additionalInfo: "Your answer might reflect your current mental and emotional state. Begin your response with 'The time of day is'..."
  },
  {
    question: "What type of boat do you see in the distance?",
    additionalInfo: "The type of boat can indicate your personal focus and creativity. Begin your response with 'I see'..."
  },
  {
    question: "Which direction is the boat going?",
    additionalInfo: "The direction of the boat can reveal insights about your ego and self-perception. Begin your response with 'From me the boat is travelling'..."
  }
];



// Function to display the current question
function displayQuestion() {

  currentStep++;

  // Get the chat window element
  const chatWindow = document.getElementById('chatWindow');
  
  // Clear the previous content
  chatWindow.innerHTML = '';

  // Check if we are within the bounds of the storyline
  if (currentStep < storyline.length) {
    // Get the current question and additional info
    const step = storyline[currentStep];
    
    // Display the question and additional info
    chatWindow.innerHTML += `<p><strong>Question:</strong> ${step.question}</p>`;
    chatWindow.innerHTML += `<p><strong>Info:</strong> ${step.additionalInfo}</p>`;

  } else {
    // End of the storyline
    chatWindow.innerHTML += '<p>Thank you for completing the quest. We will now analyze your responses.</p>';
    
  }
}

