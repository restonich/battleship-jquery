var port = 8080;
var publicPath = "./public"

const express = require("express");
const app = express();
app.use(express.static(publicPath));
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const game = require("./game");

var waitingPlayer = null;

io.on("connection", (newPlayer) => {
	console.log("Someone connected.");

	if (waitingPlayer) {
		new game(waitingPlayer, newPlayer);
		waitingPlayer = null;
	} else {
		waitingPlayer = newPlayer;
	}
});

server.on("error", (err) => {
	console.error("Error occured.", err);
});

server.listen(port, () => {
	console.log(`Server started on port ${port}.`);
});

