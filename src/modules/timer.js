export function createCounter(minutes) {
  let current = minutes;
  
  const counterZeroNumber = document.querySelector('.timer__counter0');
  const counterFirstNumber = document.querySelector('.timer__counter1');
  const counterSecondNumber = document.querySelector('.timer__counter2');

  counterZeroNumber.classList.add('number_0');
  counterFirstNumber.classList.add('number_4');
  counterSecondNumber.classList.add('number_0');

  const timerId = setInterval(function() {
    current--;
    let currentTimeString = String(current);
    let previousTimeString = String(current + 1);
    
    if (currentTimeString.length === 1) {
      counterFirstNumber.classList.remove(`number_${previousTimeString[0]}`);
      counterSecondNumber.classList.remove(`number_${previousTimeString[0]}`);

      counterFirstNumber.classList.add(`number_0`);
      counterSecondNumber.classList.add(`number_${currentTimeString[0]}`);

    } else {
      counterFirstNumber.classList.remove(`number_${previousTimeString[0]}`);
      counterSecondNumber.classList.remove(`number_${previousTimeString[1]}`);

      counterFirstNumber.classList.add(`number_${currentTimeString[0]}`);
      counterSecondNumber.classList.add(`number_${currentTimeString[1]}`);
    }
    
    if (current <= 0) {
      alert('game over');
      clearInterval(timerId);
      counterFirstNumber.classList.add(`number_0`)
      counterSecondNumber.classList.add(`number_0`)
    }
    
    
  }, 60000);
}

export function createTimer() {
  let currentTime = 0;
  
  const timerZeroNumber = document.querySelector('.timer__stopwatch0');
  const timerFirstNumber = document.querySelector('.timer__stopwatch1');
  const timerSecondNumber = document.querySelector('.timer__stopwatch2');

  timerZeroNumber.classList.add('number_0');
  timerFirstNumber.classList.add('number_0');
  timerSecondNumber.classList.add('number_0');
  
  const timerId = setInterval(function() {
    let currentTimeString = String(currentTime);
    let previousTimeString = String(currentTime - 1);

    if (currentTimeString.length === 1) {
      timerSecondNumber.classList.remove(`number_${previousTimeString[0]}`);

      timerSecondNumber.classList.add(`number_${currentTimeString[0]}`);
    } else if (currentTimeString.length === 2) {
      timerFirstNumber.classList.remove(`number_${previousTimeString[0]}`);
      timerSecondNumber.classList.remove(`number_${previousTimeString[1]}`);
      timerSecondNumber.classList.remove('number_9');

      timerFirstNumber.classList.add(`number_${currentTimeString[0]}`);
      timerSecondNumber.classList.add(`number_${currentTimeString[1]}`);
    } else if (currentTimeString.length === 3) {
      timerZeroNumber.classList.remove(`number_${previousTimeString[0]}`);
      timerFirstNumber.classList.remove(`number_${previousTimeString[1]}`);
      timerSecondNumber.classList.remove(`number_${previousTimeString[2]}`);
      timerSecondNumber.classList.remove('number_9');

      timerZeroNumber.classList.add(`number_${currentTimeString[0]}`);
      timerFirstNumber.classList.add(`number_${currentTimeString[1]}`);
      timerSecondNumber.classList.add(`number_${currentTimeString[2]}`);
    }
    currentTime++;
  }, 1000);
}


