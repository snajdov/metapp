const redis  = require('ioredis');


const client = redis.createClient({
	keyPrefix: '/metapp'
});

client.on('connect', function(msg) {
	console.log({code: 'redis_connect', message: 'Successfully connected to Redis Server'});
});

client.on('error', function(err) {
	console.log({code: 'redis_error', message: err.code});
})

module.exports = client;
