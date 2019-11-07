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

pool.query(query.employees_query)
  .then(() => {
    console.log('gif table created');
  })
  .catch( e => console.error(e));

module.exports = pool;
