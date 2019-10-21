$(document).ready( () => {
	const sock = io();
	sock.on("game-start", startGame);

	function startGame()
	{
		$("#greetings").append("<br>Соперник найден! Начинаем игру.");
		setTimeout( () => {$("#greetings").remove()} , 1500);
		drawBoards();
	}

	function drawBoards()
	{
		let board1 = $('<div class="board1"></div>');
		$("#boards").append(board1);
		let grid = $('<div class="grid"></div>');
		board.append(grid);
		for (var i = 0; i <= 10; ++i) {
			let line = $('<div class="line"></div>');
			grid.append(line);
			for (var j = 0; j <= 10; ++j) {
				var cell = $(`<div class="cell" id="${i}.${j}"></div>`);
				line.append(cell);
				if ((cell.attr('id').charAt(0) === "0") && (cell.attr('id').charAt(2) === "0")) {
				  cell.addClass("to-hide");
				} else if (cell.attr('id').charAt(0) === "-") {
				  cell.addClass("first-line");
				} else if (cell.attr('id').charAt(1) === "-") {
				  cell.addClass("first-column");
				} else {
				  cell.addClass("cell-to-click");
				}
		  }
		  var alphabet = "ABCDEFGHIJ".split("");
		  $.each($(`.boardGame${classBoardAndGrid} .first-line`), function(index,value) {
			// $(value).append($(`<span class="textCase">${alphabet[index]}</span>`));
			$(value).text(alphabet[index]);
		  });
		  $.each($(`.boardGame${classBoardAndGrid} .first-column`), function(index,value) {
			$(value).text(index+1);
		  });
		};
	}
});

