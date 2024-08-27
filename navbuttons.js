
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function() {
    document.getElementById('bookFrame5').src = 'peep.html';
    splashActive();
    document.getElementById("load1").style.color = "lightgreen";
    document.getElementById("load1").innerHTML = "Online";
  }, 1900); // 5000 milliseconds = 5 seconds
});



window.addEventListener('message', function(event) {
  const data = event.data;
  if (data.section) {eval(data.section);}
  if (event.data.action === 'openSettings') {
      settingsActive();
  }
  if (event.data.action === 'openHome') {
      splashActive();
  }
});



function checkPasscode() {
  const code = document.getElementById("passcode").value;
  const iframe = document.getElementById("bookFrame5"); // Assuming your iframe has this ID

  if (code === "100") {
    iframe.src = '100/index.html';
  }
  if (code === "587112349") {
    iframe.src = 'nations/book.html';
  }
}




function energyAuditActive(){
  document.getElementById("energyAudit").style.display = "block";
  document.getElementById("splash").style.display = "none";
  document.getElementById("settingsMain").style.display = "none";
  document.getElementById("loader1").style.display = "none";
  document.getElementById("schedule").style.display = "none";
  navAudit.classList.add("active");
  navHome.classList.remove("active");
  navSchedule.classList.remove("active");
  navSettings.classList.remove("active");
}

function scheduleActive(){
  document.getElementById("schedule").style.display = "block";
  document.getElementById("energyAudit").style.display = "none";
  document.getElementById("splash").style.display = "none";
  document.getElementById("settingsMain").style.display = "none";
  document.getElementById("loader1").style.display = "none";
  navHome.classList.remove("active");
  navSchedule.classList.add("active");
  navAudit.classList.remove("active");
  navSettings.classList.remove("active");
}

function splashActive(){
  document.getElementById("energyAudit").style.display = "none";
  document.getElementById("splash").style.display = "block";
  document.getElementById("settingsMain").style.display = "none";
  document.getElementById("schedule").style.display = "none";
  document.getElementById("loader1").style.display = "none";
  navHome.classList.add("active");
  navAudit.classList.remove("active");
  navSchedule.classList.remove("active");
  navSettings.classList.remove("active");
}

function settingsActive(){
  document.getElementById("energyAudit").style.display = "none";
  document.getElementById("splash").style.display = "none";
  document.getElementById("settingsMain").style.display = "block";
  document.getElementById("schedule").style.display = "none";
  document.getElementById("loader1").style.display = "none";
  navSettings.classList.add("active");
  navHome.classList.remove("active");
  navAudit.classList.remove("active");
  navSchedule.classList.remove("active");
}


// Function to start the quest and display a random toxic validation question
function startQuest() {
  // Filter questions that contain the word "toxic"
  const toxicQuestions = baseData.filter(item => item[0].toLowerCase().includes('god'));

  // Randomly select one question from the filtered list
  const randomIndex = Math.floor(Math.random() * toxicQuestions.length);
  const selectedQuestion = toxicQuestions[randomIndex];

  // Display the selected question and answer in the chat window
  const chatWindow = document.getElementById('chatWindow');
  chatWindow.innerHTML += `<p><strong>Question:</strong> ${selectedQuestion[0]}</p>`;
  chatWindow.innerHTML += `<p><strong>Answer:</strong> ${selectedQuestion[1]}</p>`;
}