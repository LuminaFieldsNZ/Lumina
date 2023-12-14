document.addEventListener('DOMContentLoaded', function () {
  var modeSwitch = document.querySelector('.mode-switch');

  modeSwitch.addEventListener('click', function () {
    document.documentElement.classList.toggle('dark');
    modeSwitch.classList.toggle('active');
  });


  var listView = document.querySelector('.list-view');
  var gridView = document.querySelector('.grid-view');
  var projectsList = document.querySelector('.project-boxes');

  listView.addEventListener('click', function () {
    gridView.classList.remove('active');
    listView.classList.add('active');
    projectsList.classList.remove('jsGridView');
    projectsList.classList.add('jsListView');
  });

  gridView.addEventListener('click', function () {
    gridView.classList.add('active');
    listView.classList.remove('active');
    projectsList.classList.remove('jsListView');
    projectsList.classList.add('jsGridView');
  });


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
