const pool = require('../Models/poolConnection');
const feeds = require('../Models/articleSchema');


const getFeed = (req, res, next) => {

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

module.exports = getFeed;
