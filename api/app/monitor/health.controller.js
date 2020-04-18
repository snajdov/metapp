'use strict';

const router   = require('express').Router();
const postgres = require('../storage/postgres');
const redis    = require('../storage/redis');

module.exports = router;


router.get('/', health);
router.get('/postgres', postgresHealth);
router.get('/redis', redisHealth);


function health(req, res) {
	res.json({
		redis: redis.connected && 'ok' || 'nok',
		postgres: postgres.totalCount > 0 && 'ok' || 'nok'
	})
}

function postgresHealth(req, res) {
	res.json({
		total: postgres.totalCount,
		idle: postgres.idleCount,
		waiting: postgres.waitingCount
	});
}

function redisHealth(req, res) {
	res.json({msg: 'hi'});
}
