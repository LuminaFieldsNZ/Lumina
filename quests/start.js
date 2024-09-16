let conditions = [
  { keyword: 'finish all password', action: () => { document.getElementById('module4xx').style.display = 'block'; } },
  { keyword: 'start', action: () => { } }
];
  
function showDynamicBoss1() {
  const element = document.getElementById('dynamicBoss1');
  if (element) {
    element.style.display = 'block';
  } else {
    console.error('Element with ID "dynamicBoss1" not found.');
  }
}

function hideDynamicBoss1() {
  const element = document.getElementById('dynamicBoss1');
  if (element) {
    element.style.display = 'none';
  } else {
    console.error('Element with ID "dynamicBoss1" not found.');
  }
}


function oneQuest(){
  if(moduleCount > 4){
    return
  } else {
    if(moduleCount > 1){
      messBot();
      displayQuestion();
      document.querySelector('.image-container2').style.opacity = 1;
      showDynamicBoss1();
      document.getElementById('module4xx').style.display = 'block';
      shake2('questBoss');
    } else {
  // Assuming module3 is a container with a button inside
  document.getElementById('module3').querySelector('button').textContent = 'Finish Previous Tasks';
  setTimeout(() => {
    document.getElementById('module3').querySelector('button').textContent = 'Begin Quest';
  }, 5000);
    }
  }
}



let choice1, choice2, choice3;


function run1() {
  document.getElementById('userInput').value = choice1;
  sendMessage();
  displayQuestion();
  shake('questPlayer');
  shake2('questBoss');
  removeCheckboxById('boss');
}

function run2() {
  document.getElementById('userInput').value = choice2;
  sendMessage();
  displayQuestion();
  shake('questPlayer');
  shake2('questBoss');
}

function run3() {
  document.getElementById('userInput').value = choice3;
  sendMessage();
  displayQuestion();
  shake('questPlayer');
  shake2('questBoss');
}

// Define the linear storylineFaxium
const storylineFaxium = [
  {
    question: "Back and forth, your body rocks in a rhythm that reveals a deeper reality beyond the initial impression of silence and darkness. Each sway is marked by a calming yet persistent beep, drawing you from the perceived blackness to the dim light behind your closed eyelids. As you become aware of your dry throat and aching body, you realize the beeping is your heartbeat on an EKG machine. Soft rustling and footsteps around the room hint at someone nearby, with the faint sounds of papers and a drawer sliding open and closed. The realization dawns: you must be in a hospital. Confusion floods your mind—where are you, how did you get here, and what happened before this?",
    additionalInfo: "Despite the foggy fragments of memory, you know you can't remain in this hospital bed forever. The urgent need for action overcomes you.",
    but1: "You drag your eyes open to investigate the room and the person you can hear. Its better to get a bit of help from those around you. Enthusiast",
    but2: "You pretend to stay asleep. You can gather more information once this person leaves and you can take a look around unobserved. Its better to stay to yourself and figure out what to do. Individualist",
    but3: "You fling your eyes open and prepare yourself to start demanding some answers. Challenger"
  },
  {
    question: "Youre not dead, which is good, but youve been unconscious for two days. The people who found you reported it that same day, so you might have been out for two to four days. You had a severe concussion and were dangerously dehydrated, but luckily, nothing permanent. The doctor pauses, asking what you were doing alone on a skimmer a thousand miles from anywhere without adequate supplies. You remember staring at the endless blue sky from your skimmer, its battery dead, rocking with the calm sea beneath it. You knew you wouldnt survive with the little water you had left, so you decided to conserve it and sleep as long as possible.",
    additionalInfo: "You’re not dead, which is good, but you’ve been unconscious for two days. The people who found you reported it that same day, so you might have been out for two to four days. You had a severe concussion and were dangerously dehydrated, but luckily, nothing permanent. The doctor pauses, asking what you were doing alone on a skimmer a thousand miles from anywhere without adequate supplies. You remember staring at the endless blue sky from your skimmer, its battery dead, rocking with the calm sea beneath it. You knew you wouldn’t survive with the little water you had left, so you decided to conserve it and sleep as long as possible.",
    but1: "I should tell him what I remember. Maybe if I walk him through what I’ve remembered so far, it will trigger more memories. Reformer",
    but2: "I don’t know if I can trust this stranger yet. I might tell him later but for now, I’m going to say nothing and just see what I can learn. Loyalist",
    but3: "I doubt this guy can help me. I keep to myself until I can find who is really in charge and talk only to them. Achiever"
  },
  {
    question: "It was eerily quiet, contrary to the expected chaos of screams, explosions, or alarms. Only the ringing in your ears accompanied you as you crawled down the hallway, struggling against the smoke. The door beneath the exit sign, fitted with a heavy compression bar, was difficult to open from your crouched position. After a deep breath of less smoky air, you forced the door open enough to squeeze through. The stairwell you entered was concrete and steel, but it offered clean, fresh air. You descended, feeling the cool railing, and noticed a wailing siren in the distance, possibly indicating a malfunction or your temporary deafness. Reaching the ground floor, exhaustion set in, but you discovered a fire escape map that showed a nearby exit",
    additionalInfo: "Just then, the building shook with a thunderous boom, prompting you to push through the door. Outside, emergency lights flickered, revealing a calm administrative section with no windows. Faced with the eerie emptiness and a lack of windows, you hesitated at the exit door, debating whether it was safer to stay inside or seek shelter where the staff and patients might have evacuated.",
    but1: "Turn around and look for hospital staff or more patients to group up with. Helper",
    but2: "Listen at the door to see if you can get a grasp on what is happening outside. Investigator",
    but3: "Decide to stay in the calm part of the hospital where it is safe. Peacemaker"
  },
  {
    question: "A figure with streaks of blood trailing from a deep gash across his brow stumbled toward you. His steps were heavy, the weight of urgency in his every move. Beside him, a woman sat on the ground, one hand pressed to her head as she wiped blood from her fingertips onto her worn coveralls. The air around you was thick with dust and smoke, the remnants of a recent explosion still hanging in the stale atmosphere.",
    additionalInfo: "The man pulled at the woman’s arm, trying to lift her from the ground, but she resisted, her eyes scanning the scattered bodies and debris. The crumbling remains of what once was a structure loomed behind you, casting long shadows over the few survivors beginning to stir. Her gaze hardened, her resolve momentarily faltering as she took in the desolation. Then, with sudden clarity, her eyes met yours. The decision was made. A silent command echoed in her stance.",
    but1: "Follow them to safety, leaving the chaos behind. Individualist",
    but2: "Stay and attempt to help the injured around you. Helper",
    but3: "Demand answers before taking another step. Loyalist"
  }

];



// Function to display the current question
function displayQuestion() {


    

// Main function to handle game logic
function handleBattleStep(currentStep, totalPopulation) {
  if (currentStep !== 0) {
      checkPopulationAndHandleModule(); // Checks population and handles module display
  }
}



// Function to check population and display the module
function checkPopulationAndHandleModule() {
  let totPop = Number(document.getElementById('mainHeadingAverage').innerHTML);
  if (totPop > 700) {
      displayModule('module5xx');
      hideDynamicBoss1();
      alert('Completed Module');
  }
}

// Function to display a specific module by ID
function displayModule(moduleId) {
  const moduleElement = document.getElementById(moduleId);
  if (moduleElement) {
      moduleElement.style.display = 'block';
  }
}


      
  
  
    currentStep++;

  
    // Get the chat window element
    const chatWindow = document.getElementById('chatWindow');
    
    // Clear the previous content
    chatWindow.innerHTML = '';
    handleBattleStep(currentStep, totalPopulation);

    // Check if we are within the bounds of the storylineFaxium
    if (currentStep < storylineFaxium.length) {
      // Get the current question and additional info
      const step = storylineFaxium[currentStep];
    
      const chatWindow4 = document.getElementById('chatWindow');
      let typingContainer3 = createTypingContainer();

      choice1 = step.but1;
      choice2 = step.but2;
      choice3 = step.but3;
    
      // Append response to the text content within the container
      typingContainer3.querySelector('#text-content').innerHTML = `${progressBar}<p>${step.question}</p><p>${step.additionalInfo}</p>
      <button class="open-modal" onclick="run1();">${choice1}</button><button class="open-modal" onclick="run2();">${choice2}</button><button class="open-modal" onclick="run3();">${choice3}</button>`;
    



      // Append the container to the chat window
      chatWindow4.appendChild(typingContainer3);

      progressBarPosition += 20;
      document.getElementById('displayPercentage').innerHTML = progressBarPosition + "%";
      const progressBarElement = document.getElementById('progressBarWidth');
      console.log('Progress Bar Element:', progressBarElement); // Debugging line
      if (progressBarElement) {
        progressBarElement.style.width = progressBarPosition + "%";
      } else {
        console.error('Element with ID "progressBarWidth" not found.');
      }
          
      scrollToBottom();
  
    } else {
      // End of the storylineFaxium
      
      chatWindow.innerHTML += '<p>Quest completed experience logged.</p>';
      document.getElementById('module3').querySelector('button').remove();
      addCompletedModule(3);
      addCompletedModule(4); 
      addCompletedModule(5); 
      
    }
  }
  
  



  
let progressBarPosition = 0;
const progressBar = `
<div class="box-progress-wrapper">
           <p class="box-progress-header">Quest Progress:</p>
  <span id="progressBarWidth" class="box-progress2" style="width: 50%; background-color: black"></span>
           <p id="displayPercentage" class="box-progress-percentage">0%</p>
</div>`;



function animateProgressBar(targetWidth) {
    const progressBar = document.getElementById('progressBarWidth');
    let currentWidth = parseFloat(progressBar.style.width);
    const interval = 10; // Time interval for animation in milliseconds
    const step = 1; // Width increment for each interval
    
    function updateProgress() {
      if (currentWidth < targetWidth) {
        currentWidth += step;
        if (currentWidth > targetWidth) currentWidth = targetWidth; // Ensure it doesn't exceed target
        progressBar.style.width = currentWidth + '%';
        setTimeout(updateProgress, interval);
      }
    }
  
    updateProgress();
  }
  