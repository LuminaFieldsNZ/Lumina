
window.onload = function() {
    clearStorage();
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
  progressive: 100,
  socialist: 100,
  idealist: 100,
  globalist: 100,
  conservative: 100,
  economist: 100,
  realist: 1000,
  nationalist: 100,
  populist: 100
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

function updateDataFromJSONEditor() {
    // Step 1: Get the JSON editor content
    const jsonEditorContent = document.getElementById('jsonEditor').value;
    
    // Step 2: Parse the JSON content
    let parsedData;
    try {
        parsedData = JSON.parse(jsonEditorContent);
    } catch (error) {
        console.error('Invalid JSON format');
        return;
    }
    
    // Step 3: Extract and distribute values to populations and mainHeading
    if (parsedData && parsedData.userData) {
        const userData = parsedData.userData;

        // Distribute values to populations (as an example, let's assume an equal distribution)
        const totalPopulation = 1000; // Example total value to distribute
        const numPopulations = Object.keys(populations).length;
        const populationValue = Math.floor(totalPopulation / numPopulations);

        for (let key in populations) {
            populations[key] = populationValue;
        }

        // Distribute values to mainHeading based on some criteria or extracted data
        if (userData.mainHeading) {
            for (let key in mainHeading) {
                mainHeading[key] = userData.mainHeading[key] || 0;
            }
        }
    }

    // Step 4: Update the UI based on the new values
    updateData(populations, 'totalPopulations', 'avgPopulations');
    updateData(mainHeading, 'totalMainHeading', 'avgMainHeading');
}

// Example: Call this function when the JSON editor content changes or after data is loaded
document.getElementById('jsonEditor').addEventListener('input', updateDataFromJSONEditor);
