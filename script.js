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

// functions
function createBG() {
  context.fillStyle = 'lightgreen';
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = 'purple';
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function update(e) {
  if (e.keyCode === 37 && direction !== 'right') direction = 'left';
  if (e.keyCode === 39 && direction !== 'left') direction = 'right';
  if (e.keyCode === 38 && direction !== 'down') direction = 'up';
  if (e.keyCode === 40 && direction !== 'up') direction = 'down';
}

function drawFood() {
  context.fillStyle = 'red';
  context.fillRect(food.x, food.y, box, box);
}

function startGame() {
  if (snake[0].x > 15 * box && direction === 'right') snake[0].x = 0;
  if (snake[0].x < 0 && direction === 'left') snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction === 'down') snake[0].y = 0;
  if (snake[0].y < 0 && direction === 'up') snake[0].y = 16 * box;

  createBG();
  createSnake();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === 'right') snakeX += box;
  if (direction === 'left') snakeX -= box;
  if (direction === 'up') snakeY -= box;
  if (direction === 'down') snakeY += box;

  snake.pop();

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

const game = setInterval(startGame, 100);
