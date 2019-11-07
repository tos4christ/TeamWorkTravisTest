const { Pool } = require('pg');

const pool = new Pool();

pool.on('connect', () => console.log('connected to the database'));

module.exports = pool;
