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
            let outfitRecommendation, thermostatSetting;

            if (temp < 50) {
                outfitRecommendation = "It's quite cold outside. Wear a warm coat and maybe a hat and gloves.";
                thermostatSetting = "You might want to set your thermostat to around 72°F to stay cozy.";
            } else if (temp < 70) {
                outfitRecommendation = "It's a bit chilly. A light jacket should be enough.";
                thermostatSetting = "A comfortable thermostat setting would be around 68°F.";
            } else {
                outfitRecommendation = "The weather is warm. Light clothing should be perfect.";
                thermostatSetting = "Keep your thermostat around 75°F to stay cool.";
            }

            const weatherMessage = `Currently, in Branson, it's ${temp}°F with ${weatherDescription}. ${outfitRecommendation} ${thermostatSetting}`;

            const finalMessage = `
                <span class="gradient-text">Micheal</span>: ${greeting} and welcome to LuminaFields! ${introduction}
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
  }


  function runAbout() {
    window.open('data/whitepaper.pdf', '_blank');
}

function runDemo() {
  window.open('https://mfglife.github.io/demo/index.html', '_blank');
}
