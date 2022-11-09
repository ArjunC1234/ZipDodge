
// VARIRABLES/OBJECTS/ETC. ---------------------------------------------------------------------------------------


var canvas = document.getElementById("canv")
var ctx = canvas.getContext("2d")

canvas.width = 500
canvas.height = 500
//player object
var player = {
  xvel : 0,
  yvel : 0,
  vector : [0, 0],
  radius : 24,
  x : canvas.width/2,
  y : canvas.height/2,
  speed : 0,
  maxspeed : 5
}

//mouse pos
var m = {
  x : 0,
  y : 0
}

//fps data
var frames = {
  fps : 60
}
frames.interval = 1000/frames.fps
frames.now = Date.now()
frames.then = frames.now
frames.delta = frames.now - frames.then


// FUNCTIONS/EVENTS/ETC. ---------------------------------------------------------------------------------------

//update mouse pos onclick
canvas.addEventListener("mousedown", function (e) {
  let rect = canvas.getBoundingClientRect();
  m.x = event.clientX - rect.left;
  m.y = event.clientY - rect.top;
})

//draw function
function draw() {
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'cyan';
  ctx.fill();
  ctx.lineWidth = player.radius/10;
  ctx.strokeStyle = 'pink';
  ctx.stroke();
}

//vector calculator function
function getVector


//apply velocity
function applyPlayerUpdates() 
//game loop
function loop() {
  requestAnimationFrame(loop)
  
  frames.now = Date.now()
  frames.delta = frames.now - frames.then
  
  if (frames.delta >= frames.interval) {
    draw()
    
    frames.then = frames.now - (frames.delta % frames.interval);
  }
}

loop()