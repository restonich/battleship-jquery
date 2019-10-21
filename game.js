class BattleshipGame
{
	constructor(sock1, sock2) {
		this.player1 = {
			sock : sock1
		};
		this.player2 = {
			sock : sock2
		};

		this.player1.sock.emit("start", 1);
		this.player2.sock.emit("start", 2);
	}

	sendToPlayers(sockets, messageType, message) {
		sockets.forEach( (sock) => {
			sock.emit(messageType, message);
		});
	}
}
module.exports = BattleshipGame;

