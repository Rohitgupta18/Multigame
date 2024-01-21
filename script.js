
let direction = {x: 0, y: 0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
let speed = 8;
let lastPaintTime = 0;

let snakeArr = [
    {x: 13, y: 15}
]

let food = {x: 6, y: 7};
let inputDir = {x:0, y:0};
let score = 0;
let highscore = 0;



//game functions

function isCollide(snake) {
  // If you bump into yourself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // If you bump into the wall
  if (snake[0].x >= 25 || snake[0].x <= 0 || snake[0].y >= 25 || snake[0].y <= 0
  ) {
    return true;
  }

  return false;
}
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed) return;
    lastPaintTime = ctime;
    // console.log(ctime)
    gameEngine();
}

function gameEngine() {
  //updating snake array and food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    inputDir = { x: 0, y: 0 };
    alert("Game Over. Press any key to play again!");
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
    scoreBox.innerHTML = "Score: "+0;
  }

  //if u have eaten the food, increment the score and regenerate the food
  if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
    score++;
    scoreBox.innerHTML = "Score: "+score;
    if(score > highscore){
        highscore = score;
        highScoreBox.innerHTML = "HighScore: "+highscore;
    }

    foodSound.play();
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y
    });
    let a = 1;
    let b = 24;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };

  }

  //moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;



  // Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  // Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}



//main
window.requestAnimationFrame(main);

window.addEventListener('keydown', e=>{
     inputDir = {x:0, y:1}; //game starts
    moveSound.play();
    switch (e.key) {
      case "ArrowUp":
        console.log("up");
        inputDir.x = 0;
        inputDir.y = -1;
        break;
      case "ArrowDown":
        console.log("down");
        inputDir.x = 0;
        inputDir.y = 1;
        break;
      case "ArrowLeft":
        console.log("Left");
        inputDir.x = -1;
        inputDir.y = 0;
        break;
      case "ArrowRight":
        console.log("right");
        inputDir.x = 1;
        inputDir.y = 0;
        break;
    default:
        break;
    }
});