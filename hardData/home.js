



let healthPoints = 100, spiritPoints = 10, attackDamage = 10, resilience = 1, airPoints = 1, speedPoints = .04;
let potionAmountNum = 0;

document.addEventListener('DOMContentLoaded', function () {

  const messagesSection = document.querySelector('.messages-section');
  const messagesBtn = document.querySelector('.messages-btn');
  const messagesClose = document.querySelector('.messages-close');

  messagesBtn.addEventListener('click', function () {
    messagesSection.classList.add('active');
  });

  messagesClose.addEventListener('click', function() {
    messagesSection.classList.remove('active');
  });

  var projectsList = document.querySelector('.project-boxes');
});




function checkPasscode() {
  document.getElementById('backpack').style.display = 'block';
  setTimeout(function() {
      document.getElementById('backpack').style.display = 'none';
  }, 25500); // 500 milliseconds equals half a second

  const code = document.getElementById("textarea").value.toLowerCase(); // Convert to lower case

  if(code === "candle") {
    questStatus.quest3 = true;
    document.getElementById('candle').style.display = 'block';
    setTimeout(function() {
        document.getElementById('candle').style.display = 'none';
    }, 19500); // 500 milliseconds equals half a second
}
if(code === "knife") {
  document.getElementById('knife').style.display = 'block';
  setTimeout(function() {
      document.getElementById('knife').style.display = 'none';
  }, 19500); // 500 milliseconds equals half a second
}
if(code === "potion") {
  document.getElementById('potion').style.display = 'block';
  document.getElementById('potionAmount').style.display = 'block';
  setTimeout(function() {
      document.getElementById('potion').style.display = 'none';
      document.getElementById('potionAmount').style.display = 'none';
  }, 19500); // 500 milliseconds equals half a second
}
  if(code === "candlelight" || code === "light the candle" || code === "candle light" || code === "light candle") {
    candlelight = true;
    questStatus.quest4 = true;
    candles.traverse((object) => {
        if (object.isMesh) {
            object.material.opacity = 1;
        }
    });
  }


}


setTimeout(function() {
    document.getElementById('candle').style.display = 'none';
    document.getElementById('knife').style.display = 'none';
    document.getElementById('potion').style.display = 'none';
    document.getElementById('backpack').style.display = 'none';
}, 500); // 500 milliseconds equals half a second



function updateStats() {
  const textContainer90 = document.getElementById('textContainer');
  const text90 = textContainer90.textContent || textContainer90.innerText.toLowerCase(); // Convert text to lowercase for matching

  const healthCount = ['hp/increase/1'];
  const spiritCount = ['mp/increase/1'];
  const attackCount = ['atk/increase/1'];
  const resilienceCount = ['def/increase/1'];
  const airCount = ['air/increase/1'];
  const speedCount = ['spd/increase/1'];

  healthPoints = 100, spiritPoints = 10, attackDamage = 10, resilience = 1, airPoints = 1, speedPoints = .04;

  // Count each keyword2 for each emotion
  healthCount.forEach(keyword2 => {
      healthPoints += (text90.match(new RegExp('\\b' + keyword2 + '\\b', 'g')) || []).length;
  });
  spiritCount.forEach(keyword2 => {
      spiritPoints += (text90.match(new RegExp('\\b' + keyword2 + '\\b', 'g')) || []).length;
  });
  attackCount.forEach(keyword2 => {
      attackDamage += (text90.match(new RegExp('\\b' + keyword2 + '\\b', 'g')) || []).length;
  });
  resilienceCount.forEach(keyword2 => {
      resilience += (text90.match(new RegExp('\\b' + keyword2 + '\\b', 'g')) || []).length;
  });
  airCount.forEach(keyword2 => {
      airPoints += ((text90.match(new RegExp('\\b' + keyword2 + '\\b', 'g')) || []).length) / 4;
  });
  speedCount.forEach(keyword2 => {
      speedPoints += ((text90.match(new RegExp('\\b' + keyword2 + '\\b', 'g')) || []).length) / 25;
  });

  document.getElementById('mainhp').innerHTML = healthPoints;
  document.getElementById('mainmp').innerHTML = spiritPoints;
  document.getElementById('mainatk').innerHTML = attackDamage;
  document.getElementById('maindef').innerHTML = resilience;
  document.getElementById('mainair').innerHTML = airPoints;
  document.getElementById('mainspd').innerHTML = speedPoints;
  scrollToBottom();

  }
