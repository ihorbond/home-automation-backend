module.exports = (io) => {

	const socketIO = require('socket.io');
	const onoff = require('onoff');
	const Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
	const EQ = new Gpio(4, 'out'); //equalizer
	const carLock = new Gpio(17, 'out'); //lock car
	const carUnlock = new Gpio(27, 'out'); //unlock/roll down windows
	const carTrunk = new Gpio(22, 'out');//open trunk

	io.on('connection', socket => {
		console.log("sockets connected");

		//eq
		let eqValue = 0; //static variable for current status
		socket.on('eq', data => {
			console.log("eq emit received: " + data)
			eqValue = data;
			if (eqValue != EQ.readSync()) {
				EQ.writeSync(eqValue);
			}
		});

			//carRemote
			socket.on('car-lock', action => {
				console.log(action);
				// if(carLock.readSync() === 1) {
				// 	carLock.writeSync(0);
				// }
				carLock.writeSync(1);
				setTimeout(() => {
					carLock.writeSync(0);
				}, 1000);
			});

			socket.on('car-unlock', action => {
				console.log(action);
				// if(carUnlock.readSync() === 1) {
				// 	carUnlock.writeSync(0);
				// }
				carUnlock.writeSync(1);
				setTimeout(() => {
					carUnlock.writeSync(0);
				}, 1000);
			});

			socket.on('car-trunk', action => {
				console.log(action);
				// if(carLock.readSync() === 1) {
				// 	carLock.writeSync(0);
				// }
				carTrunk.writeSync(1);
				setTimeout(() => {
					carTrunk.writeSync(0);
				}, 2000);
			});

			socket.on('car-alarm', action => {
				console.log(action);
			});

			socket.on('car-windows', action => {
				// if(carUnlock.readSync() === 1) {
				// 	carUnlock.writeSync(0);
				// }
				console.log(action);
				carUnlock.writeSync(1);
				setTimeout(() => {
					carUnlock.writeSync(0);
				}, 4000);
			});

		});

	});

}
