const GRID_SIZE = 18;
const GRID_MIN = 4;
const GRID_MAX = GRID_SIZE;

function randomPositionInGrid(randomPosition = {x: 0, y: 0}) {
  do {
    randomPosition.x = Math.floor(Math.random() * GRID_SIZE) + 1;
    randomPosition.y = Math.floor(Math.random() * GRID_SIZE) + 1;

  } while (outsideGrid(randomPosition))
  return randomPosition;
}
export function randomGridPosition() {
  return randomPositionInGrid();
}

export function outsideGrid(position) {
  return (
    position.x < GRID_MIN || position.x > GRID_MAX ||
    position.y < GRID_MIN || position.y > GRID_MAX
  );
}