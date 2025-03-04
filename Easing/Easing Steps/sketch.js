function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  for (let i = 0; i < 30; i++) {
    let xPos = map(i, 0, 30, 10, width - 10 - 10);
    let v = easeBySteps(i, 0, 30, 10, 200, "easeInQuintic");

    rect(xPos, width / 2, 10, v);
  }
}
