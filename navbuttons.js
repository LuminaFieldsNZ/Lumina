
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function() {
    splashActive();
    document.getElementById("load1").style.color = "lightgreen";
    document.getElementById("load1").innerHTML = "Online";
  }, 1900); // 5000 milliseconds = 5 seconds
});

window.addEventListener('message', function(event) {
  // Optional: Check the origin of the message for security
  // if (event.origin !== 'http://expected.origin.com') return;

  const data = event.data;

  if (data.section) {
    // Using eval() to execute the function
    eval(data.section);
  }
});


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
  const bookFrame1 = document.getElementById('bookFrame1');
  bookFrame1.src = 'tabs/index.html';
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
