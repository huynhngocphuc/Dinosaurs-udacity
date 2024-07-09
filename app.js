// Create Dino Constructor
class Dino {
  constructor(dinoOject) {
    const { species, weight, height, diet, where, when, fact } = dinoOject;
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
  }
}

// Create Human Constructor
class Human {
  constructor(species, weight, height, diet) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
  }
}

// Create Dino Objects
const getDinoOject = async () => {
  const listDinoFromJson = await fetch("./dino.json");
  const convertDataDino = await listDinoFromJson.json();
  const listOjectDino = convertDataDino["Dinos"].map((item) => new Dino(item));
  return listOjectDino;
};

// Create Human Object
const humanOject = new Human();

// Get Data Human
const getDataHuman = function () {
  const formElements = document.querySelectorAll(
    "#name,#feet,#inches,#weight, #diet"
  );
  const [name, height_feet, height_inches, weight, diet] = formElements;
  humanOject.species = name.value;
  humanOject.height =
    Number(height_feet.value) * 12 + Number(height_inches.value);
  humanOject.weight = weight.value;
  humanOject.diet = diet.value;
};

// Create Dino Compare Method 1
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
// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

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

const factDiet = (dinoDiet, humanDiet) => {
  if (humanDiet.toLowerCase() === dinoDiet)
    return `You have the same diet as a ${dinoDiet} dinosaur.`;
  else return `You have a different diet compared to a ${dinoDiet} dinosaur.`;
};

// Generate Tiles for each Dino in Array

const generateTiles = (arr) => {
  const elementGridDino = document.getElementById("grid");
  const elementList = arr.map((element) => {
    element.species = element.species.toLowerCase();
    return `
      <div class="grid-item">
        <h3>${element.species}</h3>
        <img src="./images/${element.species}.png" alt=${element.species}>
        <p>${element.fact}</p>
      </div>
    `;
  });

  const elementHuman = `
      <div class="grid-item">
        <h3>${humanOject.species}</h3>
        <img src="./images/human.png" alt="human">
      </div>
  `;
  elementList.splice(4, 0, elementHuman);
  elementGridDino.insertAdjacentHTML("afterbegin", elementList.join(""));
};

// Add tiles to DOM

// Remove form from screen
const removeForm = () => {
  const elementForm = document.getElementById("dino-compare");
  elementForm.style.display = "none";
};

// Random Arrays fisherYatesShuffle
function fisherYatesShuffle(array) {
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Random data to get titles
const randomData = (listDino) => {
  const listIndexDinoRandom = fisherYatesShuffle([0, 1, 2, 3, 4, 5, 6, 7]);
  listIndexDinoRandom.forEach((dinoIndex, index) => {
    if (listDino[dinoIndex].species === "Pigeon") {
      return;
    }
    switch (index) {
      case 0: {
        listDino[dinoIndex].fact = factHeights(
          listDino[dinoIndex].height,
          humanOject.height
        );
        break;
      }
      case 1: {
        listDino[dinoIndex].fact = factWeight(
          listDino[dinoIndex].weight,
          humanOject.weight
        );
        break;
      }
      case 2: {
        listDino[dinoIndex].fact = factDiet(
          listDino[dinoIndex].diet,
          humanOject.diet
        );
        break;
      }

      default:
        break;
    }
  });
  return fisherYatesShuffle(listDino);
};

const validateFormHuman = () => {
  let isValid = true;
  const elementErr = document.getElementById("text-err");
  elementErr.innerHTML = "";
  if (!humanOject.species) {
    isValid = false;
    elementErr.innerHTML += `<p>Please enter name</p>`;
  }
  if (!humanOject.height) {
    isValid = false;
    elementErr.innerHTML += `<p>Please enter height</p>`;
  }
  if (!humanOject.weight) {
    isValid = false;
    elementErr.innerHTML += `<p>Please enter weight</p>`;
  }
  return isValid;
};

// On button click, prepare and display infographic
const btn = document.getElementById("btn");
btn.onclick = async () => {
  getDataHuman();
  if (!validateFormHuman()) {
    return;
  }

  removeForm();
  const dinoListOject = await getDinoOject();
  const dataGenerate = randomData(dinoListOject);
  generateTiles(dataGenerate);
};
