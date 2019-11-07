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

pool.on('connect', () => {
  console.log('connected to the database');
})

pool.query(query)
  .then( table => {
    console.log('the tables', table.rows);
  })
  .catch( e => console.error(e));

module.exports = pool;
