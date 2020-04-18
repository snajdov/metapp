const { Pool } = require('pg')

const pool = new Pool({
	host: process.env['DB_HOST'],
	port: process.env['DB_PORT'],
	database: process.env['DB_NAME'],
	user: process.env['DB_USER'],
	password: process.env['DB_PASS'],
	max: 50,
	idleTimeoutMillis: 0
});

module.exports = pool;

function query(command, params) {
	return pool.query(command, params);
}

pool.on('connect', function(client) {
	console.log({code: 'postgres_connect', message: 'Successfully connected to Postgres'});
})

pool.on('error', function(error, client) {
	console.log({code: 'postgres_error', error: error});
})

