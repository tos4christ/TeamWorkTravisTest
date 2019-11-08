const bcrypt = require('bcrypt');
const pool = require('../Models/poolConnection');
const newUserQuery = require('../Models/newUserModel');
const jwt = require('jsonwebtoken');


// create a new user for the new employee inserting their records in the database
// ensure to hash their password with bcrypt before it goes into the database
const createUser = (req, res, next) => {
  const body = req.body;
  // check if email and password was sent
  if(!body.email || !body.employee_password) {
    res.status(400).json({
      "status": "error",
      "error": " Email or Password field cannot be empty"
    });
    next();
  }
  const hash = bcrypt.hashSync(body.employee_password, 9);
  const creation_date = Date().split('GMT')[0];
  pool.query(newUserQuery, [body.firstname, body.lastname, body.email, hash, body.gender, body.jobrole, body.employee_no, body.department, creation_date])
    .then( user => {
      const token = jwt.sign({
        sub: user.rows[0].employee_no,
        email: user.rows[0].email
      }, process.env.TOKENKEY, {expiresIn: 1440});
      res.status(200).json({
      "status": "success",
      "data": {
        "message": "User account successfully created",
        "token": token,
        "userId": user.rows[0].employee_no
      }
      });
    })
    .catch( e => next(e));
}

module.exports = createUser;