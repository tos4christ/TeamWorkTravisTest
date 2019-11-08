const articleSchema = {};

articleSchema.newArticle = `INSERT INTO articles(article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;

articleSchema.getAnArticleText = `select a.article_id as id, a.creation_date as createdOn, a.article_title as title, a.article_text as article from articles a where a.article_id=$1`;

articleSchema.getAnArticleComment = `SELECT c.comment_id as commentId, c.comment_text as comment, c.employee_id as authorId, c.creation_date as createdOn FROM comments_table c, article_comment ac WHERE ac.article_id=$1 and c.comment_id=ac.comment_id`;


articleSchema.updateAnArticle = `UPDATE articles SET article_title=$1, article_text=$2 WHERE article_id=$3`;

articleSchema.deleteAnArticle = `DELETE FROM articles WHERE article_id=$1`;

articleSchema.getEmployeeId = `SELECT employee_id FROM employees WHERE email=$1`;

module.exports = articleSchema;
