let questionStatus = {
    PlayQuestion1: false,
    PlayQuestion2: false,
    PlayQuestion3: false,
    PlayQuestion4: false,
    PlayQuestion5: false
};

let questStatus = {
    quest1: false,
    quest2: false,
    quest3: false,
    quest4: false,
    quest5: false
};

let candlelight = false;

function checkAllQuestionsPlayed() {
    if (Object.values(questionStatus).every(status => status)) {
        alert("You have finished this months lesson!");
        healthPoints = 99999;
    }
}

function PlayQuestion1() {
  questStatus.quest1 = true;
    chatWindow.innerHTML += '<br><hr><font style="font-weight:900; color: blue;"><b>Micheal: Let us talk about movespeed, I will give you the first enchantment to allow you to move around the map better. Find the Tomb and come back! By the swift winds of Legba, and the mighty force of Shango, I summon the rapid currents of Oya, to quicken my flow.</b></font><hr><br>';
    scrollToBottom();
    questionStatus.PlayQuestion1 = true;
    checkAllQuestionsPlayed();
}

function PlayQuestion2() {
    chatWindow.innerHTML += '<br><hr><font style="font-weight:900; color: blue;"><b>Micheal: Through the pathways of the Loa, let my speed be unmatched, as the serpent Damballah coils, let my agility be unattached. Now go and locate the Demon. You will need to get their attention, as soon as you see your health drops you know you have their attention. Anytime you come back to me, I will refill your health.</b></font><hr><br>';
    scrollToBottom();
    questionStatus.PlayQuestion2 = true;
    checkAllQuestionsPlayed();
}

function PlayQuestion3() {
    chatWindow.innerHTML += '<br><hr><font style="font-weight:900; color: blue;"><b>Micheal: In the name of Papa Ghede, bearer of the eternal crossroad, grant me the velocity of the cheetah, light as the load of a hummingbird. Go speak to Crycella to find out more about your inventory, then come back if you ever need help.</b></font><hr><br>';
    scrollToBottom();
    questionStatus.PlayQuestion3 = true;
    checkAllQuestionsPlayed();
}

function PlayQuestion4() {
    chatWindow.innerHTML += '<br><hr><font style="font-weight:900; color: blue;"><b>Micheal: You now have all the items for the ritual, place the candle at the spirit altar, and await for a Lwa to offer a blessing or a curse based on your story.</b></font><hr><br>';
    scrollToBottom();
    questionStatus.PlayQuestion4 = true;
    checkAllQuestionsPlayed();
}

function PlayQuestion5() {
    chatWindow.innerHTML += '<br><hr><font style="font-weight:900; color: blue;"><b>Micheal: You have somehow made it this far soulcrafter. Share my final blessing... With the blessing of the ancestors, and the spirits that guide, may my movements be a blur, like the relentless ride of the tide.</b></font><hr><br>';
    scrollToBottom();
    questStatus.quest5 = true;
    questionStatus.PlayQuestion5 = true;
    checkAllQuestionsPlayed();
}




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
