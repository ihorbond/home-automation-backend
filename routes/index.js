const express = require('express');
const router  = express.Router();

router.get('/', (req, res, next) => {
	res.send("Home automation RESTful API");
});

module.exports = router;
