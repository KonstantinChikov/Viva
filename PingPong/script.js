document.addEventListener("DOMContentLoaded", function () {
    const ball = document.querySelector(".ball");
    const leftPaddle = document.getElementById("leftPaddle");
    const rightPaddle = document.getElementById("rightPaddle");

    let ballX = 300;
    let ballY = 200;
    let ballSpeedX = 4;
    let ballSpeedY = 4;

    let leftPaddleY = 160;
    let rightPaddleY = 160;

    let leftScore = 0;
    let rightScore = 0;

    const paddleSpeed = 52;

    function resetBall() {
        ballX = 300;
        ballY = 100;
        ballSpeedX = 4;
        ballSpeedY = 4;
    }

    function update() {
        // Update ball position
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Check collision with walls
        if (ballY < 0 || ballY > 380) {
            ballSpeedY = -ballSpeedY;
        }

        // Check collision with paddles
        if (
            (ballX < 30 && ballY > leftPaddleY && ballY < leftPaddleY + 80) ||
            (ballX > 550 && ballY > rightPaddleY && ballY < rightPaddleY + 80)
        ) {
            ballSpeedX = -ballSpeedX;
        }

        // Check if the ball goes out on the left
        if (ballX < 0) {
            rightScore++;
            resetBall();
        }

        // Check if the ball goes out on the right
        if (ballX > 600) {
            leftScore++;
            resetBall();
        }

        // Update ball position
        ball.style.left = ballX + "px";
        ball.style.top = ballY + "px";

        // Update paddle position
        leftPaddle.style.top = leftPaddleY + "px";
        rightPaddle.style.top = rightPaddleY + "px";

        // Update scores
        document.getElementById("leftScore").innerText = leftScore;
        document.getElementById("rightScore").innerText = rightScore;
    }

    function handleKeyDown(event) {
        switch (event.key) {
            case "ArrowUp":
                rightPaddleY -= paddleSpeed;
                break;
            case "ArrowDown":
                rightPaddleY += paddleSpeed;
                break;
            case "w":
                leftPaddleY -= paddleSpeed;
                break;
            case "s":
                leftPaddleY += paddleSpeed;
                break;
        }
    }

    document.addEventListener("keydown", handleKeyDown);

    function gameLoop() {
        update();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});