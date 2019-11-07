const { Pool } = require('pg');
const query = require('./poolQuery');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  databse: process.env.PGDATABASE,
  port: process.env.PGPORT,
  password: process.env.PGPASSWORD,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 600000,
  max: 50
});

pool.on('connect', () => console.log('connected to the database'));

pool.query(query.gif_table_query)
  .then( table => console.log('gif table created'))
  .catch( e => console.error(e))
  .then(pool.query(query.gif_comment_query))
  .then( (table) => console.log('gif comment created'))
  .catch(e => console.error(e))
  .then(pool.query(query.employees_query))
  .then((employees) => console.log('employees table created'))
  .catch( e => console.error(e))
  .then(pool.query(query.comments_table_query))
  .then((comments) => console.log('comments table created'))
  .catch( e => console.error(e))
  .then(pool.query(query.articles_query))
  .then( () => console.log('articles table created'))
  .catch( e => console.error(e))
  .then(pool.query(query.article_comment_query))
  .then( ac => console.log('article comments table created'))
  .catch( e => console.error(e))
  .then(pool.query(query.admin_table_query))
  .then( admin => console.log('admin table created'))
  .catch( e => console.error(e));

module.exports = pool;
