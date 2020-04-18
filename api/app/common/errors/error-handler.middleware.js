'use strict';

module.exports = errorHandler

function errorHandler(err, req, res, next) {
	if (err) {
		console.log(err);
		res.status(err.status || 500).json({error: 'There was an error. Try again.'});
	} else
		next();
}
