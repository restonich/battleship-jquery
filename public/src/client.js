$(document).ready( () => {
	const sock = io();
	sock.on("start", startGame);

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
	let currentShip = 0;
	let placedShips = [];
	let playerId = 0;

	function startGame(id)
	{
		playerId = id;
		$("#greetings").append("<br>Соперник найден! Начинаем игру.");
		setTimeout( prepareGame, 1500);
	}

	function prepareGame()
	{
		$("#greetings").remove();
		$("#boards").toggle();
		drawBoard(1);
		drawBoard(2);
		placeShips();
	}

	function drawBoard(boardId)
	{
		let grid = $('<div class="grid"></div>');
		$(`#board${boardId}`).append(grid);
		for (let i = 0; i <= 10; ++i) {
			let line = $('<div class="line"></div>');
			grid.append(line);
			for (let j = 0; j <= 10; ++j) {
				let cell = $(`<div class="cell" id="${i}.${j}"></div>`);
				line.append(cell);
				if ((cell.attr('id') === "0.0")) {
					cell.addClass("to-hide");
				} else if (cell.attr('id').charAt(0) === "0") {
					cell.addClass(`chars${boardId}`);
				} else if ((cell.attr('id').charAt(2) === "0") || (cell.attr('id') === "10.0")) {
					cell.addClass(`nums${boardId}`);
				} else {
					cell.addClass(`field${boardId}`);
				}
			}
			let chars = "АБВГДЕЖЗИК".split("");
			$.each($(`.chars${boardId}`), (i, v) => {
				$(v).text(chars[i]);
			});
			$.each($(`.nums${boardId}`), (i,v) => {
				$(v).text(i + 1);
			});
		};
	}

	function placeShips()
	{
		$(".field1")
	}
});

