

function levenshtein(a, b) {
    if (a.length > b.length) [a, b] = [b, a];
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    let matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
    matrix[0] = Array.from({ length: a.length + 1 }, (_, i) => i);

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            matrix[i][j] = b.charAt(i - 1) === a.charAt(j - 1) ?
                matrix[i - 1][j - 1] :
                Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
        }
    }
    return matrix[b.length][a.length];
}

function getClosestQuestion(input, data) {
    let closestQuestion = null;
    let minDistance = Infinity;

    for (const entry of data) {
        const distance = levenshtein(input, entry[0]);
        if (distance < minDistance) {
            minDistance = distance;
            closestQuestion = entry[0];
        }
    }
    return closestQuestion;
}
const validCategories = ["captain", "voyager", "smuggler", "sailor", "arbiter", "explorer", "merchant", "shipwright", "fisherman", "populist", "nationalist", "realist", "economist", "conservative", "globalist", "idealist", "socialist", "progressive"];

function getClosestCategory(input) {
    let closestCategory = null;
    let minDistance = Infinity;

    for (const category of validCategories) {
        const distance = levenshtein(input, category);
        if (distance < minDistance) {
            minDistance = distance;
            closestCategory = category;
        }
    }
    return minDistance <= 2 ? closestCategory : null; // Only accept if the distance is 2 or less
}






function checkForFallacies(tokens) {
    const detectedFallacies = [];
    fallacies.forEach(fallacy => {
        if (detectPattern(tokens, fallacy.fallacy)) {
            const example = getExample(fallacy.fallacy);
            detectedFallacies.push({ name: fallacy.name, description: fallacy.description, fallacy: fallacy.fallacy, example: example });
        }
    });
    console.log(`Detected fallacies:`, detectedFallacies);
    return detectedFallacies;
}

function preprocessAndTokenize(message) {
    return message
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove punctuation but keep words
        .split(/\s+/)
        .filter(token => token.length > 0); // Remove empty tokens
}


function detectPattern(tokens, fallacyType) {
    // Define expanded patterns for each fallacy type
    const patterns = {
        "Ad Hominem": /(\b(fool|incompetent|dropout|mess things up|ridiculous|idiot|dumb|stupid|unqualified|inept)\b)/i,
        "Straw Man": /(\b(ban all|control us|be vegans|force everyone|throw money|limit freedom|dictate choices|restrict options|enforce beliefs|impose regulations)\b)/i,
        "Appeal to Authority": /(\b(professor|CEO|author|scientist|celebrity|expert|specialist|authority|leader|figurehead)\b)/i,
        "False Dilemma": /(\b(either|or|choose between|either this or that|only two options|no middle ground|black or white)\b)/i,
        "Slippery Slope": /(\b(society will collapse|total environmental destruction|chaos will ensue|inevitable disaster|catastrophe is coming|slippery slope|chain reaction)\b)/i,
        "Circular Reasoning": /(\b(because it says so|always right|the law is just|trustworthy|president is correct|proven to work|self-evident|without question)\b)/i,
        "Hasty Generalization": /(\b(everyone|all|must be|only|always|never|every case|one size fits all|generalize|sweepingly)\b)/i,
        "Red Herring": /(\b(worry about the environment|your personal issues|what you're wearing|vacation plans|traffic problem|distraction|irrelevant matter|off-topic)\b)/i,
        "Bandwagon Fallacy": /(\b(everyone's doing it|popular|friends believe|viral|everyone agrees|trending|social proof|mass appeal)\b)/i,
        "Post Hoc Ergo Propter Hoc": /(\b(store made me sick|rooster causes the sun to rise|new tires caused breakdown|storm caused by policy|record sales due to employee|caused by|blamed on|after this, therefore because of this)\b)/i,
        "Appeal to Emotion": /(\b(think of the children|heartless|sad|feel good|break hearts|emotional|fear-mongering|sympathy|compassion|empathize)\b)/i,
        "Begging the Question": /(\b(because it's illegal|it's proven to work|the best|necessary|assumed|justified|inherently true|presumed)\b)/i,
        "False Equivalence": /(\b(eating meat is murder|not voting is the same|skipping class is failing|being late is irresponsible|not liking policy is against organization|equating|comparing|false equivalence)\b)/i,
        "No True Scotsman": /(\b(real gamer|true environmentalist|real expert|true friend|authentic|genuine|true member|proper)\b)/i,
        "Genetic Fallacy": /(\b(from that group|from that country|where she was raised|unreliable source|that manufacturer|origin|background|source|heritage)\b)/i,
        "Tu Quoque": /(\b(smoke too|waste money|eat junk food|never on time|never studied|you do it too|hypocrisy|double standard|you too)\b)/i,
        "Appeal to Tradition": /(\b(always done it|been around for centuries|ancestors did it|always followed rules|part of our heritage|traditional|time-honored|conventional|customary)\b)/i,
        "Appeal to Ignorance": /(\b(no one has proven|must be real|no proof|must be valid|must be true|unproven|lacking evidence|assumed true)\b)/i,
        "False Cause": /(\b(rooster causes the sun to rise|sales increased due to software|lucky shirt brings good luck|tea is the cure|red brings good grades|causal link|causes|due to|attributed to)\b)/i,
        "Loaded Question": /(\b(stopped cheating|always lie|taking responsibility|ignoring duties|inconsistent promises|presumed guilt|question loaded|inherently assuming)\b)/i,
        "Cherry Picking": /(\b(ignoring successes|opposite|disregarding other evidence|negative reviews|selective evidence|biased choice|only favorable)\b)/i,
        "Black or White": /(\b(complete support|reject entirely|agree with everything|hero or villain|with us or against us|either or|no middle ground|polarized)\b)/i,
        "Guilt by Association": /(\b(notorious criminal|conspiracy theories|questionable crowd|controversial organization|problematic group|associated with|linked to|tied to|affiliated with)\b)/i,
        "Burden of Proof": /(\b(prove false|your responsibility|must be correct|prove incorrect|up to you|prove it|onus on you|prove validity)\b)/i,
        "Middle Ground": /(\b(compromise|meet halfway|find a middle ground|settle in the middle|satisfies both sides|balanced|moderate|middle position)\b)/i,
        "Personal Incredulity": /(\b(cant understand|must be impossible|hard to believe|beyond comprehension|cant imagine|incredible|unbelievable|implausible)\b)/i,
        "Anecdotal Evidence": /(\b(know someone|friend had a great experience|seen people succeed|had a positive outcome|personal story|individual case|personal testimony|anecdote)\b)/i,
        "Appeal to Nature": /(\b(natural|better for you|best option|always superior|cant be harmful|innate|organic|pure|natural goodness)\b)/i,
        "False Analogy": /(\b(absurdly wrong|false analogy|misleading|oversimplification|inaccurate comparison|flawed analogy|not comparable|improper comparison)\b)/i,
    };


    const pattern = patterns[fallacyType];

    if (!pattern) {
        console.log(`No pattern defined for fallacy type: ${fallacyType}`);
        return false;
    }

    const text = tokens.join(' ');

    return pattern.test(text);
}



function getExample(fallacyType) {
    // Find a relevant example from fallacyExamples
    const fallacy = fallacyExamples.find(f => f.fallacy === fallacyType);
    return fallacy ? fallacy.examples[0] : 'No example available';
}



const emoteClasses = ['sad', 'neutral', 'fine'];
const EMOTE_LIFETIME_MS = 7800;

function getRandomEmote() {
  const randomIndex = Math.floor(Math.random() * emoteClasses.length);
  return emoteClasses[randomIndex];
}

function createEmotes(x, y) {
  for (let i = 0; i < emoteClasses.length; i++) {
    const emoteContainer = document.createElement('div');
    emoteContainer.classList.add('svg-container2');
    
    const emote = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    emote.classList.add('emote', getRandomEmote());
    emote.setAttribute('viewBox', '0 0 44 44');

    const square = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
square.setAttribute('x', '0');
square.setAttribute('y', '0');
square.setAttribute('width', '44');
square.setAttribute('height', '44');
square.setAttribute('fill', '#f8db82');
emote.appendChild(square);


    const faceGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    faceGroup.classList.add('face');

    switch (emote.classList[1]) {
      case 'sad':
        faceGroup.innerHTML = `
        <g class="sad" id="sad" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(0, 0)">
      <g id="face" transform="translate(13.000000, 20.000000)">
        <g class="face">
          <path d="M7,4 C7,5.1045695 7.8954305,6 9,6 C10.1045695,6 11,5.1045695 11,4" class="mouth" stroke="#2C0E0F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform="translate(9.000000, 5.000000) rotate(-180.000000) translate(-9.000000, -5.000000)"></path>
          <ellipse class="right-eye" fill="#2C0E0F" cx="16.0941176" cy="1.75609756" rx="1.90588235" ry="1.75609756"></ellipse>
          <ellipse class="left-eye" fill="#2C0E0F" cx="1.90588235" cy="1.75609756" rx="1.90588235" ry="1.75609756"></ellipse>
        </g>
      </g>
    </g>
      `;        break;
      case 'neutral':
        faceGroup.innerHTML = `
        <g>
      <g class="neutral">
        <g transform="translate(13.000000, 20.000000)" fill="#2C0E0F">
          <g class="mouth">
            <g transform="translate(9, 5)">
              <rect x="-2" y="0" width="4" height="2" rx="2"></rect>
            </g>
          </g>
          <ellipse class="right-eye" cx="16.0941176" cy="1.75" rx="1.90588235" ry="1.75"></ellipse>
          <ellipse class="left-eye" cx="1.90588235" cy="1.75" rx="1.90588235" ry="1.75"></ellipse>
        </g>
      </g>
    </g>
      `;        break;
      case 'fine':
        faceGroup.innerHTML = `
        <g class="fine" id="fine-emotion" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
<g id="fine">
  <g class="matrix" transform="translate(22.000000, 32.000000)">
    <g class="face-container">
      <g class="face" transform="translate(-9, -12)">
        <g class="eyes">
          <ellipse class="right-eye" fill="#2C0E0F" cx="16.0941176" cy="1.75609756" rx="1.90588235" ry="1.75609756"></ellipse>
          <ellipse class="left-eye" fill="#2C0E0F" cx="1.90588235" cy="1.75609756" rx="1.90588235" ry="1.75609756"></ellipse>
        </g>
        <path d="M6.18823529,4.90499997 C6.18823529,5.95249999 7.48721095,7 9.08957864,7 C10.6919463,7 11.990922,5.95249999 11.990922,4.90499997" id="mouth" stroke="#2C0E0F" stroke-linecap="round" stroke-linejoin="round"></path>
      </g>
    </g>
  </g>
</g>
</g>
`;        break;
    }

    emote.appendChild(faceGroup);
    emoteContainer.appendChild(emote);

    emoteContainer.style.top = `${y}px`;
    emoteContainer.style.left = `${x}px`;

    const horizontalDistance = (Math.random() * 500 - 250);
    const fallDuration = Math.random() * 10 + 5;

    emoteContainer.style.setProperty('--horizontal-distance', `${horizontalDistance}px`);
    emoteContainer.style.setProperty('--animation-duration', `${fallDuration}s`);

    emoteContainer.classList.add('falling');

    setTimeout(() => {
      emoteContainer.remove();
    }, EMOTE_LIFETIME_MS);

    document.body.appendChild(emoteContainer);
  }
}

document.addEventListener('click', (event) => {
  const x = event.clientX;
  const y = event.clientY;
  createEmotes(x, y);
});
