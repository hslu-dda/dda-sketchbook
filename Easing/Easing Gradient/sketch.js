let rectWidth = 2;

let grainbuffer;
let grainWidth = 150;

let backgroundBuffer;

function setup() {
  createCanvas(400, 400);
  pixelDensity(2);
  console.log(getEasingFunctionNames());

  backgroundBuffer = createGraphics(width, height);
  backgroundBuffer.background("#BD93BD");
  backgroundBuffer.noStroke();
  for (let y = 0; y < floor(width); y += rectWidth) {
    for (let x = 0; x < width; x += rectWidth) {
      let r = random(0, 1);
      let v = easeBySteps(x, 0, width, 0, 1, "easeInCubic");
      if (r < v) {
        backgroundBuffer.fill("#A267A2");
        backgroundBuffer.rect(x, y, rectWidth, rectWidth);
      }
    }
  }

  grainbuffer = createGraphics(grainWidth, grainWidth);
  grainbuffer.noStroke();
  grainbuffer.push();
  grainbuffer.beginClip();
  grainbuffer.ellipse(grainWidth / 2, grainWidth / 2, grainWidth, grainWidth);
  grainbuffer.endClip();
  grainbuffer.fill("#D0B3D0");
  grainbuffer.rect(0, 0, grainWidth, grainWidth);

  for (let y = 0; y < floor(grainWidth); y += rectWidth) {
    for (let x = 0; x < grainWidth; x += rectWidth) {
      let r = random(0, 1);
      grainbuffer.fill("#724672");
      let v = easeBySteps(x, 0, grainWidth, 0, 1, "easeInSine");
      if (r < v) {
        grainbuffer.rect(x, y, rectWidth, rectWidth);
      }
    }
  }
  grainbuffer.pop();
}

function draw() {
  background(255);
  image(backgroundBuffer, 0, 0);
  push();
  translate(width / 2, height / 2);
  image(grainbuffer, -grainbuffer.width / 2, -grainbuffer.height / 2);
  pop();
}
