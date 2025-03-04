let buffer;
let xPos = 0;
let yPos = 0;
let rectWidth = 50;

let angle = 0;

function setup() {
  createCanvas(400, 400);
  buffer = createGraphics(400, 400);
}

function draw() {
  background(0);

  buffer.noStroke();
  buffer.background(0, 10);
  buffer.fill(255, 255, 0);
  buffer.rect(xPos, yPos, rectWidth, rectWidth);
  xPos += 1;
  if (xPos > width - rectWidth) {
    xPos = 0;
    yPos += rectWidth;
  }
  if (yPos > height - rectWidth) {
    xPos = 0;
    yPos = 0;
  }
  image(buffer, 0, 0);
  noStroke();
  fill(0, 12);
  rect(0, 0, width, height);
  fill(255, 0, 0);
  ellipse(mouseX, mouseY, 20);

  angle++;
}
