const gameField = document.querySelector('.field');

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
      clickedElement.classList.remove('game-cell__flag');
      clickedElement.classList.add('game-cell__question');
    } else if (clickedElement.classList.contains('game-cell__question')) {
      clickedElement.classList.remove('game-cell__question');
    } else if (!clickedElement.classList.contains('field') && !clickedElement.classList.contains('game-cell__number')) {
      clickedElement.classList.add('game-cell__flag');
    }
  })
}

export function restartGame() {
  const restartBtn = document.querySelector('.timer__restart ');
  restartBtn.addEventListener('click', () => {
    location.reload();
  })
}