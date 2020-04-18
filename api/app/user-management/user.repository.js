'use strict';

const redis  = require('../storage/redis');
const pgsql  = require('../storage/postgres');


module.exports = {
	getUsers,
	getUser,
	createUser,
	updateUser
}

const command = {
	create: {
		user:  'INSERT INTO users(_id, email, username, created, updated, status) VALUES($1, $2, $3, $4, $5, $6);',
		creds: 'INSERT INTO credentials(_id, email, username, password, status) VALUES($1, $2, $3, $4, $5);'
	},
	getAll: {
		any:   'SELECT * FROM users WHERE (status & $1 != 0) OFFSET $2 LIMIT $3;',
		match: 'SELECT * FROM users WHERE (status & $1 = status) OFFSET $2 LIMIT $3;'
	},
	getOne: 'SELECT * FROM users WHERE _id=$1 LIMIT 1;',
	update: {
		username: 'UPDATE users SET username=$2, updated=$3 WHERE _id=$1;',
	}
}

async function getUsers(status, op, page, size) {
	if (command.getAll[op])
		return pgsql.query(command.getAll[op], [status, page, size]);
	else
		throw new Error(`Non-existing users table operator: ${op}`);
}

async function createUser(user) {
	await pgsql.query(command.create.user, [
		user._id,
		user.email,
		user.username,
		user.created,
		user.updated,
		user.status 
	]);

	return pgsql.query(command.create.creds, [
		user._id,
		user.email,
		user.username,
		user.password,
		user.status
	]);
}

async function getUser(userId) {
	return pgsql.query(command.getOne, [userId]);
}

async function updateUser(userId, attribute, value) {
	if (command.update[attribute])
		return pgsql.query(command.update[attribute], [userId, value, new Date()]);
	else
		throw new Error(`Non-existing user attribute: ${attribute}`);
}

function users() {
	pgsql.query(`
		CREATE TABLE IF NOT EXISTS users (
			_id VARCHAR(50) PRIMARY KEY,
			email VARCHAR(80) UNIQUE NOT NULL,
			username VARCHAR(50) UNIQUE NOT NULL,
			created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
			status INTEGER NOT NULL DEFAULT 0
		); CREATE UNIQUE INDEX IF NOT EXISTS status ON users USING btree (status);`, [])
	.catch((err) => console.log(err));
}

function credentials() {
	pgsql.query(`
		CREATE TABLE IF NOT EXISTS credentials (
			_id VARCHAR(50) PRIMARY KEY,
			email VARCHAR(80) UNIQUE NOT NULL,
			username VARCHAR(80) UNIQUE NOT NULL,
			password VARCHAR(80) NOT NULL,
			status INTEGER NOT NULL DEFAULT 0
		); CREATE UNIQUE INDEX IF NOT EXISTS email_username ON credentials USING btree (email, username);
		`, [])
	.catch((err) => console.log(err));
}

users();
credentials();