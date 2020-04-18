// More reliable uniqueness
const uuidv4         = require('uuid').v4;
// More dense and human readable
const random         = require('randomstring');

module.exports = {
	generate
}


function generate(type) {
	switch(type) {
		case 'user': return generateUserId();
		default: throw new Error('Unknown id type')
	}
}

function generateUserId() {
	return 'usr-' + random.generate({charset: 'abcdefghijklmnopqrstuvwxyz0123456789', readable: true, length: 15});
}

