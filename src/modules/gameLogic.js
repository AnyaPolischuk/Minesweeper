import { restartGame } from "./clickHandlers";

const gameField = document.querySelector('.field');

export let isLoss = false;
export let isWin = false;
let countClick = 0;

export function createGameField(row, columns) {

  for (let i = 0; i < row * columns; i++) {
      const gameCell = document.createElement('div');
      gameCell.classList.add('game-cell');
      gameCell.id = `${i}`;
      gameField.append(gameCell);
  }
  console.log(document.querySelectorAll('.game-cell'))
}

export function createMatrixOfGame(amountOfCells, amountOfBombs) {
  const arrayIndexesOfBombs = [];
  let arrayOfBombs = new Array(amountOfCells);
  const allCellsArray = Array.from(document.querySelectorAll('.game-cell'));

  while(arrayIndexesOfBombs.length < amountOfBombs) {

    const indexOfBomb = Math.floor(Math.random() * (amountOfCells - 1)) + 1;

    if (arrayIndexesOfBombs.indexOf(indexOfBomb) === -1) {
      arrayIndexesOfBombs.push(indexOfBomb);
    } 
  }

   for (let i = 0; i < amountOfCells; i++) {
    arrayOfBombs[arrayIndexesOfBombs[i]] = 'x';
   }

   for (let i = 0; i < amountOfCells; i++) {
    if (!arrayOfBombs[i]) {
      arrayOfBombs[i] = 0
    }
   }

   let convertedArrayToMatrix = convertArrayToMatrix(arrayOfBombs, 16);
   let resultMatrixOfGame = countBombsInCells(convertedArrayToMatrix);

   console.log(resultMatrixOfGame);

  gameField.addEventListener('click', (event) => {
    const index = +event.target.id;
    const row = Math.trunc(index / 16);
    const column = Math.trunc(index - row * 16);
    
    if (event.target.className === 'game-cell') {
      ++countClick;
      if (arrayIndexesOfBombs.includes(index)) {
        if (countClick === 1) {
          const newArrayOfBombs = changeBombAfterFirstClick(arrayIndexesOfBombs, index, amountOfCells);  
          convertedArrayToMatrix = convertArrayToMatrix(newArrayOfBombs, 16);
          console.log('convertedArrayToMatrix', convertedArrayToMatrix)
          resultMatrixOfGame = countBombsInCells(convertedArrayToMatrix); 
        } else {
          isLoss = true;
          openBombMap(event.target, arrayIndexesOfBombs);
        }
        
      }  if (resultMatrixOfGame[row][column] !== 0) {
        event.target.classList.add('game-cell__number');
        event.target.classList.add(`number_${resultMatrixOfGame[row][column]}`);
        event.target.style.pointerEvents = 'none';
      } else if (resultMatrixOfGame[row][column] == 0) {
         openFieldWithoutBombs(row, column, resultMatrixOfGame);
      } 
      checkIsWin(allCellsArray, resultMatrixOfGame)
     
    } else return;
  })
}

export function checkIsWin(allCellsArray, resultMatrixOfGame) {
  let counter = 0;
  let index;
  for (let i = 0; i < 16; i++) {
    for (let j = 0;  j < 16; j++) {
      if (resultMatrixOfGame[i][j] !== 'x') {
         index = i * 16 + j;
         if (allCellsArray[index].classList.contains('number_0') ||
              allCellsArray[index].classList.contains('number_1') ||
              allCellsArray[index].classList.contains('number_2') ||
              allCellsArray[index].classList.contains('number_3') ||
              allCellsArray[index].classList.contains('number_4') ||
              allCellsArray[index].classList.contains('number_5') ||
              allCellsArray[index].classList.contains('number_6') ||
              allCellsArray[index].classList.contains('number_7') ||
              allCellsArray[index].classList.contains('number_8')) {
                counter++;
              }
      }
    } 
  }

  console.log('counter', counter)
  if (counter == 216) {
    const winImg = document.querySelector('.timer-restart');
    winImg.classList.add('timer-restart_win');
    isWin = true;
  }
}

function changeBombAfterFirstClick(indexesOfBombs, index, amountOfCells) {
  const indexOfIndexBomb = indexesOfBombs.indexOf(index);
  let arrayOfBombs = new Array(amountOfCells);
  
  let newBombIndex = Math.floor(Math.random() * 255);

  while (indexesOfBombs.includes(newBombIndex)) {
    newBombIndex = Math.floor(Math.random() * 255);
  }

  indexesOfBombs.splice(indexOfIndexBomb, 1);
  indexesOfBombs.push(newBombIndex);

  for (let i = 0; i < amountOfCells; i++) {
    arrayOfBombs[indexesOfBombs[i]] = 'x';
   }

   for (let i = 0; i < amountOfCells; i++) {
    if (!arrayOfBombs[i]) {
      arrayOfBombs[i] = 0
    }
   }

  return arrayOfBombs;
}

function openFieldWithoutBombs(i, j, resultMatrixOfGame) {
  const columns = 16;
  const allCellsArray = Array.from(document.querySelectorAll('.game-cell'));
  console.log('infinity')
  const index = i * columns + j;

  if (i < 0 || i >= resultMatrixOfGame.length || j < 0 || j >= resultMatrixOfGame[i].length) return;

  // заменить на регулярку от 0 до 9
  if (
      allCellsArray[index].classList.contains('number_0') ||
      allCellsArray[index].classList.contains('number_1') ||
      allCellsArray[index].classList.contains('number_2') ||
      allCellsArray[index].classList.contains('number_3') ||
      allCellsArray[index].classList.contains('number_4') ||
      allCellsArray[index].classList.contains('number_5') ||
      allCellsArray[index].classList.contains('number_6') ||
      allCellsArray[index].classList.contains('number_7') ||
      allCellsArray[index].classList.contains('number_8') ||
      allCellsArray[index].innerHTML) {
    return;
  } 

  if (resultMatrixOfGame[i][j] === 0) {
    allCellsArray[index].classList.add('number_0')
  } else if (resultMatrixOfGame[i][j] !== 'x') {
    allCellsArray[index].classList.add(`number_${resultMatrixOfGame[i][j]}`)
    return;
  } else return;
   
  openFieldWithoutBombs(i + 1, j, resultMatrixOfGame);
  openFieldWithoutBombs(i + 1, j + 1, resultMatrixOfGame);
  openFieldWithoutBombs(i, j + 1, resultMatrixOfGame);
  openFieldWithoutBombs(i - 1, j + 1, resultMatrixOfGame);
  openFieldWithoutBombs(i - 1, j, resultMatrixOfGame);
  openFieldWithoutBombs(i - 1, j - 1, resultMatrixOfGame);
  openFieldWithoutBombs(i, j - 1, resultMatrixOfGame);
  openFieldWithoutBombs(i + 1, j - 1, resultMatrixOfGame);
}


 
function openBombMap(bombCell, arrayOfBombs) {
  const mousedownImg = document.querySelector('.timer-restart ');
  const allCellsArray = Array.from(document.querySelectorAll('.game-cell'));
  bombCell.classList.add('game-cell__bomb_red');

  arrayOfBombs.forEach(item => {
    allCellsArray[item].classList.add('game-cell__bomb');

    if (allCellsArray[item].classList.contains('game-cell__flag') && allCellsArray[item].classList.contains('game-cell__bomb')) {
      allCellsArray[item].classList.add('game-cell__flag');
    }
  });

  allCellsArray.forEach(item => {
    if (item.classList.contains('game-cell__flag') && !(item.classList.contains('game-cell__bomb'))) {
      item.classList.remove('game-cell__flag');
      item.classList.add('game-cell__bomb_cross');
    } 
  })

  gameField.style.pointerEvents = 'none';

  mousedownImg.classList.add('timer-restart_lost');
}
















//функции ниже можно перенести в отдельный файл
function convertArrayToMatrix(array, elementsPerSubArray) {
  let matrix = [], i, k;

  for (i = 0, k = -1; i < array.length; i++) {
      if (i % elementsPerSubArray === 0) {
          k++;
          matrix[k] = [];
      }

      matrix[k].push(array[i]);
  }

  return matrix;
}

function countBombsInCells(matrixOfGame) {
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      let count = 0;
      if (matrixOfGame[i][j] === 0) {

        if (i <= 14 && matrixOfGame[i + 1][j] === 'x') {
          count++;
        }
        if (i >= 1 && matrixOfGame[i - 1][j] === 'x') {
          count++;
        }
        if (i <= 14 && j < 14 && matrixOfGame[i + 1][j + 1] === 'x') {
          count++;
        }
        if (i <= 14 && j >= 1 && matrixOfGame[i + 1][j - 1] === 'x') {
          count++;
        }
        if (j <= 14 && matrixOfGame[i][j + 1] === 'x') {
          count++;
        }
        if (j >= 1 && matrixOfGame[i][j - 1] === 'x') {
          count++;
        }
        if (i >= 1 && j >= 1  && matrixOfGame[i - 1][j - 1] === 'x') {
          count++;
        }
        if (i >= 1 && j <= 14 && matrixOfGame[i - 1][j + 1] === 'x') {
          count++;
        }
        matrixOfGame[i][j] = count;
      }
    }
  }
  return matrixOfGame;
}