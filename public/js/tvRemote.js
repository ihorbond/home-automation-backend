$(document).ready(()=> {

	console.log('tvRemote ready');
	const socket = io();
	$("#tv-command-input").focus();

		$(document).on('keydown', e => {

			let keyCode = e.keyCode || e.which;
			//console.log("Key: " + keyCode);
			let tag = e.target.tagName.toLowerCase();
			if (e.which === 13 && tag != 'input' && tag != 'textarea') {
				console.log("Enter");
				socket.emit("nav-center", "DpadCenter");
			}
			if (e.which === 37) {
				e.preventDefault();
				console.log("Left arrow");
				socket.emit("nav-left", "Left");
			}
			if (e.which === 38) {
				e.preventDefault();
				console.log("Up arrow");
				socket.emit("nav-up", "Up");
			}
			if (e.which === 39) {
				e.preventDefault();
				console.log("Right arrow");
				socket.emit("nav-right", "Right");
			}
			if (e.which === 40) {
				e.preventDefault();
				console.log("Down arrow");
				socket.emit("nav-down", "Down");
			}
			if (e.which === 16) {
				e.preventDefault();
				console.log("Shift");
				socket.emit("action-home", "Home");
			}
			if (e.which === 27) {
				e.preventDefault();
				console.log("Escape");
				socket.emit("action-back", "Exit");
			}
			// if (e.which === 123 || e.keyCode === 123) {
			// 	e.preventDefault();
			// 	console.log("F12");
			// 	socket.emit("vol-up", "VolUp");
			// }
			if (e.which === 189) {
				e.preventDefault();
				//console.log("Escape");
				socket.emit("vol-down", "VolumeDown");
			}
			if (e.which === 187) {
				e.preventDefault();
				//console.log("Escape");
				socket.emit("vol-up", "VolumeUp");
			}
			if (e.which === 192) {
				e.preventDefault();
				//console.log("Escape");
				socket.emit("tv-power", "TvPower");
			}
		});

	$("#tv-command-input").keyup(e => {
		if (e.keyCode === 13) {
				let command = $("#tv-command-input").val();
				socket.emit("custom-input", command);
				$("#tv-command-input").val("");
		}
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
	const volUp = document.getElementById("vol-up");
	volUp.addEventListener("click", () => {
		socket.emit("vol-up", "VolumeUp");
	});

	const volDown = document.getElementById("vol-down");
	volDown.addEventListener("click", () => {
		socket.emit("vol-down", "VolumeDown");
	});


	const mute = document.getElementById("vol-mute");
	mute.addEventListener("click", () => {
		socket.emit("vol-mute", "Mute");
	});

	//numpad
	const num1 = document.getElementById("tv-numpad-1");
	num1.addEventListener("click", () => {
		socket.emit("num1", "Num1");
	});

	const num2 = document.getElementById("tv-numpad-2");
	num2.addEventListener("click", () => {
		socket.emit("num2", "Num2");
	});

	const num3 = document.getElementById("tv-numpad-3");
	num3.addEventListener("click", () => {
		socket.emit("num3", "Num3");
	});

	//actions
	// const tv = document.getElementById("action-tv");
	// tv.addEventListener("click", () => {
	// 	socket.emit("action-tv", "Tv");
	// });

	// const actionMenu = document.getElementById("action-actionMenu");
	// actionMenu.addEventListener("click", () => {
	// 	socket.emit("action-menu", "ActionMenu");
	// });
	//
	// const guide = document.getElementById("action-guide");
	// guide.addEventListener("click", () => {
	// 	socket.emit("action-guide", "GGuide");
	// });

	// const home = document.getElementById("action-home");
	// home.addEventListener("click", () => {
	// 	socket.emit("action-home", "Home");
	// });

	// const discover = document.getElementById("action-discover");
	// discover.addEventListener("click", () => {
	// 	socket.emit("action-discover", "Discover");
	// });

	// const back = document.getElementById("action-back");
	// back.addEventListener("click", () => {
	// 	socket.emit("action-back", "Exit");
	// });

	//navigation
	const navUp = document.getElementById("nav-up");
	navUp.addEventListener("click", () => {
		socket.emit("nav-up", "Up");
	});

	const navRight = document.getElementById("nav-right");
	navRight.addEventListener("click", () => {
		socket.emit("nav-right", "Right");
	});

	const navDown = document.getElementById("nav-down");
	navDown.addEventListener("click", () => {
		socket.emit("nav-down", "Down");
	});

	const navLeft = document.getElementById("nav-left");
	navLeft.addEventListener("click", () => {
		socket.emit("nav-left", "Left");
	});

	const navCenter = document.getElementById("nav-center");
	navCenter.addEventListener("click", () => {
		socket.emit("nav-center", "DpadCenter");// Confirm, Enter
	});

	//other
	const netflix = document.getElementById("netflix");
	netflix.addEventListener("click", () => {
		socket.emit("netflix", "Netflix");
	});

	const googlePlay = document.getElementById("google-play");
	googlePlay.addEventListener("click", () => {
		socket.emit("google-play", "GooglePlay");
	});

	// const androidMenu = document.getElementById("android-menu");
	// androidMenu.addEventListener("click", () => {
	// 	socket.emit("android-menu", "AndroidMenu");
	// });

	// const subwoofer = document.getElementById("subwoofer");
	// subwoofer.addEventListener("click", () => {
	// 	socket.emit("subwoofer", "WirelessSubwoofer");
	// });

});
