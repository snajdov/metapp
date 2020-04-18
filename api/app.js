'use strict';

const express      = require('express')
// Middlewares
const compression  = require('compression');
const bodyparser   = require('body-parser');
const logging      = require('./app/common/logging/json-logger.middleware')
const userLimiter  = require('./app/common/security/user-rate-limit.middleware');
const authn        = require('./app/common/security/authn.middleware');
const authz        = require('./app/common/security/authz.middleware');
const errorHandler = require('./app/common/errors/error-handler.middleware');
// Dependencies
const RegisterController = require('./app/registration/register.controller');
const UserController     = require('./app/user-management/user.controller');
const AuthController     = require('./app/auth/auth.controller');
const HealthController   = require('./app/monitor/health.controller');
const TimeController     = require('./app/monitor/time.controller');

const app = express();

// Middleware Configuration
app.use(compression());
app.use(logging('tiny'));
app.use(bodyparser.json());
app.use(userLimiter);
app.use(authn);
app.use(authz);
// Global Error Handler
app.use(errorHandler);
// Endpoint Configuration
app.use('/register', RegisterController);
app.use('/users', UserController);
app.use('/auth', AuthController);
app.use('/health', HealthController);
app.use('/time', TimeController);

// App Configuration
app.set('env', 'production');
app.set('x-powered-by', false);

const host = '0.0.0.0';
const port = 3000;

module.exports = function(cluster) {
	app.listen(port, host, () => {
		console.log(`App is running on http://${host}:${port}...`)
	})	
}
