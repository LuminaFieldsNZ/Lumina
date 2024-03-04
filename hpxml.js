
                          const descriptAll = [
                            "<h1>Ash Gramb</h1><br> - Ingredient Botanist.",
                            "<h1>Jordan Finch</h1><br> - Mechanical Maestro.",
                            "<h1>Micheal Salmon</h1><br> - Lead Programmer.",
                            "<h1>Alex Huff</h1><br> - Sensory Specialist",
                            "<h1>Avery Warner</h1><br> - Water Purification Expert",
                            "<h1>Skylar Banks</h1><br> - Distillation Historian",
                            "<h1>Dakota Calligaris</h1><br> - Sanitation Supervisor",
                            "<h1>Taylor Banks</h1><br> - Quality Assurance Chemist",
                            "<h1>Remy Hawthorne</h1><br> - Master Blender"
                          ];

                          const subcategories2 = {
                            "progressive ": ["Ash Gramb"],
                            "conservative": ["Jordan Finch"],
                            "socialist": ["Micheal Salmon"],
                            "economist": ["Alex Huff"],
                            "idealist": ["Avery Warner"],
                            "realist": ["Skylar Banks"],
                            "globalist": ["Dakota Calligaris"],
                            "nationalist": ["Taylor Banks"],
                            "populist": ["Remy Hawthorne"]
                          };

                          const descriptAll2 = [
                            "<h1>Explorer</h1><br> - An Explorer is driven by an insatiable curiosity to uncover the unknown. They thrive in uncharted territories, seeking hidden truths and unexplored frontiers. This subtrait embodies the spirit of adventure and the thrill of discovery.",
                            "<h1>Voyager</h1><br> -  The Voyager possesses an unyielding desire for exploration and a sense of wanderlust that knows no bounds. They journey far and wide, embracing diverse cultures and embracing the richness of experiences that come with each new horizon.",
                            "<h1>Captain</h1><br> -  A Captain is a natural leader who commands respect and authority. They are skilled at navigating the complexities of situations and guiding their crew towards success. This subtrait embodies strong leadership, strategic thinking, and a sense of responsibility.",
                            "<h1>Merchant</h1><br> - The Merchant is astute in the art of trade and commerce. They possess a shrewd business mind and excel in negotiations, always seeking opportunities to maximize profits while balancing ethical considerations.",
                            "<h1>Shipwright</h1><br> - A Shipwright is a master craftsman, skilled in designing and constructing the vessels that facilitate the journey. They pay meticulous attention to detail, creating vessels that are both functional and beautifully crafted.",
                            "<h1>Fisherman</h1><br> -  The Fisherman embraces patience and persistence in their pursuit of life's rewards. They understand the ebb and flow of resources, working diligently to provide sustenance and prosperity to themselves and their community.",
                            "<h1>Smuggler</h1><br> -  A Smuggler operates on the fringes of legality, using cunning and resourcefulness to navigate challenging situations. They possess a knack for finding unconventional solutions to problems and thrive in the shadows.",
                            "<h1>Arbiter</h1><br> - The Arbiter is a mediator and diplomat, adept at resolving conflicts and maintaining harmony. They possess a keen sense of justice and fairness, striving to bring equilibrium to even the most contentious situations.",
                            "<h1>Sailor</h1><br> - The Sailor is the backbone of the crew, steadfast and reliable even in the face of adversity. They embody resilience, adaptability, and a deep understanding of the rhythms of life on the journey."
                          ];


                          const subcategories = {
                            "explorer": ["Explorer"],
                            "voyager": ["Voyager"],
                            "captain": ["Captain"],
                            "merchant": ["Merchant"],
                            "shipwright": ["Shipwright"],
                            "fisherman": ["Fisherman"],
                            "smuggler": ["Smuggler"],
                            "arbiter": ["Arbiter"],
                            "sailor": ["Sailor"]
                          };




                          let result = '';
                          var xaxis = 50;
                          var yaxis = 50;
                          var newRotation = 0;
                          let nextPho = 0;



                          function nextPhoto(){
                            if (nextPho != 9) {
                              nextPho += 1;
                            }

                            if (nextPho == 9) {
                              nextPho = 0;
                            }
                            document.getElementById("descriptAll").innerHTML = descriptAll[nextPho];
                            document.getElementById("descriptAll2").innerHTML = descriptAll2[nextPho];
                          }



                          function testData() {
    // Get all the span elements
    const spans = [
      document.getElementById("progressive"),
      document.getElementById("conservative"),
      document.getElementById("socialist"),
      document.getElementById("economist"),
      document.getElementById("idealist"),
      document.getElementById("realist"),
      document.getElementById("globalist"),
      document.getElementById("nationalist"),
      document.getElementById("populist")
    ];

    const spans2 = [
      "Ash Gramb",
      "Jordan Finch",
      "Micheal Salmon",
      "Alex Huff",
      "Avery Warner",
      "Skylar Banks",
      "Dakota Calligaris",
      "Taylor Banks",
      "Remy Hawthorne"
    ];

    // Initialize variables to store the largest number and its corresponding element ID
    var largestNumber = -Infinity;
    var largestElementId = "";
    var pHeading = "";
    // Loop through each span element and extract the number from its content
    for (var i = 0; i < spans.length; i++) {

      var spanContent = spans[i].textContent; // Get the content of the span
      var number = parseInt(spanContent); // Convert the content to an integer

      if (!isNaN(number) && number > largestNumber) {
        largestNumber = number; // Update the largest number and its corresponding element ID
        largestElementId = spans[i].id;
        pHeading = spans2[i];
      }
    }

    // alert("The largest number is: " + largestNumber + "\nSpan ID: " + largestElementId);
    document.getElementById("titleChange").innerHTML = largestElementId;
    document.getElementById("titleChange").style.display = 'none';
    document.getElementById("titleChange2").innerHTML = pHeading;
  }
