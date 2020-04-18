'use strict';

const router = require('express').Router();

module.exports = router;

router.get('/', time);


function time(req, res) {
	const now = new Date();
	res.json({
		time: now,
		local: now.toString(),
		timestamp: now.getTime()
	});
}