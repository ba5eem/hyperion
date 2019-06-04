//jshint esversion: 6
console.log("sanity check-app.js lives here");
//https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript
// canvas dimension: width="480" height="320"
//////////VARIABLES////////////
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const ballRadius = 10;
//x & y positions:
var x = 0;
var y = canvas.height-30;
/////EVENT LISTENERS/////
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

var dx = 2;
var dy = -1;
//Paddle dimensions:
const paddleHeight = 20;
const paddleWidth = 150;
//paddle positioning
var paddleX = 10;//sets it to start in the middle of the page
var paddleY = canvas.height/2;
//Key variables
var rightPressed = false;
var leftPressed = false;
//score variables
var score = 0;
//life variables
var lives = 3;
//brick variables
const brickRowCount = 5;
const brickColumnCount = 1;
const brickWidth = 90;
const brickHeight = Math.floor((Math.random() * 10) + 30);
const brickPadding = Math.floor((Math.random() * 300) + 50)+brickHeight;
const brickOffsetTop = 10;
const brickOffsetLeft =450;
var brickX = 450;
var brickY = Math.floor((Math.random() * brickHeight) + 30);
const bricks = [];
//enters into array for drawBricks functions to work - need to look over this, it was on the 6th step - to understand more about how this is working.
for(c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 };
    }
}

function yPosition(){
  var brickY = Math.floor((Math.random() * 10) + 30);
  return brickY;
}
function newBrick(){
  var newBrick = [
  ctx.rect(brickX,yPosition(),brickWidth,brickHeight), 
  ctx.rect(brickX,yPosition()+brickY,brickWidth,brickHeight),
  ctx.rect(brickX,yPosition()+brickY+100,brickWidth,brickHeight)];
  return newBrick;

}


function drawBricks() {
    ctx.beginPath();
    newBrick();

    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();

}







function drawObstacle() {
    ctx.beginPath();
    ctx.rect(x,y,60,30);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}


function mouseMoveHandler(e){
  let relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width){
    paddleX = relativeX - paddleWidth/2;
  }
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, 30, paddleHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawPaddle();
    brickX -=dx;

    if(brickX === -brickWidth){
      brickX = 460;
      brickY += 20;
    }
    if(brickY === 320){
      brickY = 30;
    }
     //paddle conditional // will allow movement but prevent from moving if reaches border
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleY += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleY -= 7;
    }

    
    // x -= dx;

}

setInterval(draw, 10);