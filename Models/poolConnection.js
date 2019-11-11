const { Pool } = require('pg');
const query2 = require('./2ndpoolQuery');

const pool = new Pool();

pool.on('connect', () => console.log('connected to the database'));

pool.query(query2.all, (err, res) => {
  if(err) console.error(err);
  console.log('database migrated');
});

module.exports = pool;
