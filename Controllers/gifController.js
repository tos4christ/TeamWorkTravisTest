const pool = require('../Models/poolConnection');
const userDetails = require('../utilities/getTokenUser');
const gifSchema = require('../Models/gifSchema');
const cloudinary = require('cloudinary').v2;

const gifController = {};

gifController.createGif = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  const user = userDetails(token);
  const {gif_title, appr_status} = req.body;

  // cloudinary implementation
  let filename = req.files.gifPost.path;
  
  cloudinary.uploader.upload(filename, {tags: "gotemps", resource_type: "auto"})
    .then((file) => {
      // console.log("Public id of the file is  " + file.public_id);
      // console.log("Url of the file is  " + file.url);

      /* save the file.url into the database */
      const fileUrl = file.url;
      const filePublicId = file.public_id;

      const date = Date().split("GMT")[0];
      // Pool connection goes here
      pool.query(gifSchema.getEmployeeId, [user.username])
        .then( id => {
          pool.query(gifSchema.newGif, [gif_title, fileUrl, appr_status, id.rows[0].employee_id, date, filePublicId ])
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

  pool.query(gifSchema.getAGif, [req.params.gifId])
    .then( gif => {
      pool.query(gifSchema.getAGifComment, [req.params.gifId])
        .then( comments => {
          res.status(200).json({
            "status": "success",
            "data": {
              "id": gif.rows[0].id,
              "createdOn": gif.rows[0].createdOn,
              "title": gif.rows[0].title,
              "url": gif.rows[0].url,
              "comments": comments.rows
            }
          });
        })
        .catch( e => next(e));
    })
    .catch( e => next(e));

}

gifController.deleteAGif = (req, res, next) => {
  // delete an article from cloudinary
  //cloudinary.uploader.destroy('zombie', function(result) { console.log(result) });

  const token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  const user = userDetails(token);

  pool.query(gifSchema.getEmployeeId, [user.username])
    .then( id => {
      pool.query(gifSchema.deleteAGif, [req.params.gifId, id.rows[0]['employee_id']])
        .then( (gif) => {
          cloudinary.uploader.destroy(gif.rows[0].gif_public_id, function(result) { console.log(result) });
          res.status(200).json({
            "status": "success",
            "data": {
              "message": "gif post successfully deleted",
              "deleted message": gif.rows[0]
            }
          });
        })
        .catch( e => next(e));

    })
    .catch( e => next(e));
  
}

gifController.postAGifComment = (req, res, next) => {
  //request comes with gifId
  const token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  const user = userDetails(token);
  const date = Date().split('GMT')[0];

  const { comments } = req.body;
  pool.query(gifSchema.getEmployeeId, [user.username])
    .then( id => {
      pool.query(gifSchema.postAGifComment, [comments, id.rows[0]['employee_id'], date])
        .then( (comment) => {
          pool.query(gifSchema.updateGifCommentTable, [req.params.gifId, comment.rows[0]['comment_id'], comment.rows[0]['employee_id']])
            .then(() => {
              pool.query(gifSchema.getAGif, [req.params.gifId])
                .then( gif => {
                  res.status(200).json({
                    "status": "success",
                    "data": {
                      "message": "comment successfully created",
                      "createdOn": comment.rows[0]['creation_date'],
                      "gifTitle": gif.rows[0].title,
                      "comment": comment.rows[0].comment_text
                    }
                  })
                })
                .catch(e => next(e));
              
            })
            .catch(e => next(e));
        })
        .catch(e => next(e));
    })
    .catch(e => next(e));

}

module.exports = gifController;
