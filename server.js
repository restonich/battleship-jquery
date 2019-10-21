let port = 8080;
let publicPath = "./public"

const express = require("express");
const app = express();
app.use(express.static(publicPath));
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const game = require("./game");

let waitingPlayer = null;

io.on("connection", (newPlayer) => {
	console.log("Someone connected.");

	newPlayer.emit("message", "Подбираем Вам соперника...");

	if (waitingPlayer) {
		new game(waitingPlayer, newPlayer);
		waitingPlayer = null;
	} else {
		waitingPlayer = newPlayer;
	}

	newPlayer.on("message", text => {
		io.emit("message", text)
	});
});

server.on("error", (err) => {
	console.error("Error occured.", err);
});

server.listen(8080, () => {
	console.log("Server started on port 8080.");
});

