// const router = require('express').Router();
import { Router } from 'express';
const router = Router();

// const articleController = require('../Controllers/articleController');
import articleController from '../Controllers/articleController';

router.post('/', articleController.createArticle);

router.patch('/:articleId', articleController.updateAnArticle);

router.get('/:articleId', articleController.getAnArticle);

router.delete('/:articleId', articleController.deleteAnArticle);

router.post('/:articleId/comment', articleController.postAnArticleComment);

export default router;
