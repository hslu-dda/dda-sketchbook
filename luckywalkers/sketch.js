let data = [];
let people = [];

let colors = ["#146152", "#44803F", "#B4CF66", "#FFEC5C", "#FF5A33"];
let alterskategorien = ["15-24", "25-34", "35-44", "45-54", "55-64"];
let colScale = d3.scaleOrdinal().domain(alterskategorien).range(colors);
function setup() {
  createCanvas(800, 600);

  d3.csv("gluecklichsein.csv").then(function (csv) {
    data = csv;
    console.log(data);

    for (let i = 0; i < data.length; i++) {
      let x = random(0, width);
      let y = random(0, height);
      let geschlecht = data[i].geschlecht;
      let alter = data[i].alterskategorie;
      let bildung = data[i].bildung;
      let gluecksLevel = data[i].gluecksLevel;
      let person = new Person(x, y, geschlecht, alter, bildung, gluecksLevel);
      people.push(person);
    }
  });

  angleMode(DEGREES);
}

function draw() {
  background(0);

  for (let i = 0; i < people.length; i++) {
    people[i].update();
    people[i].display();
  }
}

class Person {
  constructor(x, y, geschlecht, alter, bildung, gluecksLevel) {
    this.pos = createVector(x, y);
    this.vel = createVector(0.1, 0);

    this.maxSpeed = 3;
    this.r = 10;

    this.geschlecht = geschlecht;
    this.alter = alter;
    this.bildung = bildung;
    this.gluecksLevel = gluecksLevel;

    let col = colScale(this.alter);
    this.color = color(red(col), green(col), blue(col), 50);
  }

  update() {
    // update position

    let theta = random(-10, 10);
    this.vel.rotate(theta);

    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);

    if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    }
  }

  display() {
    if (this.geschlecht == "Mann") {
      for (let i = 0; i < this.gluecksLevel; i++) {
        let r = this.r + i * 10;
        noStroke();
        fill(this.color);
        rectMode(CENTER);
        rect(this.pos.x, this.pos.y, r, r);
      }
    } else if (this.geschlecht == "Frau") {
      for (let i = 0; i < this.gluecksLevel; i++) {
        let r = this.r + i * 10;
        noStroke();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, r, r);
      }
    }
  }
}
