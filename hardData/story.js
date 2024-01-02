
let processedMessages = [];
const storyContainer = document.getElementById('storyContainer');
const textarea = document.getElementById('textarea');
const button = document.getElementById('sendbutton');



  const generalKeywordsArray = [
      { "word": "curious", "weight": 2, "response": "Your curiosity often leads to new discoveries. Embrace it as a path to understanding." },
      { "word": "curiosity", "weight": 2, "response": "Your curiosity often leads to new discoveries. Embrace it as a path to understanding." },
      { "word": "conflicted", "weight": 2, "response": "It's natural to feel conflicted when faced with tough choices. Reflecting on your values can guide your decision." },
      { "word": "surprised", "weight": 2, "response": "Life is full of surprises. They challenge our expectations and help us grow." },
      { "word": "guilty", "weight": 2, "response": "Guilt can be a sign of empathy and moral reflection. Consider what actions align with your core beliefs." },
      { "word": "learn", "weight": 2, "response": "Every experience is a learning opportunity. Embrace them to enrich your journey." },
      { "word": "torn", "weight": 2, "response": "Being torn between choices is challenging. Trust your instincts and values to guide you." },
      { "word": "regretful", "weight": 2, "response": "Regret can be a tough emotion. It's an opportunity to learn and make amends where possible." },
      { "word": "happy", "weight": 5, "response": "Finding joy in the journey is a gift. Cherish these moments." },
      { "word": "frustrated", "weight": 5, "response": "Frustration can be a sign of passion and care. Channel it towards positive change." },
      { "word": "determined", "weight": 5, "response": "Your determination can move mountains. Stay focused on your goals." },
      { "word": "relieved", "weight": 5, "response": "Relief is a sign of resolution. It's a moment to breathe and appreciate the journey." },
      { "word": "anxious", "weight": 5, "response": "Anxiety can be challenging. Remember to seek support and practice self-care." },
      { "word": "hopeful", "weight": 2, "response": "Hope is a beacon in challenging times. Hold onto it and let it guide your path." },
      { "word": "overwhelmed", "weight": 2, "response": "Feeling overwhelmed is natural. Take a step back, prioritize, and tackle one thing at a time." },
      { "word": "apprehensive", "weight": 2, "response": "It's okay to feel apprehensive. Trust in your abilities and gather more information if needed." },
      { "word": "grateful", "weight": 2, "response": "Gratitude enriches our lives. It's a reminder of the good things and people around us." },
      { "word": "indifferent", "weight": 5, "response": "Indifference can be a protective mechanism. Reflect on its root to better understand your feelings." },
      { "word": "optimistic", "weight": 5, "response": "Optimism can light up the darkest situations. It's a testament to your positive spirit." },
      { "word": "pessimistic", "weight": 5, "response": "Pessimism can be a sign of caution. Balance it with hope and a proactive approach." },
      { "word": "elated", "weight": 5, "response": "Your elation suggests a deep connection with the story's positive elements. Embrace this joy and let it guide your journey." },
      { "word": "ecstatic", "weight": 5, "response": "Your ecstatic reaction hints at a profound resonance with the tale's uplifting moments. Cherish these feelings." },
      { "word": "inspired", "weight": 4, "response": "Feeling inspired suggests the story has sparked new ideas or emotions in you. Harness this energy for your personal growth." },
      { "word": "pensive", "weight": 3, "response": "A pensive mood suggests you're deeply reflecting on the story's events. Take your time to process and understand." },
      { "word": "neutral", "weight": 3, "response": "A neutral stance can be a sign of detachment or contemplation. Observe the story's nuances to find deeper meaning." },
      { "word": "ambivalent", "weight": 3, "response": "Ambivalence might indicate conflicting feelings about the story. Explore these emotions to gain clarity." },
      { "word": "reflective", "weight": 3, "response": "Being reflective suggests you're connecting past events with the story's present. Use this insight to enhance your understanding." },
      { "word": "devastated", "weight": 5, "response": "Feeling devastated indicates a deep emotional impact from the story's events. Seek solace in the narrative's hopeful moments." },
      { "word": "despondent", "weight": 5, "response": "Your despondence might stem from the story's tragic elements. Remember, every tale has its highs and lows." },
      { "word": "enraged", "weight": 5, "response": "Your rage suggests a strong disagreement with certain events. Use this passion to engage more deeply with the narrative." },
      { "word": "mournful", "weight": 4, "response": "A mournful sentiment indicates a sense of loss from the story. Embrace the healing power of time and narrative progression." },
      { "word": "content", "weight": 2, "response": "Feeling content suggests a comfortable alignment with the story's flow. Enjoy this sense of harmony." },
      { "word": "bored", "weight": 2, "response": "Boredom might indicate a need for more engagement. Dive deeper into the narrative's layers to reignite interest." },
      { "word": "tired", "weight": 2, "response": "Feeling tired can be a sign of emotional exhaustion from the story. Take a moment to rest and rejuvenate." },
      { "word": "relaxed", "weight": 2, "response": "A relaxed demeanor suggests you're at ease with the story's pace. Enjoy this tranquil journey." },
      { "word": "busy", "weight": 2, "response": "Feeling busy might indicate a whirlwind of emotions from the narrative. Take a step back to prioritize and process." },
      { "word": "vulnerable", "weight": 4, "response": "Your vulnerability indicates a deep emotional connection with the story. Cherish this raw honesty." },
      { "word": "motivated", "weight": 5, "response": "Your motivation can drive you to achieve great things. Keep this fire burning." },
      { "word": "enthusiastic", "weight": 5, "response": "Your enthusiasm is contagious. It can inspire others around you." },
      { "word": "skeptical", "weight": 5, "response": "Skepticism can be a tool for critical thinking. Always seek the truth." },
      { "word": "nostalgic", "weight": 5, "response": "Nostalgia is a window to our past. Cherish those memories, but also embrace the present." },
      { "word": "indignant", "weight": 5, "response": "Indignation can be a sign of strong values. Stand up for what you believe in." },
      { "word": "empathetic", "weight": 4, "response": "Your empathy shows a deep understanding and care for others. It's a beautiful trait to have." },
      { "word": "apathetic", "weight": 4, "response": "Apathy can be a sign of burnout or disconnection. It might be helpful to seek what truly resonates with you." },
      { "word": "courageous", "weight": 4, "response": "Courage isn't the absence of fear, but the ability to face it. Your bravery is commendable." },
      { "word": "hesitant", "weight": 4, "response": "Hesitation can be a sign of careful consideration. Trust your instincts and take informed actions." },
      { "word": "rejuvenated", "weight": 3, "response": "Feeling rejuvenated is a fresh start. Use this energy to pursue your passions." },
      { "word": "stoic", "weight": 3, "response": "Stoicism is about finding peace regardless of external circumstances. Your calm demeanor is admirable." },
      { "word": "bewildered", "weight": 2, "response": "Feeling bewildered can be disorienting. Take a moment to ground yourself and seek clarity." },
      { "word": "serene", "weight": 2, "response": "Serenity is a state of inner peace. It's a testament to your balanced approach to life." },
      { "word": "ardent", "weight": 2, "response": "Your ardor shows deep passion and commitment. Stay true to what you believe in." },
      { "word": "isolated", "weight": 3, "response": "Feeling isolated can be tough. Remember, reaching out and connecting with others can help." },
      { "word": "ecstatic", "weight": 3, "response": "Your ecstasy is palpable! Embrace these moments of sheer happiness." },
      { "word": "disheartened", "weight": 3, "response": "It's okay to feel disheartened. Remember, every setback is a setup for a comeback." },
      { "word": "invigorated", "weight": 3, "response": "Your invigorated spirit can move mountains! Keep up this momentum." },
      { "word": "despondent", "weight": 3, "response": "It's natural to feel despondent at times. Remember, it's okay to seek help when you need it." },
      { "word": "anguished", "weight": 3, "response": "Your anguish is valid. Remember, healing is a journey, and it's okay to seek support." },
      { "word": "liberated", "weight": 3, "response": "Your sense of liberation is empowering. Embrace this newfound freedom." },
      { "word": "tormented", "weight": 3, "response": "Feeling tormented can be deeply challenging. Remember, you're not alone in this." },
      { "word": "energized", "weight": 3, "response": "Your energized spirit is infectious! Use this vitality to inspire others." },
      { "word": "stimulated", "weight": 3, "response": "Being stimulated is a sign of engagement and curiosity. Dive deeper into what intrigues you." },
      { "word": "exhilarated", "weight": 3, "response": "Your exhilaration is a testament to the joys of life. Cherish these moments." },
      { "word": "woeful", "weight": 3, "response": "Feeling woeful can be heavy. Remember, it's okay to lean on others for support." },
      { "word": "enthralled", "weight": 7, "response": "Your captivation speaks volumes. Dive deeper into what fascinates you." },
      { "word": "besieged", "weight": 7, "response": "Feeling besieged can be overwhelming. Remember, seeking support can provide solace." },
      { "word": "forlorn", "weight": 7, "response": "It's natural to feel forlorn at times. Remember, healing takes time and it's okay to seek comfort." },
      { "word": "rhapsodic", "weight": 7, "response": "Your rhapsodic spirit is truly inspiring. Embrace these moments of profound joy." },
      { "word": "oppressed", "weight": 7, "response": "Feeling oppressed can be deeply challenging. Remember, your voice and feelings are valid." },
      { "word": "zealous", "weight": 7, "response": "Your zealous passion is evident. Channel this energy towards your aspirations." },
      { "word": "dismayed", "weight": 7, "response": "It's okay to feel dismayed. Remember, challenges often lead to growth." },
      { "word": "sanguine", "weight": 7, "response": "Your sanguine outlook is refreshing. Continue to see the brighter side of things." },
      { "word": "afflicted", "weight": 7, "response": "Feeling afflicted can weigh heavy. Remember, it's okay to seek help and lean on others." },
      { "word": "vivacious", "weight": 7, "response": "Your vivacious spirit lights up any room. Continue to embrace life with such zest." },
      { "word": "melancholic", "weight": 7, "response": "Melancholy can be a profound emotion. It's okay to reflect and seek solace." },
      { "word": "ebullient", "weight": 7, "response": "Your ebullient nature is a testament to your zest for life. Keep shining brightly." },
      { "word": "lugubrious", "weight": 7, "response": "It's natural to have lugubrious moments. Remember, it's okay to grieve and seek support." },
      { "word": "effervescent", "weight": 7, "response": "Your effervescent spirit is truly infectious. Continue to spread positivity." },
      { "word": "desolate", "weight": 7, "response": "Feeling desolate can be isolating. Remember, seeking connections can provide comfort." },
      { "word": "mortified", "weight": 7, "response": "It's okay to feel mortified. Remember, everyone has moments of regret. Learn and grow from them." },
      { "word": "exuberant", "weight": 7, "response": "Your exuberance is palpable. Continue to embrace life with such enthusiasm." },
      { "word": "woebegone", "weight": 7, "response": "Feeling woebegone can be challenging. Remember, it's okay to seek solace and healing." },
      { "word": "wistful", "weight": 2, "response": "It's natural to feel wistful. Cherish memories but also look forward to new experiences." },
      { "word": "perturbed", "weight": 2, "response": "It's okay to feel perturbed. Take a moment to understand the root of your feelings." },
      { "word": "jovial", "weight": 2, "response": "Your jovial nature brings light to any situation. Keep spreading positivity." },
      { "word": "morose", "weight": 2, "response": "Feeling morose can be challenging. Remember, it's okay to seek comfort and understanding." },
      { "word": "irate", "weight": 2, "response": "It's natural to feel irate at times. Consider constructive ways to express your feelings." },
      { "word": "buoyant", "weight": 2, "response": "Your buoyant spirit lifts others. Continue to ride the waves of life with grace." },
      { "word": "crestfallen", "weight": 2, "response": "It's okay to feel crestfallen. Remember, every setback is a setup for a comeback." },
      { "word": "genial", "weight": 2, "response": "Your genial nature is heartwarming. Continue to build bridges with your kindness." },
      { "word": "disgruntled", "weight": 2, "response": "Feeling disgruntled can be taxing. Consider addressing the root of your discontent." },
      { "word": "blissful", "weight": 2, "response": "Your blissful moments are treasures. Cherish and seek more of them." },
      { "word": "indignant", "weight": 2, "response": "It's natural to feel indignant. Remember to channel your feelings constructively." },
      { "word": "mirthful", "weight": 2, "response": "Your mirthful spirit is a joy to be around. Continue to find humor in life." },
      { "word": "sullen", "weight": 2, "response": "Feeling sullen can be heavy. Remember, it's okay to seek support and understanding." },
      { "word": "radiant", "weight": 2, "response": "Your radiant energy is inspiring. Continue to shine your light." },
      { "word": "livid", "weight": 2, "response": "It's okay to feel livid. Consider taking a step back and reflecting before reacting." },
      { "word": "chipper", "weight": 2, "response": "Your chipper attitude is refreshing. Continue to approach life with such optimism." },
      { "word": "gloomy", "weight": 2, "response": "It's natural to have gloomy days. Remember, after the rain comes a rainbow." },
      { "word": "ecstatic", "weight": 2, "response": "Your ecstatic joy is palpable. Embrace and share these moments of elation." },
      { "word": "peeved", "weight": 2, "response": "Feeling peeved can be unsettling. Consider addressing what's bothering you constructively." },
      { "word": "placid", "weight": 2, "response": "Your placid demeanor is calming. Continue to find balance in life's storms." },
      { "word": "fuming", "weight": 2, "response": "It's natural to feel fuming. Remember to take deep breaths and approach situations rationally." },
      { "word": "jubilant", "weight": 2, "response": "Your jubilant nature is uplifting. Embrace and share this joy with others." },
      { "word": "resigned", "weight": 2, "response": "Feeling resigned might indicate acceptance. Remember, every end is a new beginning." },
      { "word": "intrigued", "weight": 2, "response": "Being intrigued shows your interest in understanding deeper layers. Dive in and explore!" },
      { "word": "challenged", "weight": 2, "response": "Facing challenges can lead to growth. Embrace them as opportunities to evolve." },
      { "word": "defiant", "weight": 2, "response": "Your defiance shows strength and conviction. Stand firm in your beliefs while being open to dialogue." },
      { "word": "undaunted", "weight": 2, "response": "Your undaunted spirit is commendable. Continue to face obstacles head-on with courage." },
      { "word": "driven", "weight": 5, "response": "Your drive is a testament to your passion and determination. Keep pushing forward." },
      { "word": "emboldened", "weight": 5, "response": "Feeling emboldened can lead to great achievements. Harness this confidence in your pursuits." },
      { "word": "engaged", "weight": 5, "response": "Being engaged shows your commitment and interest. Stay connected and involved." },
      { "word": "fearless", "weight": 5, "response": "Your fearlessness is inspiring. Continue to face challenges with bravery." },
      { "word": "galvanized", "weight": 2, "response": "Being galvanized indicates a newfound motivation. Channel this energy towards positive endeavors." },
      { "word": "intrepid", "weight": 2, "response": "Your intrepid nature is admirable. Continue to explore uncharted territories with courage." },
      { "word": "persevering", "weight": 2, "response": "Perseverance is key to overcoming obstacles. Stay persistent in your journey." },
      { "word": "resilient", "weight": 2, "response": "Your resilience is a testament to your strength. Bounce back with even more determination." },
      { "word": "tenacious", "weight": 5, "response": "Your tenacity is commendable. Hold onto your goals and aspirations with determination." },
      { "word": "venturous", "weight": 5, "response": "Being venturous shows your adventurous spirit. Embrace new experiences with enthusiasm." },
      { "word": "wrestling", "weight": 5, "response": "Wrestling with decisions or emotions is natural. Take your time to find clarity." },
      { "word": "zealot", "weight": 2, "response": "Being a zealot indicates strong passion. Channel it wisely and constructively." },
      { "word": "adventurous", "weight": 2, "response": "Your adventurous spirit opens doors to new experiences. Explore with an open heart." },
      { "word": "combatant", "weight": 2, "response": "Being a combatant shows your fighting spirit. Stand up for what's right with honor." },
      { "word": "daring", "weight": 2, "response": "Your daring nature breaks barriers. Continue to challenge the status quo." },
      { "word": "empowering", "weight": 5, "response": "Empowering others is a noble act. Continue to uplift and inspire." },
      { "word": "fierce", "weight": 5, "response": "Your fierceness is a testament to your passion. Stand strong and unwavering." },
      { "word": "grappling", "weight": 5, "response": "Grappling with challenges is part of growth. Trust your journey and process." },
      { "word": "heroic", "weight": 2, "response": "Your heroism is inspiring. Continue to make a difference with your brave actions." },
      { "word": "invincible", "weight": 2, "response": "Feeling invincible shows great confidence. Remember to stay grounded and humble." },
      { "word": "lionhearted", "weight": 2, "response": "Your lionhearted spirit is commendable. Face challenges with bravery and honor." },
      { "word": "marching", "weight": 2, "response": "Marching forward shows your determination. Stay focused on your path and goals." },
      { "word": "navigating", "weight": 2, "response": "Navigating challenges requires skill and patience. Trust your instincts and journey." },
      { "word": "overcoming", "weight": 2, "response": "Overcoming obstacles is a testament to your strength. Celebrate your victories, big or small." },
      { "word": "pioneering", "weight": 2, "response": "Being a pioneer means charting new territories. Continue to innovate and lead." },
      { "word": "questing", "weight": 2, "response": "Your quest for knowledge and adventure is inspiring. Embrace the journey with an open heart." },
      { "word": "resisting", "weight": 2, "response": "Resisting challenges shows your strength. Stand firm in your beliefs and values." },
      { "word": "striving", "weight": 2, "response": "Your continuous striving is commendable. Keep pushing towards your goals with determination." },
      { "word": "undaunted", "weight": 2, "response": "Being undaunted in the face of challenges is admirable. Continue to persevere with courage." },
      { "word": "valiant", "weight": 2, "response": "Your valiant efforts make a difference. Continue to act with honor and bravery." },
      { "word": "warrior", "weight": 2, "response": "Your warrior spirit is a testament to your strength and resilience. Face challenges head-on with courage." },
      { "word": "xenial", "weight": 2, "response": "Your xenial nature builds bridges. Continue to foster connections and understanding." },
      { "word": "yearning", "weight": 2, "response": "Yearning for more is natural. Embrace your desires and work towards fulfilling them." },
      { "word": "zealous", "weight": 2, "response": "Your zealous passion is infectious. Inspire others with your enthusiasm and dedication." },
      { "word": "advancing", "weight": 2, "response": "Your forward momentum is inspiring. Keep advancing towards your goals." },
      { "word": "battling", "weight": 2, "response": "Facing battles head-on shows your courage. Stay strong and persevere." },
      { "word": "conquering", "weight": 2, "response": "Your conquering spirit breaks barriers. Celebrate every victory." },
      { "word": "defending", "weight": 2, "response": "Defending what you believe in is noble. Stand firm with conviction." },
      { "word": "exploring", "weight": 2, "response": "Your exploratory nature opens new horizons. Discover with curiosity." },
      { "word": "forging", "weight": 2, "response": "Forging ahead, you create new paths. Lead with determination." },
      { "word": "guiding", "weight": 2, "response": "Guiding others is a sign of leadership. Continue to inspire and mentor." },
      { "word": "hustling", "weight": 2, "response": "Your hustle is commendable. Keep pushing with dedication." },
      { "word": "igniting", "weight": 2, "response": "Igniting change is powerful. Spark innovation and transformation." },
      { "word": "jousting", "weight": 2, "response": "Facing challenges head-on like a jouster shows bravery. Stand tall and confident." },
      { "word": "kindling", "weight": 2, "response": "Kindling new ideas and passions is inspiring. Continue to nurture your creativity." },
      { "word": "launching", "weight": 2, "response": "Launching new ventures takes courage. Propel forward with vision." },
      { "word": "mobilizing", "weight": 2, "response": "Mobilizing efforts shows leadership. Rally and inspire those around you." },
      { "word": "nurturing", "weight": 2, "response": "Nurturing growth and potential is a gift. Continue to support and uplift." },
      { "word": "orchestrating", "weight": 2, "response": "Orchestrating efforts harmoniously leads to success. Direct with clarity and purpose." },
      { "word": "pioneering", "weight": 2, "response": "Being a pioneer means charting new paths. Lead with innovation." },
      { "word": "quelling", "weight": 2, "response": "Quelling doubts and fears shows strength. Face challenges with a calm spirit." },
      { "word": "revitalizing", "weight": 2, "response": "Revitalizing efforts breathe new life into projects. Infuse energy and passion." },
      { "word": "spearheading", "weight": 2, "response": "Spearheading initiatives shows leadership. Drive forward with determination." },
      { "word": "trailblazing", "weight": 2, "response": "As a trailblazer, you set new standards. Continue to lead and inspire." }
  ];



  const fallbackKeywordsArray = [
      { "word": "and", "weight": 1, "response": "Oh, 'and'? You're really pulling out the big words now, huh? 😂" },
      { "word": "the", "weight": 1, "response": "Using 'the'? Classic move! But can you spice it up a bit?" },
      { "word": "is", "weight": 1, "response": "Look at you, using 'is' like a pro! You want a cookie?" },
      { "word": "it", "weight": 1, "response": "'It'? That's it? Come on, give me more!" },
      { "word": "of", "weight": 1, "response": "Oh, 'of' course you'd use that word! See what I did there?" },
      { "word": "to", "weight": 1, "response": "You're 'to' funny! Or did you mean 'too'? 🤔" },
      { "word": "in", "weight": 1, "response": "You're 'in' deep thought, I see. Or just deep in typos?" },
      { "word": "for", "weight": 1, "response": "You're 'for' real with that response? 😜" },
      { "word": "on", "weight": 1, "response": "Keep it moving, champ! 'On' to the next word!" },
      { "word": "with", "weight": 1, "response": "Rolling 'with' the basics, huh? Classic!" },
      { "word": "that", "weight": 1, "response": "Oh, 'that' word again? Mix it up a little!" },
      { "word": "as", "weight": 1, "response": "'As' if you just used that word! 😂" },
      { "word": "he", "weight": 1, "response": "Oh, 'he'? Is he that guy who didn't text back? Classic move!" },
      { "word": "she", "weight": 1, "response": "'She' probably has a secret Pinterest board. We all do." },
      { "word": "but", "weight": 1, "response": "'But'? There's always a 'but'. Usually followed by an unsolicited opinion." },
      { "word": "so", "weight": 1, "response": "'So'... what's next? A story about your cat? I'm here for it!" },
      { "word": "if", "weight": 1, "response": "'If' you're about to tell me about your diet, I've got snacks ready." },
      { "word": "was", "weight": 1, "response": "'Was' it one of those nights? We've all had them. No judgment." },
      { "word": "my", "weight": 1, "response": "'My' oh my, are we getting personal now? Spill the tea!" },
      { "word": "this", "weight": 1, "response": "'This' better be good! I've got my party goblin ready." },
      { "word": "be", "weight": 1, "response": "To 'be' or not to 'be'? That's... probably not what you're asking, huh?" },
      { "word": "you", "weight": 1, "response": "'You'? Oh, are we playing the blame game? I've got my bingo card!" },
      { "word": "by", "weight": 1, "response": "Going 'by' the book with that one, huh? Get creative!" }
  ];



  function calculateEmotionScore(input) {
      let score = 0;
      let foundMainKeyword = false;

      generalKeywordsArray.forEach(keywordObj => {
          const regex = new RegExp(`\\b${keywordObj.word}\\b`, 'gi');
          const matches = input.match(regex);
          if (matches) {
              foundMainKeyword = true;
              score += matches.length * keywordObj.weight;
          }
      });

      // If no main keyword is found, check the fallback keywords
      if (!foundMainKeyword) {
          fallbackKeywordsArray.forEach(keywordObj => {
              const regex = new RegExp(`\\b${keywordObj.word}\\b`, 'gi');
              const matches = input.match(regex);
              if (matches) {
                  score += matches.length * keywordObj.weight;
              }
          });
      }

      return score;
  }

  function getEmotionalFeedback(input) {
      const score = calculateEmotionScore(input);
      let feedback = "Your response is unique and might require deeper introspection.";
      generalKeywordsArray.forEach(keywordObj => {
          if (score >= keywordObj.weight) {
              feedback = keywordObj.response;
          }
      });
      return feedback;
  }




const storyGroups = [
    {
      setting: "In the heart of a forgotten city lies an ancient library, its walls lined with dusty tomes and scrolls that have seen the passage of millennia. Cobwebs drape over forgotten tales, and the air is thick with the scent of old parchment.",
      characters: ["Tranatum, the ageless librarian, guardian of knowledge, who has dedicated centuries to preserving the library's secrets", "An old scholar, whose life's quest has been to find a lost manuscript said to hold the power to change the course of history"],
      objects: ["A book titled The Secrets Within, bound in leather and adorned with cryptic symbols, said to contain truths about the universe.", "An ancient scroll, written in a language long lost to time, that no one has been able to decipher, rumored to be a map to other realms."],
      events: ["While perusing the vast collection of the library , you stumble upon a chapter that reveals a dark secret about your familys past. The weight of this revelation bears down on you. Would you share this information with your family, potentially changing their perception of their lineage, or keep it hidden, preserving the family's honor?",
               "In the dimly lit corners of the library, you discover a hidden section that contains forbidden knowledge. The texts speak of rituals and powers that can alter the fabric of reality. Would you delve deeper into the forbidden texts, risking the wrath of ancient guardians, or respect the librarys rules and leave, keeping the balance of the world intact?"]
    },
    {
      setting: "Deep within a forgotten realm lies a vast maze, its walls not just of stone but of magic, shifting and changing with every step. The very air within the maze is thick with enchantment, and echoes of past explorers whisper their tales of woe.",
      characters: ["Labyria, an AI created by ancient sorcerers, designed to guide or deceive those who dare enter the maze", "A seasoned explorer, armed with tools and knowledge from countless adventures, determined to uncover the maze's secrets"],
      objects: ["A map, said to be drawn by the very architect of the maze, that promises to lead you to a hidden treasure that can grant immense power.", "A compass, forged in the heart of a star, that always points to the exit, but its needle spins wildly when danger is near."],
      events: ["As you navigate the ever-changing corridors, you encounter a trapped creature, its eyes filled with sorrow, begging for release. Its chains are imbued with dark magic. Would you free the creature, risking the maze's wrath and potential danger, or continue on your path, leaving the creature to its eternal torment?",
              "Deep within the maze, you find a shortcut, a portal shimmering with ethereal light. However, using it requires you to leave behind a fellow traveler, sacrificing them to the maze. Would you take the shortcut, ensuring your own safety but betraying a companion, or stay with your companion, facing the maze's challenges together?"]
    },
    {
      setting: "The heart of a grand medieval city is its bustling marketplace, a melting pot of cultures. Traders from distant lands set up colorful stalls, their wares ranging from exotic spices to mystical artifacts. The air is filled with the aroma of roasted meats, the chatter of bargaining, and the melodies of street performers",
      characters: ["A mysterious merchant, draped in robes from the East, selling rare artifacts that are said to possess magical properties. His eyes, however, hide secrets of their own", "A street performer, captivating the crowd with feats of acrobatics and fire-breathing. But whispers in the alleyways speak of a hidden past and a royal lineage"],
      objects: ["A pendant, shimmering with an inner light, said to grant wishes to those pure of heart. But every wish comes with a price", "A sealed letter addressed to a forgotten king"],
      events: ["As you wander the marketplace, the mysterious merchant offers you a trade that seems too good to be true: the pendant in exchange for a simple favor. The weight of the decision presses on you. Would you accept the offer, lured by the pendant's power, or decline, suspecting a trick or hidden catch?",
              "Amidst the hustle and bustle, you overhear a covert conversation between shadowy figures. They plot to overthrow the local lord and seize power. The fate of the city hangs in the balance. Would you warn the authorities, risking the wrath of the conspirators, or stay silent, avoiding entanglement in the city's politics?"]
    },
    {
      setting: "The horizon is dominated by a sprawling futuristic cityscape, where neon lights illuminate the night and flying cars zoom past towering skyscrapers. Holographic billboards advertise the latest tech, and AI-driven robots walk alongside humans in harmony.",
      characters: ["A rogue AI, once deemed a threat to humanity, now seeking redemption and a place in this technologically advanced society.", "A detective, armed with augmented reality glasses and a keen sense of intuition, chasing a shadowy figure who threatens the city's peace."],
      objects: ["A device, sleek and compact, that can alter memories, offering a chance to rewrite one's past.", "A holographic key, its code constantly shifting, said to unlock a hidden realm within the city's virtual world."],
      events: ["In a twist of fate, you come across the memory-altering device. It offers you a chance to erase a painful memory, to forget a heartbreak or a loss. The temptation is strong. Would you choose to forget, erasing the pain but also the lessons, or embrace your past, accepting both the joys and sorrows?",
              "As you navigate the city's digital underbelly, you uncover a conspiracy that could change the fate of the city. Powerful figures are involved, and the stakes are high. Would you expose the truth, becoming a target yourself, or protect the city's harmony, burying the information deep within the digital realm?"]
    },
    {
      setting: "a tranquil forest glade, bathed in the light of a full moon",
      characters: ["a guardian spirit of the woods", "a lost traveler seeking refuge"],
      objects: ["a potion that reveals hidden truths", "a magical harp that controls the elements"],
      events: ["encountering a wounded creature with a cursed mark. Would you help heal it, risking the curse, or leave it to its fate?",
              "discovering a sacred grove where time stands still. Would you stay and enjoy eternal peace or return to the world outside?"]
    },
    {
      setting: "a sunken city, its ruins teeming with marine life and forgotten treasures",
      characters: ["a mermaid with a haunting melody", "an archaeologist searching for a legendary artifact"],
      objects: ["a trident that commands the ocean's tides", "a pearl that shows visions of the future"],
      events: ["being offered a chance to become a sea creature and explore the depths forever. Would you accept or remain human?",
              "finding an ancient relic that could raise the city back to the surface. Would you use it or leave the city undisturbed?"]
        },
        {
      setting: "a remote mountain monastery, where monks practice ancient rituals",
      characters: ["an elder monk with a mysterious past", "a novice with a forbidden secret"],
      objects: ["a scroll detailing a powerful meditation technique", "a bell that can summon spirits"],
      events: ["learning of a ritual that grants immense power but requires great sacrifice. Would you undertake the ritual or decline its power?",
              "discovering a hidden chamber where the monks keep dangerous knowledge. Would you investigate or respect their secrets?"]
        },
        {
      setting: "a post-apocalyptic wasteland, where survivors scavenge amidst the ruins",
      characters: ["a leader of a survivor community", "a lone wanderer with tales of a safe haven"],
      objects: ["a radio that picks up mysterious broadcasts", "a map to a rumored oasis"],
      events: ["being faced with a moral dilemma: share limited resources with strangers or prioritize your own group. What would you choose?",
              "hearing whispers of a sanctuary free from danger. Would you risk the journey based on rumors or stay in familiar territory?"]
        }
];

function generateRandomStory() {
    const randomGroup = storyGroups[Math.floor(Math.random() * storyGroups.length)];

    const randomCharacter = randomGroup.characters[Math.floor(Math.random() * randomGroup.characters.length)];
    const randomObject = randomGroup.objects[Math.floor(Math.random() * randomGroup.objects.length)];
    const randomEvent = randomGroup.events[Math.floor(Math.random() * randomGroup.events.length)];

    return `Imagine you're wandering through ${randomGroup.setting}. As you walk, ${randomCharacter} approaches you. They offer you ${randomObject}. As you interact with it, you find yourself facing a dilemma: ${randomEvent}`;
}

let isFirstSubmission = true; // Global flag to track the first submission

function allSend() {
  sendMessage(textarea.value);
  analyzeUserResponse(textarea.value);
  copyStoryAndResponseToClipboard();
  document.getElementById('textarea').value = '';
}

  function displayStory() {
      const storyP = document.createElement('p');
      storyP.textContent = generateRandomStory();
      storyContainer.appendChild(storyP);
  }
  displayStory();



  function copyStoryAndResponseToClipboard() {
      let textToAppend = '';

      if (isFirstSubmission) {
          // Include the story text only on the first submission
          const storyP = storyContainer.querySelector('p'); // Select the paragraph containing the story
          const storyText = storyP.textContent || storyP.innerText;
          textToAppend += `🐕 Story: ${storyText}\n\n`;
          isFirstSubmission = false; // Update the flag after first submission
          storyP.style.display = 'none'; // Hide only the story text paragraph
      }

      // Get the user response and reflections text
      const responseTextarea = document.querySelector('textarea');
      const userResponse = responseTextarea.value;
      const reflectionsContainer = document.getElementById('reflectionsContainer');
      const reflectionsText = reflectionsContainer.textContent || reflectionsContainer.innerText;

      textToAppend += `Response: ${userResponse}\n\nReflections: ${reflectionsText} 🐕`;

      // Append new text to the existing content in textContainer
      const textContainer = document.getElementById('textContainer');
      textContainer.textContent += textToAppend + "\n\n";
  }




                      function addMessageToChat(sender, message) {
                          // Add message to the chat window
                          const chatWindow = document.getElementById('chatWindow');
                          const newMessage = document.createElement('p');
                          newMessage.textContent = `${sender}: ${message}`;
                          chatWindow.appendChild(newMessage);

                          // Add message to processedMessages array
                          processedMessages.push(`${sender}: ${message}`);
                      }





                    function calcLevenshteinDistance(str1, str2) {
                        str1 = str1.toLowerCase();
                        str2 = str2.toLowerCase();

                        if (str1.length === 0) return str2.length;
                        if (str2.length === 0) return str1.length;

                        let matrix = [];

                        for (let i = 0; i <= str2.length; i++) {
                            matrix[i] = [i];
                        }

                        for (let j = 0; j <= str1.length; j++) {
                            matrix[0][j] = j;
                        }

                        for (let i = 1; i <= str2.length; i++) {
                            for (let j = 1; j <= str1.length; j++) {
                                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                                    matrix[i][j] = matrix[i - 1][j - 1];
                                } else {
                                    matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
                                }
                            }
                        }

                        return matrix[str2.length][str1.length];
                    }




                    function findClosestKeyword(input, keywords) {
                        let closestKeyword = null;
                        let minDistance = Infinity;
                        const threshold = 3; // Adjust as needed for individual words

                        const words = input.split(/\s+/); // Split the input into words

                        for (const keywordObj of keywords) {
                            for (const word of words) {
                                const distance = calcLevenshteinDistance(word, keywordObj.word);
                                console.log(`Word: ${word}, Keyword: ${keywordObj.word}, Distance: ${distance}`); // Debugging output
                                if (distance < minDistance && distance <= threshold) {
                                    minDistance = distance;
                                    closestKeyword = keywordObj;
                                }
                            }
                        }

                        return closestKeyword;
                    }


                    const rankedKeywords = generalKeywordsArray.sort((a, b) => b.weight - a.weight);

                    function generateKeywordResponse() {
                        return rankedKeywords.map(keyword => `${keyword.word} (${keyword.weight}): ${keyword.response}`).join('\n');
                    }


                    function randomGuess() {
                        const variables = [
                            "Explorer",
                            "Voyager",
                            "Captain",
                            "Sailor",
                            "Merchant",
                            "Smuggler",
                            "Arbiter",
                            "Fisherman",
                            "Shipwright"
                        ];

                        const randomVariable = variables[Math.floor(Math.random() * variables.length)];
                        const message = {};
                        message[randomVariable.toLowerCase()] = 1; // Convert the variable name to lowercase to match your example

                        window.parent.postMessage(message, '*');
                    }

                    let isResponseAnalyzed = false; // Flag to ensure analysis happens only once

                    function analyzeUserResponse(input) {
                        if (!isResponseAnalyzed) {
                            const detectedKeywords = [];
                            const maxReflections = 3; // Maximum number of reflections to provide

                            // Convert input to lowercase for case-insensitive matching
                            input = input.toLowerCase();

                            // Detect keywords in the user's input from both general and fallback arrays
                            [...generalKeywordsArray, ...fallbackKeywordsArray].forEach(keywordObj => {
                                if (input.includes(keywordObj.word)) {
                                    detectedKeywords.push(keywordObj);
                                    randomGuess();
                                }
                            });

                            // Sort detected keywords based on their weight
                            detectedKeywords.sort((a, b) => b.weight - a.weight);

                            // Limit the reflections to the top N keywords
                            const topKeywords = detectedKeywords.slice(0, maxReflections);

                            // Generate the reflections
                            const reflections = topKeywords.map(keywordObj => keywordObj.response);

                            // Append the reflections to the chat window
                            const chatWindow = document.getElementById('chatWindow');
                            reflections.forEach(reflection => {
                              addMessageToChat('Collective', reflection);
                            });

                            isResponseAnalyzed = true; // Set the flag to true after first run
                        }
                    }
