export function createCounter(minutes) {
  let current = minutes;
  
  const counterZeroNumber = document.querySelector('.timer__counter0');
  const counterFirstNumber = document.querySelector('.timer__counter1');
  const counterSecondNumber = document.querySelector('.timer__counter2');

  counterZeroNumber.classList.add('timer_0');
  counterFirstNumber.classList.add('timer_4');
  counterSecondNumber.classList.add('timer_0');

  const timerId = setInterval(function() {
    current--;
    let currentTimeString = String(current);
    let previousTimeString = String(current + 1);
    
    if (currentTimeString.length === 1) {
      counterFirstNumber.classList.remove(`timer_${previousTimeString[0]}`);
      counterSecondNumber.classList.remove(`timer_${previousTimeString[0]}`);

      counterFirstNumber.classList.add(`timer_0`);
      counterSecondNumber.classList.add(`timer_${currentTimeString[0]}`);

    } else {
      counterFirstNumber.classList.remove(`timer_${previousTimeString[0]}`);
      counterSecondNumber.classList.remove(`timer_${previousTimeString[1]}`);

      counterFirstNumber.classList.add(`timer_${currentTimeString[0]}`);
      counterSecondNumber.classList.add(`timer_${currentTimeString[1]}`);
    }
    
    if (current <= 0) {
      alert('game over');
      clearInterval(timerId);
      counterFirstNumber.classList.add(`timer_0`)
      counterSecondNumber.classList.add(`timer_0`)
    }
    
    
  }, 60000);
}

export function createTimer() {
  let currentTime = 0;
  
  const timerZeroNumber = document.querySelector('.timer__stopwatch0');
  const timerFirstNumber = document.querySelector('.timer__stopwatch1');
  const timerSecondNumber = document.querySelector('.timer__stopwatch2');

  timerZeroNumber.classList.add('timer_0');
  timerFirstNumber.classList.add('timer_0');
  timerSecondNumber.classList.add('timer_0');
  
  const timerId = setInterval(function() {
    let currentTimeString = String(currentTime);
    let previousTimeString = String(currentTime - 1);

    if (currentTimeString.length === 1) {
      timerSecondNumber.classList.remove(`timer_${previousTimeString[0]}`);

      timerSecondNumber.classList.add(`timer_${currentTimeString[0]}`);
    } else if (currentTimeString.length === 2) {
      timerFirstNumber.classList.remove(`timer_${previousTimeString[0]}`);
      timerSecondNumber.classList.remove(`timer_${previousTimeString[1]}`);
      timerSecondNumber.classList.remove('timer_9');

      timerFirstNumber.classList.add(`timer_${currentTimeString[0]}`);
      timerSecondNumber.classList.add(`timer_${currentTimeString[1]}`);
    } else if (currentTimeString.length === 3) {
      timerZeroNumber.classList.remove(`timer_${previousTimeString[0]}`);
      timerFirstNumber.classList.remove(`timer_${previousTimeString[1]}`);
      timerSecondNumber.classList.remove(`timer_${previousTimeString[2]}`);
      timerSecondNumber.classList.remove('timer_9');

      timerZeroNumber.classList.add(`timer_${currentTimeString[0]}`);
      timerFirstNumber.classList.add(`timer_${currentTimeString[1]}`);
      timerSecondNumber.classList.add(`timer_${currentTimeString[2]}`);
    }
    currentTime++;
  }, 1000);
}


