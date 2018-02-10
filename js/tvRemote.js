const tvPower = document.getElementById("tv-power");
tvPower.addEventListener("click", () => {
	socket.emit("tv-power", "power on/off");
});

const tvVolUp = document.getElementById("tv-vol-up");
tvPower.addEventListener("click", () => {
	socket.emit("tv-vol-up", "volume up");
});

const tvVolDown = document.getElementById("tv-vol-down");
tvPower.addEventListener("click", () => {
	socket.emit("tv-vol-down", "volume down");
});

const tvInput = $('#tv-input');
tvPower.addEventListener("click", () => {
	socket.emit("tv-input", "tv input");
});
