let x;
let y;
let angle;
let s;
function setup() {
  createCanvas(1080,1080);
  background(0);

  let v;
  let sun;
  let r = width * 0.25;
  x = 500;
  y = 500;
  angle = 0;
}

function draw() {
  s = width * 0.6;
  translate(width/2, height/2);
  v = createVector(random(-s,s), random(-s, s));
  strokeWeight(3);
  stroke(255, 204, 0, 50);
  line(v.x, v.y, x * sin(angle), y * cos(angle));
  
  angle += 0.9;
}
