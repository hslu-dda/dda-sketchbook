/*
  Color Shades and Tints

  This script demonstrates:
  a) How to generate an array with shades of a given color.
  b) How to pick a color based on a value.

  Instructions:
  - Use the sliders to adjust the RGB values of the base color.
  - The script will generate shades and tints of the base color and display them as rectangles on the canvas.
  - Move the mouse to see a circle filled with the shade corresponding to the mouseX position.

  Code Structure:
  - 'setup()' function: Sets up the canvas, initializes the base color, generates shades and tints, and creates sliders.
  - 'draw()' function: Draws rectangles representing shades and tints on the canvas, and a circle filled with the shade corresponding to the mouseX position.
  - 'valuechanged()' function: Updates the shades and tints array when slider values change.
  - 'generateShades()' function: Generates an array of shades based on the base color.
  - 'generateTints()' function: Generates an array of tints based on the base color.
  - 'getMappedElement()' function: Returns an element from an array based on a given value.

  Variables:
  - myCol: Stores the base color.
  - numRects: Number of rectangles to draw.
  - rectW: Width of each rectangle.
  - padding: Spacing between rectangles.
  - shades: Array to hold the shades of the base color.
  - tints: Array to hold the tints of the base color.
  - redslider, greenslider, blueslider: Sliders to adjust RGB values.
*/

// given color
let myCol;
// rect specs
let numRects;
let rectW = 20;
let padding = 20;

// array to hold the shades
let shades = [];
let tints = [];

let redslider;
let greenslider;
let blueslider;

function setup() {
  createCanvas(400, 400); // Create a canvas with the size of 400x400 pixels
  // define given color
  myCol = color(100, 200, 0); // Initialize base color
  shades = generateShades(myCol, 5); // Generate shades array
  tints = generateTints(myCol, 5); // Generate tints array

  // Create sliders for adjusting RGB values
  redslider = createSlider(0, 255, 100);
  redslider.input(valuechanged);
  greenslider = createSlider(0, 255, 200);
  greenslider.input(valuechanged);
  blueslider = createSlider(0, 255, 0);
  blueslider.input(valuechanged);
}

function draw() {
  background(220); // Set background color

  let numRects = 10; // Number of rectangles to draw
  // Draw rectangles representing shades
  for (let i = 0; i < numRects; i++) {
    // Space out the rects
    let xPos = map(i, 0, numRects - 1, padding, width - rectW - padding);
    // Pick the shade by x position
    let shade = getMappedElement(xPos, 0, width, shades);
    push();
    translate(xPos, padding);
    fill(shade);
    rect(0, 0, rectW, height / 2 - padding);
    pop();
  }

  // Draw rectangles representing tints
  for (let i = 0; i < numRects; i++) {
    // Space out the rects
    let xPos = map(i, 0, numRects - 1, padding, width - rectW - padding);
    // Pick the tint by x position
    let tint = getMappedElement(xPos, 0, width, tints);
    push();
    translate(xPos, height / 2 + padding);
    fill(tint);
    rect(0, 0, rectW, height / 2 - 2 * padding);
    pop();
  }

  // Get shade based on mouseX position and draw a circle with that shade
  let shade = getMappedElement(mouseX, 0, width, shades);
  fill(shade);
  circle(mouseX, mouseY, 50);
}

// Function to get the element based on the value
function getMappedElement(value, min, max, array) {
  let index = Math.floor(map(value, min, max, 0, array.length));
  index = constrain(index, 0, array.length - 1);
  return array[index];
}

// Function to handle slider value change
function valuechanged() {
  let col = color(redslider.value(), greenslider.value(), blueslider.value());
  shades = generateShades(col, 5); // Update shades array
  tints = generateTints(col, 5); // Update tints array
}

// Function to generate shades based on the base color
function generateShades(col, numShades) {
  let shades = [];
  // Generate an array of shades
  for (let i = 0; i < numShades; i++) {
    let redValue = red(col);
    let greenValue = green(col);
    let blueValue = blue(col);
    let shadefactor = map(i, 0, numShades - 1, 1, 0);
    let shade = color(
      redValue * shadefactor,
      greenValue * shadefactor,
      blueValue * shadefactor
    );
    shades.push(shade);
  }
  return shades;
}

// Function to generate tints based on the base color
function generateTints(col, numTints) {
  let tints = [];
  // Generate an array of tints
  for (let i = 0; i < numTints; i++) {
    let redValue = red(col);
    let greenValue = green(col);
    let blueValue = blue(col);
    let tintFactor = map(i, 0, numTints - 1, 1, 0);

    // Apply the tint factor to create a tinted shade
    let tintedRed = min(redValue + (255 - redValue) * tintFactor, 255);
    let tintedGreen = min(greenValue + (255 - greenValue) * tintFactor, 255);
    let tintedBlue = min(blueValue + (255 - blueValue) * tintFactor, 255);

    let tint = color(tintedRed, tintedGreen, tintedBlue);
    tints.push(tint);
  }
  return tints;
}
