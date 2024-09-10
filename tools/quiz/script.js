// Array of quiz questions with recommended slider positions and labels for each side of the slider
const quizQuestions = [
    {
        question: "When someone criticizes your work, how do you react?",
        recommended: 90,
        minLabel: "Take it personally",
        maxLabel: "Stay calm and analytical"
    },
    {
        question: "When faced with an unexpected change, how do you adapt?",
        recommended: 85,
        minLabel: "Feel anxious",
        maxLabel: "Stay flexible and logical"
    },
    {
        question: "When a loved one disagrees with you, how do you handle it?",
        recommended: 80,
        minLabel: "Get defensive",
        maxLabel: "Remain open and understanding"
    },
    {
        question: "How do you feel about making decisions under pressure?",
        recommended: 70,
        minLabel: "Panic or freeze",
        maxLabel: "Make logical decisions"
    },
    {
        question: "When things don’t go your way, how do you react?",
        recommended: 75,
        minLabel: "Get upset or frustrated",
        maxLabel: "Look for solutions calmly"
    }
    // Add more questions here as needed
];

addMoreQuestions(quizQuestions);

// Variables to keep track of quiz state
let currentQuestion = 0;
let totalDifference = 0;

// DOM Elements
const introSection = document.getElementById('intro');
const quizSection = document.getElementById('quiz');
const resultsSection = document.getElementById('results');
const questionText = document.getElementById('question-text');
const slider = document.getElementById('slider');
const sliderValue = document.getElementById('slider-value');
const sliderMin = document.getElementById('slider-min');
const sliderMax = document.getElementById('slider-max');
const finalScoreText = document.getElementById('final-score');
const resultMessage = document.getElementById('result-message');
const maturityLabelText = document.getElementById('maturity-label');  // New label element

// Start the quiz
document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);

function startQuiz() {
    introSection.classList.add('hidden');
    quizSection.classList.remove('hidden');
    displayQuestion();
}

// Display the current question and set slider labels
function displayQuestion() {
    const current = quizQuestions[currentQuestion];
    questionText.textContent = current.question;
    sliderMin.textContent = current.minLabel;  // Set min label for the current question
    sliderMax.textContent = current.maxLabel;  // Set max label for the current question
    slider.value = 50;  // Reset slider to middle position
    sliderValue.textContent = slider.value;  // Update slider display
}

// Update slider value display
slider.addEventListener('input', function () {
    sliderValue.textContent = slider.value;
});

// Submit answer and move to next question or finish quiz
document.getElementById('submit-btn').addEventListener('click', submitAnswer);

function submitAnswer() {
    const userValue = parseInt(slider.value);
    const recommendedValue = quizQuestions[currentQuestion].recommended;
    
    // Calculate the difference and add to totalDifference
    totalDifference += Math.abs(userValue - recommendedValue);

    currentQuestion++;
    
    if (currentQuestion < quizQuestions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

// Show the results at the end of the quiz
function showResults() {
    quizSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
    
    finalScoreText.textContent = totalDifference;
    
    // Determine the user's maturity level based on the totalDifference
    let maturityLevel = getMaturityLevel(totalDifference);
    
    // Update both the maturity label and the result message
    maturityLabelText.textContent = maturityLevel.label;  // Display the maturity level label
    resultMessage.textContent = maturityLevel.message;    // Display the corresponding message
}

// Retake quiz
document.getElementById('retake-quiz-btn').addEventListener('click', retakeQuiz);

function retakeQuiz() {
    currentQuestion = 0;
    totalDifference = 0;
    resultsSection.classList.add('hidden');
    quizSection.classList.remove('hidden');
    displayQuestion();
}

// Function to get the maturity level based on the total score
function getMaturityLevel(score) {
    if (score <= 50) {
        return { label: "Evolved Human", message: "You have achieved emotional mastery, responding to situations with utmost logic and clarity." };
    } else if (score <= 75) {
        return { label: "Wise Sage", message: "You handle emotions well, approaching most situations with thoughtfulness and reason." };
    } else if (score <= 100) {
        return { label: "Grounded Adult", message: "You demonstrate emotional maturity but still react emotionally in certain situations." };
    } else if (score <= 125) {
        return { label: "Balanced Individual", message: "You balance logic and emotion, though there’s room for growth in some areas." };
    } else if (score <= 150) {
        return { label: "Reflective Soul", message: "You tend to reflect before reacting but occasionally emotions take over." };
    } else if (score <= 175) {
        return { label: "Emotional Thinker", message: "You rely more on your emotions when making decisions, which sometimes clouds your judgment." };
    } else if (score <= 200) {
        return { label: "Impulsive Reactor", message: "You often react based on emotion rather than logic, leading to impulsive decisions." };
    } else if (score <= 225) {
        return { label: "Emotional Explorer", message: "Your emotions play a strong role in your reactions, sometimes overpowering your logic." };
    } else if (score <= 250) {
        return { label: "Emotional Child", message: "Your emotions dominate your responses, and logical processing is often secondary." };
    } else {
        return { label: "Toddler", message: "Your emotional responses are highly immature, similar to those of a toddler. Consider working on your emotional regulation." };
    }
}
