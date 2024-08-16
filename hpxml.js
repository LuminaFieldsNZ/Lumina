
                          const descriptAll = [
                            "<h1>United Islands of Ventura</h1><br> -  Open to new ideas and pushing boundaries to discover innovative solutions. Having a wide distribution of wealth ranging from the very impoverished to the very wealthy, they are generally slow to change but verbally express a desire to do better by their citizens.",
                            "<h1>Commonwealth of Trantum</h1><br> - Values tradition and gradual change through experiencing different cultures. A nation geared around doing the best for themselves with active disregard to most of the rest of the world.",
                            "<h1>The Collective</h1><br> - a purely socialist AI with a singular directive - protect all humanity.",
                            "<h1>Free Markets of Mercado</h1><br> - Driven by profits and market forces, Mercado is a mobile island with an economist governing body. Having trade regions set up all over the globe, Mercatians believe that - Gold is King",
                            "<h1>Faxium </h1><br> - A nation who believes at their core that creative science can solve most problems. Faxium exports genetically modified, organic bioluminescent plants to most of the other nations.",
                            "<h1>Iron Coast</h1><br> - Grounded and resilient, respects nature's harsh realities the Iron Coast is a low resource region with a realist governing body. They are reliant on natural resources as they are the most isolated nation.",
                            "<h1>Eventus</h1><br> - A nation geared around spreading quality healthcare to the world. People from the rest of the world travel to Eventus to treat healthcare problems that cannot be solved in their own nations.",
                            "<h1>Abzimuth</h1><br> - A nation who would ignore the world if it meant the prosperity of their people. Abzimuth exports precious gems and metals, upholds law and protocol to maintain order and traditions. Stern yet fair, values duty over glory.",
                            "<h1>Occidentica</h1><br> - Represents the working class, used to fight for better conditions but self-serving when push comes to shove. A nation composed primarily of low income people, Occidentica exports readily available but generally low quality fish."
                          ];

                          const subcategories2 = {
                            "progressive ": ["Ventura "],
                            "conservative": ["Trantum"],
                            "socialist": ["Collective"],
                            "economist": ["Mercado"],
                            "idealist": ["Faxium "],
                            "realist": ["Iron Coast"],
                            "globalist": ["Eventus"],
                            "nationalist": ["Abzimuth"],
                            "populist": ["Occidentica"]
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
      "Ventura",
      "Trantum",
      "Collective",
      "Mercado",
      "Faxium",
      "Iron Coast",
      "Eventus",
      "Abzimuth",
      "Occidentica"
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

// Listen for a custom event called 'updateIframeSrc'
window.addEventListener('updateIframeSrc', function(event) {
  changeIframeSrc(event.detail.newSrc);
});

// Example of how to trigger the custom event (This would be done from another part of your application)
function pushIframeSrc(newSrc) {
  const event = new CustomEvent('updateIframeSrc', { detail: { newSrc: newSrc } });
  window.dispatchEvent(event);
}