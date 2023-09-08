document.addEventListener('DOMContentLoaded', function () {
  var modeSwitch = document.querySelector('.mode-switch');

  modeSwitch.addEventListener('click', function () {
    document.documentElement.classList.toggle('dark');
    modeSwitch.classList.toggle('active');
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

const bookFrame4 = document.getElementById('bookFrame4');
bookFrame4.src = 'loader/index.html';

const bookFrame1 = document.getElementById('bookFrame1');
bookFrame1.src = 'tabs/index.html';

const bookFrame2 = document.getElementById('bookFrame2');
bookFrame2.src = 'menu/index.html';

const bookFrame3 = document.getElementById('bookFrame3');
bookFrame3.src = 'words/index.html';
