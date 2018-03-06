$(document).ready(()=> {

	console.log('carRemote ready');
	const socket = io();

	const carLock = new Gpio(17, 'out'); //lock car
	const carUnlock = new Gpio(27, 'out'); //unlock/roll down windows
	const carTrunk = new Gpio(22, 'out');//open trunk

	//make sure everything is off
	carLock.writeSync(0);
	carUnlock.writeSync(0);
	carTrunk.writeSync(0);

	const lockCar = document.getElementById("car-lock");
	lockCar.addEventListener("click", () => {
		socket.emit("car-lock", "lock car");
	});

	const unlockCar = document.getElementById("car-unlock");
	unlockCar.addEventListener("click", () => {
		socket.emit("car-unlock", "unlock car");
	});

	const trunk = document.getElementById("car-trunk");
	trunk.addEventListener("click", () => {
		socket.emit("car-trunk", "open trunk");
	});

	const alarm = document.getElementById("car-alarm");
	alarm.addEventListener("click", () => {
		socket.emit("car-alarm", "car alarm");
	});

	const windows = document.getElementById("car-windows");
	windows.addEventListener("click", () => {
		socket.emit("car-windows", "car windows down");
	});

});
