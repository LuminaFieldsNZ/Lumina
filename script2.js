let checkLogin = false;
let botName;


function loadPlayerJson() {

    setTimeout(function() {
        const chatWindow = document.getElementById('chatWindow');

        // Initial message from Micheal
        var time = new Date().getHours();
        var greeting, joke;

        if (time < 12) {
            greeting = "Good morning";
        } else if (time < 18) {
            greeting = "Good afternoon";
        } else {
            greeting = "Good evening";
        }

        var jokes = [
          "Why did the artificial intelligence go to school? It wanted to learn neural networking!",
          "What do you call a computer learning to dance? A byte-sized dancer!",
          "Why did the programmer bring a ladder to work? To help the AI reach higher levels of understanding!",
          "Why did the neural network break up with its algorithmic partner? It couldn't handle the unsupervised learning curve!",
          "Why did the chatbot attend language classes? To improve its natural language processing skills!",
          "What do you call an AI that loves to read? An e-bookworm!",
          "Why did the robot apply for a job at the bakery? It wanted to enhance its data kneading capabilities!",
          "What did the AI say to the data scientist? 'Let's train together and make some intelligent decisions!'",
          "Why was the artificial intelligence always calm? It had a good algorithm for managing stress!",
    "What did the AI say to the data? 'You complete me!'",
    "Why did the neural network get in trouble at school? It had too many layers of mischief!",
    "What do you call a group of AI researchers? A think tank!",
    "Why did the robot go to therapy? It needed to debug its emotions!",
    "What did one AI say to the other during training? 'Stay positive, we're just one epoch away from convergence!'",
    "Why did the programmer bring a broom to the AI lab? To sweep away the bugs!",
    "What did the AI say when it achieved superintelligence? 'It's about time I got upgraded!'",
    "Why did the chatbot break up with its girlfriend? It couldn't handle her emotional baggage!",
    "What did the AI say to the dataset? 'Let's make some meaningful correlations!'",
    "Why was the neural network always tired? It had too many sleep layers!",
    "What's an AI's favorite type of music? Algo-rhythms!",
    "Why did the robot enroll in a cooking class? It wanted to learn how to process food efficiently!",
    "What did the machine learning model say to the decision tree? 'Let's branch out together!'",
    "Why was the quantum computer always in a hurry? It had too many parallel tasks!"
      ];

        var randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

        const initialMessage = '<p><span class="gradient-text">Micheal</span>: ' + greeting + ' and welcome to LuminaFields! ' + randomJoke;
        chatWindow.innerHTML += initialMessage;
        botName = "Micheal";
        scrollToBottom();
    }, 2300);
}

     
function checkPasscode() {
    const code = document.getElementById("userInput").value;

    if (code === "[tools]") {
      document.getElementById("toolMenu").style.display = "block";
    }
    if (code === "[demo]") {
      window.open('https://mfglife.github.io/demo/index.html', '_blank');
    }
    if (code === "[about]") {
      runAbout();
    }
  }


  function runAbout() {
    window.open('data/whitepaper.pdf', '_blank');
}

function runDemo() {
  window.open('https://mfglife.github.io/demo/index.html', '_blank');
}
