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

pool.query(query.gif_table_query)
  .then((table) => {
    console.log('gif table created', table);
  })
  .catch( e => console.error(e));

module.exports = pool;
