'use strict';

const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

const AuthRepository = require('./auth.repository');


module.exports = {
	login,
	refresh
}

async function login(req, res) {
	const creds = (await AuthRepository.getCredentials(req.body.username)).rows[0];
	if (!creds) {
		res.status(400).json({error: 'Bad credentials'});
		return;
	}
	
	const ok = await bcrypt.compare(req.body.password, creds.password);

	if (ok) {
		const payload = {
			iss: 'Metapp.io',
			sub: creds._id,
			iat: Date.now(),
			exp: Date.now() + 30 * 60 * 1000,
			nbf: Date.now(),
			aud: ['metapp'],
			user: creds.username,
			groups: ['system', 'admin', 'moderator'],
		}

		const token = jwt.sign(payload, 'somesecret', {});

		res.header('X-Metapp-Token', token);
		res.end();
	} else {
		res.status(400).json({error: 'Bad credentials'});
	}
}

async function refresh(req, res) {

}
