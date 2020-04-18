module.exports = validate;

function validate(req, res, next) {
	if (req.params && req.params.userId && req.params.attribute && req.body && req.body[req.params.attribute])
		next();
	else
		res.status(400).json({error: 'Missing parameters!'});
}