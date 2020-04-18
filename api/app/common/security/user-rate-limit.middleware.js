'use strict';

const rateLimit = require('express-rate-limit');


module.exports = rateLimit({
	windowMs: 1000,
	max: 15,
	message: {message: 'Rate limit exceeded'},
	keyGenerator: identity
});


function identity(req) {
	return req.header('Authentication') || req.ip;
}