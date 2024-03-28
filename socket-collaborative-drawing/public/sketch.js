// THE CLIENT CODE
let socket;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(51);

	// open the connection to the server
	socket = io();
	// recieve new information from server
	socket.on('mouse', newDrawing);
}

// draw the incoming data
function newDrawing(data) {
	noStroke();
	fill(0, 0, 255);
	ellipse(data.x, data.y, 59, 50)
}

// draw data in the client & send it to the server
function mouseDragged() {
	// draw something 
	noStroke();
	fill(255, 0, 0);
	ellipse(mouseX, mouseY, 50, 50);

	// console.log(mouseX, mouseY);
	// collect the drawing data
	let data = {
		x: mouseX,
		y: mouseY
	}
	// send data from client to server
	socket.emit('mouse', data);
}
