/*!
Swaying photo gallery - scroll event
@wakana-k
https://codepen.io/wakana-k/pen/WNLrWMm
*/
/*
Related works :
Portforio design @wakana-k - https://codepen.io/wakana-k/pen/BaxKKvE
Swaying photo gallery - hover event @wakana-k - https://codepen.io/wakana-k/pen/oNJxbPw
*/
"use strict";
(function () {
	window.onload = () => {
		const obj = document.querySelector("#gallery");
		const time = 10000;
		function animStart() {
			if (obj.classList.contains("active") == false) {
				obj.classList.add("active");
				setTimeout(() => {
					animEnd();
				}, time);
			}
		}
		function animEnd() {
			obj.classList.remove("active");
			obj.offsetWidth;
		}
		document.addEventListener("scroll", function () {
			// scroll or scrollend
			animStart();
		});
		window.addEventListener("resize", animStart);
		animStart();
	};
})();



function energyAuditSend(){
	window.parent.postMessage({ section: 'energyAuditActive()' }, '*');
}


function energyAuditActive(){
  document.getElementById("energyAudit").style.display = "block";
  document.getElementById("splash").style.display = "none";
  document.getElementById("settingsMain").style.display = "none";
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
  navSettings.classList.add("active");
  navHome.classList.remove("active");
  navAudit.classList.remove("active");
  navSchedule.classList.remove("active");
}
