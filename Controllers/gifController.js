const pool = require('../Models/poolConnection');
const userDetails = require('../utilities/getTokenUser');
const gifSchema = require('../Models/gifSchema');
const cloudinary = require('cloudinary').v2;

const gifController = {};

gifController.createGif = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  const user = userDetails(token);
  const {gif_title, appr_status} = req.body;
  const date = Date().split('GMT')[0];

  console.log(req.files);
  // cloudinary implementation
  let filename = req.files.gifPost.path;
  
  cloudinary.uploader.upload(filename, {tags: "gotemps", resource_type: "auto"})
    .then((file) => {
      // console.log("Public id of the file is  " + file.public_id);
      // console.log("Url of the file is  " + file.url);

      /* save the file.url into the database */
      const fileUrl = file.url;

      const date = Date().split("GMT")[0];
      // Pool connection goes here
      pool.query(gifSchema.getEmployeeId, [user.username])
        .then( id => {
          pool.query(gifSchema.newGif, [gif_title, fileUrl, appr_status, id.rows[0].employee_id, date])
            .then( gif => {
              res.status(200).json({
                "status": "success",
                "data": {
                  "message": "GIF image successfully posted",
                  "gifId": gif.rows[0].gif_id,
                  "createdOn": gif.rows[0].creation_date,
                  "title": gif.rows[0].gif_title,
                  "imageUrl": gif.rows[0].gif_url
                }
              });
            })
            .catch(e => next(e));
        })
        .catch( e => next(e));

    })

}

gifController.getAGif = (req, res, next) => {

  pool.query(gifSchema, [req.params.articleId])
    .then( article => {
      pool.query(gifSchema.getAnArticleComment, [req.params.articleId])
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

module.exports = gifController;
