'use strict';

module.exports = SizeLimitValidator;

function SizeLimitValidator(req, res, next) {
	if (req.query.size && req.query.size > 300) {
		res.status(400).json({error: 'Cannot get more than 300 items.'});
	} else {
		next();
	}
}
