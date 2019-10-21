let ships = [
	{	name: "Эсминец",
		size: 4,
		amount: 1 },

	{	name: "Крейсер",
		size: 3,
		amount: 2 },

	{	name: "Фрегат",
		size: 2,
		amount: 3 },

	{	name: "Лодка",
		size: 1,
		amount: 4 }
];

class BattleshipGame
{
	constructor(sock1, sock2) {
		this.player1 = {
			sock : sock1
		};
		this.player2 = {
			sock : sock2
		};
		this.players = [this.player1, this.player2];
		this.sockets = [sock1, sock2];

		this.sendToPlayers(this.sockets, "game-start", "");
	}

	sendToPlayers(sockets, messageType, message) {
		sockets.forEach( (sock) => {
			sock.emit(messageType, message);
		});
	}
}
module.exports = BattleshipGame;

