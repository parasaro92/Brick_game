var canvas1 = document.getElementById('myCanvas');
var ctx = canvas1.getContext('2d');

ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();


var x = canvas1.width/2;
var y = canvas1.height - 30;
var dx = 2;
var dy = -2;
var ballRad = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas1.width - paddleWidth)/2;
var paddleY = canvas1.height - paddleHeight;
var leftPress = false;
var rightPress = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {

  if(e.keyCode == 39) {
    rightPress = true;
  }
  else if(e.keyCode == 37) {
    leftPress = true;
  }
}

function keyUpHandler(e) {

  if(e.keyCode == 39) {
    rightPress = false;
  }
  else if(e.keyCode == 37) {
    leftPress = false;
  }
}

function drawBall() {

  ctx.beginPath();
  ctx.arc(x, y, ballRad, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {

  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {

  ctx.clearRect(0, 0, canvas1.width, canvas1.height);
  drawBall();
  drawPaddle();

  if(y + dy > canvas1.height - ballRad || y + dy < ballRad) {
    dy = -dy;
  }

  if(x + dx > canvas1.width - ballRad || x + dx < ballRad) {
    dx = -dx;
  }

  if(rightPress && paddleX < canvas1.width - paddleWidth) {
    paddleX += 7;
  }
  else if(leftPress && paddleX > 0){
    paddleX -= 7;
  }

  x += dx;
  y += dy;
}

setInterval(draw, 10);