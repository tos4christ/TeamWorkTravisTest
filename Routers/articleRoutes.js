const router = require('express').Router();
const articleController = require('../Controllers/articleController');

router.post('/', articleController.createArticle);

router.patch('/:articleId', (req, res, next) => {

});

router.get('/:articleId', articleController.getAnArticle);

router.delete('/:articleId', (req, res, next) => {

});

module.exports = router;
