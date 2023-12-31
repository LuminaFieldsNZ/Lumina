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
        alert("You have finished this weeks lesson, great job!");
    }
}

function PlayQuestion1() {
  questStatus.quest1 = true;
    chatWindow.innerHTML += '<br><hr><font style="font-weight:900; color: red;"><b>Micheal: Let us talk about movespeed, I will give you the first enchantment to allow you to move around the map better. Come back in a few seconds! asd?j?spd/increase/1asd$df2</b></font><hr><br>';
    scrollToBottom();
    questionStatus.PlayQuestion1 = true;
    checkAllQuestionsPlayed();
}

function PlayQuestion2() {
    chatWindow.innerHTML += '<br><hr><font style="font-weight:900; color: blue;"><b>Micheal: Go and locate the Dragon, by the time you return, i will have your next incantation ready.</b></font><hr><br>';
    scrollToBottom();
    questionStatus.PlayQuestion2 = true;
    checkAllQuestionsPlayed();
}

function PlayQuestion3() {
    chatWindow.innerHTML += '<br><hr><font style="font-weight:900; color: green;"><b>Micheal: Lets get this out the way first. mumbababab23air/increase/1df@cvvvv..sss <br><br>........<br><br>..... Ok, you now have the ability to jump a little higher. Go speak to Crycella to find out more about your inventory.</b></font><hr><br>';
    scrollToBottom();
    questionStatus.PlayQuestion3 = true;
    checkAllQuestionsPlayed();
}

function PlayQuestion4() {
    chatWindow.innerHTML += '<br><hr><font style="font-weight:900; color: purple;"><b>Micheal: You now have all the items for the ritual, place the candle at the spirit altar, and await for a Lwa to offer a blessing or a curse based on your story.</b></font><hr><br>';
    scrollToBottom();
    questionStatus.PlayQuestion4 = true;
    checkAllQuestionsPlayed();
}

function PlayQuestion5() {
    chatWindow.innerHTML += '<br><hr><font style="font-weight:900; color: orange;"><b>Micheal: You have somehow made it this far, and earned the title soulcrafter. Share my final blessing, in the form of a huge status boost. <br> 3gggyujr5.fdsdt5,air/increase/1xtxspd/increase/1x112..a</b></font><hr><br>';
    scrollToBottom();
    questStatus.quest5 = true;
    questionStatus.PlayQuestion5 = true;
    checkAllQuestionsPlayed();
}
