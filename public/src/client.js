function writeEvent(text)
{
	$("#events").append(`<li>${text}</li>`);
};

function onFormSubmitted(e)
{
	e.preventDefault();

	sock.emit("message", $("#chat").val());
	$("#chat").val("");
};

function addButtonListeners()
{
	let buttons = ["rock", "paper", "scissors"];

	$.each(buttons, (i, button) => {
		$(`#${button}`).on("click", () => {
			sock.emit("turn" , button);
		});
	});
};

const sock = io();

writeEvent("Добро пожаловать!");

addButtonListeners();

sock.on("message", writeEvent);

$("#chat-form").on("submit", onFormSubmitted);

