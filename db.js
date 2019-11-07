const { Pool } = require('pg');
const query = require('./Models/poolQuery');

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

module.exports.initializeDb = () => {

 return pool.query(query.gif_table_query)
          .then(() => {
            console.log('gif table created');
            pool.query(query.gif_comment_query)
              .then(() => {
                console.log('gif comment created');
                pool.query(query.employees_query)
                  .then(() => {
                    console.log('employees table created');
                    pool.query(query.comments_table_query)
                      .then(() => {
                        console.log('comments table created');
                        pool.query(query.articles_query)
                          .then(() => {
                            console.log('articles table created');
                            pool.query(query.article_comment_query)
                              .then(() => {
                                console.log('article comments table created');
                                pool.query(query.admin_table_query)
                                  .then(() => {
                                    console.log('admin table created');
                                    pool.query(query.insertValue)
                                      .then(() => {
                                        console.log('values inserted');
                                      })
                                      .catch(e => console.error(e));
                                  })
                                  .catch( e => console.error(e));
                              })
                              .catch(e => console.error(e));
                          })
                          .catch( e => console.error(e));
                      })
                      .catch( e => console.error(e));
                  })
                  .catch( e => console.error(e));
              })
              .catch( e => console.error(e));
          })  
          .catch( e => console.error(e));

  }
