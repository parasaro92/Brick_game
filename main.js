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

setInterval(draw, 10);

var x = canvas1.width/2;
var y = canvas1.height - 30;
var dx = 2;
var dy = -2;

function drawBall() {

  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {

  ctx.clearRect(0, 0, canvas1.width, canvas1.height);
  drawBall();
  x += dx;
  y += dy;
}