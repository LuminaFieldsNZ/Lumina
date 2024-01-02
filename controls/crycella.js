let hasCrycellaMessageRun = false;
let hasCrycellaMessage2Run = false;

function crycellaMessage() {
  if (questStatus.quest2 === true && !hasCrycellaMessageRun) {
    chatWindow.innerHTML += '<br><font style="font-weight:900; color: #054950;"><b>Crycella: Your everexpanding inventory can be viewed with Felix. As you adventure, I am sure you will want to collect everything possible. The last item you need, is now in your inventory. When you are ready with the {knife} and the {potion}, proceed to the shrine of Bawon Samedi for the seance. Do not forget the {candle}s...You will need to tell them to light your way.</b></font><br>';
    hasCrycellaMessageRun = true;
    scrollToBottom();
  }
}

function crycellaMessage2() {
  if (questStatus.quest5 === true && !hasCrycellaMessage2Run) {
    displayStory2();
    scrollToBottom();
    hasCrycellaMessage2Run = true;
  }
}
