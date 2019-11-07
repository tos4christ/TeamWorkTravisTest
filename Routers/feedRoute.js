const router = require('express').Router();
const feedController = require('../Controllers/feedController');
const feedQuery = '';

router.get('/feed', feedController);

module.exports = router;
