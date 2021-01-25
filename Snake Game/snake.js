var grid = document.querySelector(".grid");
var popup = document.querySelector(".popup");
var playAgain = document.querySelector(".playAgain");
var scoreDisplay = document.querySelector(".scoreDisplay");
var left = document.querySelector(".left");
var bottom = document.querySelector(".bottom");
var right = document.querySelector(".right");
var up = document.querySelector(".top");
var width = 10;
var currentIndex = 0;
var appleIndex = 0;
var currentSnake = [2, 1, 0];
var direction = 1;
var score = 0;
var speed = 0.8;
var intervalTime = 0;
var interval = 0;

document.addEventListener("DOMContentLoaded", function () {
    createBoard();
    startGame();
    document.addEventListener("keydown", control);
    playAgain.addEventListener("click", replay);
});

function createBoard() {
    popup.style.display = "none";
    for (var i = 0; i < 100; i++) {
        var div = document.createElement("div");
        grid.appendChild(div);
    }
}

function startGame() {
    var squares = document.querySelectorAll(".grid div");
    randomApple(squares);
    //random apple 
    direction = 1;
    scoreDisplay.innerHTML = "Score: " + score;
    intervalTime = 1000;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach(index => squares[index].classList.add("snake"));
    interval = setInterval(moveOutcome, intervalTime);
}

function moveOutcome() {
    var squares = document.querySelectorAll(".grid div");
    if (checkForHits(squares)) {
        // alert("you hit something")
        popup.style.display = "flex";
        return clearInterval(interval);
    } else {
        moveSnake(squares);
    }
}

function moveSnake(squares) {
    var tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);
    // movement ends here  
    eatApple(squares, tail);
    squares[currentSnake[0]].classList.add("snake");
}

function checkForHits(squares) {
    if (
        (currentSnake[0] + width >= (width * width) && direction === width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width <= 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
        return true;
    } else {
        return false;
    }
}

function eatApple(squares, tail) {
    if (squares[currentSnake[0]].classList.contains("apple")) {
        squares[currentSnake[0]].classList.remove("apple");
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        randomApple(squares);
        score++;
        scoreDisplay.textContent = "Score: " + score;
        clearInterval(interval);
        intervalTime = intervalTime * speed;
        interval = setInterval(moveOutcome, intervalTime);
    }
}

function randomApple(squares) {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");
}

function control(e) {
    if (e.keyCode === 39) {
        direction = 1; // right 
    } else if (e.keyCode === 38) {
        direction = -width; //if we press the up arrow, the snake will go ten divs up
    } else if (e.keyCode === 37) {
        direction = -1 // left, the snake will go left one div
    } else if (e.keyCode === 40) {
        direction = +width; // down the snake head will instantly appear 10 divs below from the current div 
    }
}

up.addEventListener("click", () => direction = -width);
bottom.addEventListener("click", () => direction = +width);
left.addEventListener("click", () => direction = -1);
right.addEventListener("click", () => direction = 1);

function replay() {
    grid.innerHTML = "";
    createBoard();
    startGame();
    popup.style.display = "none";
}  