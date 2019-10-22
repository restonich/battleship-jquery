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
			if (this.player2.ships === undefined) {
				this.player1.ships = ships;
			} else {
				this.player1.sock.emit("enemy-ships", this.player2.ships);
				this.player2.sock.emit("enemy-ships", ships);
			}
		});

		this.player2.sock.on("placed-ships", (ships) => {
			if (this.player1.ships === undefined) {
				this.player2.ships = ships;
			} else {
				this.player2.sock.emit("enemy-ships", this.player1.ships);
				this.player1.sock.emit("enemy-ships", ships);
			}
		});
	}
}
module.exports = BattleshipGame;

