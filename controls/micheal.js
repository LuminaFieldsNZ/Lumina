







function PlayQuestion() {
              chatWindow.innerHTML += '<br><hr><font style="font-weight:900; color: red;"><b>Micheal: Come back once you have found the dark candle.</b></font><hr><br>';
              scrollToBottom();
    }







let shouldPlayQuestion = true;

// Function to be called every 5 seconds
function periodicUpdate2() {
    countEmojisAndUpdate();
    countEmotionKeywordsAndUpdate();
    countKeywordsForNationsAndUpdate();
    if (shouldPlayQuestion) {
            PlayQuestion();
            shouldPlayQuestion = false; // Prevents playing again in future updates
        }
    hitpoints = 100;
    document.getElementById('hitPoints').innerHTML = hitpoints;
}
