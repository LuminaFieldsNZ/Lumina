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



  var projectsList = document.querySelector('.project-boxes');
});


window.addEventListener('message', function(event) {
    if (event.data.action === 'changeSrc') {
        bookFrame1.src = event.data.newSrc;
    }
}, false);

document.getElementById("Lumi").addEventListener("click", function() {
  const navbar = document.querySelector(".navbar");

  // Toggle the "hidden" class to show or hide the navbar
  navbar.classList.toggle("hidden");

  // Set a timer to hide the navbar after 4 seconds
  setTimeout(function() {
    navbar.classList.add("hidden");
  }, 6000); // 6000ms = 6 seconds
});


