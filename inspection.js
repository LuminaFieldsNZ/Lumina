

function startInspection() {
    const form = document.getElementById('inspectionForm');
    document.getElementById('inspectionForm').style.display = 'block';
    console.log("Inspection form displayed");
}

document.getElementById('inspectionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const inspectionData = {
        location: formData.get('location'),
        roomNumber: formData.get('roomNumber'),
        wallsAndCeiling: formData.get('wallsAndCeiling'),
        plumbing: formData.get('plumbing'),
        appliances: formData.get('appliances'),
        flooring: formData.get('flooring'),
        urgency: formData.get('urgency')
    };

    userData.roomMaintenance.push(inspectionData);
    updateJSONEditor();

    const chatWindow = document.getElementById('chatWindow');
    chatWindow.innerHTML += '<br><span class="gradient-text">Micheal</span>: Thank you for completing the inspection. Your responses have been recorded.</p>';
    scrollToBottom();

    // Hide the form and reset it
    event.target.reset();
    document.getElementById('inspectionForm').style.display = 'none';
    console.log("Inspection form hidden");
});

function fillInput(fieldId, value) {
    document.getElementById(fieldId).value = value;
    console.log(`Filled ${fieldId} with ${value}`);
}
