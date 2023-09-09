
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

const populations = {
  progressive: 1000,
  socialist: 100,
  idealist: 1000,
  globalist: 1000,
  conservative: 1000,
  economist: 1000,
  realist: 1000,
  nationalist: 1000,
  populist: 1000
};

const mainHeading = {
  explorer: 10,
  voyager: 1,
  captain: 1,
  merchant: 1,
  shipwright: 1,
  fisherman: 100,
  smuggler: 1,
  arbiter: 1,
  sailor: 1
};

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
