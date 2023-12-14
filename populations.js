
window.onload = function() {
    clearStorage();
    startUpdating();
};

function clearStorage() {
    document.cookie.split(";").forEach(cookie => {
        const name = cookie.split("=")[0];
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
    localStorage.clear();
    sessionStorage.clear();
}

populations = {
  progressive: 1,
  socialist: 1,
  idealist: 1,
  globalist: 1,
  conservative: 1,
  economist: 1,
  realist: 1,
  nationalist: 1,
  populist: 1
};

mainHeading = {
  explorer: 1,
  voyager: 0,
  captain: 0,
  merchant: 0,
  shipwright: 0,
  fisherman: 0,
  smuggler: 0,
  arbiter: 0,
  sailor: 0
};

let speedx = 120,
spikesx = .8,
processingx = 2;

function sendValuesToSoul() {
    var soulFrame = document.getElementById('soulFrame');

    // Check if the iframe is present
    if (soulFrame) {
        var messageData = {
            speed: speedx,
            spikes: spikesx,
            processing: processingx
        };

        // Post the message to the iframe's content window
        soulFrame.contentWindow.postMessage(messageData, '*');
    } else {
        console.log("Soul iframe is not present.");
    }
}


function updatePopulations() {
    updateData(populations, 'population', 'average');
}

function updateMainHeadings() {
    updateData(mainHeading, 'mainHeadingTotal', 'mainHeadingAverage');
}

function updateData(dataObj, totalElemId, avgElemId) {
    let total = 0;
    for (let key in dataObj) {
        const elem = document.getElementById(key);
        elem.textContent = Math.round(dataObj[key]);
        total += dataObj[key];
    }

    const totalElem = document.getElementById(totalElemId);
    totalElem.textContent = Math.round(total);

    const avg = total / Object.keys(dataObj).length;
    const avgElem = document.getElementById(avgElemId);
    avgElem.textContent = Math.round(avg);

    updatePercentages(avg, dataObj);
}

function updatePercentages(avg, dataObj) {
    for (let key in dataObj) {
        const percentage = (dataObj[key] / avg) * 100;
        const percentageElem = document.getElementById(key + 'bp');
        percentageElem.textContent = `${Math.round(percentage)}%`;

        const progressBar = document.querySelector(`.${key}-progress`);
        progressBar.style.width = `${Math.round(percentage)}%`;
        progressBar.style.backgroundColor = getProgressBarColor(percentage);
    }
}

function getProgressBarColor(percentage) {
    if (percentage < 50) return 'red';
    if (percentage < 75) return 'yellow';
    return 'green';
}

function startUpdating() {
    setInterval(() => {
        updatePopulations();
        testData();
        updateMainHeadings();  // Ensure this is called to update magicType progress bars
    }, 1000);
}

window.addEventListener('message', function(event) {
    updateListener(event, populations);
});

window.addEventListener('message', function(event) {
    updateListener(event, mainHeading);
});

function updateListener(event, dataObj) {
    for (let key in dataObj) {
        if (event.data[key]) {
            dataObj[key] += event.data[key];
        }
    }
}
