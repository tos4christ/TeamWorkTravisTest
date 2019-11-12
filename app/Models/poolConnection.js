// const { Pool } = require('pg');
import { Pool } from 'pg';

// const query2 = require('./2ndpoolQuery');
import query2 from './2ndpoolQuery';

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT
});

pool.on('connect', () => console.log('connected to the database'));

pool.query(query2.all, (err, res) => {
  if(err) console.error(err);
  console.log('database migrated');
});

export default pool;
