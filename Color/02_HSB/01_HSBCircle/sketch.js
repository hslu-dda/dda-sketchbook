/*
  Color Wheel
  This is an example how HSB Colors work
  
  */

function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas with the size of the window
  colorMode(HSB, 360, 100, 100); // Set color mode to HSB and 360 deg for the hue and 100% for sat and brightness
  background(0, 0, 0); // Set background color to black
  noStroke(); // Disable stroke for shapes

  // Move the origin to the center of the canvas
  push();
  translate(width / 2, height / 2);

  // Iterate through hues from 0 to 360 with a step of 10
  for (let hue = 0; hue < 360; hue += 10) {
    rotate(radians(10)); // Rotate by 10 degrees

    // Draw the central circle with the current hue
    fill(hue, 100, 100);
    circle(0, -200, 50);

    // Draw circles with varying brightness towards the center
    let steps = 10;
    for (let i = 0; i < steps; i++) {
      let brightness = map(i, 0, steps, 0, 100);
      let y = map(i, 0, steps, 0, -170);
      fill(hue, 100, brightness);
      circle(0, y, 25);
    }

    // Draw circles with varying saturation towards the outer edge
    for (let i = 0; i < steps; i++) {
      let saturation = map(i, 0, 10, 0, 100);
      let y = map(i, 0, steps, -400, -230);
      fill(hue, saturation, 100);
      circle(0, y, 25);
    }
  }

  pop(); // Restore the previous drawing style settings and transformations
  noLoop(); // Stop the draw loop from continuously executing
}

function draw() {
  // Empty draw function as no continuous animation or updates are needed
}
