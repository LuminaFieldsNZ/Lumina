// Global variables for populations and mainHeading
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

// Update data display and percentages
function updateData(dataObj, totalElemId, avgElemId) {
    let total = 0;

    // Update the text content for each element
    for (const key in dataObj) {
        const elem = document.getElementById(key);
        if (elem) {
            elem.textContent = Math.round(dataObj[key]);
            total += dataObj[key];
        } else {
            console.warn(`Element with ID ${key} not found.`);
        }
    }

    // Update total
    const totalElem = document.getElementById(totalElemId);
    if (totalElem) {
        totalElem.textContent = Math.round(total);
    } else {
        console.warn(`Element with ID ${totalElemId} not found.`);
    }

    // Calculate and update average
    const avg = Object.keys(dataObj).length ? total / Object.keys(dataObj).length : 0;
    const avgElem = document.getElementById(avgElemId);
    if (avgElem) {
        avgElem.textContent = Math.round(avg);
    } else {
        console.warn(`Element with ID ${avgElemId} not found.`);
    }

    // Update percentages
    updatePercentages(avg, dataObj);
}

// Function to update percentages
function updatePercentages(avg, dataObj) {
    if (isNaN(avg) || avg <= 0) {
        console.error('Invalid average value:', avg);
        return;
    }

    console.log('Average:', avg);
    console.log('Data Object:', dataObj);

    for (const key in dataObj) {
        const value = Number(dataObj[key]); // Ensure the value is a number
        if (isNaN(value)) {
            console.warn(`Value for ${key} is not a number.`);
            continue;
        }

        const percentage = avg > 0 ? (value / avg) * 100 : 0;
        console.log(`Key: ${key}, Value: ${value}, Percentage: ${percentage}`);

        const percentageElem = document.getElementById(`${key}bp`);
        if (percentageElem) {
            percentageElem.textContent = `${Math.round(percentage)}%`;
        } else {
            console.warn(`Element with ID ${key + 'bp'} not found.`);
        }

        const progressBar = document.querySelector(`.${key}-progress`);
        if (progressBar) {
            progressBar.style.width = `${Math.round(percentage)}%`;
            progressBar.style.backgroundColor = getProgressBarColor(percentage);
        } else {
            console.warn(`Progress bar with class ${key}-progress not found.`);
        }
    }
}

// Function to get progress bar color based on percentage
function getProgressBarColor(percentage) {
    if (percentage > 75) return 'green';
    if (percentage > 50) return 'yellow';
    if (percentage > 25) return 'orange';
    return 'red';
}

// Update headings based on emotions
function updateHeadingsBasedOnEmotions(emotionScores) {
    // Reset headings
    for (const key in mainHeading) {
        mainHeading[key] = 0;
    }

    // Determine the highest emotion score
    const sortedEmotions = Object.entries(emotionScores).sort((a, b) => b[1] - a[1]);

    // Allocate emotions to headings based on the highest scores
    sortedEmotions.forEach(([emotion, score]) => {
        if (score > 0) {
            for (const [heading, value] of Object.entries(emotionToHeading[emotion])) {
                mainHeading[heading] += value * score;
            }
        }
    });

    // Update data display
    updateData(mainHeading, 'totalMainHeading', 'avgMainHeading');
}

// Update data from JSON editor
function updateDataFromJSONEditor() {
    const jsonEditorContent = document.getElementById('jsonEditor').value;

    let parsedData;
    try {
        parsedData = JSON.parse(jsonEditorContent);
    } catch (error) {
        console.error('Invalid JSON format');
        return;
    }

    if (parsedData && parsedData.userData) {
        const userData = parsedData.userData;

        // Distribute values to populations (if applicable)
        const totalPopulation = 1000; // Adjust if needed
        const numPopulations = Object.keys(populations).length;
        const populationValue = Math.floor(totalPopulation / numPopulations);

        for (const key in populations) {
            populations[key] = populationValue;
        }

        // Handle emotion scores
        if (userData.emotionScores) {
            const emotionScores = userData.emotionScores;

            // Example logic for updating populations (adjust as needed)
            for (const key in populations) {
                populations[key] = emotionScores[key] || 0;
            }

            // Update mainHeading based on detected emotions
            updateHeadingsBasedOnEmotions(emotionScores);
        }

        // Handle mainHeading if available in userData
        if (userData.mainHeading) {
            for (const key in mainHeading) {
                mainHeading[key] = userData.mainHeading[key] || 0;
            }
        }

        // Update the UI based on the new values
        updateData(populations, 'totalPopulations', 'avgPopulations');
        updateData(mainHeading, 'totalMainHeading', 'avgMainHeading');
    }
}

// Event listener for JSON editor changes
document.getElementById('jsonEditor').addEventListener('input', updateDataFromJSONEditor);
