
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function() {
    secretActive();
    document.getElementById("load1").style.color = "lightgreen";
    document.getElementById("load1").innerHTML = "Online";
  }, 2900); // 5000 milliseconds = 5 seconds
});



function checkPasscode() {
  const code = document.getElementById("passcode").value;
  
  if(code === "Ash Gramb") {window.location.href = "player1.html";}
  if(code === "Jordan Finch") {window.location.href = "player2.html";}
  if(code === "Alex Huff") {window.location.href = "player3.html";}
  if(code === "Avery Warner") {window.location.href = "player4.html";}
  if(code === "Skylar Banks") {window.location.href = "player5.html";}
  if(code === "Dakota Calligaris") {window.location.href = "player6.html";}
  if(code === "Taylor Banks") {window.location.href = "player7.html";}
  if(code === "AR Version 1.1") {window.location.href = "./ar/index.html";}
  if(code === "AR Version 2.1b") {window.location.href = "./ar2/index.html";}
  if(code === "Remy Hawthorne") {window.location.href = "player8.html";}

}



function energyAuditActive(){
  document.getElementById("energyAudit").style.display = "block";
  document.getElementById("settingsMain").style.display = "none";
  document.getElementById("loader1").style.display = "none";
  document.getElementById("schedule").style.display = "none";
  document.getElementById("secretDiv").style.display = "none";
  navAudit.classList.add("active");
  navHome.classList.remove("active");
  navSchedule.classList.remove("active");
  navSettings.classList.remove("active");
}

function scheduleActive(){
  document.getElementById("schedule").style.display = "block";
  document.getElementById("energyAudit").style.display = "none";
  document.getElementById("settingsMain").style.display = "none";
  document.getElementById("loader1").style.display = "none";
  document.getElementById("secretDiv").style.display = "none";
  navHome.classList.remove("active");
  navSchedule.classList.add("active");
  navAudit.classList.remove("active");
  navSettings.classList.remove("active");
}


function secretActive(){
    document.getElementById("energyAudit").style.display = "none";
  document.getElementById("settingsMain").style.display = "none";
  document.getElementById("schedule").style.display = "none";
  document.getElementById("loader1").style.display = "none";
  document.getElementById("secretDiv").style.display = "block";
  navHome.classList.add("active");
  navAudit.classList.remove("active");
  navSchedule.classList.remove("active");
  navSettings.classList.remove("active");
}

function settingsActive(){
  document.getElementById("energyAudit").style.display = "none";
  document.getElementById("settingsMain").style.display = "block";
  document.getElementById("schedule").style.display = "none";
  document.getElementById("loader1").style.display = "none";
  document.getElementById("secretDiv").style.display = "none";
  navSettings.classList.add("active");
  navHome.classList.remove("active");
  navAudit.classList.remove("active");
  navSchedule.classList.remove("active");
}



