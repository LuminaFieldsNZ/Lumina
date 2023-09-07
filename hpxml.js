
                          const descriptAll = [
                            "<h1>Pumice</h1><br> - The porous, lightweight nature of pumice represents the low cost but inefficient materials used in old appliances and electronics. Cheap to produce but outdated technologies.",
                            "<h1>Chalk</h1><br> - The soft, dusty chalk represents affordable materials that may not withstand wear and tear over time. Initial cost savings but prone to breakdowns.",
                            "<h1>Limestone</h1><br> - As a common sedimentary rock, limestone represents the moderate energy efficiency of mass-produced consumer goods for the average consumer.",
                            "<h1>Sandstone</h1><br> - Abundant like sand, sandstone materials are accessible and routinely used but not optimized for energy efficiency.",
                            "<h1>Shale</h1><br> - The laminated structure of shale represents the incremental improvements made to existing technologies that yield moderate efficiency gains.",
                            "<h1>Slate</h1><br> - Slate's use in roofing ties to insulation needs for housing. Slate materials provide improvements but at increased costs.",
                            "<h1>Granite</h1><br> - As an igneous rock, granite represents technological advancements that require intensive processes but yield meaningful efficiency gains.",
                            "<h1>Marble</h1><br> - The metamorphic quality of marble symbolizes the transformative innovations that produce materials and products optimized for sustainability.",
                            "<h1>Quartz</h1><br> - The high hardness and piezoelectricity of quartz parallels the significant energy required for next-generation technologies and materials.",
                          ];

                          const descriptAll2 = [
                            "<h1>Balsa</h1><br> - The ultra-lightweight balsa represents highly optimized renewable materials that maximize efficiency with minimal environmental impact.",
                            "<h1>Basswood</h1><br> - As a fast-growing softwood, basswood represents sustainable materials that balance efficiency, cost, and responsible sourcing.",
                            "<h1>Aspen</h1><br> - Aspen grows rapidly in groves, similar to how scalable technologies can be propagated widely to increase efficiency.",
                            "<h1>Pine</h1><br> - As a widespread softwood, pine represents the incremental efficiency gains from broadly adopted improvements to traditional materials.",
                            "<h1>Oak</h1><br> - With its hard, durable characteristics, oak symbolizes conventional materials enhanced through treatment and processing for better efficiency.",
                            "<h1>Ash</h1><br> - The straight grain and high strength of ash parallels materials engineered specifically for performance improvements.",
                            "<h1>Maple</h1><br> - Maple's hardness indicates more intensive processing and engineering required to create more efficient but still mainstream materials.",
                            "<h1>Mahogany</h1><br> - As a luxury wood, mahogany represents exotic materials with marginal efficiency gains but used primarily for aesthetic appeal.",
                            "<h1>Teak</h1><br> - The weather resistance of teak points to niche materials focused on durability rather than broad sustainability or efficiency.",
                          ];


                          const subcategories = {
                            "balsa": ["Balsa"],
                            "basswood": ["Basswood"],
                            "aspen": ["Aspen"],
                            "pine": ["Pine"],
                            "oak": ["Oak"],
                            "ash": ["Ash"],
                            "maple": ["Maple"],
                            "mahogany": ["Mahogany"],
                            "teak": ["Teak"],
                          };

                          const subcategories2 = {
                            "pumice": ["Pumice"],
                            "chalk": ["Chalk"],
                            "limestone": ["Limestone"],
                            "sandstone": ["Sandstone"],
                            "shale": ["Shale"],
                            "slate": ["Slate"],
                            "granite": ["Granite"],
                            "marble": ["Marble"],
                            "quartz": ["Quartz"],
                          };



                          let result = '';
                          let auditNum = 0;
                          var xaxis = 50;
                          var yaxis = 50;
                          var newRotation = 0;
                          let clicksRed = -3;
                          let clicksBlack = -3;
                          let clicksBlue = 5;
                          let clicksGold = 5;
                          let nextPho = 0;
                          let subcat = '';
                          let subcat2 = '';


                          function addAudit()
                          {
                            auditNum += 1;
                          }

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

                          window.onload = function() {
                            document.getElementById("descriptAll").innerHTML = descriptAll[0];
                            document.getElementById("descriptAll2").innerHTML = descriptAll2[0];
                            clicksRed -= 1;
                            clicksBlack -= 1;
                            clicksBlue -= 1;
                            clicksGold -= 1;
                            document.getElementById("clicksRed").innerHTML = clicksRed;
                            document.getElementById("clicksBlack").innerHTML = clicksBlack;
                            document.getElementById("clicksBlue").innerHTML = clicksBlue;
                            document.getElementById("clicksGold").innerHTML = clicksGold;
                                    };


                          function changeRed() {
                              clicksRed -= 1;
                              document.getElementById("clicksRed").innerHTML = clicksRed;
                              xaxis += 4;
                              redCircle.setAttribute('cx', xaxis);
                               newRotation += 10;
                               needleMove.setAttribute('transform', `rotate(${newRotation})`);
                          }
                          function changeBlue() {
                              clicksBlue += 1;
                              document.getElementById("clicksBlue").innerHTML = clicksBlue;
                              xaxis -= 4;
                              blueCircle.setAttribute('cx', xaxis);
                              newRotation -= 10;
                              needleMove.setAttribute('transform', `rotate(${newRotation})`);
                          }
                          function changeBlack() {
                              clicksBlack -= 1;
                              document.getElementById("clicksBlack").innerHTML = clicksBlack;
                              yaxis += 4;
                              blackCircle.setAttribute('cy', yaxis);
                              newRotation += 10;
                              needleMove.setAttribute('transform', `rotate(${newRotation})`);
                          }
                          function changeGold() {
                              clicksGold += 1;
                              document.getElementById("clicksGold").innerHTML = clicksGold;
                              yaxis -= 4;
                              goldCircle.setAttribute('cy', yaxis);
                              newRotation -= 10;
                              needleMove.setAttribute('transform', `rotate(${newRotation})`);
                          }

                          function pushScore(){
                            countActive();
                            xaxis = Math.max(0, Math.min(xaxis, 100));
                            redCircle.setAttribute('cx', xaxis);
                            blueCircle.setAttribute('cx', xaxis);
                            yaxis = Math.max(0, Math.min(yaxis, 100));
                            blackCircle.setAttribute('cx', yaxis);
                            goldCircle.setAttribute('cx', yaxis);

                            document.getElementById('insurance').scrollIntoView({behavior: 'smooth'});
                            const emailBody = encodeURIComponent(result);
                            window.location.href = `mailto:woodmortar@gmail.com?subject=EnergyAudit&body=` + emailBody + 'Rating:' + subcat + subcat2;
                          }






                function testData() {

                  countActive();
                  let woodMath2 = Math.round(clicksBlack + clicksGold);
                  let stoneMath2 = Math.round(clicksRed + clicksBlue);

                  woodMath2 = Math.max(0, Math.min(woodMath2, 8));
                  stoneMath2 = Math.max(0, Math.min(stoneMath2, 8));

                  // Get current circle coords
                  var cxRed = redCircle.getAttribute('cx');
                  var cyRed = redCircle.getAttribute('cy');

                  var cxBlue = blueCircle.getAttribute('cx');
                  var cyBlue = blueCircle.getAttribute('cy');

                  var cxBlack = blackCircle.getAttribute('cx');
                  var cyBlack = blackCircle.getAttribute('cy');

                  var cxGold = goldCircle.getAttribute('cx');
                  var cyGold = goldCircle.getAttribute('cy');


                  let finalMessage = cxRed + cyRed + ' : ' + cxBlue + cyBlue + ' : ' + cxBlack + cyBlack + ' : ' + cxGold + cyGold;

                  if (woodMath2 <= 0) {subcat = subcategories.balsa;}
                  else if (woodMath2 == 1) {subcat = subcategories.basswood;}
                  else if (woodMath2 == 2) {subcat = subcategories.aspen;}
                  else if (woodMath2 == 3) {subcat = subcategories.pine;}
                  else if (woodMath2 == 4) {subcat = subcategories.oak;}
                  else if (woodMath2 == 5) {subcat = subcategories.ash;}
                  else if (woodMath2 == 6) {subcat = subcategories.maple;}
                  else if (woodMath2 == 7) {subcat = subcategories.mahogany;}
                  else if (woodMath2 > 7) {subcat = subcategories.teak;}

                  if (stoneMath2 <= 0) {subcat2 = subcategories2.pumice;}
                  else if (stoneMath2 == 1) {subcat2 = subcategories2.chalk;}
                  else if (stoneMath2 == 2) {subcat2 = subcategories2.limestone;}
                  else if (stoneMath2 == 3) {subcat2 = subcategories2.sandstone;}
                  else if (stoneMath2 == 4) {subcat2 = subcategories2.shale;}
                  else if (stoneMath2 == 5) {subcat2 = subcategories2.slate;}
                  else if (stoneMath2 == 6) {subcat2 = subcategories2.granite;}
                  else if (stoneMath2 == 7) {subcat2 = subcategories2.marble;}
                  else if (stoneMath2 > 7) {stoneMath2 == 8; subcat2 = subcategories2.quartz;}

                  document.getElementById("titleChange").innerHTML = subcat;
                  document.getElementById("titleChange2").innerHTML = subcat2;
                  document.getElementById("descriptAll").innerHTML = descriptAll[stoneMath2];
                  document.getElementById("descriptAll2").innerHTML = descriptAll2[woodMath2];

                }
