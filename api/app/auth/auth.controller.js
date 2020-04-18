'use strict';

const router = require('express').Router();

// Dependencies
const AuthService          = require('./auth.service');
const CredentialsValidator = require('./credentials.validator');

// Endpoints
router.post('/login', CredentialsValidator, login);
router.post('/refresh', refresh);
router.post('/forgot', forgot);

module.exports = router;

function login(req, res) {
	AuthService
		.login(req, res)
		.catch((err) => {
			console.log({code: 'auth_login', message: err.message});
			res.status(500).json({error: 'Something happened. Try again.'});
		});
}

function refresh(req, res) {

}

function forgot(req, res) {

}
