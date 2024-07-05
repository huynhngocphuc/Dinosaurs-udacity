// Create Dino Constructor
function Dino(species, weight, height, diet, where, when, fact) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
}

function Human(species, weight, height, diet) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
}


// Create Dino Objects

// const Dino = new Dino()

// Create Human Object

const human = new Human();
// Use IIFE to get human data from form// dont know how to

const getDataHuman = function () {
  console.log("running IIFE...");
  const formElements = document.querySelectorAll(
    "#name,#feet,#inches,#weight, #diet"
  );
  const [name, height_feet, height_inches, weight, diet] = formElements;
  human.species = name.value;
  human.height =
    parseInt(height_feet.value) * 12 + parseInt(height_inches.value);
  human.weight = weight.value;
  human.diet = diet.value;
};

const getDinoOject = async () => {
  const list_dino = await fetch("./dino.json");
  const data_dino = await list_dino.json();
  console.log("🚀 ~ getDinoOject ~ data_dino:", data_dino.Dinos)
  
  return data_dino.Dinos
};

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

const generateTiles = (arr) => {
  const elementGridDino = document.getElementById("grid");
  const elementItem = arr.map((element) => {
    element.species = element.species.toLowerCase();
    return `
      <div class="grid-item">
        <h3>${element.species}</h3>
        <img src="./images/${element.species}.png" alt="">
        <p>content</p>
      </div>
    `;
  });
  elementGridDino.insertAdjacentHTML("afterbegin", elementItem.join(""));
  console.log(elementGridDino);
};

// Add tiles to DOM

// Remove form from screen
const removeForm = () => {
  const elementForm = document.getElementById("dino-compare");
  elementForm.style.display = "none";
};

// On button click, prepare and display infographic

const btn = document.getElementById("btn");
btn.onclick = async() => {
  const formElements = document.querySelectorAll(
    "#name,#feet,#inches,#weight, #diet"
  );
  const [name, height_feet, height_inches, weight, diet] = formElements;
  const dinos = await getDinoOject()
  generateTiles(dinos);
  removeForm()
  // getData()
  console.log(human);
};


