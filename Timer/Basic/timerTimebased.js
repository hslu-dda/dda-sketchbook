/* Timer strategien

Es gibt mehrere möglichkeiten, Timer zu bauen. 
Sie können entweder auf Laufzeit oder auf den Framecount basieren. 
Vorteil Laufzeit: wir können mit Zeitintervallen wie millisekunden arbeiten
Nachteil: die anzahl drawcalls dazwischen hängen von der Framerate ab.

*/

// p5.js
let startTime;
let duration;
let radius;

//javascript
let timer;
let timeoutRadius = 300;

function setup() {
  createCanvas(400, 400);
  startTime = millis();
  duration = 1000;
  radius = width / 2;

  //javascript Timer einmal ausführen
  timer = setTimeout(timeoutCallback, 2000);

  frameRate(60);
  noFill();
}

function draw() {
  background(220);

  if (millis() > startTime + duration) {
    radius = random(width);
    startTime = millis();
  }

  stroke(255, 0, 0);
  circle(width / 2, height / 2, radius);
  stroke(0, 0, 255);
  circle(width / 2, height / 2, timeoutRadius);
}

function keyPressed() {
  if (key == "t") {
    clearTimeout(timer);
    clearInterval(timer);
    let duration = random(1000, 2000);
    timer = setInterval(intervallCallback, duration);
  }
}

function timeoutCallback() {
  timeoutRadius = width / 4;
}

function intervallCallback() {
  timeoutRadius = random(width);
}
