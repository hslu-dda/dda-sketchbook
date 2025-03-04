//https://easings.net/de

let startTime = 0;
let startValue = 0;
let endValue = 200;

let easingFunctionName;

let colorArray = [];

let nextColor;
let previousColor;
let actualColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(getEasingFunctionNames());
  easingFunctionName = getEasingFunctionNames()[14];
  textSize(22);

  colorArray = [
    color("#F4442E"),
    color("#C0B9DD"),
    color("#CD9DD1"),
    color("#80A1D4"),
    color("#75C9C8"),
    color("#11242D"),
  ];

  previousColor = random(colorArray);
  nextColor = random(colorArray);
}

function draw() {
  background(220);
  let v = ease(startTime, 2000, startValue, endValue, easingFunctionName);
  let lerpFact = ease(startTime, 2000, 0, 1, "easeLinear");
  let actualColor = lerpColor(previousColor, nextColor, lerpFact);
  fill(actualColor);
  strokeWeight(5);
  circle(width / 2, height / 2, v);
  fill(0);
  text("Easing Function: " + easingFunctionName, 100, textAscent() + 20);
}

function mouseClicked() {
  let v = ease(startTime, 2000, startValue, endValue, easingFunctionName);
  startValue = v;
  endValue = random(width);

  let lerpFact = ease(startTime, 2000, 0, 1, "easeLinear");
  let actualColor = lerpColor(previousColor, nextColor, lerpFact);
  previousColor = actualColor;
  nextColor = random(colorArray);

  startTime = millis();
  easingFunctionName = random(getEasingFunctionNames());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
