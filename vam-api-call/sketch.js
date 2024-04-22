let women_data;
let men_data;

// trigger to only visualize when all data is loaded
let women_data_loaded = false;
let men_data_loaded = false;

let women_depicted =
  "https://api.vam.ac.uk/v2/objects/search?id_depicts=AAT25943";
let men_depicted =
  "https://api.vam.ac.uk/v2/objects/search?id_depicts=AAT25928";

let m_count;
let w_count;

let m_size;
let w_size;

let cnv;


function setup() {
  cnv = createCanvas(800, 800);
  noLoop();
  background(220);
  textAlign(CENTER);
  noStroke();

  // use a d3 scale to create the radius of the circle
  // 9324 is count of the most depicted concept (flowers)
  const scale = d3
    .scaleSqrt()
    .domain([0, 9324])
    .range([0, width / 2]);

  // make a api query to load all objects that depict women
  d3.json(women_depicted).then((response) => {
    women_data = response;
    console.log("women depicted", women_data);

    // get the count
    w_count = women_data["info"]["record_count"];
    // calculate the scale of the circle
    w_size = scale(w_count);

    // draw the sketch again
    redraw();
  });

  // make a second api query to load all objects that depict women
  d3.json(men_depicted).then((response) => {
    men_data = response;
    console.log("men depicted", men_data);

    // get the count
    m_count = men_data["info"]["record_count"];
    // calculate the scale of the circle
    m_size = scale(m_count);

    // draw the sketch again
    redraw();
  });
}

function draw() {
  // all associated categories women
  for (let i = 0; i < women_data.length; i++) {
    const element = women_data[i];
    console.log(element)
  }

  // women circle
  circle(width / 4, height / 2, w_size);
  text(w_count + " women depicted", width / 4, height / 2);
  // men circle
  circle((width / 4) * 3, height / 2, m_size);
  text(m_count + " men depicted", (width / 4) * 3, height / 2);
  // let m_size = map(m_count)
//   console.log("Men 2", men_data)
}

function keyPressed() {
  if (key == "s") {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    var hh = String(today.getHours());
    var min = String(today.getMinutes());
    var sec = String(today.getSeconds());

    today = mm + "/" + dd + "/" + yyyy;
    let filename =
      yyyy + "-" + mm + "-" + dd + "-" + hh + "-" + min + "-" + sec;

    console.log(key);
    saveCanvas(cnv, filename, "jpg");
  }
}
