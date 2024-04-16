/*
  Color Gradient Rectangles

  This sketch demonstrates how to create a gradient effect between two colors
  using the p5.js library. Two colored rectangles are displayed on the top left 
  and top right corners of the canvas representing the starting color and ending 
  color of the gradient. Between these two rectangles, a series of smaller 
  rectangles are drawn, each transitioning smoothly from the starting color to 
  the ending color.

  Instructions:
  - Use the 'fromColor' and 'toColor' variables to specify the starting and 
    ending colors of the gradient.
  - Adjust the 'num' variable to control the number of rectangles drawn between
    the starting and ending colors.
  - Modify the 'rectWidth' and 'rectHeight' variables to change the size of the
    rectangles.

  Code Structure:
  - 'setup()' function: Sets up the canvas and initializes the colors.
  - 'draw()' function: Draws the gradient rectangles on the canvas.

  Variables:
  - fromColor: Stores the starting color of the gradient.
  - toColor: Stores the ending color of the gradient.
  - num: Number of rectangles to draw between the starting and ending colors.
  - rectWidth: Width of each rectangle.
  - rectHeight: Height of each rectangle.

  Functions:
  - map(): Re-maps a value from one range to another.
  - lerpColor(): Interpolates between two colors.
*/

let fromColor; // Starting color of the gradient
let toColor; // Ending color of the gradient

function setup() {
  createCanvas(400, 400); // Create a canvas with width and height of 400 pixels
  fromColor = color("Crimson"); // Initialize 'fromColor' with Crimson
  toColor = color("DarkTurquoise"); // Initialize 'toColor' with DarkTurquoise
}

function draw() {
  background(0); // Set background color to black

  // Draw the starting color rectangle on the top left corner
  fill(fromColor);
  rect(0, 0, 40);

  // Draw the ending color rectangle on the top right corner
  fill(toColor);
  rect(width - 40, 0, 40);

  let num = 10; // Number of rectangles between the starting and ending colors
  let rectWidth = 25; // Width of each rectangle
  let rectHeight = 200; // Height of each rectangle

  for (let i = 0; i < num; i++) {
    // Calculate the x position for the current rectangle
    let xPos = map(i, 0, num - 1, 0, width - rectWidth);
    // Calculate the interpolation position for the current rectangle
    let lerpPos = map(i, 0, num - 1, 0, 1);
    // Get the color at the current interpolation position
    const lerpedCol = lerpColor(fromColor, toColor, lerpPos);

    // Draw the current rectangle
    push();
    translate(xPos, height / 2 - rectHeight / 2);
    fill(lerpedCol);
    rect(0, 0, rectWidth, rectHeight);
    pop();
  }
}
