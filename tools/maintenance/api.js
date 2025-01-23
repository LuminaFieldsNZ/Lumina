let checkLogin = false;
let botName;

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function detectDeviceType() {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) {
        return "mobile";
    }
    if (/tablet/i.test(ua)) {
        return "tablet";
    }
    return "desktop";
}

function fetchWeather(callback) {
    const apiKey = '00a61fe396a84971dddfb0b2e51a1229'; // Replace with your API key 

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Branson,us&units=imperial&appid=${apiKey}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function loadPlayerJson() {
    setTimeout(function() {
        const chatWindow = document.getElementById('chatWindow');

        // Determine the time of day
        const time = new Date().getHours();
        let greeting;
        if (time < 12) {
            greeting = "Good morning";
        } else if (time < 18) {
            greeting = "Good afternoon";
        } else {
            greeting = "Good evening";
        }

        // Determine the visitor type and count visits
        let visitorType = getCookie("visitorType");
        let visitCount = getCookie("visitCount");
        visitCount = visitCount ? parseInt(visitCount) + 1 : 1;
        setCookie("visitCount", visitCount, 30);

        let introduction = "";

        if (!visitorType) {
            visitorType = "new";
            setCookie("visitorType", "returning", 30);
            introduction = "I'm Micheal, your friendly chatbot guide.";
        } else {
            introduction = "Welcome back!";
        }

        // Detect device type
        const deviceType = detectDeviceType();

        // Construct personalized message parts
        const deviceMessages = {
            mobile: "Looks like you're on a mobile device. ",
            tablet: "It seems you're using a tablet. ",
            desktop: "You're browsing from a desktop. "
        };

        const visitMessages = [
            "Great to see you here for the first time!",
            "Nice to see you again!",
            `This is your ${visitCount}th visit, awesome!`
        ];

        const timeMessages = {
            morning: "Hope you're having a productive morning!",
            afternoon: "Hope your afternoon is going well!",
            evening: "Wishing you a relaxing evening!"
        };

        const timeMessage = time < 12 ? timeMessages.morning : (time < 18 ? timeMessages.afternoon : timeMessages.evening);

 
 // Fetch weather data and construct the final message
fetchWeather(function(weatherData) {
    const temp = weatherData.main.temp;
    const weatherDescription = weatherData.weather[0].description;
    const precipitationChance = weatherData.rain ? weatherData.rain["1h"] || 0 : 0;

    let outfitRecommendation, thermostatSetting;

    // Dynamic thermostat adjustment
    if (temp < 50) {
        outfitRecommendation = "It's quite cold outside. Wear a warm coat and maybe a hat and gloves.";
        thermostatSetting = 80;  // Setting higher to compensate for heat loss
    } else if (temp < 70) {
        outfitRecommendation = "It's a bit chilly. A light jacket should be enough.";
        thermostatSetting = 78;  // Setting slightly higher for mild heat loss
    } else if (temp < 80) {
        outfitRecommendation = "The weather is warm. Light clothing should be perfect.";
        thermostatSetting = 76;  // Target temperature
    } else {
        outfitRecommendation = "It's hot outside. Stay cool with light clothing.";
        thermostatSetting = 74;  // Setting lower to compensate for heat gain
    }

    const weatherMessage = `Currently, in Branson, it's ${temp}°F with ${weatherDescription}. 
                            Chance of precipitation within 24hrs is ${precipitationChance * 100}%. 
                            ${outfitRecommendation} Set your thermostat to ${thermostatSetting}°F to stay comfortable.`;

    const finalMessage = `${greeting} and welcome to Brambletwist! ${introduction}
        ${deviceMessages[deviceType]} ${visitMessages[Math.min(visitCount - 1, 2)]} ${timeMessage} ${weatherMessage}
    `;

    chatWindow.innerHTML += finalMessage;
    botName = "Micheal";
    scrollToBottom();
});
       


    }, 2300);
}

function scrollToBottom() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Call the loadPlayerJson function on page load
window.onload = loadPlayerJson;
     
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
    if (code === "[inspe") {
        startInspection();
      }
  }


  


  function runAbout() {

    const chatWindow2 = document.getElementById('chatWindow');

    const aboutMessage = `<br>
    <span class="gradient-text">Learn More</span>:  
    <button class="btn" onclick="window.open('./bud/data/deck.pdf')">
          <span>Download Pitch</span>
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </button><br>
        <button class="btn" onclick="window.open('./bud/data/whitepaper.pdf')">
          <span>Download Whitepaper</span>
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </button><br>
        <button class="btn" onclick="window.open('./bud/data/franchise.pdf')">
          <span>Let's Franchise</span>
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </button>
`;

chatWindow2.innerHTML += aboutMessage;

}

function runDemo() {
  window.open('https://mfglife.github.io/demo/index.html', '_blank');
}


function runCommands() {

    const chatWindow3 = document.getElementById('chatWindow');

    const commandMessage = `<br>
    <span class="gradient-text">[commands]</span>:  
    <button class="btn" onclick="runAbout()">
          <span>[about]</span>
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </button><br>
        <button class="btn" onclick="startInspection()">
          <span>[inspection]</span>
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </button><br>
        <button class="btn" onclick="runDemo()">
          <span>[demo]</span>
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </button><br>
        <button class="btn" onclick="runPrint">
          <span>[print]</span>
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </button>
`;

chatWindow3.innerHTML += commandMessage;
document.getElementById('lField').style.display = 'none';

}