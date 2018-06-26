const bravia  = require('./../../bravia/lib');
const tvIP   = process.env.TV_IP_ADDRESS;
const tvPSK  = process.env.TV_PSK_KEY;

var GPIO = require('onoff').Gpio;
var LED = new GPIO(20, 'out');
var btn = new GPIO(26, 'in', 'rising');

btn.watch((err,value) => {
	bravia(tvIP, tvPSK, client => {
		client.exec('TvPower');
		});
	if(err) {
		console.log('btn error');
		return;
		}
	console.log('btn pressed: ' + value);
	//LED.writeSync(value);
	});
	
let unexportOnClose = () => {
		LED.writeSync(0);
		LED.unexport();
		btn.unexport();
	};
	
process.on('SIGINT', unexportOnClose);
