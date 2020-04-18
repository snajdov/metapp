'use strict';

const client = require('../../storage/redis');
const config = require('../../../config.json');


// Configuration
const publicUris = config.auth && config.auth.publicUris || [/\/public/];
const roles = {};
const rolesPrefix = '/roles';

module.exports = authorize;


async function authorize(req, res, next) {
	if (isPublicPath(req.path))
		next();
	else if (hasAccess(req.user, {resource: req.path, verb: req.method}))
		next();
	else
		res.status(403).json({error: 'Not enough premissions!'});
}

// Helpers

function init() {
	client.get(rolesPrefix, function(err, data) {
		if (!err)
			roles = JSON.parse(data);
	})
}

function hasAccess(user, access) {
	if (!user) return false;
	return false;
}

function isPublicPath(path) {
	for (let uri of publicUris) {
		if (path.match(uri))
			return true;
	}
	return false;
}
