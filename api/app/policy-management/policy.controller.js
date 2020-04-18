'use strict';

const router = require('express').Router();

const PolicyService      = require('./policy.service');
const SizeLimitValidator = require('../common/validators/size-limit.validator');

module.exports = router;

router.get('/', SizeLimitValidator, getPolicies);
router.post('/', createPolicy);
router.get('/:policyId', getPolicy);
router.put('/:policyId', updatePolicy);
router.patch('/:policyId/:attribute', patchPolicy);
router.delete('/:policyId', deletePolicy);

function handle(cb, req, res, code) {
	cb(req, res)
	.catch((err) => {
		console.log({code: code, message: err.message});
		res.status(500).json({error: 'Something happened. Try again.'});
	});
}

function getPolicies(req, res) {
	handle(PolicyService.getPolicies, req, res, 'policy_all');
}

function createPolicy(req, res) {
	handle(PolicyService.createPolicy, req, res, 'create_policy');
}

function getPolicy(req, res) {
	handle(PolicyService.getPolicy, req, res, 'policy_one');
}

function updatePolicy(req, res) {
	handle(PolicyService.updatePolicy, req, res, 'update_policy');
}

function patchPolicy(req, res) {
	handle(PolicyService.patchPolicy, req, res, 'patch_policy');
}

function deletePolicy(req, res) {
	handle(PolicyService.deletePolicy, req, res, 'delete_policy');
}
