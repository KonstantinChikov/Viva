import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'

const scoreElement = document.getElementById('Score');

let filler = "\u3000";
let score = 0;
let food = getRandomFoodPosition();
const EXPANSION_RATE = 2;

export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
    score++;
  }
  scoreElement.innerHTML = `${filler} Score: ${score}`;
}

export function draw(gameBoard) {
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}

// export{ EXPANSION_RATE };