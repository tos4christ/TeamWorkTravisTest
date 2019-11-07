const { Pool } = require('pg');
const query = require('./poolQuery');

const pool = new Pool();

pool.on('connect', () => console.log('connected to the database'));
pool.query(query.employees_query, (err, res) => {
  if(err) console.error(err);
  console.log(res);
});
pool.query(`insert into employees (firstname, lastname, email, employee_password, gender, jobrole, employee_no, department, creation_date) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
['tosin', 'fetuga', 'gmail', 'tosinn', 'male', 'IT', 'FS', Date().split('GMT')[0]])
.then( res => {
  console.log(res);
})
.catch( e => console.error(e));

module.exports = pool;
