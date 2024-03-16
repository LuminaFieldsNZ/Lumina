     
                function checkPasscode() {
                    const code = document.getElementById("userInput").value;
                    if (code === "Micheal" || code === "micheal") {
                        runMicheal();
                      }
                    if (code === "Zach" || code === "zach") {
                      runZach();
                    }
                    if (code === "[tools]") {
                      document.getElementById("toolMenu").style.display = "block";
                    }
                    if (code === "[demo]") {
                      window.open('ar/index.html');
                    }
                  }


                  function runAbout() {
                    window.open('data/whitepaper.pdf', '_blank');
                }
                