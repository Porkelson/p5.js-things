var Boids = [];
var maxSpeed = 10;
var howmany = 100;

let alignSlider, cohesionSlider, avoidanceSlider, alphaSlider;

class Boid {
  constructor() {
    this.pos = createVector(random(0, width), random(0, height));
    this.vel = p5.Vector.random2D();
    this.vel.setMag(2, 4);
    this.acc = createVector();
    this.maxForce = 0.5;
    this.maxSpeed = 5;
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
    } else {
      if (this.pos.x < 0) {
        this.pos.x = width;
      }
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
    } else {
      if (this.pos.y < 0) {
        this.pos.y = height;
      }
    }
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(maxSpeed);

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  makeHimRed() {
    push();
    fill(255, 0, 0, 100);
    ellipse(this.pos.x, this.pos.y, 100);
    pop();
    // ellipse(this.pos.x, this.pos.y, 15);
  }

  align(boids) {
    let perception = 100;
    let steering = createVector();
    let countN = 0;

    for (let other of boids) {
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      if (d <= perception && d != 0) {
        steering.add(other.vel);
        countN++;
      }
    }
    if (countN > 0) {
      steering.div(countN);
      steering.setMag(this.maxSpeed);
      steering.sub(this.vel);
      steering.limit(this.maxForce);
      // this.vel.setHeading(steering.heading());
    }
    return steering;
  }

  cohesion(boids) {
    let perception = 100;
    let steering = createVector();
    let countN = 0;

    for (let other of boids) {
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      if (d <= perception && d != 0) {
        steering.add(other.pos);
        countN++;
      }
    }
    if (countN > 0) {
      steering.div(countN);
      steering.sub(this.pos);
      steering.setMag(this.maxSpeed);
      steering.sub(this.vel);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  avoidance(boids) {
    let perception = 50;
    let steering = createVector();
    let countN = 0;

    for (let other of boids) {
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      if (d <= perception && other != this) {
        let diff = p5.Vector.sub(this.pos, other.pos);
        diff.div(d);
        steering.add(diff);
        countN++;
      }
    }
    if (countN > 0) {
      steering.div(countN);
      steering.setMag(this.maxSpeed);
      steering.sub(this.vel);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  flock(boids) {
    this.acc.set(0, 0);
    let aligment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let avoidance = this.avoidance(boids);
    // let wynik = p5.Vector.lerp(aligment, cohesion, 0.3);

    aligment.mult(alignSlider.value());
    cohesion.mult(cohesionSlider.value());
    avoidance.mult(avoidanceSlider.value());

    this.acc.add(aligment);
    this.acc.add(cohesion);
    this.acc.add(avoidance);
    // this.acc = lerp(aligment, cohesion, 0.5);
  }
}


function setup() {
  createCanvas(1300, 800);
  alignSlider = createSlider(0, 5, 1, 0.1);
  cohesionSlider = createSlider(0, 5, 1, 0.1);
  avoidanceSlider = createSlider(0, 5, 1, 0.1);
  alphaSlider = createSlider(0, 255, 50, 1);
  for (let i = 0; i < howmany; i++) {
    Boids[i] = new Boid();
  }
}

function draw() {
  background(51, 173, 255, alphaSlider.value());
  for (let i = 0; i < howmany; i++) {
    let col = [255, 153, 51];
    drawArrow(Boids[i].pos, Boids[i].vel, col);
    
    Boids[i].edges();
    Boids[i].update();
    Boids[i].flock(Boids);
    // if(i==0){
    //   Boids[i].makeHimRed()
    // }
  }
}

function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  let arrLen = 10;
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 8;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}