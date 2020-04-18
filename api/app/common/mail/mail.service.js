const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')


const sender = nodemailer.createTransport(smtpTransport({
	service: process.env['MAIL_SERV'],
	host: process.env['MAIL_HOST'],
	auth: {
		user: process.env['MAIL_NAME'],
		pass: process.env['MAIL_PASS']
	}
}));

module.exports = {
	confirmMail
}


async function confirmMail(email, code) {
	return sender.sendMail({
		from: process.env['MAIL_NAME'],
		to: email,
		subject: 'Account Confirmation',
		html: `<a href="http://localhost:3000/register/verify/${code}">Verify Account</a>` // some template
	});
}
