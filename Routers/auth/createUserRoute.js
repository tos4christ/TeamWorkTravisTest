const router = require('express').Router();
const createUserController = require('../../Controllers/createUserController');

router.post('/', createUserController);

module.exports = router;
