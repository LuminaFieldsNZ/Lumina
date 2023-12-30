

const narrative = [
    "<b>Welcome to LuminaFields.</b> Imagine you're playing a video game where the world changes based on what you write! Isn't that awesome?<br>",
    "<b>Scrolling to the Bottom:</b> When you write a lot in the game, my script makes sure you can see the newest things you've written by automatically moving the screen down. It's like when you draw at the bottom of a page and need to turn the page to draw more.<br>",
    "<b>Loading Files:</b> You know how you can draw pictures or write stories and keep them in a folder? This script lets you load those writings into the game, and it looks for a special symbol, 🐕, to understand your stories better.<br>",
    "<b>Emoji Counting:</b> Imagine you have stickers of dolphins, cats, owls, and more. This script counts how many of each sticker you've used in your story. Each sticker means something special in the game!<br>",
    "<b>Feeling Words:</b> Just like in real life, sometimes we feel happy, angry, or sad. This script finds words in your story that show how you're feeling and makes the game world change to match your feelings!<br>",
    "<b>Nation Keywords:</b> In the game, there are different groups like explorers, helpers, and builders. The script finds special words you've used to figure out which group is getting stronger in your story.<br>",
    "<b>Updating Every Few Seconds:</b> Every nine seconds (like counting to nine slowly), the script checks your story to see if anything new is added or changed, and then updates the game world.<br>",
    "<b>Username Check:</b> If you haven't told the game your name, it will ask you to write it down. This way, the game knows who's creating the story!<br>",
    "<b>Exporting Your Story:</b> When you're done playing, you can save your story to show your friends or family later!<br>",
    "So, when you write or load a story into the game, my script listens to your words and feelings and changes the game world to match! It's like your story is coming to life.<br>",
    "Remember, the best part is to write, have fun, and see how your words make a whole world change right before your eyes!<br>"
];


let shouldPlayNarrative = true;



let isLoaded2 = false;

function playNarrativeOnce() {
    if (!isLoaded2) {
        narrative.forEach((part, index) => {
            setTimeout(() => {


              chatWindow.innerHTML += part;
              scrollToBottom();

            }, index * 15000); // Adjust the time interval as needed
        });
        isLoaded2 = true;
    }
}
