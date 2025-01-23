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

async function fetchFact() {
    const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
    const data = await response.json();
    return data.text;
}

async function loadPlayerJson() {
    setTimeout(async function() {
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

        let introduction = visitorType ? "If you have your Lumina file, you can upload it to continue where you left off." : "I'm Micheal, your friendly chatbot guide. Here at LuminaFields, we merge nature, technology, and education to create a unique learning experience. Feel free to explore our platform and learn more about what we offer.";
        if (!visitorType) setCookie("visitorType", "returning", 30);

        // Detect device type
        const deviceType = detectDeviceType();

        // Construct personalized message parts
        const deviceMessage = {
            mobile: "Looks like you're on a mobile device. ",
            tablet: "It seems you're using a tablet. ",
            desktop: "You're browsing from a desktop. "
        }[deviceType];

        const visitMessage = [
            "Great to see you here for the first time!",
            "Nice to see you again!",
            `This is your ${visitCount}th visit, awesome!`
        ][Math.min(visitCount - 1, 2)];

        const timeMessage = time < 12 ? "Hope you're having a productive morning!" : (time < 18 ? "Hope your afternoon is going well!" : "Wishing you a relaxing evening!");

        // Fetch a random fact
        const fact = await fetchFact();
        const factMessage = `Did you know? ${fact}`;

        const finalMessage = `
            <h1><span class="gradient-text">Micheal</span>: ${greeting} from LuminaFields! ${introduction}
            ${deviceMessage} ${visitMessage} ${timeMessage} ${factMessage}</h1><br>
        `;

        chatWindow.innerHTML += finalMessage;
        botName = "Micheal";
        scrollToTop();
    }, 500);
}

function scrollToBottom() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function scrollToTop() {
    const chatWindow2 = document.getElementById('chatWindow');
    chatWindow2.scrollTop = 0;
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
