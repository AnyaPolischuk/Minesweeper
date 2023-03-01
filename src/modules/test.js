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
  const arrayIndexesOfBombs =  [...new Array(amountOfBombs)].map(() => Math.round(Math.random() * amountOfCells));

   let arrayOfBombs = new Array(amountOfCells);

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
    if (event.target.className === 'game-cell') {
      if (arrayIndexesOfBombs.includes(+event.target.id)) {
        event.target.classList.remove('game-cell');
        event.target.classList.add('game-cell__bomb');
        event.target.disabled = true;
      } else {

      }
    } else return;
  })
 
}

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
        console.log(matrixOfGame[i][j])
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