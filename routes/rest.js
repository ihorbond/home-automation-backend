module.exports = (io) => {

const express = require('express');
const router  = express.Router();
const path    = require('path');

router.get('/equalizer/:action', (req, res, next) => {
	const action = req.params.action;

	io.emit(`equalizer-${action}`);
	res.sendStatus(200);
});



return router;
}
