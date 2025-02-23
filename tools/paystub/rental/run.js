const fs = require('fs');
const path = require('path');

const picsFolder = './pics'; // Path to your pics folder
const outputFile = './image-list.js'; // Output file

// Read the contents of the pics folder
fs.readdir(picsFolder, (err, files) => {
  if (err) {
    console.error('Error reading pics folder:', err);
    return;
  }

  // Filter for image files (you can add more extensions if needed)
  const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

  // Generate the list of image paths
  const imageList = imageFiles.map(file => `'pics/${file}'`).join(',\n  ');

  // Write the list to a file
  const outputContent = `const imageFiles = [\n  ${imageList}\n];\n`;
  fs.writeFile(outputFile, outputContent, err => {
    if (err) {
      console.error('Error writing output file:', err);
      return;
    }
    console.log(`Image list generated successfully in ${outputFile}`);
  });
});