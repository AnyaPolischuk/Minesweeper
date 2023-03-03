import './index.html';
import './style.scss';
import {createGameField, createMatrixOfGame, createEventsOnMousedown, restartGame} from './modules/test';
import {createCounter, createTimer} from './modules/timer';


createGameField(16, 16);
createMatrixOfGame(256, 40);

createCounter(40);
createTimer();

createEventsOnMousedown();
restartGame();




