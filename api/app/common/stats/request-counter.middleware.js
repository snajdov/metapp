'use strict';

var total = 0;
var start = Date.now();

module.exports = {
	requestCounter,
	total,
	start
}

function requestCounter(req, res, next) {
	total += 1;
	console.log('counting...');
	next();
}