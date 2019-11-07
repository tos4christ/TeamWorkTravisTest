const pool = require('./Models/poolConnection');

const query = `
CREATE TABLE public.employees
(
  employee_id integer NOT NULL DEFAULT nextval('employees_employee_id_seq'::regclass),
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
WITH (
  OIDS=FALSE
);
ALTER TABLE public.employees
  OWNER TO postgres;
`;

pool.query(query)
  .then( res => console.log(res))
  .catch( e => console.error(e));
  