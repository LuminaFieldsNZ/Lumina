
function scrollToBottom() {
    const textContainer = document.getElementById('textContainer');
    const targetScroll = textContainer.scrollHeight - textContainer.clientHeight;
    const scrollStep = (targetScroll - textContainer.scrollTop) / 60; // 60 frames in 1.5 seconds
    const startTime = performance.now();

    function animateScroll(currentTime) {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < 1500) { // 1.5 seconds
            textContainer.scrollTop += scrollStep;
            window.requestAnimationFrame(animateScroll);
        } else {
            // Ensure we've reached the bottom after 1.5 seconds
            textContainer.scrollTop = targetScroll;
        }
    }

    window.requestAnimationFrame(animateScroll);
}



// Call this function whenever new text is added to the container

function loadFile(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const container = document.getElementById('textContainer');
            container.innerHTML = '';  // Clear existing containers

            const fileContent = e.target.result;
            const textSegments = fileContent.split('🐕');

            // Process each segment without removing the 🐕 symbol
            textSegments.forEach((segment, index) => {
                if (index > 0) { // Add the symbol back except for the first segment
                    segment = '🐕' + segment;
                }
                const segmentContainer = document.createElement('div');
                segmentContainer.contentEditable = true;
                segmentContainer.classList.add('segment');
                segmentContainer.textContent = segment.trim();
                // ... (rest of the styling and appending)
                container.appendChild(segmentContainer);
            });
            countEmojisAndUpdate();
            countEmotionKeywordsAndUpdate();
            countKeywordsForNationsAndUpdate();
            scrollToBottom();
            sendValuesToSoul();
        };
        reader.readAsText(input.files[0]);
    }
}




// Function to export edits to a file
function exportToFile() {
    const textContainer = document.getElementById('textContainer');
    const textToWrite = textContainer.textContent || textContainer.innerText;
    const blob = new Blob([textToWrite], { type: 'text/plain' });
    const anchorElement = document.createElement('a');

    anchorElement.href = URL.createObjectURL(blob);
    anchorElement.download = 'luminafields.txt';
    document.body.appendChild(anchorElement); // Required for Firefox
    anchorElement.click();
    document.body.removeChild(anchorElement);
}

function countEmojisAndUpdate() {
    const textContainer = document.getElementById('textContainer');
    const text = textContainer.textContent || textContainer.innerText;

    // Mapping of emojis to their roles
    const emojiToRoleMap = {
        '🐬': 'explorer',
        '🐈': 'arbiter',
        '🦉': 'merchant',
        '🦘': 'smuggler',
        '🦜': 'sailor',
        '🐢': 'voyager',
        '🦔': 'shipwright',
        '🐙': 'captain',
        '🐧': 'fisherman',
    };


    // Count each emoji and update mainHeading
    for (const emoji in emojiToRoleMap) {
        const count = (text.match(new RegExp(emoji, 'g')) || []).length;
        const role = emojiToRoleMap[emoji];
        mainHeading[role] += count;
    }

    console.log('Updated mainHeading:', mainHeading);
    // You can also use mainHeading as needed
    return mainHeading;
}

// Call this function to count the emojis and update the mainHeading object.

function countEmotionKeywordsAndUpdate() {
    const textContainer = document.getElementById('textContainer');
    const text = textContainer.textContent || textContainer.innerText.toLowerCase(); // Convert text to lowercase for matching

    const angerKeywords = ['furious', 'anger', 'angered', 'angering', 'angry', 'angrily', 'angrier', 'angriest', 'angerless', 'angerlessness', 'unanger', 'unangered', 'unangering', 'unangrily', 'unangry', 'overanger', 'overangered', 'overangering', 'overangry', 'reanger', 'reangered', 'reangering', 'reangry', 'angerful', 'angerfully', 'angerfulness', 'angerly', 'misanger', 'misangered', 'misangering', 'misangry', 'rage', 'annoyed', 'irritated', 'frustrated', 'livid', 'seething', 'incensed', 'wrathful', 'hostile', 'agitated', 'bitter', 'exasperated', 'infuriated', 'resentful', 'outraged', 'enraged', 'vexed', 'irked', 'upset', 'heated', 'cross', 'aggressive', 'provoked', 'peeved', 'indignant', 'riled', 'boiling', 'fuming'];
    const happyKeywords = ['joyful', 'happy', 'elated', 'jubilant', 'cheerful', 'delighted', 'ecstatic', 'content', 'blissful', 'radiant'];
    const depressedKeywords = ['sad', 'depressed', 'melancholic', 'hopeless', 'despair', 'downcast', 'miserable', 'gloomy', 'dismal', 'heartbroken'];

    let angerCount = 0, happyCount = 0, depressedCount = 0;

    // Count each keyword for each emotion
    angerKeywords.forEach(keyword => {
        angerCount += (text.match(new RegExp('\\b' + keyword + '\\b', 'g')) || []).length;
    });
    happyKeywords.forEach(keyword => {
        happyCount += (text.match(new RegExp('\\b' + keyword + '\\b', 'g')) || []).length;
    });
    depressedKeywords.forEach(keyword => {
        depressedCount += (text.match(new RegExp('\\b' + keyword + '\\b', 'g')) || []).length;
    });

    console.log('Anger-related keywords count:', angerCount);
    console.log('Happy keywords count:', happyCount);
    console.log('Depressed keywords count:', depressedCount);
    // You can also use these counts as needed
    calculateValues(angerCount, happyCount, depressedCount);
    return { angerCount, happyCount, depressedCount };
}

function calculateValues(angerCount, happyCount, depressedCount) {
    // Calculate the total count of all emotions
    const totalCount = angerCount + happyCount + depressedCount;

    // Calculate the proportion of each emotion
    const angerProportion = totalCount > 0 ? angerCount / totalCount : 0;
    const happyProportion = totalCount > 0 ? happyCount / totalCount : 0;
    const depressedProportion = totalCount > 0 ? depressedCount / totalCount : 0;

    // Adjust the scale based on the proportion of each emotion
    speedx = Math.min(Math.max(10 + (angerProportion * 110), 10), 120); // scale from 10 to 120
    spikesx = Math.min(Math.max(0.5 + (happyProportion * 2), 0.5), 3); // scale from 0.5 to 2
    processingx = Math.min(Math.max(0.6 + (depressedProportion * 1.8), 0.6), 2.4); // scale from 0.6 to 2.4

    console.log(`speedx: ${speedx}, spikesx: ${spikesx}, processingx: ${processingx}`);
    sendValuesToSoul();
    return { speedx, spikesx, processingx };
}


function countKeywordsForNationsAndUpdate() {
    const textContainer = document.getElementById('textContainer');
    const text = textContainer.textContent || textContainer.innerText.toLowerCase();

    const nationKeywords = {
        globalist: ['healthcare', 'international', 'wellness', 'compassion', 'aid'],
        conservative: ['self-reliant', 'traditional', 'isolationist', 'individualism', 'stability'],
        nationalist: ['patriotism', 'gems', 'prosperity', 'sovereignty', 'heritage'],
        idealist: ['innovation', 'bioluminescence', 'creativity', 'science', 'organic'],
        populist: ['grassroots', 'affordable', 'community', 'fishery', 'basic'],
        progressive: ['reform', 'equality', 'diversity', 'wealth', 'change'],
        economist: ['trade', 'mobility', 'commerce', 'gold', 'market'],
        realist: ['resources', 'isolation', 'survival', 'pragmatic', 'rugged'],
        socialist: ['collective', 'ai', 'humanity', 'protection', 'sharing']
    };

    // Count each keyword for each nation
    for (const nation in nationKeywords) {
        nationKeywords[nation].forEach(keyword => {
            populations[nation] += (text.match(new RegExp('\\b' + keyword + '\\b', 'g')) || []).length;
        });
    }

    console.log('Updated populations:', populations);
    return populations;
}

// Call this function to count the nation-related keywords in the text.
