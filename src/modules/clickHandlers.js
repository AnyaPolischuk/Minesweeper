import { checkIsWin } from "./gameLogic";

export let amountOfFlags = 0;

const gameField = document.querySelector('.field');
const bombsZeroNumber = document.querySelector('.bombs__counter0');
const bombsFirstNumber = document.querySelector('.bombs__counter1');
const bombsSecondNumber = document.querySelector('.bombs__counter2');

export function createEventsOnMousedown() {
  gameField.addEventListener('mousedown', () => {
    const mousedownImg = document.querySelector('.timer__restart ');
    mousedownImg.classList.add('timer__restart_mousedown');
  })

  gameField.addEventListener('mouseup', () => {
    const mousedownImg = document.querySelector('.timer__restart ');
    mousedownImg.classList.remove('timer__restart_mousedown');
  })
}

export function rightClickHandler() {
  gameField.addEventListener('contextmenu', (event) => {

    const clickedElement = event.target;
    event.preventDefault();
    
    if (clickedElement.classList.contains('game-cell__flag')) {
      --amountOfFlags;
      bombPlusCount(40);
      clickedElement.classList.remove('game-cell__flag');
      clickedElement.classList.add('game-cell__question');
    } else if (clickedElement.classList.contains('game-cell__question')) {
      clickedElement.classList.remove('game-cell__question');
    } else if (!clickedElement.classList.contains('field') && !clickedElement.classList.contains('game-cell__number')) {
      ++amountOfFlags;
      bombMinusCount(40);
      clickedElement.classList.add('game-cell__flag');
    }
  })
}

export function bombMinusCount(bombs) {
  
  let currentAmountOfBombs = String(bombs - amountOfFlags);
  let previousAmountOfBombs = String(bombs - amountOfFlags + 1);

  if (+currentAmountOfBombs < 0) return;

  if (currentAmountOfBombs === '40') {
    bombsZeroNumber.classList.add('timer_0');
    bombsFirstNumber.classList.add('timer_4');
    bombsSecondNumber.classList.add('timer_0');
  } else if (currentAmountOfBombs.length === 2) {
    bombsFirstNumber.classList.remove(`timer_${previousAmountOfBombs[0]}`);
    bombsSecondNumber.classList.remove(`timer_${previousAmountOfBombs[1]}`);

    bombsFirstNumber.classList.add(`timer_${currentAmountOfBombs[0]}`);
    bombsSecondNumber.classList.add(`timer_${currentAmountOfBombs[1]}`);
  } else if (+currentAmountOfBombs >= 0) {
    bombsFirstNumber.classList.remove('timer_1');
    bombsFirstNumber.classList.add('timer_0');

    bombsSecondNumber.classList.remove(`timer_${previousAmountOfBombs[0]}`);
    bombsSecondNumber.classList.add(`timer_${currentAmountOfBombs[0]}`);
  } 
}

function bombPlusCount(bombs) {
  let currentAmountOfBombs = String(bombs - amountOfFlags);
  let previousAmountOfBombs = String(bombs - amountOfFlags - 1);

  if (currentAmountOfBombs.length === 2) {
    bombsFirstNumber.classList.remove(`timer_${previousAmountOfBombs[0]}`);
    bombsSecondNumber.classList.remove(`timer_${previousAmountOfBombs[1]}`);
    bombsSecondNumber.classList.remove(`timer_9`);

    bombsFirstNumber.classList.add(`timer_${currentAmountOfBombs[0]}`);
    bombsSecondNumber.classList.add(`timer_${currentAmountOfBombs[1]}`);
  } else if (+currentAmountOfBombs >= 0) {
    bombsFirstNumber.classList.remove('timer_1');
    bombsFirstNumber.classList.add('timer_0');

    bombsSecondNumber.classList.remove(`timer_${previousAmountOfBombs[0]}`);
    bombsSecondNumber.classList.add(`timer_${currentAmountOfBombs[0]}`);
  } 
}

export function restartGame() {
  const restartBtn = document.querySelector('.timer__restart ');
  restartBtn.addEventListener('click', () => {
    location.reload();
  })
}