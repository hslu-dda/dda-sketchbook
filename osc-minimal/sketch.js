let osc;
let sliderval = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  // Setup OSC
  setupOsc(12000, 3334);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  background(sliderval, 100, 100);
}

//------------------ OSC stuff ----------------------

// OSC listener
function receiveOsc(address, value) {
  console.log("received OSC: " + address + ", " + value);
  console.log("+++", address);

  if (address == "/fader1") {
    let val = map(value, 0, 1, 0, 360);
    console.log("---------x", val, value);
    sliderval = val;
  }
}

function sendOsc(address, value) {
  socket.emit("message", [address].concat(value));
}

// setup Osc connection
function setupOsc(oscPortIn, oscPortOut) {
  var socket = io.connect("http://127.0.0.1:8081", {
    port: 8081,
    rememberTransport: false,
  });
  socket.on("connect", function () {
    socket.emit("config", {
      server: { port: oscPortIn, host: "127.0.0.1" },
      client: { port: oscPortOut, host: "127.0.0.1" },
    });
  });
  socket.on("message", function (msg) {
    if (msg[0] == "#bundle") {
      for (var i = 2; i < msg.length; i++) {
        receiveOsc(msg[i][0], msg[i].splice(1));
      }
    } else {
      receiveOsc(msg[0], msg.splice(1));
    }
  });
}
