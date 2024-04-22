let roads = [];

var projection = d3
  .geoMercator()
  .center([8.29, 47.0502])
  .translate([400, 400])
  .scale(500000)

function preload() {
  roads = loadJSON("roads.json");
}

function setup() {
  createCanvas(1000, 800);

  print(roads.features.length);

  noLoop();
}

function draw() {
  background(255);

  noFill();
  stroke(0);


  // draw the roads
  for (let i = 0; i < roads.features.length; i++) {
    let road = roads.features[i];
    let roadPoints = road.geometry.coordinates;

    let type = road.properties.highway;

    if (type == "motorway") {
      strokeWeight(8)
      stroke('#E3371E');
    }
    else if (type == "trunk") {
      strokeWeight(8)
      stroke('#E3371E');
    }
    else if (type == "primary") {
      strokeWeight(5)
      stroke('#FF7A48');
    }
    else if (type == "secondary") {
      strokeWeight(3)
      stroke('#0593A2');
    }
    else if (type == "tertiary") {
      strokeWeight(1)
      stroke('#0593A2');
    }
    else if (type == "residential") {
      noStroke();
    }
    else {
      strokeWeight(0.5)
      stroke(0, 50);
    }


    beginShape();
    for (let j = 0; j < roadPoints.length; j++) {
      let point = roadPoints[j];
      let x = point[0];
      let y = point[1];
      let pos = projection([x, y]);
      vertex(pos[0], pos[1]);
    }
    endShape();
  }



}
