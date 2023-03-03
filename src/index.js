import './index.html';
import './style.scss';
import {createGameField, createMatrixOfGame} from './modules/gameLogic';
import {createEventsOnMousedown, rightClickHandler, restartGame, countBombs} from './modules/clickHandlers';
import {createTimer} from './modules/timer';



createGameField(16, 16);
createMatrixOfGame(256, 40);

createTimer();

createEventsOnMousedown();
restartGame();

rightClickHandler();


countBombs(40);



