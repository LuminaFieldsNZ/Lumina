


function periodicUpdate2() {
    countEmojisAndUpdate();
    countEmotionKeywordsAndUpdate();
    countKeywordsForNationsAndUpdate();

    if (!questionStatus.PlayQuestion1) {
        PlayQuestion1();
    } else if (!questionStatus.PlayQuestion2) {
        if (questStatus.quest1 === true) {
            PlayQuestion2();
        } else {
            PlayQuestion1();
        }
    } else if (!questionStatus.PlayQuestion3) {
        if (questStatus.quest2 === true) {
            PlayQuestion3();
        } else {
            PlayQuestion2();
        }
    } else if (!questionStatus.PlayQuestion4) {
        if (questStatus.quest3 === true) {
            PlayQuestion4();
        } else {
            PlayQuestion3();
        }
    } else if (!questionStatus.PlayQuestion5) {
        if (questStatus.quest4 === true) {
            PlayQuestion5();
        } else {
            PlayQuestion4();
        }
    }

    hitpoints = healthPoints;
    document.getElementById('hitPoints').innerHTML = hitpoints;
}


function crycellaMessage() {
  if (questStatus.quest2 === true) {
    chatWindow.innerHTML += 'The {search bar} at the top is your everexpanding inventory. Where as you adventure, i am sure you will want to collect everything possible. I am sure you have already grabbed the knife, try to type that in now!';
  }
  if(code === "knife") {
    chatWindow.innerHTML += 'I see that you have found you knife in everexpanding inventory. Now lets see you locate the potion!';
  }
  if(code === "potion") {
    chatWindow.innerHTML += 'The last item you need, is now in your inventory. When you are ready, proceed to Bawon Samedis ritual area for the seance. Do not forget the candles...';
  }
}
