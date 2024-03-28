let data = [];

let colScale = d3.scaleLinear();

let years = [2000, 2006, 2012, 2020];
let countries = ["Albania", "Angola", "Burundi", "Myanmar", "Lebanon", "Chad"];

let title = '';

let leftBorder = 200;
let rightBorder = 50;
let topBorder = 80;
let bottomBorder = 50;

let xScale = d3.scaleLinear().domain([2000, 2020]).range([leftBorder, 800-rightBorder]);
let yScale = d3.scalePoint().domain(countries).range([topBorder, 400-bottomBorder]);
let rScale = d3.scaleSqrt().domain([0, 100]).range([0, 50]);
let colorScale = d3.scaleLinear().domain([0, 100]).range(['#006837', '#a50026'])

function setup() {
  createCanvas(800, 400);

  noLoop();

  // load data
  d3.csv("goal11.csv", d3.autoType).then(csv => {
    data = csv;
    console.log("data", data);
    title = data[0].SeriesDescription
    redraw();
  })
}

function draw() {
  background(220);
  textAlign(CENTER, CENTER)
  text(title, width/2, 20);

  // draw the points
  for(let i = 0; i < data.length; i++) {
    let d = data[i];
    let x = xScale(d.TimePeriod);
    let y = yScale(d.GeoAreaName);
    let r = rScale(d.Value);
    let f = colorScale(d.Value);
    fill(f);
    ellipse(x, y, r);
  }

  // draw the country labels
  for(let i = 0; i < countries.length; i++) {
    let d = countries[i];
    let y = yScale(d);
    fill(0);
    noStroke();
    textAlign(LEFT, CENTER)
    text(d, 50, y);
  }

  // draw the year labels
  for(let i = 0; i < years.length; i++) {
    let d = years[i];
    let x = xScale(d);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER)
    text(d, x, 50)
  }

}
