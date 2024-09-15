

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
  

// Function to display the current question
function displayQuestion() {

    if (document.getElementById('module991xx') && document.getElementById('module991xx').style.display === 'block') {
      return;
    }
    
  
    currentStep++;

  
    // Get the chat window element
    const chatWindow = document.getElementById('chatWindow');
    
    // Clear the previous content
    chatWindow.innerHTML = '';
  
    // Check if we are within the bounds of the storyline
    if (currentStep < storyline.length) {
      // Get the current question and additional info
      const step = storyline[currentStep];
    
      const chatWindow4 = document.getElementById('chatWindow');
      let typingContainer3 = createTypingContainer();
    
      // Append response to the text content within the container
      typingContainer3.querySelector('#text-content').innerHTML = `${progressBar}<p>${step.question}</p><p>${step.additionalInfo}</p>`;
    
      // Append the container to the chat window
      chatWindow4.appendChild(typingContainer3);

      progressBarPosition += 10;
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
      // End of the storyline
      
      chatWindow.innerHTML += '<p>Quest completed experience logged.</p>';
      addCompletedModule(991); 
      
    }
  }
  
  