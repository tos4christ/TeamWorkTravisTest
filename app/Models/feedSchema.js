const feedSchema = {};

feedSchema.article = `select article_id as id, creation_date as "createdOn", article_title as title, article_text as article, employee_id as authorId from articles order by "createdOn" desc limit 10`;

feedSchema.gif = `select gif_id as id, creation_date as "createdOn", gif_title as title, gif_url as url, employee_id as authorId from gif_table order by "createdOn" desc limit 10`;

export default feedSchema;
