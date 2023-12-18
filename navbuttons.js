
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function() {
    document.getElementById("load1").style.color = "red";
    document.getElementById("load1").innerHTML = "Pending Login";
  }, 1900);
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
  if(code === "100") {
    parent.postMessage({ action: 'changeSrc', newSrc: '100/index.html' }, 'https://luminafields.com/');
  }
  if(code === "micheal") {
    parent.postMessage({ action: 'changeSrc', newSrc: 'face/index.html' }, 'https://luminafields.com/');
  }
  if(code === "587112349") {
    parent.postMessage({ action: 'changeSrc', newSrc: 'nations/book.html' }, 'https://luminafields.com/');
  }
}
