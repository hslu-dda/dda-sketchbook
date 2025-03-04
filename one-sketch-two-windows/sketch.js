// create a variable to store the canvas
var mainCanvas;
// export this variable to "window"
window.mainCanvas = mainCanvas;

// if you want interaction between the two windows,
// you may add any number of variables to "window"
// and access it from sketch2.
window.parentClicked = false;

function setup() {
  // store canvas in our variable
  // note the doubling of the pixels for both screens
  mainCanvas = createCanvas(1920 * 3, 1000);

  pixelDensity(1);
  noStroke();
  textSize(50);
}

function draw() {
  // draw your things here
  for (let y = 0; y < height; y += 100) {
    fill(lerpColor(color("darkblue"), color("orange"), map(y, 0, height, 0, 1)));
    rect(0, y, width, y + 100);
    fill(255);
    text(y, 50, y);
  }

  // for interaction, check if the variable has been changed by sketch2.
  if (window.parentClicked) {
    text("triggered by parent window", 200, height / 4);
  }
}
