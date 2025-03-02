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


    let lastLoser = "right";
    function resetBall() {
        ballX = 300;
    ballY = 200;

    // Reverse ball direction based on the last loser
    ballSpeedX = lastLoser === "left" ? 4 : -4;
    ballSpeedY = Math.random() < 0.5 ? 4 : -4; // Randomize Y direction
    }

    function update() {

        ballX += ballSpeedX;
        ballY += ballSpeedY;

        if (ballY < 0 || ballY > 380) {
            ballSpeedY = -ballSpeedY;
        }

        if (
            (ballX < 30 && ballY > leftPaddleY && ballY < leftPaddleY + 80) ||
            (ballX > 550 && ballY > rightPaddleY && ballY < rightPaddleY + 80)
        ) {
            ballSpeedX = -ballSpeedX;
        }

        if (ballX < 0) {
            rightScore++;
            lastLoser = "right"; // Track last losing player
            resetBall();
        }

        if (ballX > 600) {
            leftScore++;
            lastLoser = "left"; // Track last losing player
            resetBall();
        }

        ball.style.left = ballX + "px";
        ball.style.top = ballY + "px";

        leftPaddle.style.top = leftPaddleY + "px";
        rightPaddle.style.top = rightPaddleY + "px";

        // Update scores
        document.getElementById("leftScore").innerText = leftScore;
        document.getElementById("rightScore").innerText = rightScore;
    }

    // function handleKeyDown(event) {
    //     switch (event.key) {
    //         case "ArrowUp":
    //             rightPaddleY -= paddleSpeed;
    //             break;
    //         case "ArrowDown":
    //             rightPaddleY += paddleSpeed;
    //             break;
    //         case "w":
    //             leftPaddleY -= paddleSpeed;
    //             break;
    //         case "s":
    //             leftPaddleY += paddleSpeed;
    //             break;
    //     }
    // }
    function handleKeyDown(event) {
        switch (event.key) {
            case "ArrowUp":
                rightPaddleY = Math.max(0, rightPaddleY - paddleSpeed);
                break;
            case "ArrowDown":
                rightPaddleY = Math.min(320, rightPaddleY + paddleSpeed);
                break;
            case "w":
            case "W":
                leftPaddleY = Math.max(0, leftPaddleY - paddleSpeed);
                break;
            case "s":
            case "S":
                leftPaddleY = Math.min(320, leftPaddleY + paddleSpeed);
                break;
        }
        event.preventDefault(); //This stops unwanted scrolling
    }

    document.addEventListener("keydown", handleKeyDown);

    function gameLoop() {
        update();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});