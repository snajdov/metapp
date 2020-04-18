'use strict';

const router = require('express').Router();

module.exports = router;

router.get('/', getRoles);
router.post('/', createRole);
router.get('/:roleId', getRole);
router.put('/:roleId', updateRole);
router.patch('/:roleId/:attribute', patchRole);


