const gameField = document.querySelector('.field');

export function createGameField(row, columns) {

  for (let i = 0; i < row * columns; i++) {
      const gameCell = document.createElement('div');
      gameCell.classList.add('game-cell');
      gameCell.id = `${i}`;
      gameField.append(gameCell);
  }
}

export function createMatrixOfGame(amountOfCells, amountOfBombs) {
  const arrayIndexesOfBombs = [];
  let arrayOfBombs = new Array(amountOfCells);

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

   const convertedArrayToMatrix = convertArrayToMatrix(arrayOfBombs, 16);
   const resultMatrixOfGame = countBombsInCells(convertedArrayToMatrix);

   console.log(resultMatrixOfGame);

  gameField.addEventListener('click', (event) => {
    const index = +event.target.id;
    const row = Math.trunc(index / 16);
    const column = Math.trunc(index - row * 16);
    
    if (event.target.className === 'game-cell') {
      if (arrayIndexesOfBombs.includes(index)) {
        openBombMap(event.target, arrayIndexesOfBombs);
      } else if (resultMatrixOfGame[row][column] !== 0) {
        event.target.classList.add('game-cell__number');
        event.target.innerHTML = resultMatrixOfGame[row][column]
        event.target.style.pointerEvents = 'none';
      } else if (resultMatrixOfGame[row][column] == 0) {
        event.target.classList.add('game-cell__zero');
        console.log('its 0')
        event.target.innerHTML = resultMatrixOfGame[row][column]
        event.target.style.pointerEvents = 'none';
      }
    } else return;
  })
}


// function open(i, j, resultMatrixOfGame) {
//   const allCellsArray = Array.from(document.querySelectorAll('.game-cell'));
//   const index = (i + 1) * (j + 1) - 1;
//   if (i < 0 || i >= resultMatrixOfGame.length || j < 0 || j >= resultMatrixOfGame[i].length) return;
  
//   if (allCellsArray[index].classList.contains('game-cell__number') || 
//   allCellsArray[index].classList.contains('game-cell__zero')) {
//     console.log('already pressed')
    
//   }
//   allCellsArray[index].innerHTML = resultMatrixOfGame[i][j]
  //console.log('all cells', allCellsArray[index])
  
  // open(i + 1, j, resultMatrixOfGame);
  // open(i - 1, j, resultMatrixOfGame);
  // open(i, j + 1, resultMatrixOfGame);
  // open(i, j - 1, resultMatrixOfGame);
//}
 
function openBombMap(bombCell, arrayOfBombs) {
  const allCellsArray = Array.from(document.querySelectorAll('.game-cell'));
  const mousedownImg = document.querySelector('.timer__restart ');

  bombCell.classList.add('game-cell__bomb_red');

  // console.log('allCellsArray', allCellsArray);
  // console.log('arrayOfBombs', arrayOfBombs);

  arrayOfBombs.forEach(item => {
    //console.log('allCellsArray[item]', allCellsArray[item]);
    allCellsArray[item].classList.add('game-cell__bomb')
  })
  gameField.style.pointerEvents = 'none';

  mousedownImg.classList.add('timer__restart_lost');
  gameField.disabled = true;
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