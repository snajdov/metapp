'use strict';

const pgsql = require('../storage/postgres');


const command = {
	getCredentials: 'SELECT * FROM credentials WHERE email = $1 OR username = $1 AND status & 1 = 1;'
}

module.exports = {
	getCredentials
}

async function getCredentials(username) {
	return pgsql.query(command.getCredentials, [username]);
}