'use strict';

const router = require('express').Router();

// Dependencies
const RegisterService       = require('./register.service');
const RegistrationValidator = require('./validators/registration.validator');

module.exports = router;

// Endpoints
router.post('/', RegistrationValidator, createRegistration);
router.get('/verify/:code', verifyRegistration);


// Definitions
// ===========

function createRegistration(req, res) {
	RegisterService
		.createRegistration(req, res)
		.catch(function(err) {
			console.log({code: 'register_create', error: err.message});
			res.status(500).json({error: 'Could not create registration.'})
		});
}

function verifyRegistration(req, res) {
	RegisterService
		.verifyRegistration(req, res)
		.catch(function(err) {
			console.log({code: 'register_verify', error: err.message});
			res.status(500).json({error: 'Could not verify registration.'});
		});
}
