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

// Use IIFE to get human data from form// dont know how to

const getDataHuman = function () {
  const human = {};
  const formElements = document.querySelectorAll(
    "#name,#feet,#inches,#weight, #diet"
  );
  const [name, height_feet, height_inches, weight, diet] = formElements;
  human.species = name.value;
  human.height =
    parseInt(height_feet.value) * 12 + parseInt(height_inches.value);
  human.weight = weight.value;
  human.diet = diet.value;
  return human;
};

const getDinoOject = async () => {
  const list_dino = await fetch("./dino.json");
  const data_dino = await list_dino.json();
  return data_dino.Dinos;
};

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
const randomFact = async (dios, human) => {
  const randomIndex = Math.floor(Math.random() * dios.length);
  switch (randomIndex) {
    case 1:
      break;

    default:
      break;
  }

  return dios;
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

const factHeights = (dinoHeight, humanHeight) => {
  if (humanHeight > dinoHeight)
    return `You are taller than a ${dinoHeight} inches tall dinosaur by ${
      humanHeight - dinoHeight
    } inches.`;
  else if (humanHeight < dinoHeight)
    return `You are shorter than a ${dinoHeight} inches tall dinosaur by ${
      dinoHeight - humanHeight
    } inches.`;
  else return `You are as tall as a ${dinoHeight} inches tall dinosaur.`;
};

const factWeight = (dinoWeight, humanWeight) => {
  if (humanWeight > dinoWeight)
    return `You are heavier than a ${dinoWeight} lbs tall dinosaur by ${
      humanWeight - dinoWeight
    } lbs.`;
  else if (humanWeight < dinoWeight)
    return `You are lighter than a ${dinoWeight} lbs tall dinosaur by ${
      dinoWeight - humanWeight
    } lbs.`;
  else return `You are as tall as a ${dinoWeight} lbs tall dinosaur.`;
};

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
// const factDiet = (dinoDiet, humanDiet) => {
//   if (humanDiet.toLowerCase() === dinoDiet)
//     return `You have the same diet as a ${dinoDiet} dinosaur.`;
//   else return `You have a different diet compared to a ${dinoDiet} dinosaur.`;
// };

// Generate Tiles for each Dino in Array

const generateTiles = (arr, human) => {
  const elementGridDino = document.getElementById("grid");
  const elementItem = arr.map((element) => {
    element.species = element.species.toLowerCase();
    return `
      <div class="grid-item">
        <h3>${element.species}</h3>
        <img src="./images/${element.species}.png" alt="">
        <p>${element.fact}</p>
      </div>
    `;
  });

  const elementHuman = `
      <div class="grid-item">
        <h3>Human</h3>
        <img src="./images/human.png" alt="">
      </div>
  `;
  elementItem.splice(4, 0, elementHuman);
  elementGridDino.insertAdjacentHTML("afterbegin", elementItem.join(""));
};

// Add tiles to DOM

// Remove form from screen
const removeForm = () => {
  const elementForm = document.getElementById("dino-compare");
  elementForm.style.display = "none";
};

function fisherYatesShuffle(array) {
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
//random
const randomData = (listDino, human) => {
  const list_arr = fisherYatesShuffle([0, 1, 2, 3, 4, 5, 6, 7]);
  list_arr.map((element, index) => {
    if(listDino[element].species === 'Pigeon')
    {
      return listDino[element];
    }
    
    switch (index) {
    case 0:
      {
        listDino[element].fact = factHeights( listDino[element].height, human.height)
        return listDino[element]
      }
    case 1:
      {
        listDino[element].fact = factWeight( listDino[element].weight, human.weight)
        return listDino[element]
      }
    case 2:
      {
        // listDino[element].fact = factDiet( listDino[element].diet, human.diet)
        return listDino[element]
      }
  
    default:
      return listDino[element];
  }})
  return fisherYatesShuffle(listDino)
};

// On button click, prepare and display infographic

const btn = document.getElementById("btn");
btn.onclick = async () => {
  const human = await getDataHuman(); // data human
  const dino = await getDinoOject(); //mảng dino
  const dataGenerate = randomData(dino, human);
  console.log(dino,human );
  generateTiles(dataGenerate, human);
  removeForm();
  // getData()
};
