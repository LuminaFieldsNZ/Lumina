let processedMessages2 = [];
const storyContainer2 = document.getElementById('storyContainer');
const textarea2 = document.getElementById('textarea');
const button2 = document.getElementById('sendbutton');

const generalKeywordsArray2 = [
    { "word": "zili", "weight": 4, "response": "The mysterious paths you choose often lead to profound insights and hidden truths." },
    { "word": "amedi", "weight": 4, "response": "Exploration opens doors to unknown worlds. Trust your instincts on this journey." },
    { "word": "egba", "weight": 4, "response": "Leading your path with courage sets an example for others. Continue with strength." },
    { "word": "itte", "weight": 4, "response": "Pioneering new ways is the essence of discovery. Your boldness will be rewarded." }
];

function calculateEmotionScore2(input) {
    let score = 0;

    generalKeywordsArray2.forEach(keywordObj => {
        const regex = new RegExp(`\\b${keywordObj.word}\\b`, 'gi');
        const matches = input.match(regex);
        if (matches) {
            score += matches.length * keywordObj.weight;
        }
    });

    return score;
}

function getEmotionalFeedback2(input) {
    const score = calculateEmotionScore2(input);

    // Check if total weight is higher than 10
    if (score > 10) {
        igniteKnife();  // Call igniteKnife function
    }
}

function igniteKnife() {
    // Implementation of igniteKnife
    console.log("The knife is ignited!");
    // Add more logic as needed
}


const storyGroups2 = [
    {
        setting: "In the depths of a shadowy Louisiana swamp, where the spirits whisper through the trees, and the air is heavy with ancient magic.",
        characters: ["Mambo Ezili, a powerful voodoo priestess, guardian of secrets and communicator with the spirits", "A traveler, marked by destiny, seeking to uncover the mysteries of their past"],
        objects: ["A mystical loa talisman, glowing with an otherworldly light, said to be a key to the spirit world.", "An ancient voodoo doll, bound in mystery, believed to hold the power to bridge the realms of the living and the dead."],
        events: ["While wandering the swamp, you stumble upon a clearing where Mambo Ezili is performing a sacred ritual. The spirits seem to be communicating directly with you, offering guidance or warnings. Would you heed their message, possibly altering your destiny, or ignore it, keeping your path unchanged?",
                 "In the heart of the swamp, you discover an abandoned temple, its walls covered in cryptic symbols. Inside, a spirit offers you a glimpse into your future. Would you look into the unknown, embracing whatever fate may hold, or turn away, choosing to carve your own destiny?"]
    },
    {
      setting: "At the edge of a moonlit bayou, a clearing shrouded in mist and resonating with the hum of ancient chants.",
      characters: ["Baron Samedi, the enigmatic loa of the dead, draped in his iconic top hat and tails, presiding over the spirits", "A curious historian, armed with knowledge and skepticism, exploring the mystical truths of voodoo lore."],
      objects: ["A deck of tarot cards, each illustration more mysterious than the last, believed to reveal the secrets of destiny.", "A jar of potent gris-gris, filled with herbs and objects of power, used in protective and healing rituals."],
      events: ["As you navigate the dense bayou, Baron Samedi appears, offering you a tarot reading that could reveal the path to your deepest desires. Would you accept this otherworldly insight, risking the truth you may not wish to hear, or decline, preserving your current reality?",
              "In a hidden part of the bayou, you find a sacred altar. A choice presents itself: create a gris-gris for personal protection or one to heal the bayou's ailing spirit. Which path of magic do you choose, self-preservation or the greater good?"]
    },
    {
      setting: "A crossroads under the starry sky, where legends say spirits cross from their realm to ours, and deals are struck with the unseen.",
      characters: ["Papa Legba, the wise and cunning loa of crossroads, waiting with his cane, ready to open or close paths", "A determined musician, seeking to make a deal for unparalleled skill, unaware of the true cost."],
      objects: ["A mystical veve drawn in the dirt, glowing faintly, used to summon and communicate with the loa.", "A weathered and magical guitar, said to play the most haunting melodies, resonating with the soul of the bayou."],
      events: ["At the stroke of midnight, Papa Legba offers you a choice: walk through an opened portal to your deepest ambition or remain grounded in your current life. Do you step through, embracing uncertainty, or stay in the comfort of the known?",
              "The musician plays a tune that stirs the spirits, but the melody is incomplete. You find the magical guitar, and playing it may complete the tune, binding you to the bayou forever. Do you play the final notes or leave the melody unfinished?"]
    }
    // ... additional story groups ...
];

function generateRandomStory2() {
    const randomGroup = storyGroups2[Math.floor(Math.random() * storyGroups2.length)];

    const randomCharacter = randomGroup.characters[Math.floor(Math.random() * randomGroup.characters.length)];
    const randomObject = randomGroup.objects[Math.floor(Math.random() * randomGroup.objects.length)];
    const randomEvent = randomGroup.events[Math.floor(Math.random() * randomGroup.events.length)];

    return `Imagine you're wandering through ${randomGroup.setting}. As you walk, ${randomCharacter} approaches you. They offer you ${randomObject}. As you interact with it, you find yourself facing a dilemma: ${randomEvent}`;
}


function displayStory2() {
    const storyP2 = document.createElement('p');
    storyP2.textContent = generateRandomStory2();
    storyContainer.appendChild(storyP2);
}
