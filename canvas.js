let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext('2d');



// c.fillStyle = "salmon";
// c.fillRect(x, y, w, h);

// // Line

// c.beginPath();
// c.moveTo(x-50,y+200);
// c.lineTo(x+200,y);
// c.lineTo(400,300);
// c.strokeStyle = "cornflowerblue";
// c.stroke();

// FOR LOOP FOR MANY CIRCLES
// for (var i = 0; i < 3; i++){
//   c.beginPath();
//   let X = Math.random() * window.innerWidth;
//   let Y = Math.random() * window.innerHeight;
//   c.arc(X,Y,30,0,Math.PI * 2, false);
//   c.strokeStyle = "lightgreen";
//   c.fillStyle = "lightgreen";
//   c.fill();
//   c.stroke();
// }

// Arc / Circle

let mouse = {
  x: undefined,
  y: undefined
}
let maxRadius = 40;
//let minRadius = 2;
let colorArr = [
  '#6997BF',
  '#082A40',
  '#ADC8D9',
  '#F2F2F2',
  "#275D73",
]

window.addEventListener('mousemove', function(e){
  mouse.x = e.x;
  mouse.y = e.y;
})

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
})

function Circle(x,y,dx,dy,radius){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius
  this.minRadius = radius
  this.color = colorArr[Math.floor(Math.random() * colorArr.length)]

  this.draw = function(){
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  this.update = function(){
    if(this.x + this.radius  > innerWidth  || this.x - this.radius < 0)
      { this.dx = -this.dx;}
    if(this.y + this.radius  > innerHeight || this.y - this.radius < 0)
      { this.dy = -this.dy;}
    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if(mouse.x - this.x < 50 && mouse.x - this.x > - 50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.radius < maxRadius){ this.radius += 1;}
    }else if(this.radius > this.minRadius)
      {this.radius -=1}


    this.draw();
  }
}






let circleArr = [];
function init(){
  circleArr = [];
  for(var i = 0; i < 1000; i++){
    let radius = Math.random() * 3 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 2;
    let dy = (Math.random() - 0.5) * 2;
    circleArr.push(new Circle(x, y, dx, dy, radius))
  }
}



function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth, innerHeight);
  circleArr.map((elem,i) => {
    circleArr[i].update();
  })


}

init();
animate();