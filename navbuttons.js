
function energyAuditActive(){
  document.getElementById("energyAudit").style.display = "block";
  document.getElementById("secretDiv").style.display = "none";
  document.getElementById("splash").style.display = "none";
  document.getElementById("settingsMain").style.display = "none";
  document.getElementById("schedule").style.display = "none";
  document.getElementById("shopping").style.display = "none";
  navAudit.classList.add("active");
  navHome.classList.remove("active");
  navSchedule.classList.remove("active");
  navSettings.classList.remove("active");
  navShopping.classList.remove("active");
}

function scheduleActive(){
  document.getElementById("schedule").style.display = "block";
  document.getElementById("energyAudit").style.display = "none";
  document.getElementById("splash").style.display = "none";
  document.getElementById("settingsMain").style.display = "none";
  document.getElementById("shopping").style.display = "none";
  navHome.classList.remove("active");
  navSchedule.classList.add("active");
  navAudit.classList.remove("active");
  navSettings.classList.remove("active");
  navShopping.classList.remove("active");
}

function splashActive(){
  document.getElementById("secretDiv").style.display = "none";
  document.getElementById("energyAudit").style.display = "none";
  document.getElementById("splash").style.display = "block";
  document.getElementById("settingsMain").style.display = "none";
  document.getElementById("schedule").style.display = "none";
  document.getElementById("shopping").style.display = "none";
  navHome.classList.add("active");
  navAudit.classList.remove("active");
  navSchedule.classList.remove("active");
  navSettings.classList.remove("active");
  navShopping.classList.remove("active");
}

function settingsActive(){
  document.getElementById("secretDiv").style.display = "none";
  document.getElementById("energyAudit").style.display = "none";
  document.getElementById("splash").style.display = "none";
  document.getElementById("settingsMain").style.display = "block";
  document.getElementById("schedule").style.display = "none";
  document.getElementById("shopping").style.display = "none";
  navSettings.classList.add("active");
  navHome.classList.remove("active");
  navAudit.classList.remove("active");
  navSchedule.classList.remove("active");
  navShopping.classList.remove("active");
}

function shoppingActive(){
  document.getElementById("shopping").style.display = "block";
  document.getElementById("secretDiv").style.display = "none";
  document.getElementById("energyAudit").style.display = "none";
  document.getElementById("splash").style.display = "none";
  document.getElementById("settingsMain").style.display = "none";
  document.getElementById("schedule").style.display = "none";
  navShopping.classList.add("active");
  navSettings.classList.remove("active");
  navHome.classList.remove("active");
  navAudit.classList.remove("active");
  navSchedule.classList.remove("active");
}

function secretActive(){
  document.getElementById("shopping").style.display = "none";
  document.getElementById("secretDiv").style.display = "block";
  document.getElementById("energyAudit").style.display = "none";
  document.getElementById("splash").style.display = "none";
  document.getElementById("settingsMain").style.display = "none";
  document.getElementById("schedule").style.display = "none";
  navShopping.classList.remove("active");
  navSettings.classList.remove("active");
  navHome.classList.remove("active");
  navAudit.classList.remove("active");
  navSchedule.classList.remove("active");
}

document.getElementById('passcode').addEventListener('change', checkPasscode);
document.getElementById('passcode').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        checkPasscode();
    }
});
