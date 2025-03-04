// create a variable for the main window (sketch.js)
let mainWindow;

function preload() {}

function setup() {
  // create canvas for second window (actual size)
  createCanvas(1920, 1080);
  pixelDensity(1);
  // open index.html (sketch.js) as a child window
  mainWindow = window.open("/index.html");
}

function draw() {
  // you can then access the canvas from sketch.js
  if (mainWindow.mainCanvas) {
    // draw the canvas as image and crop to only show the bottom half
    image(mainWindow.mainCanvas, 0, 0, 1920, 1080, 1920, 0, 1920 * 2, 1080);
  }
}

// for interaction, you can set "window"-variables of the other sketch.
function mouseClicked() {
  mainWindow.parentClicked = !mainWindow.parentClicked;
}
