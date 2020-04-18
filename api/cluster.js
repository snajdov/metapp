'use strict';

const cluster = require('cluster');

if (cluster.isMaster) {
	const cpuCount = require('os').cpus().length;

	for (var i = 0; i < cpuCount; ++i) {
		cluster.fork();
	}

	cluster.on('fork', function(worker) {
		console.log('forked ---> Worker %d | PID %d', worker.id, worker.process.pid);
	})

} else {
	const app = require('./app');
	app();
}
