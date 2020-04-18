'use strict';

const random             = require('randomstring');
const bcrypt             = require('bcrypt');

const UserService        = require('../user-management/user.service');
const MailService        = require('../common/mail/mail.service');
const RegisterRepository = require('./register.repository');

const codeLength = 50;
const saltRounds = 10;

module.exports = {
	createRegistration,
	verifyRegistration
}

async function createRegistration(req, res) {
	const reg = {
		code: random.generate(codeLength),
		email: req.body.username,
		username: req.body.username,
		password: await bcrypt.hash(req.body.password, saltRounds),
		timestamp: Date.now()
	}

	await RegisterRepository.setRegistration(reg.code, reg)
	await MailService.confirmMail(req.body.username, reg.code)
	res.status(202).send();
}

async function verifyRegistration(req, res) {
	const reg = JSON.parse(await RegisterRepository.getRegistration(req.params.code));

	if (reg) {
		await UserService.createUser(reg);
		await RegisterRepository.delRegistration(req.params.code);
		res.status(201).json({message: 'Successful Verification!'});
	} else {
		res.status(404).json({error: 'Code not found or expired!'});
	}
}
