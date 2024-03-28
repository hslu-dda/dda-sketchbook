let molnars = [];

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  let x = 100;
  let y = 100;

  for (let i = 0; i < 49; i++) {
    let nrPoints = random(2, 50);
    let m = new Molnar(x, y, 40, nrPoints);
    molnars.push(m);

    x += 100;
    if (x > width - 100) {
      x = 100;
      y += 100;
    }
  }
}

function draw() {
  background(220);

  for (let i = 0; i < molnars.length; i++) {
    molnars[i].display();
  }
}

class Molnar {
  constructor(x, y, s, n) {
    this.pos = createVector(x, y);
    this.v = createVector(s, 0);
    this.n = n;
    this.points = [];
    for (let i = 0; i < this.n; i++) {
      let theta = random(0, 360);
      this.v.setHeading(theta);
      let p = p5.Vector.add(this.pos, this.v);
      this.points.push(p);
    }
  }

  display() {
    noFill();
    stroke(0);
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      vertex(p.x, p.y);
    }
    endShape();

    noFill();
    stroke(0, 50);
    ellipse(this.pos.x, this.pos.y, this.v.mag() * 2);
  }
}
