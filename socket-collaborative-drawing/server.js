// THE SERVER CODE
console.log("app is running");

let express = require('express');
let app = express();
let server = app.listen(3000);

// host everything in the public directory
app.use(express.static('public'));

// load socket io
let socket = require('socket.io');
let io = socket(server);

// listen to the event when someone connects to the server
// this creates a new socket
io.on('connection', newConnection);

// check out the created socket
function newConnection(socket){
  console.log("new conncection: ", socket.id)

  // recieve data from client via the socket
  socket.on('mouse', mouseData);

  // handle the recieved socket data
  function mouseData(data){
    // send the data back out! 
    // (so others can recieve it) (exluding me)
    socket.broadcast.emit('mouse', data)
    // console.log(data);
  }
}