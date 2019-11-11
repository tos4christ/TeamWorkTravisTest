const router = require('express').Router();
const articleController = require('../Controllers/articleController');

router.post('/', articleController.createArticle);

router.patch('/:articleId', articleController.updateAnArticle);

router.get('/:articleId', articleController.getAnArticle);

router.delete('/:articleId', articleController.deleteAnArticle);

router.post('/:articleId/comment', articleController.postAnArticleComment);

module.exports = router;
