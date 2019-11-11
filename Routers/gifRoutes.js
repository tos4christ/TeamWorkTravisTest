const router = require('express').Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const gifController = require('../Controllers/gifController');

router.post('/', multipartMiddleware, gifController.createGif);

router.get('/:gifId', gifController.getAGif);

router.delete('/:gifId', gifController.deleteAGif );

router.post('/:gifId/comment', gifController.postAGifComment );

module.exports = router;
