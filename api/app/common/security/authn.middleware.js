'use strict';

const jwt    = require('jsonwebtoken');
const config = require('../../../config.json');

module.exports = authenticate;

async function authenticate(req, res, next) {
	if (req.header('Authentication')) {
		const [type, token] = req.header('Authentication').split('\\s+');

		if (type === 'JWT') {
			jwt.verify(token, 'somesecret', function (err, data) {
				if (err) {
					console.log(err);
					res.status(401).json({error: err.message});
				} else {
					req.user = data;
					next();
				}
			});
		} else {
			next();
		}
	} else {
		next();
	}
}
