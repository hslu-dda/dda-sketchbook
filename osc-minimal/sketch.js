let osc;
let sliderval = 0;
let socket;

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupOsc(12000, 3334);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  background(sliderval, 100, 100);
}

function receiveOsc(address, value) {
  console.log("received OSC: " + address + ", " + value);
  console.log("+++", address);

  if (address == "/fader1") {
    let val = map(value[0], 0, 1, 0, 360); // Note: using value[0] since value is an array
    console.log("---------x", val, value[0]);
    sliderval = val;
  }
}

function sendOsc(address, value) {
  if (socket) {
    socket.emit("message", [address].concat(value));
  }
}

function setupOsc(oscPortIn, oscPortOut) {
  socket = io.connect("http://127.0.0.1:3000", {
    rememberTransport: false,
  });

  socket.on("connect", function () {
    console.log("Connected to server");
    socket.emit("config", {
      server: { port: oscPortIn, host: "127.0.0.1" },
      client: { port: oscPortOut, host: "127.0.0.1" },
    });
  });

  // Listen for direct messages
  socket.on("message", function (msg) {
    if (msg[0] == "#bundle") {
      for (var i = 2; i < msg.length; i++) {
        receiveOsc(msg[i][0], msg[i].splice(1));
      }
    } else {
      receiveOsc(msg[0], msg.splice(1));
    }
  });

  // Listen for broadcasted OSC messages
  socket.on("osc message", function (msg) {
    if (msg[0] == "#bundle") {
      for (var i = 2; i < msg.length; i++) {
        receiveOsc(msg[i][0], msg[i].splice(1));
      }
    } else {
      receiveOsc(msg[0], msg.splice(1));
    }
  });

  // Add connection status handlers
  socket.on("connect_error", (error) => {
    console.error("Connection error:", error);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });
}
