const gifSchema = {};

gifSchema.newGif = `INSERT INTO gif_table(gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;

gifSchema.getAGif = `select g.gif_id as id, g.creation_date as createdOn, g.gif_title as title, g.gif_url as url from gif_table g where g.gif_id=$1`;

gifSchema.getAGifComment = `SELECT c.comment_id as commentId, c.comment_text as comment, c.employee_id as authorId, c.creation_date as createdOn FROM comments_table c, gif_comment gc WHERE gc.gif_id=$1 and c.comment_id=gc.comment_id`;

gifSchema.deleteAGif = `DELETE FROM gif_table WHERE gif_id=$1 and employee_id=$2 RETURNING *`;

gifSchema.postAGifComment = `INSERT INTO comments_table(comment_text, employee_id, creation_date) VALUES($1, $2, $3) RETURNING *`;
gifSchema.updateGifCommentTable = `INSERT INTO gif_comment(gif_id, comment_id, employee_id) VALUES($1, $2, $3) RETURNING *`;

gifSchema.getEmployeeId = `SELECT employee_id FROM employees WHERE email=$1`;

module.exports = gifSchema;
