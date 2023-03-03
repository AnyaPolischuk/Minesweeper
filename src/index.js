import './index.html';
import './style.scss';
import {createGameField, createMatrixOfGame} from './modules/gameLogic';
import {createEventsOnMousedown, rightClickHandler, restartGame} from './modules/clickHandlers';
import {createCounter, createTimer} from './modules/timer';


createGameField(16, 16);
createMatrixOfGame(256, 40);

createCounter(40);
createTimer();

createEventsOnMousedown();
restartGame();

rightClickHandler();




