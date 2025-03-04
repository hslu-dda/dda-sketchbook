let palette;
let numColor = 5;
function setup() {
  createCanvas(windowWidth, 600);

  palette = generatePallette(color(100, 0, 100), numColor);
}

function draw() {
  background(100);
  let posX = 0;
  let posY = 0;
  for (let i = 0; i < palette.length; i++) {
    push();
    translate(posX, posY);
    fill(palette[i]);
    rect(0, 0, 50);
    pop();
    posX += 60;
    if (posX >= numColor * 60) {
      posX = 0;
      posY += 60;
    }
  }
}

function generatePallette(col, numColor, scale = 1) {
  colorMode(HSB, 360, 100, 100, 1);
  let h = hue(col);
  let angle = (360 * scale) / numColor;

  console.log((h + angle * 5) % 360);
  let cols = [];

  // generate an array of shades
  for (let i = 0; i < numColor; i++) {
    let c = color((h + angle * i) % 360, 20, 20);
    cols.push(c);
  }

  // generate an array of shades
  for (let i = 0; i < numColor; i++) {
    let c = color((h + angle * i) % 360, 100, 20);
    cols.push(c);
  }

  // Even spread
  for (let i = 0; i < numColor; i++) {
    let c = color((h + angle * i) % 360, saturation(col), brightness(col));
    cols.push(c);
  }

  // brighter, half sat
  for (let i = 0; i < numColor; i++) {
    let c = color((h + angle * i) % 360, 20, 100);
    cols.push(c);
  }

  // brighter, half sat
  for (let i = 0; i < numColor; i++) {
    let c = color((h + angle * i) % 360, 50, 100);
    cols.push(c);
  }

  // full bright, full sat
  for (let i = 0; i < numColor; i++) {
    let c = color((h + angle * i) % 360, 100, 100);

    cols.push(c);
  }

  // full bright, full sat
  for (let i = 0; i < numColor; i++) {
    let c = color((h + angle * i) % 360, random(50), random(50, 100));

    cols.push(c);
  }

  // full bright, full sat
  for (let i = 0; i < numColor; i++) {
    let c = color((h + angle * i) % 360, random(50, 100), random(50));

    cols.push(c);
  }

  colorMode(RGB);
  return cols;
}
