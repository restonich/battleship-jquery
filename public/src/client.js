$(document).ready( () => {
	const sock = io();
	sock.on("start", init);

	var playerId;
	var ships;
	var curId;
	var curSize;
	var placedShips;
	var enemyShips;
	var curPlayerId;

	function init(id)
	{
		playerId = id;
		ships = [
			{	name: "Эсминец",
				size: 4,
				amount: 1 },

			{	name: "Крейсер",
				size: 3,
				amount: 1 },

			{	name: "Фрегат",
				size: 2,
				amount: 1 },

			{	name: "Лодка",
				size: 1,
				amount: 1 }
		];
		curId = 0;
		curSize = ships[0].size;
		placedShips = [];
		enemyShips = [];
		curPlayerId = 1;

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
				var cell = $(`<div class="cell" id="${i}_${j}"></div>`);
				line.append(cell);
				if ((cell.attr('id') === "0_0")) {
					cell.addClass("to-hide");
				} else if (cell.attr('id').charAt(0) === "0") {
					cell.addClass(`chars${boardId}`);
				} else if ((cell.attr('id').charAt(2) === "0") || (cell.attr('id') === "10_0")) {
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
		$(".field1").on("click", function chooseCell() {
			var cellId = $(this).attr("id");
			var curShip = ships[curId];

			placedShips.push(cellId);
			$(this).css("background-color", "rgb(90,105,124)");
			$(this).off("click", chooseCell);
			--curShip.size;
			if (curShip.size === 0) {
				--curShip.amount;
				if (curShip.amount !== 0) {
					curShip.size = curSize;
					updateShipInfo();
				} else if (++curId === 4) {
					$(".field1").off("click", chooseCell);
					$("#ship-info").text("Ожидаем соперника...");
					synchronize();
				} else {
					curSize = ships[curId].size;
					updateShipInfo();
				}
			} else {
				updateShipInfo();
			}
		});
	}

	function synchronize()
	{
		sock.emit("placed-ships", placedShips);
		sock.on("enemy-ships", function receiveShips(s) {
		/*	enemyShips.forEach((cellId) => {
				console.log(cellId);
				$(`#${cellId}.field2`).css("background-color", "rgb(90,105,124)");
			}); */
			$("#ship-info").text("Ход соперника");
			enemyShips = s;
		});
		sock.on("your-turn", startTurn);
		sock.on("hit", processHit);
		sock.on("lose", processLose);
	}

	function startTurn()
	{
		$("#ship-info").text("Ваш ход");

		$(".field2:not(.clicked)").on("click", function hitCell() {
			$(this).addClass("clicked");
			$(this).off("click", hitCell);
			sock.emit("hit", $(this).attr("id"));

			if (enemyShips.includes($(this).attr("id"))) {
				$(this).css("background-color", "rgb(124,10,10)");
				let index = enemyShips.indexOf($(this).attr("id"));
				enemyShips.splice(index, 1);
				if (enemyShips.length <= 0) {
					$("#ship-info").text("Вы победили!<br>Перезагрузите страницу, чтобы начать новую игру.");
					$(".field2").off("click", hitCell);
					sock.emit("lose");
				}
			} else {
				$(this).css("background-color", "rgb(10,10,124)");
				sock.emit("your-turn");
				$("#ship-info").text("Ход соперника");
				$(".field2").off("click", hitCell);
			}
		});
	}

	function processHit(id)
	{
		if (placedShips.includes(id)) {
			$(`#${id}.field1`).css("background-color", "rgb(124,10,10)");
		} else {
			$(`#${id}.field1`).css("background-color", "rgb(10,10,124)");
		}
	}

	function processLose()
	{
		$("#ship-info").text("Вы проиграли!<br>Перезагрузите страницу, чтобы начать новую игру.");
		$(".field2").off("click", hitCell);
	}
});

