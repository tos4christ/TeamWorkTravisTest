const userQuery = `SELECT * FROM employees WHERE email=$1`;

module.exports = userQuery;
