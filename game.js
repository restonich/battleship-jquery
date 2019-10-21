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

		this.player1.sock.on("placed-ships", (ships) => {
			this.player2.sock.emit("enemy-ships", ships);
		});
		this.player2.sock.on("placed-ships", (ships) => {
			this.player1.sock.emit("enemy-ships", ships);
		});
	}
}
module.exports = BattleshipGame;

