let buildings = [];

var projection = d3
  .geoMercator()
  .center([8.309, 47.0502])
  .translate([400, 400])
  .scale(500000);

function preload() {
  // load buildings.geojson and save it to the variable buildings
  buildings = loadJSON("buildings.geojson");
}

function setup() {
  createCanvas(800, 800);

  // print the buildings variable to the console
  print(buildings.features.length);

  noLoop();
}

function draw() {
  background(255);

  fill("black");
  noStroke();

  // draw the buildings
  for (let i = 0; i < buildings.features.length; i++) {
    let building = buildings.features[i];

    let buildingCoordinates = building.geometry.coordinates[0];

    fill("black");
    beginShape();
    for (let j = 0; j < buildingCoordinates.length; j++) {
      let buildingCoordinate = buildingCoordinates[j];
      let x = projection(buildingCoordinate)[0];
      let y = projection(buildingCoordinate)[1];
      vertex(x, y);
    }
    endShape();
  }
}
