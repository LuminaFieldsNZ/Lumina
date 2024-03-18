document.addEventListener('DOMContentLoaded', function() {
    var header = document.getElementById('myHeader');
	  var page = document.getElementById('page');
    var openMenuButton = document.getElementById('openmenu');

    window.addEventListener('scroll', function() {
				page.classList.remove('menuopen');
        if (window.scrollY >= 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Event listener to remove the sticky class when the button is clicked
    openMenuButton.addEventListener('click', function() {
        header.classList.remove('sticky');
				page.classList.add('menuopen');
    });
	
	var links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            // Prevent the default action
            event.preventDefault();

            // Get the target element
            var targetId = this.getAttribute('href');
            var targetElement = document.querySelector(targetId);

            // Smooth scroll to target
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});


const sentences = [
    "LuminaFields opens at 0930, so if you want fresh baked breakfast, your preorder needs to be scheduled beforehand.",
    "Daily reviews are discussed to catch up with everyone on Buds state. We spend time retraining our models with a new data set and playing around with Bud.",
    "Any issues from the previous days are also tackled here, with a focus on multiple error funnels.",
    "The rest of the time acts like a study hall, where questions can be answered but group Montessouri styled mentorship is cultivated."
  ];

  const knowledgeSentences = [
    "LuminaFields begins lunch preparation.",
    "Field trip expedition begins, signaling start of group activity."
  ];

  const spaceSentences = [
    "LuminaFields starts SwordFit training.",
    "Each fitness exercise is curated for each individual.",
    "Participants are encouraged to us Bud AI to track progress.",
    "Swords can be purchased as BrambleTwist.com online store."
  ];

  const futureSentences = [
    "LuminaFields Closes"
  ];
  
  const messageDiv = document.getElementById("message");
  
  function typeWriter(text, i) {
    if (i < text.length) {
      messageDiv.innerHTML += text.charAt(i);
      i++;
      setTimeout(() => typeWriter(text, i), 50);
    } else {
      if (sentences.length > 0) {
        messageDiv.innerHTML += "<br><br>";
        typeWriter(sentences.shift(), 0);
      }
    }
  }
  
  typeWriter(sentences.shift(), 0);
  

  
  // Function for Knowledge section
  function typeWriterKnowledge(text, i) {
    const messageDiv = document.getElementById("knowledge-message");
    if (i < text.length) {
      messageDiv.innerHTML += text.charAt(i);
      i++;
      setTimeout(() => typeWriterKnowledge(text, i), 50);
    } else {
      if (knowledgeSentences.length > 0) {
        messageDiv.innerHTML += "<br><br>";
        typeWriterKnowledge(knowledgeSentences.shift(), 0);
      }
    }
  }
  
  // Function for Space section
  function typeWriterSpace(text, i) {
    const messageDiv = document.getElementById("space-message");
    if (i < text.length) {
      messageDiv.innerHTML += text.charAt(i);
      i++;
      setTimeout(() => typeWriterSpace(text, i), 50);
    } else {
      if (spaceSentences.length > 0) {
        messageDiv.innerHTML += "<br><br>";
        typeWriterSpace(spaceSentences.shift(), 0);
      }
    }
  }
  
  // Function for Future section
  function typeWriterFuture(text, i) {
    const messageDiv = document.getElementById("future-message");
    if (i < text.length) {
      messageDiv.innerHTML += text.charAt(i);
      i++;
      setTimeout(() => typeWriterFuture(text, i), 50);
    } else {
      if (futureSentences.length > 0) {
        messageDiv.innerHTML += "<br><br>";
        typeWriterFuture(futureSentences.shift(), 0);
      }
    }
  }
  
  typeWriterKnowledge(knowledgeSentences.shift(), 0);
  typeWriterSpace(spaceSentences.shift(), 0);
  typeWriterFuture(futureSentences.shift(), 0);
  