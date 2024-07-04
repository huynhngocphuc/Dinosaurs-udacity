// Create Dino Constructor

// Create Dino Objects

// Create Human Object

// Use IIFE to get human data from form

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic

const btn = document.getElementById("btn");
btn.onclick = () => {
  const formElements = document.querySelectorAll(
    "#name,#feet,#inches,#weight, #diet"
  );
  const [name, height_feet, height_inches, weight, diet] = formElements;
  console.log("🚀 ~ formElements:", formElements);
};
