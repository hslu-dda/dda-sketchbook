let walkers = [];
let food;

function setup() {
  createCanvas(800, 600);

  food = new Food(width / 2, height / 2);

  for (let i = 0; i < 10; i++) {
    let walker = new Walker(100, 100);
    walkers.push(walker);
  }

  angleMode(DEGREES);
}

function draw() {
  background(220);

  food.display();

  for (let i = 0; i < walkers.length; i++) {
    walkers[i].display();
    walkers[i].update();
  }
}

class Walker {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(1, 0);
    this.energy = random(50, 100);
  }

  update() {
    let theta = random(-10, 10);
    this.vel.rotate(theta);

    if (this.energy < 50) {
      // der geschwindkeitsvektor zeigt in richtung food.
      // this.vel neue definieren so dass this.vel richtung food zeigt.
      let dir = p5.Vector.sub(food.pos, this.pos);
      let speed = this.vel.mag();
      this.vel = dir;
      this.vel.setMag(speed);

      let distance = this.pos.dist(food.pos);
      if (distance < 20) {
        this.energy = 100;
      }
    }

    // speed hängt von der energie ab
    let speed = map(this.energy, 0, 100, 0.1, 5);
    this.vel.setMag(speed);

    this.pos.add(this.vel);

    if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    }

    this.energy = this.energy - 0.1;
    this.energy = constrain(this.energy, 0, 100);
  }

  display() {
    noStroke();
    fill(0);

    ellipse(this.pos.x, this.pos.y, 15, 15);
    text(round(this.energy), this.pos.x, this.pos.y - 10);
  }
}

class Food {
  constructor(x, y) {
    this.pos = createVector(x, y);
  }

  display() {
    noStroke();
    fill(0, 255, 0);
    ellipse(this.pos.x, this.pos.y, 30, 30);
  }
}
