module.exports = (io) => {

	const socketIO = require('socket.io');
	const onoff = require('onoff');
	const bravia  = require('./../bravia/lib');
	const tvIP   = process.env.TV_IP_ADDRESS;
	const tvPSK  = process.env.TV_PSK_KEY;

	const Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
	const EQ = new Gpio(4, 'out');

	io.on('connection', socket => {
		console.log("sockets connected");

		//equalizer
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
			socket.on('subwoofer', action => {
				client.exec(action);
				console.log(action);
			});

			//input-mic-power
			socket.on('tv-power', action => {
				client.exec(action);
				console.log(action);
			});
			socket.on('tv-input', action => {
				console.log(action);
				client.exec(action);
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

			//volume
			socket.on('vol-up', action => {
				client.exec(action);
				console.log(action);
			});
			socket.on('vol-down', action => {
				client.exec(action);
				console.log(action);
			});
		});

	});


	process.on('SIGINT', () => { //on ctrl+c
		EQ.writeSync(0); // Turn EQ off
		EQ.unexport(); // Unexport EQ GPIO to free resources
		process.exit(); //exit completely
	});

}
