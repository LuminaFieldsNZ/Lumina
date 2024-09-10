// addQuestions.js

function addMoreQuestions(quizQuestions) {
    // Add 10 more questions to the existing quizQuestions array
    const newQuestions = [
        {
            question: "How do you react when someone doubts your capabilities?",
            recommended: 85,
            minLabel: "Feel insecure",
            maxLabel: "Feel confident in your skills"
        },
        {
            question: "When you receive unexpected bad news, how do you handle it?",
            recommended: 75,
            minLabel: "Feel overwhelmed",
            maxLabel: "Stay calm and assess the situation"
        },
        {
            question: "How do you react when your ideas are challenged?",
            recommended: 90,
            minLabel: "Feel threatened",
            maxLabel: "Engage in thoughtful discussion"
        },
        {
            question: "When someone asks for your opinion, how do you respond?",
            recommended: 80,
            minLabel: "Hold back out of fear",
            maxLabel: "Speak confidently"
        },
        {
            question: "When you're under stress, how do you manage your emotions?",
            recommended: 85,
            minLabel: "Feel overwhelmed",
            maxLabel: "Manage stress rationally"
        },
        {
            question: "How do you feel when you're wrong but don't want to admit it?",
            recommended: 75,
            minLabel: "Avoid admitting fault",
            maxLabel: "Acknowledge and correct yourself"
        },
        {
            question: "How do you handle criticism from a close friend?",
            recommended: 80,
            minLabel: "Feel betrayed",
            maxLabel: "Appreciate their honesty"
        },
        {
            question: "When someone doesn't respect your boundaries, how do you react?",
            recommended: 90,
            minLabel: "Get angry",
            maxLabel: "Assert yourself calmly"
        },
        {
            question: "How do you feel when you’re excluded from a social event?",
            recommended: 85,
            minLabel: "Feel rejected",
            maxLabel: "Accept and move on"
        },
        {
            question: "When plans suddenly change, how do you handle it?",
            recommended: 80,
            minLabel: "Feel frustrated",
            maxLabel: "Adapt with ease"
        }
    ];

    // Push the new questions onto the existing quizQuestions array
    quizQuestions.push(...newQuestions);
}
