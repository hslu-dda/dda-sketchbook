let channel = new BroadcastChannel("drawing_channel");
let myColor;

let xPos, yPos;

function setup() {
  createCanvas(400, 400);

  channel.onmessage = (event) => {
    console.log("message", event.data);
    xPos = event.data.x;
    yPos = event.data.y;
  };
}

function draw() {
  background(220);
  ellipse(xPos, yPos, 10);

  if (mouseIsPressed) {
    noStroke();

    // Send drawing data to other windows
    channel.postMessage({
      x: mouseX,
      y: mouseY,
    });
  }
}
