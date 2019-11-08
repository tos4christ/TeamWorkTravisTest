const pool = require('../Models/poolConnection');
const userDetails = require('../utilities/getTokenUser');
const articleSchema = require('../Models/articleSchema');

const articleController = {};

articleController.createArticle = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  const user = userDetails(token);
  const { article_id, title, article, appr_status } = req.body;
  const date = Date().split('GMT')[0];

  pool.query(articleSchema.getEmployeeId, [user.username])
    .then( id => {
      pool.query(articleSchema.newArticle, [article_id, title, article, appr_status, id.rows[0].employee_id, date])
        .then( article => {
          res.status(200).json({
            "status": "Success",
            "data": {
              "message": "Article successfully posted",
              "articleId": article.rows[0].article_id,
              "createdOn": article.rows[0].creation_date,
              "title": article.rows[0].article_title
            }
          });
        })
        .catch(e => next(e));
    })
    .catch( e => next(e));
}

articleController.getAnArticle = (req, res, next) => {

  pool.query(articleSchema.getAnArticleText, [req.params.articleId])
    .then( article => {
      pool.query(articleSchema.getAnArticleComment, [req.params.articleId])
        .then( comments => {
          res.status(200).json({
            "status": "success",
            "data": {
              "id": article.rows[0].id,
              "createdOn": article.rows[0].createdOn,
              "title": article.rows[0].title,
              "article": article.rows[0].article,
              "comments": comments.rows
            }
          });
        })
        .catch( e => next(e));
    })
    .catch( e => next(e));

}

module.exports = articleController;
