'use strict';

const PolicyRepository = require('./policy.repository');

module.exports = {
	getPolicies,
	createPolicy,
	getPolicy,
	updatePolicy,
	patchPolicy,
	deletePolicy
}

async function getPolicies(req, res) {
	const page   = req.query['page'] || 0;
	const size   = req.query['size'] || 20;

	return PolicyRepository
		.getPolicies(page * size, size)
		.then((policies) => {
			res.json({policies: policies});
		});
}

async function createPolicy(req, res) {
	return PolicyRepository
		.createPolicy(req.body)
		.then((result) => {
			res.status(201).end();
		});
}

async function getPolicy(req, res) {
	return PolicyRepository
		.getPolicy(req.params.policyId)
		.then((policy) => {
			res.json(policy.rows[0]);
		});
}

async function updatePolicy(req, res) {
	return PolicyRepository
		.updatePolicy(req.body)
		.then((result) => {
			res.end();
		});
}

async function patchPolicy(req, res) {
	return PolicyRepository
		.patchPolicy(req.parameters.policyId, req.parameters.attribute, req.body.attribute)
		.then((result) => {
			res.end();
		});
}

async function deletePolicy(req, res) {
	// TODO: 
}