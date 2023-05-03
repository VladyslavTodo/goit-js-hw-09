const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const body = document.body;

let changeTimer = null;
let isActive = false;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

buttonStart.addEventListener('click', onChangeColor);
buttonStop.addEventListener('click', offChangeColor);

function onChangeColor() {
  if (isActive) return;
  isActive = true;
  changeTimer = setInterval(changeBackground, 1000);
  
}

function offChangeColor() {
  if (!isActive) return;
  isActive = false;
  clearInterval(changeTimer);
}

function changeBackground() {
  body.style.background = getRandomHexColor();
}
