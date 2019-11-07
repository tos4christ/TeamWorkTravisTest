const { Pool } = require('pg');
const query = require('./poolQuery');

const pool = new Pool();

pool.on('connect', () => console.log('connected to the database'));
pool.query(query.employees_query, (err, res) => {
  console.log(res);
});

module.exports = pool;
