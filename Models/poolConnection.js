const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  databse: process.env.PGDATABASE,
  port: process.env.PGPORT,
  password: process.env.PGPASSWORD,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 600000,
  max: 50
})

module.exports = pool;
