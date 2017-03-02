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
var brickRowCount = 3;
var brickColCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for(c=0; c<brickColCount; c++){
  bricks[c] = [];
  for(r=0; r<brickRowCount; r++){
    bricks[c][r] = {x:0, y:0, status: 1}
  }  
}

function drawBricks(){

  for(c=0; c<brickColCount; c++){
    for(r=0; r<brickRowCount; r++){
      if(bricks[c][r].status == 1){
        var brickX = (c*(brickWidth+brickPadding)) + brickOffsetLeft;
        var brickY = (r*(brickHeight+brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;

        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function collisionDetection(){

  for(c=0; c<brickColCount; c++){
    for(r=0; r<brickRowCount; r++){
      var b = bricks[c][r];
      if(b.status == 1){
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
          dy = -dy;
          b.status = 0;
        }
      }
    }
  }
}

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
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();

  if(y + dy < ballRad) {
    dy = -dy;
  }else if(y + dy > canvas1.height - ballRad) {
    if(x > paddleX && x < paddleX + paddleWidth){
      dy = -dy;
    }else {
      // alert("GAME OVER");
      document.location.reload();
    }
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