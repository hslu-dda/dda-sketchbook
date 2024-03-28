let molnars = [];
let data = [];
function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);

  d3.csv("gluecklichsein.csv", d3.autoType).then(function (csv) {
    data = csv;

    let x = 70;
    let y = 70;

    for (let i = 0; i < data.length; i++) {
      let nrPoints = map(data[i].gluecksLevel, 1, 3, 2, 10);
      let m = new Molnar(x, y, 30, nrPoints);
      molnars.push(m);

      x += 70;
      if (x > width - 50) {
        x = 70;
        y += 70;
      }
    }

    console.log(molnars.length);
  });
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
