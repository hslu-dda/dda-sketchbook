// each frame for 1 minute=60*60=3600 frames
// 6 deg per second = 0.1deg per frame

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  frameRate(60);
}

function draw() {
  push();
  translate(width / 2, height / 2);
  rotate(radians(frameCount * 0.1));
  let hue = (frameCount * 0.1) % 360;
  stroke(hue, 100, 100);
  line(0, -20, 0, -200);
  pop();
}
