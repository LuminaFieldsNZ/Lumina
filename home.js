document.addEventListener('DOMContentLoaded', function () {
  var modeSwitch = document.querySelector('.mode-switch');

  modeSwitch.addEventListener('click', function () {                     document.documentElement.classList.toggle('dark');
    modeSwitch.classList.toggle('active');
  });

  var listView = document.querySelector('.list-view');
  var gridView = document.querySelector('.grid-view');
  var projectsList = document.querySelector('.project-boxes');


  document.querySelector('.messages-btn').addEventListener('click', function () {
    document.querySelector('.messages-section').classList.add('show');
  });

  document.querySelector('.messages-close').addEventListener('click', function() {
    document.querySelector('.messages-section').classList.remove('show');
  });
});


const bookFrame1 = document.getElementById('bookFrame1');
bookFrame1.src = 'tabs/index.html';

const bookFrame2 = document.getElementById('bookFrame2');
bookFrame2.src = 'menu/index.html';

const bookFrame3 = document.getElementById('bookFrame3');
bookFrame3.src = 'words/index.html';
