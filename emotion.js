
const similarityThreshold = 2; // Adjust this threshold as needed


function levenshtein(a, b) {
    let tmp;
    let i, j, alen = a.length, blen = b.length;
    const arr = [];
  
    if (alen === 0) return blen;
    if (blen === 0) return alen;
  
    for (i = 0; i <= blen; i++) arr[i] = [i];
    for (j = 0; j <= alen; j++) arr[0][j] = j;
  
    for (i = 1; i <= blen; i++) {
      for (j = 1; j <= alen; j++) {
        tmp = a[j - 1] === b[i - 1] ? 0 : 1;
        arr[i][j] = Math.min(arr[i - 1][j] + 1, Math.min(arr[i][j - 1] + 1, arr[i - 1][j - 1] + tmp));
      }
    }
  
    return arr[blen][alen];
  }
  
  
  const emotionWords = {
    happiness: {
      "ecstasy": 4,
      "delight": 4,
      "cheerful": 3,
      "happy": 3,
      "content": 3,
      "elated": 4,
      "blissful": 5,
      "jubilant": 5,
      "excited": 4,
      "joyful": 5,        
      "radiant": 4,       
      "gleeful": 4,       
      "thrilled": 5,      
      "overjoyed": 5,     
      "buoyant": 3,       
      "playful": 3,       
      "gratified": 4,     
      "contented": 3,    
      "upbeat": 4,        
      "cheery": 4,        
      "jovial": 5,        
      "merry": 3,         
      "elation": 5,       
      "satisfied": 4,     
      "radiance": 5,      
      "euphoric": 5,      
      "spirited": 4,      
      "happy": 4, 
      "exultant": 5,      
      "exuberant": 5,     
      "vivacious": 4      
    },
    sadness: {
      "sorrow": 5,
      "grief": 5,
      "depressed": 4,
      "mournful": 4,
      "unhappy": 3,
      "melancholy": 4,
      "heartbroken": 5,
      "desolate": 4,
      "dismal": 3,
      "gloomy": 3,
      "woeful": 5,       
      "downcast": 4,     
      "distressed": 5,   
      "bleak": 4,        
      "forlorn": 5,      
      "miserable": 5,    
      "sullen": 4,       
      "pessimistic": 4,  
      "troubled": 4,     
      "blue": 3,         
      "woe": 5,          
      "doleful": 4,      
      "dejected": 4,     
      "crestfallen": 5, 
      "heavyhearted": 5, 
      "morose": 4,       
      "sad": 3,          
      "lonely": 5,       
      "anguished": 5,    
      "painful": 5,      
      "saddened": 4      
    },
    anger: {
      "furious": 5,
      "angry": 4,
      "enraged": 5,
      "irritated": 4,
      "annoyed": 3,
      "frustrated": 4,
      "infuriated": 5,
      "outraged": 5,
      "hostile": 4,
      "agitated": 3,
      "livid": 5,
      "exasperated": 4,
      "incensed": 5,
      "enraged": 5,
      "seething": 5,
      "cross": 3,
      "fuming": 5,
      "irate": 5,
      "vexed": 4,
      "peeved": 3,
      "wrathful": 5,
      "boiling": 5,
      "inflamed": 5,
      "displeased": 4,
      "riled": 4,
      "mad": 4,
      "irritated": 4,
      "hot-tempered": 5,
      "vehement": 5,
      "exasperated": 4,
      "outraged": 5,
      "infuriating": 5,
      "tense": 4,
      "wrath": 5,
      "resentful": 4,
      "choleric": 5,
      "worked-up": 5,
      "provoked": 4,
      "disgruntled": 4,
      "belligerent": 5
    },
    fear: {
      "terrified": 5,
      "scared": 4,
      "frightened": 4,
      "nervous": 3,
      "anxious": 3,
      "panicked": 5,
      "apprehensive": 4,
      "alarmed": 4,
      "worried": 3,
      "fearful": 5,
      "horrified": 5,
      "dismayed": 4,
      "spooked": 4,
      "shaken": 4,
      "jittery": 3,
      "nervousness": 4,
      "petrified": 5,
      "startled": 4,
      "uneasy": 4,
      "terrorized": 5,
      "disturbed": 4,
      "afraid": 4,
      "apprehension": 4,
      "trembling": 4,
      "worried": 3,
      "freaked": 4,
      "shuddering": 4,
      "scary": 4,
      "panicky": 5,
      "horrific": 5,
      "shaky": 4,
      "dreadful": 5,
      "spooky": 4,
      "fright": 4,
      "trepidation": 4,
      "alarmed": 4,
      "skittish": 3,
      "terrifying": 5,
      "fearsome": 5,
      "troubled": 4
    },    
    surprise: {
      "amazed": 5,
      "astonished": 5,
      "shocked": 4,
      "startled": 4,
      "dumbfounded": 5,
      "unexpected": 4,
      "bewildered": 4,
      "stunned": 5,
      "astounded": 5,
      "flabbergasted": 5,
      "incredulous": 5,
      "overwhelmed": 5,
      "shaking": 4,
      "baffled": 5,
      "staggered": 5,
      "taken aback": 5,
      "confounded": 5,
      "surprised": 5,
      "disbelieving": 5,
      "amazing": 5,
      "unexpectedly": 4,
      "unexpectedness": 4,
      "startling": 4,
      "jolted": 4,
      "unbelievable": 5,
      "stunning": 5,
      "marveled": 5,
      "speechless": 5,
      "disconcerted": 4,
      "wonderstruck": 5,
      "awed": 5,
      "exhilarated": 5,
      "in awe": 5,
      "flummoxed": 5,
      "thrilled": 5,
      "surprised": 5,
      "shaken up": 4,
      "unsettled": 4,
      "gobsmacked": 5,
      "dazed": 4,
      "perplexed": 4,
      "shocked": 5
    }
    
  };
  
  let emotionScores = {
    happiness: 0,
    sadness: 0,
    anger: 0,
    fear: 0,
    surprise: 0
  };
  
  const emotionToHeading = {
    happiness: {
      explorer: 150,
      voyager: 100,
      captain: 90,
      merchant: 40,
      shipwright: 40,
      fisherman: 80,
      smuggler: 30,
      arbiter: 10,
      sailor: 80
    },
    sadness: {
      explorer: 20,
      voyager: 150,
      captain: 50,
      merchant: 90,
      shipwright: 20,
      fisherman: 60,
      smuggler: 60,
      arbiter: 100,
      sailor: 50
    },
    anger: {
      explorer: 50,
      voyager: 90,
      captain: 150,
      merchant: 50,
      shipwright: 30,
      fisherman: 10,
      smuggler: 80,
      arbiter: 100,
      sailor: 50
    },
    fear: {
      explorer: 10,
      voyager: 80,
      captain: 100,
      merchant: 150,
      shipwright: 60,
      fisherman: 90,
      smuggler: 10,
      arbiter: 10,
      sailor: 90
    },
    surprise: {
      explorer: 50,
      voyager: 100,
      captain: 30,
      merchant: 30,
      shipwright: 150,
      fisherman: 100,
      smuggler: 10,
      arbiter: 10,
      sailor: 50
    }
  };
  
  // Political keywords with weighted values
  const politicalKeywords = {
    progressive: {
      "equality": 5,
      "social": 4,
      "reform": 4,
      "inclusivity": 3,
      "liberal": 3,
      "activism": 5,
    "gender": 4,
    "Welfare": 4,
    "minority": 4,
    "green": 3,
    "Reform": 4,
    "Justice": 5
    },
    socialist: {
      "collectivism": 5,
      "redistribution": 4,
      "equality": 4,
      "welfare": 3,
      "workers": 4,
      "public": 5,
    "social": 4,
    "collective": 4,
    "Equality": 5,
    "Ownership": 4,
    "proletariat": 5,
    "universal": 5
    },
    idealist: {
      "utopian": 5,
      "dreamer": 4,
      "visionary": 4,
      "hopeful": 3,
      "ideal": 3,
      "Potential": 5,
    "Vision": 4,
    "philanthropy": 4,
    "justice": 3,
    "future": 4,
    "Idealism": 4,
    "transformative": 4
    },
    globalist: {
      "international": 5,
      "global": 5,
      "cooperation": 4,
      "integration": 4,
      "world": 4,
      "trans": 5,
    "Border": 4,
    "universal": 5,
    "global": 4,
    "multi": 5,
    "Peace": 5,
    "Solidarity": 4
    },
    conservative: {
      "tradition": 5,
      "stability": 4,
      "order": 4,
      "authority": 3,
      "preservation": 4,
      "heritage": 5,
    "Stability": 4,
    "socialOrder": 4,
    "cultural": 4,
    "Values": 5,
    "Preservation": 4,
    "familyValues": 4
    },
    economist: {
      "capitalism": 5,
      "market": 5,
      "freeTrade": 4,
      "efficiency": 4,
      "investment": 3,
      "economic": 5,
    "entrepreneur": 4,
    "fiscal": 4,
    "supply": 5,
    "Formation": 4,
    "labor": 4
    },
    realist: {
      "pragmatic": 5,
      "practical": 4,
      "realistic": 5,
      "Earth": 4,
      "rational": 4,
      "feasibility": 5,
    "tactical": 4,
    "Based": 5,
    "Solutions": 4,
    "real": 4,
    "Effectiveness": 4,
    "risk": 4
    },
    nationalist: {
      "patriotism": 5,
      "sovereignty": 5,
      "national": 4,
      "identity": 4,
      "independence": 4,
      "nationalUnity": 5,
    "sovereignRights": 5,
    "culturalPride": 4,
    "nationalDevelopment": 4,
    "Priority": 4,
    "Integrity": 5,
    "patriotic": 4
    },
    populist: {
      "Establishment": 5,
      "peoplePower": 4,
      "commonMan": 4,
      "grassroots": 4,
      "revolt": 3,
      "direct": 5,
    "popular": 4,
    "Elite": 4,
    "Participation": 4,
    "socialReform": 4,
    "Centric": 4,
    "Accountability": 4
    }
  };
  
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
          // Multiply by 100 before adding to mainHeading
          mainHeading[heading] += value * score * 100;
        }
      }
    });
  
    // Update populations based on mainHeading
    updatePopulationsBasedOnHeadings();
  }
  
  function updatePopulationsBasedOnHeadings() {
    for (const [heading, value] of Object.entries(mainHeading)) {
      if (populations.hasOwnProperty(heading)) {
        populations[heading] = value;
      }
    }
  }
  
  
  function scanForEmotionWords() {
    // Get the content of the textarea
    const content = document.getElementById('jsonEditor').value.toLowerCase();
  
    // Reset scores
    for (const key in emotionScores) {
      if (emotionScores.hasOwnProperty(key)) {
        emotionScores[key] = 0;
      }
    }
  
    // Split content into words for comparison
    const contentWords = content.split(/\s+/).map(word => word.replace(/[^\w\s]/g, ''));
  
    // Set a threshold for similarity
    const similarityThreshold = 2; // You can adjust this threshold
  
    // Scan for emotion words
    for (const [emotion, words] of Object.entries(emotionWords)) {
      for (const [word, weight] of Object.entries(words)) {
        for (const contentWord of contentWords) {
          // Calculate the Levenshtein distance
          if (levenshtein(word, contentWord) <= similarityThreshold) {
            emotionScores[emotion] += weight;
          }
        }
      }
    }
  
    // Update the headings based on detected emotions
    updateHeadingsBasedOnEmotions(emotionScores);
  
    // Update the political system based on detected keywords
    updatePoliticalHeadingsBasedOnKeywords();
  
    // Log the result to the console
    console.log('Emotion Scores:', emotionScores);
    console.log('Political Scores:', populations);
  
    // Display the result in a div
    const resultDiv = document.getElementById('result');
    if (resultDiv) {
      resultDiv.innerText = `Emotion Scores: ${JSON.stringify(emotionScores, null, 2)}\nPolitical Scores: ${JSON.stringify(populations, null, 2)}`;
    }
  }
  

  
  function updatePoliticalHeadingsBasedOnKeywords() {
    // Reset political scores
    for (const key in populations) {
      if (populations.hasOwnProperty(key)) {
        populations[key] = 0;
      }
    }
  
    // Get the content of the textarea
    const content = document.getElementById('jsonEditor').value.toLowerCase();
    const contentWords = content.split(/\s+/).map(word => word.replace(/[^\w\s]/g, ''));
  
    // Set a threshold for similarity (this needs to be defined or passed in)
    const similarityThreshold = 2; // Adjust if needed
  
    // Scan for political keywords
    for (const [political, keywords] of Object.entries(politicalKeywords)) {
      for (const [keyword, weight] of Object.entries(keywords)) {
        for (const contentWord of contentWords) {
          // Calculate the Levenshtein distance
          const distance = levenshtein(keyword, contentWord);
  
          if (distance <= similarityThreshold) {
            // Ensure the political heading exists in the populations object
            if (populations.hasOwnProperty(political)) {
              populations[political] += weight;
            }
          }
        }
      }
    }
  
  }
  


  

function updateData(dataObj) {
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

  // Calculate and update average
  const avg = Object.keys(dataObj).length ? total / Object.keys(dataObj).length : 0;

  // Update percentages based on total
  updatePercentages(total, dataObj);
}


function updatePercentages(total, dataObj) {
  if (total <= 0) {
      console.error('Total value is 0 or less:', total);
      return;
  }

  for (const key in dataObj) {
      const value = Number(dataObj[key]); // Ensure the value is a number
      if (isNaN(value)) {
          console.warn(`Value for ${key} is not a number.`);
          continue;
      }

      const percentage = (value / total) * 100;
      const roundedPercentage = Math.round(percentage);

      // Ensure the percentage is within expected bounds
      if (percentage < 0 || percentage > 100) {
          console.warn(`Percentage for ${key} is out of bounds: ${percentage}%`);
          continue;
      }

      const percentageElem = document.getElementById(`${key}bp`);
      if (percentageElem) {
          percentageElem.textContent = `${roundedPercentage}%`;
      } else {
          console.warn(`Element with ID ${key + 'bp'} not found.`);
      }

      const progressBar = document.querySelector(`.${key}-progress`);
      if (progressBar) {
          progressBar.style.width = `${roundedPercentage}%`;
          progressBar.style.backgroundColor = getProgressBarColor(roundedPercentage);
      } else {
          console.warn(`Progress bar with class ${key}-progress not found.`);
      }
  }
}



// Function to get progress bar color based on percentage
function getProgressBarColor(percentage) {
  if (percentage > 75) return 'green';
  if (percentage > 50) return 'black';
  if (percentage > 25) return 'black';
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
  updateData(mainHeading, 'totalMainHeading');
}



function updateProgressBars(populations) {
  const totalPopulation = Object.values(populations).reduce((total, num) => total + num, 0);
  console.log('Total Population:', totalPopulation);

  if (totalPopulation > 0) {
      for (const [category, population] of Object.entries(populations)) {
          const percentage = (population / totalPopulation) * 100;

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
      
      // Update progress bars and percentages
      updateProgressBars(populations);
  }
}
