// const router = require('express').Router();
import { Router } from 'express';
const router = Router();

// const multipart = require('connect-multiparty');
import multipart from 'connect-multiparty';
const multipartMiddleware = multipart();

// const gifController = require('../Controllers/gifController');
import gifController from '../Controllers/gifController';

router.post('/', multipartMiddleware, gifController.createGif);

router.get('/:gifId', gifController.getAGif);

router.delete('/:gifId', gifController.deleteAGif );

router.post('/:gifId/comment', gifController.postAGifComment );

export default router;
