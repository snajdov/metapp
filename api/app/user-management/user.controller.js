'use strict';

const router = require('express').Router();

module.exports = router;

const UserService         = require('./user.service');
const SizeLimitValidator  = require('../common/validators/size-limit.validator');
const UserUpdateValidator = require('./validators/user-update.validator');


// Endpoints
router.get('/', SizeLimitValidator, getUsers);
router.get('/:userId', getUser);
router.patch('/:userId/:attribute', UserUpdateValidator, updateUser);

// Definitions

function getUsers(req, res) {
	UserService
		.getUsers(req, res)
		.catch(function(error) {
			console.log({code: 'user_getall', error: error.message});
			res.status(500).json({error: 'Could not fetch users.'});
		});
}

function getUser(req, res) {
	UserService
		.getUser(req, res)
		.catch(function(error) {
			console.log({code: 'user_getone', error: error.message});
			res.status(500).json({error: 'Could not fetch user.'});
		})
}

function updateUser(req, res) {
	UserService
		.updateUser(req, res)
		.catch(function(error) {
			console.log({code: 'user_update', error: error.message});
			res.status(500).json({error: `Could not update ${req.params.attribute}`})
		});
}
