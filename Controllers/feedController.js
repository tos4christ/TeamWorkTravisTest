const pool = require('../Models/poolConnection');
const feedSchema = require('../Models/feedSchema');

const sortFunction = (a, b) => {
  return a - b;
}

const getFeed = (req, res, next) => {

  pool.query(feedSchema.article)
    .then( article => {  
      pool.query(feedSchema.gif)
        .then( gif => {
          const feedRow = [...article.rows, ...gif.rows]
          feedRow.sort( (a,b) => b.createdOn - a.createdOn );
          res.status(200).json({
            "status": "success",
            "data": feedRow
          });  
        })
        .catch( e => next(e));  
    })
    .catch( e => next(e));
}

module.exports = getFeed;
