
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