
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
      "excited": 4
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
      "gloomy": 3
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
      "agitated": 3
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
      "fearful": 5
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
      "flabbergasted": 5
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
      explorer: 1,
      voyager: 0,
      captain: 0,
      merchant: 0,
      shipwright: 0,
      fisherman: 0,
      smuggler: 0,
      arbiter: 0,
      sailor: 0
    },
    sadness: {
      explorer: 0,
      voyager: 1,
      captain: 0,
      merchant: 0,
      shipwright: 0,
      fisherman: 0,
      smuggler: 0,
      arbiter: 0,
      sailor: 0
    },
    anger: {
      explorer: 0,
      voyager: 0,
      captain: 1,
      merchant: 0,
      shipwright: 0,
      fisherman: 0,
      smuggler: 0,
      arbiter: 0,
      sailor: 0
    },
    fear: {
      explorer: 0,
      voyager: 0,
      captain: 0,
      merchant: 1,
      shipwright: 0,
      fisherman: 0,
      smuggler: 0,
      arbiter: 0,
      sailor: 0
    },
    surprise: {
      explorer: 0,
      voyager: 0,
      captain: 0,
      merchant: 0,
      shipwright: 1,
      fisherman: 0,
      smuggler: 0,
      arbiter: 0,
      sailor: 0
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
  


  