module.exports = (io) => {

const express = require('express');
const router  = express.Router();
const path    = require('path');

// router.get('/equalizer/:action', (req, res, next) => {
// 	const action = req.params.action;
//
// 	io.emit(`equalizer-${action}`);
// 	res.sendStatus(200);
// });

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
