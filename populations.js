// Global variables for populations and mainHeading
 populations = {
    progressive: 0,
    socialist: 1,
    idealist: 0,
    globalist: 0,
    conservative: 0,
    economist: 0,
    realist: 0,
    nationalist: 0,
    populist: 0
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

    for (const key in dataObj) {
        const value = Number(dataObj[key]); // Ensure the value is a number
        if (isNaN(value)) {
            console.warn(`Value for ${key} is not a number.`);
            continue;
        }

        const percentage = avg > 0 ? (value / avg) * 100 : 0;
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



function updateProgressBars(populations) {
    const totalPopulation = Object.values(populations).reduce((total, num) => total + num, 0);
    console.log('Total Population:', totalPopulation);

    if (totalPopulation > 0) {
        for (const [category, population] of Object.entries(populations)) {
            const percentage = (population / totalPopulation) * 100;
            console.log(`${category} Population: ${population}, Percentage: ${percentage}`);

            // Update the population number
            const populationElem = document.getElementById(category);
            if (populationElem) {
                populationElem.textContent = Math.round(population);
            } else {
                console.warn(`Element with ID ${category} not found.`);
            }

            // Update progress bar width
            const progressBar = document.querySelector(`.${category}-progress`);
            if (progressBar) {
                progressBar.style.width = `${percentage}%`;
            } else {
                console.warn(`Progress bar with class ${category}-progress not found.`);
            }

            // Update percentage text
            const percentageElem = document.getElementById(`${category}bp`);
            if (percentageElem) {
                percentageElem.textContent = `${Math.round(percentage)}%`;
            } else {
                console.warn(`Element with ID ${category}bp not found.`);
            }
        }
    } else {
        console.warn('Total population is 0 or less.');
    }
}


function updateDataFromJSONEditor() {
    const jsonEditorContent = document.getElementById('jsonEditor').value;
    console.log('JSON Editor Content:', jsonEditorContent); // Log JSON content

    let parsedData;
    try {
        parsedData = JSON.parse(jsonEditorContent);
    } catch (error) {
        console.error('Invalid JSON format');
        return;
    }

    console.log('Parsed Data:', parsedData); // Log parsed data

    if (parsedData && parsedData.userData) {
        const userData = parsedData.userData;

        // Update populations based on JSON data
        if (userData.emotionScores) {
            const emotionScores = userData.emotionScores;
            console.log('Emotion Scores:', emotionScores); // Log emotion scores

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
        
        // Update progress bars and percentages
        updateProgressBars(populations);
    }
}
