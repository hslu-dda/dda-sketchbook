/* Timer strategien

Es gibt mehrere möglichkeiten, Timer zu bauen. 
Sie können entweder auf Laufzeit oder auf den Framecount basieren. 
Vorteil Laufzeit: wir können mit Zeitintervallen wie millisekunden arbeiten
Nachteil: die anzahl drawcalls dazwischen hängen von der Framerate ab.

*/

let startFrame;
let duration;
let radius;

function setup() {
  createCanvas(400, 400);
  startFrame = 0;
  duration = 60;
  radius = width / 2;
  frameRate(60);
}

function draw() {
  background(220);

  // if (frameCount > startFrame + duration) {
  //   radius = random(width);
  // }

  if ((frameCount + startFrame) % duration == 0) {
    radius = random(width);
  }

  circle(width / 2, height / 2, radius);
}
