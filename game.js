/* This unholy mess of code enables jquery on node.js */
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);

class BattleshipGame
{
	constructor(player1, player2) {
		this.player1 = player1;
		this.player2 = player2;
		this.currentTurn = [null, null];

		this.sendToPlayers([player1, player2], "message", "Соперник найден! Начинаем игру.");
	}

	sendToPlayers(players, messageType, message) {
		$.each(players, (i, player) => {
			player.emit(messageType, message);
		});
	}
}

module.exports = BattleshipGame;

