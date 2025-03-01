document.addEventListener('DOMContentLoaded', function () {
  var modeSwitch = document.querySelector('.mode-switch');

  modeSwitch.addEventListener('click', function () {                     document.documentElement.classList.toggle('dark');
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
  
  document.querySelector('.messages-btn').addEventListener('click', function () {
    document.querySelector('.messages-section').classList.add('show');
  });
  
  document.querySelector('.messages-close').addEventListener('click', function() {
    document.querySelector('.messages-section').classList.remove('show');
  });
});




var timeline = [];

timeline.push({
    "events": [
        // Your timeline events here (same as provided)
    ]
});

function loadTimeline() {
    const timelineContainer = document.getElementById('timeline');

    timeline.forEach(data => {
        data.events.forEach(event => {
            // Create a message-box div
            const messageBox = document.createElement('div');
            messageBox.className = 'message-box';

            // Create the message-content div
            const messageContent = document.createElement('div');
            messageContent.className = 'message-content';

            // Create the message-header div
            const messageHeader = document.createElement('div');
            messageHeader.className = 'message-header';

            // Add the event title as the name
            const name = document.createElement('div');
            name.className = 'name';
            name.textContent = event.title;
            messageHeader.appendChild(name);

            // Add the date as the time
            const time = document.createElement('div');
            time.className = 'time';
            time.textContent = event.date;
            messageHeader.appendChild(time);

            // Add the header to the message content
            messageContent.appendChild(messageHeader);

            // Add the subtitle as a message line
            const subtitle = document.createElement('p');
            subtitle.className = 'message-line';
            subtitle.textContent = event.subtitle;
            messageContent.appendChild(subtitle);

            // Add financial loss as a message line
            const financialLoss = document.createElement('p');
            financialLoss.className = 'message-line';
            financialLoss.innerHTML = `<strong>Financial Loss:</strong> <font style="color: red;">$${event.financialLoss.toFixed(2)}</font>`;
            messageContent.appendChild(financialLoss);

            // Add description sections
            event.description.forEach(desc => {
                const section = document.createElement('p');
                section.className = 'message-line';

                if (desc.label === "Evidence") {
                    section.innerHTML = `<strong>${desc.label}</strong><br>`;
                    desc.documents.forEach(doc => {
                        const button = document.createElement('a');
                        button.href = doc.link;
                        button.target = "_blank";
                        button.innerHTML = `<button>View Document: ${doc.name}</button>`;
                        section.appendChild(button);
                        section.appendChild(document.createElement('br'));
                    });
                } else {
                    section.innerHTML = `<strong>${desc.label}</strong><br>${(desc.details || desc.jobs || []).join(', ')}`;
                }

                messageContent.appendChild(section);
            });

            // Add the message content to the message box
            messageBox.appendChild(messageContent);

            // Add the message box to the timeline container
            timelineContainer.appendChild(messageBox);
        });
    });
}

window.onload = loadTimeline;




function openCrycella(){window.open("https://drive.google.com/drive/folders/1PGRGoEZuJ68PqOWcwW-naURZCVz2jNDE?usp=drive_link")}
function openJosh(){window.open("https://drive.google.com/drive/folders/1eOhAfstiootkx_MoDAgcd_BDj5JRgV0t?usp=drive_link")}
function openCarolyn(){window.open("https://drive.google.com/drive/folders/16pXT0g0sYMJxuvImpH5742ELnR155v-A?usp=drive_link")}
function openJozef(){window.open("https://drive.google.com/drive/folders/1crWPe_GyyCpp9OynIqCM5RAM0XyYRqro?usp=drive_link")}
function openCourt(){window.open("https://drive.google.com/drive/folders/10RRzhZymsQsJj_rxVtJFG9Bglilnct7K?usp=drive_link")}
function openStephanie(){window.open("https://drive.google.com/drive/folders/1KRERaiCbiEoB5ROfFVuz6w7Hzrt57FmJ?usp=drive_link")}
function openCarl(){window.open("https://drive.google.com/drive/folders/1dlzInEus0xOVVBFgPVEEEihi6F8uFvCy?usp=drive_link")}
function openAmanda(){window.open("https://drive.google.com/drive/folders/1VJnL__atUsMuGOMLl_oXbQz-T2aPqoLe?usp=drive_link")}


