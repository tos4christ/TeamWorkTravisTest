const { Pool } = require('pg');
const query = require('./poolQuery');

const pool = new Pool();

pool.on('connect', () => console.log('connected to the database'));
pool.query(query.employees_query, (err, res) => {
  if(err) console.error(err);
  console.log(res);
});
// pool.query(`insert into `)

module.exports = pool;
