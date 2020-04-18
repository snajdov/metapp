'use strict';

module.exports = verify;

function verify(req, res, next) {
	if (req.body && req.body.username && req.body.password)
		checkEmail(req.body.username, res) || checkPassword(req.body.password, res) || next();
	else
		res.status(400).json({error: `Missing 'username' or 'password' parameter`});
}

function checkEmail(email, res) {
	return !email.match(/[a-zA-Z_\.]\w+@(\w+\.\w+)+/) && res.status(400).json({error: 'Invalid email format!'});

}

function checkPassword(password, res) {
	return !password.match(/.{8,80}/) && res.status(400).json({error: 'Password needs to be between 8 and 80 characters'})
}
