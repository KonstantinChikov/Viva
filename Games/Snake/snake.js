import { getInputDirection } from "./input.js"
// import { EXPANSION_RATE } from "./food.js"

const diffSelect = document.getElementById('difficulty-select');
let SNAKE_SPEED = 3;

diffSelect.addEventListener('keydown', event => {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
  }
})

diffSelect.onchange = () => {
  updateSnakeSpeed(diffSelect.value);
}

function updateSnakeSpeed(difficulty) {
  switch (difficulty) {
    case 'easy':
      // EXPANSION_RATE = 2
      SNAKE_SPEED = 3;
      break;
    case 'medium':
      // EXPANSION_RATE = 3
      SNAKE_SPEED = 6;
      break;
    case 'hard':
      // EXPANSION_RATE = 4
      SNAKE_SPEED = 12;
      break;
  }
}

const snakeBody = [{ x: 11, y: 11 }];
let newSegments = 0;

export function update() {

  addSegments();
  const inputDirection = getInputDirection();

  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;

  
}

export function draw(gameBoard) {

  snakeBody.forEach((segment, index) => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;

    if (index === 0) {
      snakeElement.classList.add('snakeHead');
    } else if(index === snakeBody.length - 1){
      snakeElement.classList.add('snakeTaleEnd');
    }else {
      snakeElement.classList.add('snake');
    }

    gameBoard.appendChild(snakeElement);
  })

}

export function expandSnake(amount) {
  newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPositions(segment, position);
  })
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  newSegments = 0;
}

export { SNAKE_SPEED };
