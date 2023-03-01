export function createGameField() {
  const gameField = document.querySelector('.field');


  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      const gameCell = document.createElement('div');
      gameCell.classList.add('game-cell');
      gameField.append(gameCell);
    }
  }
}