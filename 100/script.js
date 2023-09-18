const faIcons = [
  "air-freshener",
  "allergies",
  "ambulance",
  "anchor",
  "angry",
  "ankh",
  "apple-alt",
  "archive",
  "archway",
  "assistive-listening-systems",
  "asterisk",
  "atlas",
  "atom",
  "award",
  "baby",
  "baby-carriage",
  "bacon",
  "bacteria",
  "balance-scale",
  "band-aid",
  "barcode",
  "baseball-ball",
  "basketball-ball",
  "bath",
  "bed",
  "beer",
  "bible",
  "bicycle",
  "binoculars",
  "biohazard",
  "birthday-cake",
  "blender",
  "blind",
  "bomb",
  "bone",
  "bong",
  "bowling-ball",
  "box-open",
  "brain",
  "bread-slice",
  "broom",
  "bug",
  "bullseye",
  "burn",
  "bus",
  "camera-retro",
  "campground",
  "candy-cane",
  "carrot",
  "cat",
  "chair",
  "chess",
  "chess-knight",
  "child",
  "church",
  "city",
  "cloud-moon",
  "cocktail",
  "coffee",
  "coins",
  "cookie-bite",
  "couch",
  "crosshairs",
  "crow",
  "crown",
  "cubes",
  "democrat",
  "dharmachakra",
  "diagnoses",
  "dice-d20",
  "dizzy",
  "dna",
  "dog",
  "dove",
  "dragon",
  "drum",
  "dumbbell",
  "dumpster-fire",
  "dungeon",
  "egg",
  "feather-alt",
  "fingerprint",
  "flushed",
  "futbol",
  "gem",
  "ghost",
  "gifts",
  "glass-cheers",
  "glass-martini-alt",
  "gopuram",
  "guitar",
  "hamburger",
  "hammer",
  "hand-holding-heart",
  "hand-holding-usd",
  "hand-lizard",
  "hand-middle-finger",
  "hand-peace",
  "hand-scissors",
  "hand-sparkles"
];

function handleIconClick(event) {
  const iconName = event.currentTarget.getAttribute("data-name");
  console.log(`Icon ${iconName} was clicked!`);
  if (iconName === "cat") {  // Check if it's the cat icon
    parent.postMessage({ action: 'changeSrc', newSrc: 'nations/awakening.html' }, 'luminafields.com');
  }
  if (iconName === "angry") {  // Check if it's the cat icon
    parent.postMessage({ action: 'hideThem', value: 'hideThem' }, 'luminafields.com');
  }
  // You can add more logic here if needed
}

for (let i = 0; i < faIcons.length; i++) {
  let listItem = document.createElement("LI");
  listItem.classList.add("fa");
  listItem.classList.add("fa-" + faIcons[i]);
  listItem.setAttribute("data-name", faIcons[i]);

  listItem.addEventListener("click", handleIconClick);  // Add the event listener here

  document.querySelector("ol").appendChild(listItem);
}
