import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood, score } from './food.js'
import { outsideGrid } from './grid.js'
import { CURRENT_USER, saveScore } from '../../MainPage/scripts/util.js'

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');
const popup = document.getElementById('popup');


function main(currentTime) {
  if (gameOver) {
    showPopup();
    saveScore(localStorage.getItem(CURRENT_USER), 'snake', score);
    return;
  }

  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = '';
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}


function showPopup() {
  popup.style.visibility = 'visible';
}

function hidePopup() {
  popup.style.visibility = 'hidden';
}

const refreshButton = document.getElementById('refreshButton');
refreshButton.addEventListener('click', function () {
  hidePopup();
  window.location.reload();
});