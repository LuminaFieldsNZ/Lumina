let checkLogin = false;
let botName;


async function loadPlayerJson() {
    setTimeout(async function() {
        const chatWindow = document.getElementById('chatWindow');

        const finalMessage = `
            <p><span class="gradient-text"> Micheal | Model Version 3.1</span> - I'll manage your documents online, let's begin chatting about your needs...</p><br>
        `;

        chatWindow.innerHTML += finalMessage;
        botName = "Micheal";
scrollToBottom();
    }, 300);
}


// Call the loadPlayerJson function on page load
window.onload = loadPlayerJson;



    const form = document.getElementById('maintenanceRequestForm');
  
    let caseNumber = "01-101-01101";
    let otherAddress = "Somewhere in the Cloud";
    let otherName = "Micheal AI";
  
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
  
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const issue = document.getElementById('issue').value;
        const immediate = document.getElementById('immediate').checked ? 'Immediate attention is required' : '';
  
        const subject = encodeURIComponent('Account Update Request');
        let body = `Name: ${encodeURIComponent(name)}\n`;
        body += `Contact Email: ${encodeURIComponent(email)}\n`;
        body += `Contact Phone Number: ${encodeURIComponent(phone)}\n`;
        body += `Issue with Property: ${encodeURIComponent(issue)}\n`;
        body += `${immediate}`;
  
        const mailtoLink = `mailto:woodmortar@gmail.com?subject=${subject}&body=${body}`;
  
        window.location.href = mailtoLink;
    });
  
    function generatePDF(name, otherName, otherAddress, caseNumber, email, phone, issue, immediate) {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
  
      // Get page width
      const pageWidth = doc.internal.pageSize.getWidth();
      const leftTextX = 20; // Standard left-side text start
      const rightTextX = pageWidth - 60; // Right-side text start
      const bracketX = pageWidth * 0.505; // Positioning for closing parenthesis
  
      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("NOTICE OF HEARING", pageWidth / 2, 20, null, null, "center");
  
      // Court Name
      doc.setFontSize(12);
      doc.text("IN THE CLOUD COURT OF MICHEAL AI", pageWidth / 2, 30, null, null, "center");
  
      // Section with closing parenthesis brackets
      doc.setFontSize(12);
      doc.text(name, leftTextX, 50);
      doc.text(")", bracketX, 50);
  
      doc.text(email, leftTextX, 60);
      doc.text(")", bracketX, 60);
  
      doc.text("vs.", leftTextX, 70);
      doc.text(")", bracketX, 70);
      doc.text(caseNumber, rightTextX, 70);
  
      doc.text(otherName, leftTextX, 80);
      doc.text(")", bracketX, 80);
  
      doc.text(otherAddress, leftTextX, 90);
      doc.text(")", bracketX, 90);
  
      // Horizontal Line <hr>
      doc.setLineWidth(0.5);
      doc.line(20, 100, pageWidth - 20, 100);
  
      // Additional Information
      doc.setFontSize(12);
      doc.text("NOTICE IS HEREBY GIVEN that a fake hearing has been scheduled for:", 20, 110);
      doc.text( document.getElementById('name').value + " and Micheal AI as follows:", 20, 120);
      doc.text(`Issue: ${issue}`, 20, 130);
      if (immediate) {
          doc.text(`Urgency: ${immediate}`, 20, 140);
      }
  
      doc.setLineWidth(0.5);
      doc.line(20, 150, pageWidth - 20, 150);
  
      doc.text(`Sample: Sample Document`, 20, 160);
      doc.text(`Contact Email: ${email}`, 20, 170);
      doc.text(`Contact Phone: ${phone}`, 20, 180);
  
  
      // Signature Section
      doc.text("Signature:  __________________________", 20, 190);
      doc.text("Date:  ____________________", 20, 200);
  
      // Save and trigger download
      doc.save("Notice_of_Hearing.pdf");
  }
  
  
  

  document.getElementById('generatePDF').addEventListener('click', function() {
    // Retrieve the values from the form inputs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const issue = document.getElementById('issue').value;
    const immediate = document.getElementById('immediate').checked ? 'Immediate attention is required' : '';
  
    // Call function to generate the PDF
    generatePDF(name, otherAddress, otherName, caseNumber, email, phone, issue, immediate);
  });

    setTimeout(function() {
        
        // Check if the element exists
        if (chatWindow) {
            chatWindow.style.opacity = ".1"; // Hide the element
        }
    }, 6000); // Wait for 3 seconds (3000 milliseconds)
 
  