let hasCrycellaMessageRun = false;
let hasCrycellaMessage2Run = false;
let hasCrycellaMessage3Run = false;

function crycellaMessage() {
  if (questStatus.quest2 === true && !hasCrycellaMessageRun) {
    chatWindow.innerHTML += '<font style="font-weight:900; color: #054950;"><b>Crycella: The {search bar} at the top is your everexpanding inventory. Where as you adventure, i am sure you will want to collect everything possible. The last item you need, is now in your inventory. When you are ready with the {knife} and the {potion}, proceed to Bawon Samedis ritual area for the seance. Do not forget the {candle}s...</b></font>';
    hasCrycellaMessageRun = true;
  }
}

function crycellaMessage2() {
  if (questStatus.quest3 === true && !hasCrycellaMessage2Run) {
    chatWindow.innerHTML += '<font style="font-weight:900; color: #054950;"><b>Crycella: Maybe you can {light} the candle some way, I know the Lwa love to be punny.</b></font>';
    hasCrycellaMessage2Run = true;
  }
}

function crycellaMessage3() {
  if (questStatus.quest5 === true && !hasCrycellaMessage3Run) {
    displayStory2();
    hasCrycellaMessage3Run = true;
  }
}
