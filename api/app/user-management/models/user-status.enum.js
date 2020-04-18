'use strict';

module.exports = {
	ACTIVE:  2 ** 0, // or is temporarily disabled
	DELETED: 2 ** 1, // has deleted his/her account
	MFA:     2 ** 2  // has mfa enabled
}
