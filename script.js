const main_element = document.querySelector("main");

let level = 10;
let cardsChoosed = [];
let allOptions = [];

function changeLevel() {
  level = level + 2;
  allOptions = [];
  cardsChoosed = [];
  initGame();
}
function chooseCard(e, icon, button) {
  button.classList.add("done");
  cardsChoosed.push(button);

  let winner = cardsChoosed.every((btn) => btn.classList.contains(icon));

  if (winner) {
    if (cardsChoosed.length > 1) {
      console.log("parabens");
      winner = false;
      cardsChoosed = [];
    }
  } else {
    cardsChoosed.forEach((btn) => btn.classList.remove("done"));
    cardsChoosed = [];
  }

  let allCardsDone = document.querySelectorAll(".done");
  if (allOptions.length == allCardsDone.length) {
    allCardsDone.forEach((card) => card.classList.remove("done"));
    changeLevel();
  }
}
const card = (icon) => {
  const button = document.createElement("button");
  button.classList.add("card");
  button.classList.add(icon);
  button.addEventListener("focus", (e) => chooseCard(e, icon, button));
  const span = document.createElement("span");
  span.classList.add("material-symbols-outlined");
  span.innerText = icon;
  button.appendChild(span);
  return button;
};

function shuffleArray(array) {
  function compareRandom(a, b) {
    return Math.random() - 0.5;
  }

  // Reordena o array usando o comparador de números aleatórios
  array.sort(compareRandom);
  return array;
}

function initGame() {
  let currentOptions = [];

  for (let index = 0; index < (level * level)/2; index++) {
    currentOptions.push(options[index]);
    currentOptions.push(options[index]);
  }

  console.log(currentOptions.length)
  allOptions = shuffleArray(currentOptions);
  main_element.style.gridTemplateColumns = `repeat(${
    level
  }, 1fr)`;
  main_element.style.gridTemplateRows = `repeat(${
    level
  }, 1fr)`;
  main_element.innerHTML = "";
  shuffleArray(currentOptions).forEach((icon) => {
    console.log(icon);
    main_element.appendChild(card(icon));
  });
}

window.onload = initGame();
