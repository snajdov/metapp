'use strict';

const client = require('../storage/redis');

const registrationValidity = 600; // in seconds
const registrationPrefix = '/registrations'

module.exports = {
	setRegistration,
	getRegistration,
	delRegistration
}

async function setRegistration(code, value) {
	return client.hset(registrationPrefix, code, JSON.stringify(value));
}

async function getRegistration(code) {
	return client.hget(registrationPrefix, code);
}

async function delRegistration(code) {
	return client.hdel(registrationPrefix, code);
}
