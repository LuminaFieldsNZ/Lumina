
let price;
let squareFootage;

function calculatePrice() {
    squareFootage = parseInt(document.getElementById("squareFootage").value);
    
    // Calculate the price based on square footage
    if (squareFootage <= 2000) {
        price = 2000;
    } else {
        // Adjusted interpolation for a more gradual increase
        price = Math.round((squareFootage - 2000) * (9000 / 6000) + 2000);
    }
    
    // Update the price display
    document.getElementById("priceDisplay").innerText = "from $" + price;
}

function generateEmail() {
    // Get the square footage
    var squareFootage = parseInt(document.getElementById("squareFootage").value);

    // Initialize variables for plant quantities and prices
    var snakePlantQty, peaceLilyQty, englishIvyQty, lavenderQty, cushionMossQty, meyerLemonQty;
    var snakePlantPrice, peaceLilyPrice, englishIvyPrice, lavenderPrice, cushionMossPrice, meyerLemonPrice;

    // Determine plant quantities and prices based on square footage
    if (squareFootage <= 2000) {
        // For office space <= 2000 sqft
        snakePlantQty = 20;
        peaceLilyQty = 5;
        englishIvyQty = 20;
        lavenderQty = 15;
        cushionMossQty = 20;
        meyerLemonQty = 5;

        snakePlantPrice = 10;
        peaceLilyPrice = 30;
        englishIvyPrice = 15;
        lavenderPrice = 15;
        cushionMossPrice = 10;
        meyerLemonPrice = 37;
    } else {
        // For office space > 2000 sqft
        var extraSpace = squareFootage - 2000;
        var extraPlants = Math.floor(extraSpace / 130); // Incremental increase for plant quantities

        // Adjust plant quantities
        snakePlantQty = 20 + extraPlants;
        peaceLilyQty = 5 + extraPlants;
        englishIvyQty = 20 + extraPlants;
        lavenderQty = 15 + extraPlants;
        cushionMossQty = 20 + extraPlants;
        meyerLemonQty = 5 + extraPlants;

        // Prices remain the same
        snakePlantPrice = 10;
        peaceLilyPrice = 30;
        englishIvyPrice = 15;
        lavenderPrice = 15;
        cushionMossPrice = 10;
        meyerLemonPrice = 37;
    }

    // Calculate total prices
    var totalPlantPrice = (snakePlantQty * snakePlantPrice) + (peaceLilyQty * peaceLilyPrice) +
                          (englishIvyQty * englishIvyPrice) + (lavenderQty * lavenderPrice) +
                          (cushionMossQty * cushionMossPrice) + (meyerLemonQty * meyerLemonPrice);

    // Construct the email body
    var body = "Square Footage: " + squareFootage + " sqft\n\n" +
               "Plants:\n" +
               "- Snake Plant: " + snakePlantQty + " ($" + snakePlantPrice + " each)\n" +
               "- Peace Lily: " + peaceLilyQty + " ($" + peaceLilyPrice + " each)\n" +
               "- English Ivy: " + englishIvyQty + " ($" + englishIvyPrice + " each)\n" +
               "- Lavender: " + lavenderQty + " ($" + lavenderPrice + " each)\n" +
               "- Meyer Lemon Tree: " + meyerLemonQty + " ($" + meyerLemonPrice + " each)\n\n" +
               "Mosses:\n" +
               "- Cushion Moss: " + cushionMossQty + " ($" + cushionMossPrice + " each)\n" +
               "Plant Wholesale Cost: $" + totalPlantPrice + " estimated Grand Total including labor and installation: $" + price;

    // Display email body in the email card
    document.getElementById("emailBody").textContent = body;

    // Show the email card
    document.getElementById("emailCard").style.display = "block";
}


function submitButton() {
    // Get the email body
    var body = document.getElementById("emailBody").textContent;

    // Encode special characters for email
    body = encodeURIComponent(body);

    // Set the subject of the email
    var subject = "Bramble Twist Quote";

    // Encode special characters for the subject
    subject = encodeURIComponent(subject);

    // Construct the mailto: email link with subject and body
    var mailtoLink = "mailto:brambletwist@gmail.com?subject=" + subject + "&body=" + body;

    // Open the email client with the mailto link
    window.location.href = mailtoLink;
}


function showCard() {
    generateEmail(); // Generate email when hovered over
}

function hideCard() {
    document.getElementById("emailCard").style.display = "none"; // Hide the email card when not hovered over
}