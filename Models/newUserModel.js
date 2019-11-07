const newUser = `INSERT INTO employees(firstname, lastname, email, employee_password, gender, jobrole, employee_no, department, creation_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;

module.exports = newUser;
