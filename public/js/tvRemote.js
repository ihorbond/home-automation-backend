$(document).ready(()=> {

	console.log('tvRemote ready');
	const socket = io();

	const subwoofer = document.getElementById("subwoofer");
	subwoofer.addEventListener("click", () => {
		socket.emit("subwoofer", "WirelessSubwoofer");
	});
 
	//input-mic-power
	const tvPower = document.getElementById("tv-power");
	tvPower.addEventListener("click", () => {
		socket.emit("tv-power", "TvPower");
	});

	const tvInput = document.getElementById("tv-input");
	tvInput.addEventListener("click", () => {
		socket.emit("tv-input", "TvInput");
	});

	//volume
	const tvVolUp = document.getElementById("tv-vol-up");
	tvVolUp.addEventListener("click", () => {
		socket.emit("tv-vol-up", "VolumeUp");
	});

	const tvVolDown = document.getElementById("tv-vol-down");
	tvVolDown.addEventListener("click", () => {
		socket.emit("tv-vol-down", "VolumeDown");
	});

	//numpad
	const num1 = document.getElementById("tv-numpad-1");
	num1.addEventListener("click", () => {
		socket.emit("num1", "Num1");
	});

	const num2 = document.getElementById("tv-numpad-2");
	num1.addEventListener("click", () => {
		socket.emit("num2", "Num2");
	});

	const num3 = document.getElementById("tv-numpad-3");
	num1.addEventListener("click", () => {
		socket.emit("num3", "Num3");
	});

	//actions

});
