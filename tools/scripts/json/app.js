let motionData = [];

function processFiles() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;

    if (files.length === 0) {
        alert("Please select one or more files to upload.");
        return;
    }

    let filesProcessed = 0;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(event) {
            const fileContent = event.target.result;
            const motions = parseMotions(fileContent);
            motionData.push(...motions); // Add motions from this file

            console.log(`File ${file.name} processed.`);

            filesProcessed++;
            if (filesProcessed === files.length) {
                saveAsJSON();
            }
        };

        reader.readAsText(file);
    }
}

function parseMotions(text) {
    const regex = /\*\* Date \*\* (.*?)\n\*\* Name \*\* (.*?)(?=\n\*\* Date \*\*|\Z)/gs;
    let matches = [...text.matchAll(regex)];
    let motions = [];

    for (let match of matches) {
        let date = match[1].trim();
        let rest = match[2].trim();

        let name = '';
        let content = '';

        const splitIndex = rest.indexOf('\n');
        if (splitIndex !== -1) {
            name = rest.substring(0, splitIndex).trim();
            content = rest.substring(splitIndex + 1).trim();
        } else {
            name = rest;
        }

        motions.push({ date, name, content });
    }

    return motions;
}

function saveAsJSON() {
    const jsonContent = JSON.stringify(motionData, null, 2);

    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "motions_database.json";
    downloadLink.click();

    URL.revokeObjectURL(url);
    console.log("All motions saved to motions_database.json");
}
