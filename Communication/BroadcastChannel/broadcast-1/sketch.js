let channel = new BroadcastChannel("drawing_channel");
let myColor;

function setup() {
  createCanvas(400, 400);

  channel.onmessage = (event) => {
    console.log("message", event);
  };
}

function draw() {
  background(220);

  if (mouseIsPressed) {
    noStroke();

    // Send drawing data to other windows
    channel.postMessage({
      x: mouseX,
      y: mouseY,
    });
  }
}
