window.onload = function() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
};
localStorage.clear();
sessionStorage.clear();
let populations = {
  progressive: 10000010,
  socialist: 10000000,
  idealist: 70000020,
  globalist: 100000030,
  conservative: 100000040,
  economist: 100000050,
  realist: 100000080,
  nationalist: 100000060,
  populist: 100000070
};

let status = 0; // Set the initial status level
let increaseAmount = .03; // Population increase amount for status 0
let decreaseAmounts = [2000, 40000, 60000, 80000, 100000, 500000]; // Population decrease amounts for different statuses

function updatePopulations() {
  let totalPopulation = 0;

  for (let nation in populations) {
    const nationSpan = document.getElementById(nation);

    if (status === 0) {
      populations[nation] += increaseAmount;
    } else {
      populations[nation] -= decreaseAmounts[status];
    }

    if (populations[nation] < 1000) {
      window.location.reload();
      alert("Population dropped below 1000! Resetting window...");
      break;
    }

    nationSpan.textContent = Math.round(populations[nation]);

    totalPopulation += populations[nation];
    const popSpan = document.getElementById('population');
    popSpan.textContent = Math.round(totalPopulation);
  }

  const avgPopulation = totalPopulation / Object.keys(populations).length;
  const avgSpan = document.getElementById('average');
  avgSpan.textContent = Math.round(avgPopulation);

  const statusSpan = document.getElementById('status');
  statusSpan.textContent = status;

  // Update the percentages after updating the populations
  updatePercentages(avgPopulation);
}

function updatePercentages(avgPopulation) {
  for (let nation in populations) {
    const percentage = (populations[nation] / avgPopulation) * 100;
    const percentageSpan = document.getElementById(nation + 'bp'); // Assuming the id for percentage spans are in the format 'nationbp'
    percentageSpan.textContent = Math.round(percentage) + '%';

    // Update the progress bar
    const progressBar = document.querySelector('.' + nation + '-progress'); // Assuming the class for progress bars are in the format 'nation-progress'
    progressBar.style.width = Math.round(percentage) + '%';

     if (percentage < 50) {
       progressBar.style.backgroundColor = 'red';
     } else if (percentage < 75) {
       progressBar.style.backgroundColor = 'yellow';
     } else {
       progressBar.style.backgroundColor = 'green';
     }
  }
}


let interval;

function startUpdating() {
  interval = setInterval(updatePopulations, 1000); // Update every second
}

startUpdating();


const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-+=[]{}:;<>?,.~_|";
const tableau = [];

// Create Vigenère tableau
for (let i = 0; i < symbols.length; i++) {
    let shifted = symbols.slice(i) + symbols.slice(0, i);
    tableau.push(shifted);
}

function isValid(input) {
    for (let char of input) {
        if (!symbols.includes(char)) {
            alert('Invalid character: ' + char);
            return false;
        }
    }
    return true;
}

function encrypt() {
    const plainText = document.getElementById('plainText').value;
    const key = document.getElementById('key').value;

    if (!isValid(plainText) || !isValid(key)) return;

    let encryptedText = "";

    for (let i = 0; i < plainText.length; i++) {
        let row = symbols.indexOf(key[i % key.length]);
        let col = symbols.indexOf(plainText[i]);
        encryptedText += tableau[row][col];
    }

    document.getElementById('result').value = encryptedText;
}

function decrypt() {
    const cipherText = document.getElementById('plainText').value;
    const key = document.getElementById('key').value;

    if (!isValid(cipherText) || !isValid(key)) return;

    let decryptedText = "";

    for (let i = 0; i < cipherText.length; i++) {
        let row = symbols.indexOf(key[i % key.length]);
        let col = tableau[row].indexOf(cipherText[i]);
        decryptedText += symbols[col];
    }

    document.getElementById('result').value = decryptedText;
}



window.addEventListener('message', function(event) {
  // Ensure you trust the sender of the message!
  // Add checks for origin if needed

  for (let nation in populations) {
    if (event.data[nation]) {
      populations[nation] += event.data[nation];
    }
  }
});
