// запускать при 1ом клике на поле

export function createCounter(minutes) {
  let current = minutes;
  const counter = document.querySelector('.timer__counter');
  counter.innerHTML = current;

  const timerId = setInterval(function() {
    console.log(current);
    counter.innerHTML = current;
    if (current <= 0) {
      console.log('game over');
      clearInterval(timerId);
    }
    current--;
  }, 60000);
}

export function createTimer() {
  let currentTime = 0;
  const timer = document.querySelector('.timer__stopwatch');
  timer.innerHTML = currentTime;
  
  const timerId = setInterval(function() {
    console.log(currentTime);
    // counter.innerHTML = current
    // if (current <= 0) {
    //   console.log('game over')
    //   clearInterval(timerId);
    // }
    timer.innerHTML = currentTime;
    currentTime++;
  }, 1000);
}


