// canvas
const canvas = document.getElementById('snake');
const context = canvas.getContext('2d');
const box = 32;

// snake
const snake = [];
snake[0] = { x: 8 * box, y: 8 * box };

// moviment
let direction = 'right';
document.addEventListener('keydown', update);

// food
const food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

// score
const scoreArea = document.getElementById('score');
let score = 0;

console.log(canvas.width);
const cols = canvas.width / box;
const rows = canvas.height / box;

// functions
function createBG() {
  context.fillStyle = 'rgb(92, 180, 19)';
  context.fillRect(0, 0, 16 * box, 16 * box);

  for (let i = 0; i < 512; i++) {
    for (let j = 0; j < 512; j++) {
      context.strokeStyle = 'rgb(64, 130, 10)';
      context.strokeRect(i * box, j * box, box, box);
    }
  }
}

function createSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = 'rgb(6, 85, 36)'; 
    context.fillRect(snake[i].x, snake[i].y, box, box);
    context.strokeStyle = '64, 130, 10';
    context.strokeRect(snake[i].x, snake[i].y, box, box);
  }
}

function update(e) {
  if (e.keyCode === 37 && direction !== 'right') direction = 'left';
  if (e.keyCode === 39 && direction !== 'left') direction = 'right';
  if (e.keyCode === 38 && direction !== 'down') direction = 'up';
  if (e.keyCode === 40 && direction !== 'up') direction = 'down';
}

function drawFood() {
  context.fillStyle = 'rgb(214, 11, 28)';
  context.fillRect(food.x, food.y, box, box);
  context.strokeStyle = '64, 130, 10';
  context.strokeRect(food.x, food.y, box, box);
}

function changeDirectionAndSize() {
  if (snake[0].x > 15 * box && direction === 'right') snake[0].x = 0;
  if (snake[0].x < 0 && direction === 'left') snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction === 'down') snake[0].y = 0;
  if (snake[0].y < 0 && direction === 'up') snake[0].y = 16 * box;
  
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === 'right') snakeX += box;
  if (direction === 'left') snakeX -= box;
  if (direction === 'up') snakeY -= box;
  if (direction === 'down') snakeY += box;

  if (snakeX !== food.x || snakeY !== food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y =  Math.floor(Math.random() * 15 + 1) * box;

    score += 1;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

function killSnake() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      clearInterval(game);
      alert('Game Over :(');

      const startAgain = confirm('Start again?');

      if (startAgain) {
        score = 0;
        snake.length = 0;
        snake[0] = { x: 8 * box, y: 8 * box };

        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y =  Math.floor(Math.random() * 15 + 1) * box;
        setInterval(startGame, 100);
      }
    }
  }
}

function writeScore() {
  scoreArea.innerText = `SCORE: ${score}`;
}

function startGame() {
  createBG();
  createSnake();
  changeDirectionAndSize();
  drawFood();
  killSnake();
  writeScore();
}

const game = setInterval(startGame, 100);
