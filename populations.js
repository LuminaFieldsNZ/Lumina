
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
  progressive: 1000,
  socialist: 1000,
  idealist: 1000,
  globalist: 1000,
  conservative: 1000,
  economist: 1000,
  realist: 1000,
  nationalist: 1000,
  populist: 1000
};

mainHeading = {
  explorer: 1,
  voyager: 1,
  captain: 0,
  merchant: 0,
  shipwright: 0,
  fisherman: 0,
  smuggler: 0,
  arbiter: 0,
  sailor: 0
};

function getSVGFilename(trait, score) {
  if (score > 0) {
    return `svg/${trait}P.svg`;
  } else {
    return `svg/${trait}N.svg`;
  }
}

function selectSVGs(mainHeading) {
  // Convert the object to an array of [key, value] pairs
  let traitsArray = Object.entries(mainHeading);

  // Sort the array based on the values (scores)
  traitsArray.sort((a, b) => b[1] - a[1]);

  // Get the top two highest traits and the lowest trait
  let top1 = traitsArray[0];
  let top2 = traitsArray[1];
  let lowest = traitsArray[traitsArray.length - 1];

  // Determine the SVG filenames using the modular function
  let top1SVG = getSVGFilename(top1[0], top1[1]);
  let top2SVG = getSVGFilename(top2[0], top2[1]);
  let lowestSVG = getSVGFilename(lowest[0], lowest[1]);

  return [top1SVG, top2SVG, lowestSVG];
}

function updateSVGs() {
  let [topSVG, secondSVG, worstSVG] = selectSVGs(mainHeading);
  document.getElementById('topTrait').src = topSVG;
  document.getElementById('secondTrait').src = secondSVG;
  document.getElementById('worstTrait').src = worstSVG;
}

// Call this function whenever you want to update the SVGs
updateSVGs();





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
