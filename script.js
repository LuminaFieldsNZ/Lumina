     
                function checkPasscode() {
                    const code = document.getElementById("userInput").value;
                    if (code === "Micheal" || code === "micheal") {
                        runMicheal();
                      }
                    if (code === "Zach" || code === "zach") {
                      runZach();
                    }
                    if (code === "Crycella" || code === "crycella") {
                        runCrycella();
                      }
                  }