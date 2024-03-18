     
                function checkPasscode() {
                    const code = document.getElementById("userInput").value;
                
                    if (code === "[tools]") {
                      document.getElementById("toolMenu").style.display = "block";
                    }
                    if (code === "[demo]") {
                      window.open('https://mfglife.github.io/demo/index.html', '_blank');
                    }
                    if (code === "[about]") {
                      runAbout();
                    }
                  }


                  function runAbout() {
                    window.open('data/whitepaper.pdf', '_blank');
                }

                function runDemo() {
                  window.open('https://mfglife.github.io/demo/index.html', '_blank');
              }
                