$(document).ready( () => {
	const sock = io();
	sock.on("start", init);

	var playerId;
	var ships;
	var curId;
	var curSize;
	var placedShips;

	function init(id)
	{
		playerId = id;
		ships = [
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
		curId = 0;
		curSize = ships[0].size;
		placedShips = [];

		startGame();
	}

	function startGame()
	{
		$("#greetings").append("<br>Соперник найден! Начинаем игру.");
		setTimeout( prepareGame, 1500);
	}

	function prepareGame()
	{
		$("#greetings").remove();
		$("#ship-info").toggle();
		$("#boards").toggle();
		drawBoard(1);
		drawBoard(2);
		updateShipInfo();
		placeShips();
	}

	function drawBoard(boardId)
	{
		var grid = $('<div class="grid"></div>');
		$(`#board${boardId}`).append(grid);
		for (var i = 0; i <= 10; ++i) {
			var line = $('<div class="line"></div>');
			grid.append(line);
			for (var j = 0; j <= 10; ++j) {
				var cell = $(`<div class="cell" id="${i}.${j}"></div>`);
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
			var chars = "АБВГДЕЖЗИК".split("");
			$.each($(`.chars${boardId}`), (i, v) => {
				$(v).text(chars[i]);
			});
			$.each($(`.nums${boardId}`), (i,v) => {
				$(v).text(i + 1);
			});
		};
	}

	function updateShipInfo()
	{
		$("#ship-name").text(`"${ships[curId].name}"`);
		$("#ship-remaining").text(`"${ships[curId].size}"`);
	}

	function placeShips()
	{
		$(".field1").on("click", () => {
			$(this).css("background-color", "rgb(90,105,124)");
			var cellId = $(this).attr("id");
			placedShips.push(cellId);
			--ships[curId].size;
			if (ships[curId] === undefined) {

			}
		});
	}
});

