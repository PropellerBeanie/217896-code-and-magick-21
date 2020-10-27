'use strict';


const NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const LAST_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const SIMILAR_WIZARDS_NUM = 4;
const SIMILAR_WIZARD_TEMPLATE = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

let userDialog = document.querySelector(`.setup`);
let similarList = userDialog.querySelector(`.setup-similar-list`);


userDialog.classList.remove(`hidden`);

let getRandomElNum = function (array) {
  return (getRandomNumber(array.length - 1));
};

let getWizardObject = function (names, lastNames, coatColors, eyesColors) {
  let wizardObject = {
    name: `${names[getRandomElNum(names)]} ${lastNames[getRandomElNum(lastNames)]}`,
    coatColor: coatColors[getRandomElNum(coatColors)],
    eyesColor: eyesColors[getRandomElNum(eyesColors)]
  };
  return (wizardObject);
};

let getSimilarWizardsArr = function (num) {
  let wizardsArr = [];
  for (let i = 0; i < num; i++) {
    wizardsArr[i] = getWizardObject(NAMES, LAST_NAMES, COAT_COLORS, EYES_COLORS);
  }
  return (wizardsArr);
};

let renderWizard = function (wizardObject) {
  let wizardElement = SIMILAR_WIZARD_TEMPLATE.cloneNode(true);
  wizardElement.querySelector(`.setup-similar-label`).textContent = wizardObject.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizardObject.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizardObject.eyesColor;
  return (wizardElement);
};

let renderSimilarWizards = function () {
  let wizardsArr = getSimilarWizardsArr(SIMILAR_WIZARDS_NUM);
  let fragment = document.createDocumentFragment();

  for (let similarWizard of wizardsArr) {
    fragment.appendChild(renderWizard(similarWizard));
  }
  return (fragment);
};

similarList.appendChild(renderSimilarWizards());

userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
