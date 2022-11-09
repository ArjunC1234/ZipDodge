var canvas = document.getElementById("canv")
var ctx = canvas.getContext("2d")

var player = {
  xvel : 0,
  yvel : 0,
  vector : [0, 0],
  width : 50,
  height : 50,
  x : canvas.width/2 - 50/2,
  y : canvas.height/2 - 50/2,
  speed : 0,
  maxspeed : 5,
}

var m = {
  x : 0,
  y : 0
}

canvas.addEventListener("mousedown", function (e) {
  let rect = canvas.getBoundingClientRect();
  m.x = event.clientX - rect.left;
  m.y = event.clientY - rect.top;
})

var now = 
var then = now
var delta = now - then
var frames = {
  now : Date.now(),
  then : Date.now(),
  delta : now - then,
  fps : 60,
}

frames.interval = 1000/fps
function loop() {
  requestAnimationFrame(loop)
  
  frames.now = Date.now()
  
  frames.delta = frames.now - frames.then
  
  
}