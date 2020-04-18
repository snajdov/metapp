'use strict';

// Dependencies
const UserRepository = require('./user.repository');
const IdGenerator    = require('../common/utils/id-generator.util');
const UserStatus     = require('./models/user-status.enum');

module.exports = {
	getUsers,
	getUser,
	createUser,
	updateUser
}

// Definitions

async function getUsers(req, res) {
	const status = parseInt(req.query['status']) || UserStatus.ACTIVE;
	const op     = req.query['op'] || 'any';
	const page   = req.query['page'] || 0;
	const size   = req.query['size'] || 20;

	return UserRepository
		.getUsers(status, op, page * size, size)
		.then((data) => {
			res.json(data.rows.map(user => {const {password, ...other} = user; return other}));
		})
}

async function getUser(req, res) {
	return UserRepository
		.getUser(req.params.userId)
		.then((data) => {
			if (data.rowCount === 1) {
				const {password, ...other} = data.rows[0];
				res.json(other);
			} else
				res.status(404).json({error: 'No user was found.'})
		})
}

async function updateUser(req, res) {
	return UserRepository
		.updateUser(req.params.userId, req.params.attribute, req.body[req.params.attribute])
		.then((result) => {
			if (result.rowCount === 1)
				res.status(202).end();
			else
				res.status(404).json({error: 'No user was found.'});
		});
}



// Handling internal calls
async function createUser(user) {
	user._id = IdGenerator.generate('user');
	user.created = user.updated = new Date();
	user.status = UserStatus.ACTIVE;
	return UserRepository.createUser(user);
}
