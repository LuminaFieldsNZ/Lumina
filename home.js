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

function toggleToolMenu() {
    const toolMenu = document.getElementById('toolMenu');
    const toolMenu2 = document.getElementById('toolMenu2');

    if (toolMenu && toolMenu2) {
        const isToolMenuVisible = toolMenu.style.display !== 'none';
        const isToolMenu2Visible = toolMenu2.style.display !== 'none';

        // Toggle the display property based on its current value
        toolMenu.style.display = isToolMenuVisible ? 'none' : 'block';
        toolMenu2.style.display = isToolMenu2Visible ? 'none' : 'block';
    } else {
        console.error("One or both toolMenu elements not found!");
    }
}

window.addEventListener('message', function(event) {
    if (event.data.action === 'changeSrc') {
        bookFrame1.src = event.data.newSrc;
    }
}, false);


const bookFrame4 = document.getElementById('bookFrame4');
bookFrame4.src = 'loader/index.html';

const bookFrame1 = document.getElementById('bookFrame1');
bookFrame1.src = 'tabs/index.html';
