'use strict';

module.exports = validate;

function validate(req, res, next) {
	if (req.body && req.body.username && req.body.password) {
		next();
	} else {
		res.status(400).json({error: 'Username or password missing!'});
	}
}