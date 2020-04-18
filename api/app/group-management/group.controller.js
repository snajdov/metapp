'use strict';

const router = require('express').Router();

module.exports = router;

router.get('/', getGroups);
router.post('/', createGroup);
router.get('/:groupId', getGroup);
router.put('/:groupId', updateGroup);
router.patch('/:groupId/:attribute', patchGroup);

