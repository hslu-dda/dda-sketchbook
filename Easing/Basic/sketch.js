//https://easings.net/de

let startTime = 0;
let startValue = 0;
let endValue = 200;

let easingFunctionName;

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(getEasingFunctionNames());
  easingFunctionName = getEasingFunctionNames()[14];
  textSize(22);
}

function draw() {
  background(220);
  let v = ease(startTime, 2000, startValue, endValue, easingFunctionName);
  circle(width / 2, height / 2, v);
  text("Easing Function: " + easingFunctionName, 100, textAscent() + 20);
}

function mouseClicked() {
  let v = ease(startTime, 2000, startValue, endValue, easingFunctionName);
  startValue = v;
  endValue = random(width);
  startTime = millis();

  easingFunctionName = random(getEasingFunctionNames());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
