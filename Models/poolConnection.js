const { Pool } = require('pg');
const query = require('./poolQuery');
const server = require('../server/server');

const pool = new Pool();

pool.on('connect', () => console.log('connected to the database'));

pool.query(query.employees_query, (err, res) => {
  if(err) console.error(err);
  console.log('employee table created');

  pool.query(query.admin_table_query, (err, res) => {
    if(err) console.error(err);
    console.log('admin table created');

    pool.query(query.article_comment_query, (err, res) => {
      if(err) console.error(err);
      console.log('article comment table created');

      pool.query(query.articles_query, (err, res) => {
        if(err) console.error(err);
        console.log('article table created');

        pool.query(query.comments_table_query, (err, res) => {
          if(err) console.error(err);
          console.log('comments table created');

          pool.query(query.gif_comment_query, (err, res) => {
            if(err) console.error(err);
            console.log('gif comment table created');

            pool.query(query.gif_table_query, (err, res) => {
              if(err) console.error(err);
              console.log('gif table table created');

              pool.query(query.one, (err, res) => {
                if(err) console.error(err);
                console.log('values inserted successfully', res);

                               
            
              })
          
              
          
            })
        
            
        
          })
      
          
      
        })
    
        
    
      })
  
      
  
    })

  })


});


module.exports = pool;
