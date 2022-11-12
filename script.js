
// VARIRABLES/OBJECTS/ETC. ---------------------------------------------------------------------------------------


var canvas = document.getElementById("canv")
var ctx = canvas.getContext("2d")
canvas.width = 800
canvas.height = 800

//turret class
function turret(x, y) {
  this.x = x
  this.y = y
  this.rotation = 0
  this.firetick
}


//player object
var player = {
  xvel : 0,
  yvel : 0,
  vector : [0, 0],
  radius : 24,
  x : canvas.width/2,
  y : canvas.height/2,
  speed : 0,
  maxspeed : 15,
  deaccdist : 150,
  acc : false
}

//mouse pos
var m = {
  x : player.x,
  y : player.y
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
  player.acc = true
})


//draw function
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle="gray"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'cyan';
  ctx.fill();
  ctx.lineWidth = player.radius/10;
  ctx.strokeStyle = 'black';
  ctx.stroke();
}


//set speed of vector
function setVectorSpeed(vec, speed) {
  console.log()
  if (Math.abs(player.x - m.x) > Math.abs(player.y - m.y)) {
    let dividend = Math.abs(vec[0]) / speed
    return [vec[0]/dividend, vec[1]/dividend]
  } else if (Math.abs(player.x - m.x) < Math.abs(player.y - m.y)) {
    let dividend = Math.abs(vec[1]) / speed
    return [vec[0]/dividend, vec[1]/dividend]
  } else {
    return [0, 0]
  }
}


//dist calculator
function dist(x1, y1, x2, y2) {
  return Math.sqrt((x2-x1)**2 + (y2-y1)**2)
}

//sets player speed
function setSpeed() {
  let d = dist(player.x, player.y, m.x, m.y)
  player.speed = player.maxspeed * (d/player.deaccdist)
}


//vector calculator function  
function getVector() {
  if (player.speed >= dist(player.x, player.y, m.x, m.y) && player.acc) {
    player.x = m.x
    player.y = m.y
  }
  else if (player.x != m.x || player.y != m.y) {
    player.vector = setVectorSpeed([m.x - player.x, m.y - player.y], player.speed)
  }
  else {
    player.vector = [0, 0]
  }
  player.acc = false
  player.xvel = player.vector[0]
  player.yvel = player.vector[1]
}


//apply velocity
function applyPlayerUpdates() {
  player.y += player.yvel
  player.x += player.xvel
}

function worldBorder () {
  if (player.x + player.radius > canvas.width) {
    player.x = canvas.width - player.radius
  }
  if (player.y + player.radius > canvas.height) {
    player.y = canvas.height - player.radius
  }
  if (player.x - player.radius < 0) {
    player.x = player.radius
  }
  if (player.y - player.radius < 0) {
    player.y = player.radius
  }
}


//game loop
function loop() {
  requestAnimationFrame(loop)
  
  frames.now = Date.now()
  frames.delta = frames.now - frames.then
  
  if (frames.delta >= frames.interval) {
    setSpeed()
    getVector()
    
    applyPlayerUpdates()
    worldBorder()
    draw()
    
    frames.then = frames.now - (frames.delta % frames.interval);
  }
}



// CALL GAME LOOP --------------------------------------------------------------------
loop()