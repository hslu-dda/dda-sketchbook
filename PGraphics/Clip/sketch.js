let buffer;
let flowerarray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  /*
  let hue = random(360);
  buffer = createGraphics(width / 2, height / 2);
  buffer.colorMode(HSB, 360, 100, 100);
  buffer.fill(hue, 50, 50);
  buffer.push();
  buffer.beginClip();
  buffer.circle(buffer.width / 2, buffer.height / 2, 200);
  buffer.endClip();
  buffer.circle(buffer.width / 2, buffer.height / 2, 200);

  buffer.push();
  buffer.translate(buffer.width / 2, buffer.height / 2);
  for (let i = 0; i < 5; i++) {
    buffer.fill(hue, map(i, 0, 5, 30, 100), 50);
    buffer.circle(100, 0, 150);
    buffer.rotate(radians(360 / 5));
  }
  buffer.pop();
  buffer.pop();*/
  newBuffer();

  for (let i = 0; i < 500; i++) {
    flowerarray.push(new Flower(random(width), random(height), buffer));
  }
}

function draw() {
  background(220);
  flowerarray.forEach((element) => {
    element.display();
  });
  text(frameRate(), 50, 50);
}

function newBuffer() {
  let hue = random(360);
  buffer = createGraphics(width / 2, height / 2);
  buffer.colorMode(HSB, 360, 100, 100);
  buffer.fill(hue, 100, 100);
  buffer.push();
  buffer.beginClip();
  buffer.circle(buffer.width / 2, buffer.height / 2, 200);
  buffer.endClip();
  buffer.circle(buffer.width / 2, buffer.height / 2, 200);

  buffer.push();
  buffer.translate(buffer.width / 2, buffer.height / 2);
  for (let i = 0; i < 5; i++) {
    buffer.fill(hue, map(i, 0, 5, 30, 100), 50);
    buffer.circle(100, 0, 150);
    buffer.rotate(radians(360 / 5));
  }
  buffer.pop();
  buffer.pop();
}

function mouseClicked() {
  newBuffer();
  flowerarray.push(new Flower(mouseX, mouseY, buffer));
  console.log(flowerarray.length);
}

class Flower {
  constructor(x, y, img) {
    this.pos = createVector(x, y);
    this.img = img;
    this.angle = random(360);
    this.scale = random(0.5, 1.5);
    this.angleSpeed = random(2);
  }

  display() {
    this.angle += this.angleSpeed;
    push();
    translate(this.pos.x, this.pos.y);
    rotate(radians(this.angle));
    scale(this.scale, this.scale);
    image(this.img, -this.img.width / 2, -this.img.height / 2);
    pop();
  }
}
