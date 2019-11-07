const router = require('express').Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const gifController = require('../Controllers/gifController');

router.post('/', multipartMiddleware, gifController.createGif);

router.get('/', (req, res, next) => {

});

router.patch('/:gifId', (req, res, next) => {

});

router.get('/:gifId', (req, res, next) => {

});

router.delete('/:gifId', (req, res, next) => {

});

module.exports = router;
