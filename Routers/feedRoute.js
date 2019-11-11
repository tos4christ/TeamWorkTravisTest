const router = require('express').Router();
const feedController = require('../Controllers/feedController');

router.get('/', feedController);

module.exports = router;
