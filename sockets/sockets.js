module.exports = (io) => {

	const socketIO = require('socket.io');
	const onoff = require('onoff');
	const bravia  = require('./../bravia/lib');
	const tvIP   = process.env.TV_IP_ADDRESS;
	const tvPSK  = process.env.TV_PSK_KEY;

	const Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
	const EQ = new Gpio(4, 'out'); //equalizer
	const carLock = new Gpio(17, 'out'); //lock car
	const carUnlock = new Gpio(27, 'out'); //unlock/roll down windows
	const carTrunk = new Gpio(22, 'out');//open trunk

	io.on('connection', socket => {
		console.log("sockets connected");

		equalizer
		let eqValue = 0; //static variable for current status
		socket.on('eq', data => {
			console.log("eq emit received: " + data)
			eqValue = data;
			if (eqValue != EQ.readSync()) {
				EQ.writeSync(eqValue);
			}
		});

		//tv remote
		bravia(tvIP, tvPSK, client => {
			// List available commands
			// client.getCommandNames(function(list) {
			// 	console.log(list);
			// });

			//custom input
			socket.on('custom-input', action => {
				client.exec(action);
				console.log(action);
			});

			//input-mic-power
			socket.on('tv-input', action => {
				console.log(action);
				client.exec(action);
			});
			// socket.on('tv-mic', action => {
			// 	console.log(action);
			// 	client.exec(action);
			// });
			socket.on('tv-power', action => {
				client.exec(action);
				console.log(action);
			});

			//numpad
			socket.on('num1', action => {
				client.exec(action);
				console.log(action);
			});
			socket.on('num2', action => {
				client.exec(action);
				console.log(action);
			});
			socket.on('num3', action => {
				client.exec(action);
				console.log(action);
			});
			socket.on('num4', action => {
				client.exec(action);
				console.log(action);
			});
			socket.on('num5', action => {
				client.exec(action);
				console.log(action);
			});
			socket.on('num6', action => {
				client.exec(action);
				console.log(action);
			});
			socket.on('num7', action => {
				client.exec(action);
				console.log(action);
			});
			socket.on('num8', action => {
				client.exec(action);
				console.log(action);
			});
			socket.on('num9', action => {
				client.exec(action);
				console.log(action);
			});
			socket.on('num0', action => {
				client.exec(action);
				console.log(action);
			});
			socket.on('num11', action => {
				client.exec(action);
				console.log(action);
			});
			socket.on('num12', action => {
				client.exec(action);
				console.log(action);
			});

			//volume
			socket.on('vol-up', action => {
				client.exec(action);
				console.log(action);
			});
			socket.on('vol-down', action => {
				client.exec(action);
				console.log(action);
			});
			socket.on('vol-mute', action => {
				client.exec(action);
				console.log(action);
			});

			//actions
			socket.on('action-tv', action => {
				client.exec(action);
				console.log(action);
			});

			socket.on('action-menu', action => {
				client.exec(action);
				console.log(action);
			});

			socket.on('action-guide', action => {
				client.exec(action);
				console.log(action);
			});

			socket.on('action-home', action => {
				client.exec(action);
				console.log(action);
			});

			socket.on('action-discover', action => {
				client.exec(action);
				console.log(action);
			});

			socket.on('action-back', action => {
				client.exec(action);
				console.log(action);
			});

			//navigation
			socket.on('nav-up', action => {
				client.exec(action);
				console.log(action);
			});

			socket.on('nav-right', action => {
				client.exec(action);
				console.log(action);
			});

			socket.on('nav-down', action => {
				client.exec(action);
				console.log(action);
			});

			socket.on('nav-left', action => {
				client.exec(action);
				console.log(action);
			});

			socket.on('nav-center', action => {
				client.exec(action);
				console.log(action);
			});

			//other
			socket.on('netflix', action => {
				client.exec(action);
				console.log(action);
			});

			socket.on('google-play', action => {
				client.exec(action);
				console.log(action);
			});

			socket.on('android-menu', action => {
				client.exec(action);
				console.log(action);
			});

			socket.on('subwoofer', action => {
				client.exec(action);
				console.log(action);
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
