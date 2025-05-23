import { CURRENT_USER, saveScore } from '../../MainPage/scripts/util.js'

// Board dimensions
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

// Player dimensions and velocity
let playerWidth = 90;
let playerHeight = 15;
let playerVelocityX = 35; // pixels per button click

let player = {
    x: boardWidth / 2 - playerWidth / 2,
    y: boardHeight - playerHeight - 5,
    width: playerWidth,
    height: playerHeight,
    velocityX: playerVelocityX
};

// Ball dimensions and velocity
let ballWidth = 10;
let ballHeight = 10;
let ballVelocityX = 2;
let ballVelocityY = 2;

let ball = {
    x: boardWidth / 2,
    y: boardHeight / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX: ballVelocityX,
    velocityY: ballVelocityY
};

// Blocks
let blockArray = [];
let blockWidth = 50;
let blockHeight = 15;
let blockColumns = 8;
let blockRows = 3;
let blockMaxRows = 10; // Limit the number of rows (unused)
let blockCount = 0;

// Block starting position
let blockX = 15;
let blockY = 45;

// Score and game state
let score = 0;
let gameOver = false;
let level = 1; 

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); 

    // Draw the initial player
    context.fillStyle = "skyblue";
    context.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);
    document.addEventListener("keydown", movePlayer);


    createBlocks();
}
document.onkeydown = e => {
    if (gameOver && e.key === 'Space') {
        resetGame();
    }
}
function update() {
    requestAnimationFrame(update);
    // Stop drawing if gameOver
    if (gameOver) {
        saveScore(localStorage.getItem(CURRENT_USER), 'breakout', score);
        return;
    }
    context.clearRect(0, 0, board.width, board.height);


    adjustDifficulty();

    // Draw player
    context.fillStyle = "skyblue";
    context.fillRect(player.x, player.y, player.width, player.height);

    // Draw ball
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    // Ball collision with the player paddle
    if (topCollision(ball, player) || bottomCollision(ball, player)) {
        ball.velocityY *= -1;
    } else if (leftCollision(ball, player) || rightCollision(ball, player)) {
        ball.velocityX *= -1;
    }

    // Ball hits the top of the screen
    if (ball.y <= 0) {
        ball.velocityY *= -1;
    }
    // Ball hits the left or right wall
    else if (ball.x <= 0 || (ball.x + ball.width >= boardWidth)) {
        ball.velocityX *= -1;
    }
    // Ball hits the bottom of the screen (game over)
    else if (ball.y + ball.height >= boardHeight) {

        // context.font = "25px Arial sans-serif";
        // context.fillText("Game Over: Press 'Space' to Restart", 80, 400);       // English versian

        context.font = "20px Arial sans-serif";
        context.fillText("ИЗГУБИХТЕ: Натиснете Спайс, за да продължите", 45, 400); // Bulgarian versian

        gameOver = true;
    }

    // Draw the blocks
    context.fillStyle = "skyblue";
    for (let i = 0; i < blockArray.length; i++) {
        let block = blockArray[i];
        if (!block.break) {
            // Check for collisions with the ball and break the block
            if (topCollision(ball, block) || bottomCollision(ball, block)) {
                block.break = true;
                ball.velocityY *= -1;
                score += 100;
                blockCount -= 1;
            } else if (leftCollision(ball, block) || rightCollision(ball, block)) {
                block.break = true;
                ball.velocityX *= -1;
                score += 100;
                blockCount -= 1;
            }
            context.fillRect(block.x, block.y, block.width, block.height);
        }
    }

    // Check if all blocks are cleared (next level)
    if (blockCount == 0) {
        score += 100 * blockRows * blockColumns; // Bonus points for clearing the level
        level++;

        if (level > 3) {
            gameOver = true;
            saveScore(localStorage.getItem(CURRENT_USER), 'breakout', score);

            // context.fillText("YOU WON: Press 'Space' to start a new game", 50, 400);     // English versian

            context.fillText("ВИЕ СПЕЧЕЛИХТЕ: Натиснете Спайс за да продължите", 50, 400);  // Bulgarian versian

            return;
        }
        
        blockCount = 0; 
        createBlocks(); 
    }

    // Display score and level
    context.font = "20px sans-serif";
    // context.fillText("Score: " + score, 10, 25);
    context.fillText("Резултат: " + score, 10, 25);
    // context.fillText("Level: " + level, board.width - 100, 25);
    context.fillText("Ниво: " + level, board.width - 100, 25);

}

function movePlayer(e) {
    if (gameOver) {
        if (e.code == "Space") {
            resetGame();
            console.log("RESET");
        }
        return;
    }
    if (e.code == "ArrowLeft") {
        let nextPlayerX = player.x - player.velocityX;
        if (!outOfBounds(nextPlayerX +10)) {
            player.x = nextPlayerX;
        }
    } else if (e.code == "ArrowRight") {
        let nextPlayerX = player.x + player.velocityX;
        if (!outOfBounds(nextPlayerX -10)) {
            player.x = nextPlayerX;
        }
    }
}

function outOfBounds(xPosition) {
    return xPosition < 0 || xPosition + playerWidth >= boardWidth;
}

function detectCollision(a, b) {
    return a.x < b.x + b.width && 
           a.x + a.width > b.x && 
           a.y < b.y + b.height && 
           a.y + a.height > b.y;
}

function topCollision(ball, block) {
    return detectCollision(ball, block) && (ball.y + ball.height) >= block.y;
}

function bottomCollision(ball, block) {
    return detectCollision(ball, block) && (block.y + block.height) >= ball.y;
}

function leftCollision(ball, block) {
    return detectCollision(ball, block) && (ball.x + ball.width) >= block.x;
}

function rightCollision(ball, block) {
    return detectCollision(ball, block) && (block.x + block.width) >= ball.x;
}

function createBlocks() {
    blockArray = []; 

    // Adjust the rows and columns based on the current level
    if (level === 1) {
        blockRows = 3;
        blockColumns = 8;
    } else if (level === 2) {
        blockRows = 6;
        blockColumns = 8;
    } else if (level === 3) {
        blockRows = 9;
        blockColumns = 8;
    }

    for (let c = 0; c < blockColumns; c++) {
        for (let r = 0; r < blockRows; r++) {
            let block = {
                x: blockX + c * blockWidth + c * 10,
                y: blockY + r * blockHeight + r * 10,
                width: blockWidth,
                height: blockHeight,
                break: false,
                
            };

            // Create a pattern for level 3 
            if (level === 3) {
                if (Math.random() < 0.3) {
                    block.break = true; 
                }
            }

            blockArray.push(block);
        }
    }

    // blockCount = blockArray.length;
    blockCount = blockArray.filter(b => !b.break).length

    ball = {
        x: boardWidth / 2,
        y: boardHeight / 1.7,
        width: ballWidth,
        height: ballHeight,
        velocityX: ballVelocityX = 2,
        velocityY: ballVelocityY = 2
    };
}

function resetGame() {
    gameOver = false;
    score = 0;
    level = 1; // Reset level to 1

    player = {
        x: boardWidth / 2 - playerWidth / 2,
        y: boardHeight - playerHeight - 5,
        width: playerWidth,
        height: playerHeight,
        velocityX: playerVelocityX
    };

    createBlocks();
}

function adjustDifficulty() {
    if (level === 2) {
        ball.velocityX = ball.velocityX > 0 ? 3 : -3; 
        ball.velocityY = ball.velocityY > 0 ? 2 : -2;
    } else if (level === 3) {
        ball.velocityX = ball.velocityX > 0 ? 3 : -3;
        ball.velocityY = ball.velocityY > 0 ? 2 : -2;
    }
}