window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
})()

let canvas2 = document.getElementById("lizi");
let ctx2 = canvas2.getContext("2d");


let w = window.innerWidth;
let h = window.innerHeight;

canvas2.width = w
canvas2.height = h

function Point (x, y) {
  this.x = x
  this.y = y
  this.r = 1 + Math.random() * 2
  this.sx = Math.random() * 2 - 1
  this.sy = Math.random() * 2 - 1
}

Point.prototype.draw = function (ctx2) {
  ctx2.beginPath()
  ctx2.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
  ctx2.closePath()
  ctx2.fillStyle = '#aaa'
  ctx2.fill()
}

Point.prototype.move = function () {
  this.x += this.sx
  this.y += this.sy
  if (this.x > w) this.sx = -Math.abs(this.sx)
  else if (this.x < 0) this.sx = Math.abs(this.sx)
  if (this.y > h) this.sy = -Math.abs(this.sy)
  else if (this.y < 0) this.sy = Math.abs(this.sy)
}

Point.prototype.drawLine = function (ctx2, p) {
  let dx = this.x - p.x
  let dy = this.y - p.y
  let d = Math.sqrt(dx * dx + dy * dy)
  if (d < 100) {
    let alpha = (100 - d) / 100 * 1
    ctx2.beginPath()
    ctx2.moveTo(this.x, this.y)
    ctx2.lineTo(p.x, p.y)
    ctx2.closePath()
    ctx2.strokeStyle = 'rgba(170, 170, 170, ' + alpha + ')'
    ctx2.strokeWidth = 1
    ctx2.stroke()
  }
}

let points = []

for (let i = 0; i < 40; i++) {
  points.push(new Point(Math.random() * w, Math.random() * h))
}

function paint () {
  ctx2.clearRect(0, 0, w, h)
  for (let i = 0; i < points.length; i++) {
    points[i].move()
    points[i].draw(ctx2)
    for (let j = i + 1; j < points.length; j++) {
      points[i].drawLine(ctx2, points[j])
    }
  }
}

function loop () {
  requestAnimFrame(loop)
  paint()
}

window.addEventListener('load', loop())
window.addEventListener('resize', function () {
  w = canvas2.width = canvas2.offsetWidth
  h = canvas2.height = canvas2.offsetHeight
})