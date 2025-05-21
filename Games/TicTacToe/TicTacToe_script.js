const board = document.getElementById("board");
const cells = document.querySelectorAll("[data-cell]");
const message = document.getElementById("message");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = [...cells].indexOf(cell);

    if (gameBoard[cellIndex] !== "" || gameOver) return;

    gameBoard[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWin(currentPlayer)) {
        gameOver = true;
        message.textContent = /* `Player ${currentPlayer} wins!` */ `Играч ${currentPlayer} Печели!`;
        highlightWinningCells(currentPlayer);
    } else if (gameBoard.every((cell) => cell !== "")) {
        gameOver = true;
        message.textContent = /* "It's a draw!" */ "Равенство";
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent =/* `Player ${currentPlayer}'s turn`*/ `Ред на ${currentPlayer}`;
    }
}

function checkWin(player) {
    return winPatterns.some((pattern) => {
        return pattern.every((index) => gameBoard[index] === player);
    });
}

function highlightWinningCells(player) {
    const winningPattern = winPatterns.find((pattern) => {
        return pattern.every((index) => gameBoard[index] === player);
    });

    if (winningPattern) {
        winningPattern.forEach((index) => {
            cells[index].classList.add(`winner-${player}`);
        });
    }
}

cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
});
