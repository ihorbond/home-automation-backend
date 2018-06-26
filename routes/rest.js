module.exports = (io) => {
console.log("hit rest");
const express = require('express');
const router  = express.Router();
const path    = require('path');
const GPIO    = require('onoff').Gpio;
const axios   = require('axios');

const bravia  = require('./../bravia/lib');
const tvIP   = process.env.TV_IP_ADDRESS;
const tvPSK  = process.env.TV_PSK_KEY;
const localToken  = process.env.TOKEN;

const eq = new GPIO(12, 'out');
const solderIron = new GPIO(16, 'out');
const tableLamp = new GPIO(20, 'out');
const cup1 = new GPIO(21, 'out');
const cup2 = new GPIO(19, 'out');

require('./../tvRemote/sockets.js')(io);

//const skynetIP = '10.0.1.29';
//const skynetPort = '8000';

authorize = (token) => {
	if(token === localToken) {
		return true;
		}
	return false;
	}


router.get('/stir/:duration', (req, res, next) => {
	 console.log('received cup');
	 const authorized = true//authorize(req.body.token);
	 if(authorized) {
		const duration = req.params.duration;
		console.log("Stirring your cup for " + duration + " sec");
		cup1.writeSync(0);
		cup1.writeSync(1);
		setTimeout(() => {
			cup1.writeSync(0);
			;}, duration * 1000);
		res.sendStatus(200);
	}
	else{
		res.sendStatus(401);
		}
	});
	
router.post('/solder', (req, res, next) => {
	console.log('received payalnyk');
	let authorized = authorize(req.body.token);
	if(authorized) {
		if(solderIron.readSync() === 0){
				solderIron.writeSync(1);
				console.log("payalnyk on");
			}
		else{
				solderIron.writeSync(0);
				console.log("payalnyk off");
			}
		res.sendStatus(200);
	}
	else{
		res.sendStatus(401);
		}
});

router.post('/table-lamp', (req, res, next) => {
	 console.log('received table lamp');
	 const authorized = authorize(req.body.token);
	 if(authorized) {
		if(tableLamp.readSync() === 0){
			console.log("lamp on");
			tableLamp.writeSync(1);
			}
		else{
			console.log("lamp off");
			tableLamp.writeSync(0);
			}
	res.sendStatus(200);
	}
	else{
		res.sendStatus(401);
		}
	});

 router.post('/eq', (req, res, next) => {
	console.log('received eq');
	 const authorized = authorize(req.body.token);
	 if(authorized) {
		if(eq.readSync() === 0){
			eq.writeSync(1);
		}
		else{
			eq.writeSync(0);
		}
		res.sendStatus(200);
		}
		else{
			res.sendStatus(401);
		}
 });
 
 router.post('/tv', (req, res, next) => {
	 console.log('received TV: ' + req.body.action);
	 const authorized = authorize(req.body.token);
	 if(authorized) {
		 const action = req.body.action;
		 let repeatAction = req.body.repeat;
		 bravia(tvIP, tvPSK, client => {
	     //client.getCommandNames(function(list) {
			//console.log(list);
		 //});
		 let interval = setInterval(() => {
			 if(repeatAction > 0) {
				 client.exec(action);
				 repeatAction--;
				 }
			 else {
				 clearInterval(interval);
				 }
			 }, 500);
		 });
		 res.sendStatus(200);
		 }
		 else{
			 res.sendStatus(401);
			 }
 });
 
 //router.get('/tv', (req, res, next) => {
	//axios.get(`${skynetIP}:${skynetPort}/auth/power`)
	//.then((res) => {
			//console.log(res.statusCode);
		//}) 
	

	//res.sendStatus(200);
 //});

// router.get('/tv/:action', (req, res, next) => {
// 	const action = req.params.action;
// 	let commands = list;
// 	// Accepts two parameters: IP and PSKKey
// 	bravia(tvIP, tvPSK, function(client) {
//
// 		// List available commands
// 		// client.getCommandNames(function(list) {
// 		// 	console.log(list);
// 		// });
//
// 		// Call a command
// 		client.exec(action);
// 		io.emit(`tv-${action}`);
// 		res.sendStatus(200);
// 	});
// });


return router;
}
