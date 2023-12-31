
document.addEventListener('DOMContentLoaded', function () {

  const messagesSection = document.querySelector('.messages-section');
  const messagesBtn = document.querySelector('.messages-btn');
  const messagesClose = document.querySelector('.messages-close');

  messagesBtn.addEventListener('click', function () {
    messagesSection.classList.add('active');
  });

  messagesClose.addEventListener('click', function() {
    messagesSection.classList.remove('active');
  });

  var projectsList = document.querySelector('.project-boxes');
});




function checkPasscode() {
  const code = document.getElementById("passcode").value;
  if(code === "candle") {
    document.getElementById('candle').style.display = 'block';
    setTimeout(function() {
        document.getElementById('candle').style.display = 'none';
    }, 9500); // 500 milliseconds equals half a second
}
if(code === "knife") {
  document.getElementById('knife').style.display = 'block';
  setTimeout(function() {
      document.getElementById('knife').style.display = 'none';
  }, 9500); // 500 milliseconds equals half a second
}
  if(code === "100") {
    parent.postMessage({ action: 'changeSrc', newSrc: '100/index.html' }, '*');
  }
  if(code === "micheal") {
    parent.postMessage({ action: 'changeSrc', newSrc: 'face/index.html' }, '*');
  }
  if(code === "587112349") {
    parent.postMessage({ action: 'changeSrc', newSrc: 'nations/book.html' }, '*');
  }
}


setTimeout(function() {
    document.getElementById('candle').style.display = 'none';
    document.getElementById('knife').style.display = 'none';
}, 500); // 500 milliseconds equals half a second
