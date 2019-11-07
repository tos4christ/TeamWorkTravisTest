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

pool.query(`CREATE TABLE employees(
    employee_id integer NOT NULL DEFAULT,
    firstname text NOT NULL,
    lastname text NOT NULL,
    email text NOT NULL,
    employee_password text NOT NULL,
    gender text NOT NULL,
    jobrole text NOT NULL,
    employee_no integer NOT NULL,
    department text NOT NULL,
    creation_date date NOT NULL,
    CONSTRAINT employees_pkey PRIMARY KEY (employee_id),
    CONSTRAINT employees_email_key UNIQUE (email),
    CONSTRAINT employees_employee_no_key UNIQUE (employee_no)
  )
  ALTER TABLE public.employees
    OWNER TO postgres;
  `)
  .then( table => {
    console.log('the tables', table);
  })
  .catch( e => console.error(e));

module.exports = pool;
