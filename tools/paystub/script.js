// script.js
function generatePayStubs() {
    // Get form data
    const employeeName = document.getElementById('employeeName').value;
    const employeeId = document.getElementById('employeeId').value;
    const grossIncome = parseFloat(document.getElementById('grossIncome').value);
    const monthSelection = Array.from(document.getElementById('monthSelection').selectedOptions).map(option => option.value);

    // Handle the logo image
    const logoFile = document.getElementById('logo').files[0];
    let logoData = '';
    
    // If there's a logo file, load it into Base64 format
    if (logoFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            logoData = e.target.result; // Store Base64-encoded logo image
            generatePDFs(); // Generate PDFs after the logo is loaded
        };
        reader.readAsDataURL(logoFile); // Convert image to Base64
    } else {
        generatePDFs(); // If no logo, generate PDFs without it
    }

    // Function to generate the pay stubs
    function generatePDFs() {
        // Tax Rates for 2024 (fixed)
        const federalTaxRate = 0.062;  // Social Security rate
        const medicareRate = 0.0145;   // Medicare rate
        const stateTaxRate = 0.054;    // Missouri State Income Tax (estimated)

        // Calculate taxes for one month
        const socialSecurityTax = grossIncome * federalTaxRate;
        const medicareTax = grossIncome * medicareRate;
        const stateTax = grossIncome * stateTaxRate;
        const totalTax = socialSecurityTax + medicareTax + stateTax;
        const netIncome = grossIncome - totalTax;

        // Calculate Accumulated totals for selected months
        const numMonths = monthSelection.length;
        const totalGrossIncome = grossIncome * numMonths;
        const totalSocialSecurityTax = socialSecurityTax * numMonths;
        const totalMedicareTax = medicareTax * numMonths;
        const totalStateTax = stateTax * numMonths;
        const totalTaxWithheld = totalSocialSecurityTax + totalMedicareTax + totalStateTax;
        const totalNetIncome = totalGrossIncome - totalTaxWithheld;

        // Create PDFs for each month selected
        const { jsPDF } = window.jspdf;
        monthSelection.forEach(month => {
            const doc = new jsPDF();
            
            // Add Logo if available
            if (logoData) {
                doc.addImage(logoData, 'PNG', 10, 10, 50, 50);  // Add image at (10, 10) position with size 50x50
            }

            doc.setFontSize(16);
            doc.text('Pay Stub for ' + employeeName, 20, 70);
            doc.setFontSize(12);
            doc.text(`Employee ID: ${employeeId}`, 20, 80);
            doc.text(`Month: ${getMonthName(month)}`, 20, 90);
            
            // Single Month Details
            doc.text(`Gross Income: $${grossIncome.toFixed(2)}`, 20, 110);
            doc.text(`Federal Tax (Social Security): $${socialSecurityTax.toFixed(2)}`, 20, 120);
            doc.text(`Medicare Tax: $${medicareTax.toFixed(2)}`, 20, 130);
            doc.text(`State Tax (MO): $${stateTax.toFixed(2)}`, 20, 140);
            doc.text(`Net Income: $${netIncome.toFixed(2)}`, 20, 150);

            // Add Accumulated Totals
            doc.setFontSize(14);
            doc.text('--------- Accumulated Totals ---------', 20, 170);
            doc.setFontSize(12);
            doc.text(`Total Gross Income: $${totalGrossIncome.toFixed(2)}`, 20, 180);
            doc.text(`Total Federal Tax (Social Security): $${totalSocialSecurityTax.toFixed(2)}`, 20, 190);
            doc.text(`Total Medicare Tax: $${totalMedicareTax.toFixed(2)}`, 20, 200);
            doc.text(`Total State Tax (MO): $${totalStateTax.toFixed(2)}`, 20, 210);
            doc.text(`Total Tax Withheld: $${totalTaxWithheld.toFixed(2)}`, 20, 220);
            doc.text(`Total Net Income: $${totalNetIncome.toFixed(2)}`, 20, 230);

            // Save PDF
            doc.save(`pay_stub_${employeeName}_${getMonthName(month)}.pdf`);
        });
    }
}

// Utility function to get month name from number
function getMonthName(monthNumber) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthNumber - 1];
}
