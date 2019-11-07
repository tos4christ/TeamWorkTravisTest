const router = require('express').Router();
const signInController = require('../../Controllers/signInController');

router.post('/', signInController);

module.exports = router;
