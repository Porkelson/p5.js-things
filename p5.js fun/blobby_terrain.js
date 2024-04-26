var scl = 30;
var w, h;
var rows, cols;
var terrain = [];
var moving = 0;
var minH = -100;
var maxH = 200;
var angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  w = 1000;
  h = 1000;
  rows = w / scl;
  cols = h / scl;
}

function draw() {
  background(0,100,255);
  rotateX(PI / 3);
  var yoff = moving;
  angle+=0.01;

  for (var i = 0; i < rows+1; i++) {
    var xoff = 0;
    for (var j = 0; j < cols; j++) {
      terrain[j + i * rows] = map(noise(xoff, yoff), 0, 1, minH, maxH);
      // terrain[j + i * rows] = map(random(xoff,yoff),-1,1,-40,230);
      xoff += 0.1;
    }
    yoff += 0.1;
  }
  background(0);

  translate(-w / 2, -h / 2 + 2 * scl);
//  stroke(255);
  for (var y = 0; y < rows; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      noStroke();
      var R1, G1, B1, R2, G2, B2;
      
      R1 = map(terrain[x + y * rows], minH, maxH, 0, 255);
      G1 = map(terrain[x + y * rows], minH, maxH, 255, 0);
      B1 = map(terrain[x + y * rows], minH, maxH, 0, 0);
      
      fill(R1,G1,B1);
      // stroke(R1,G1,B1);
      vertex(y * scl, x * scl, terrain[x + y * rows]);
      
      R2 = map(terrain[x + (y + 1) * rows], minH, maxH, 0, 255);
      G2 = map(terrain[x + (y + 1) * rows], minH, maxH, 255, 50);
      B1 = map(terrain[x + (y + 1) * rows], minH, maxH, 0, 0);
      
      fill(R2,G2,B2);
      // stroke(R2,G2,B2);
      vertex((y + 1) * scl, x * scl, terrain[x + (y + 1) * rows]);
    }
    endShape();
  }


  moving -= 0.01;
}
