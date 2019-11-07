const bcrypt = require('bcrypt');
//const pool = require('../Models/poolConnection');
const signInQuery = require('../Models/signInModel');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg').Pool;
const pool = new Pool();

const signIn = (req, res, next) => {
  const body = req.body;
  // Check for usernames and password
  if(!body.username || !body.password) {
    res.status(400).json({
      "status": "error",
      "error": "Error: Please input the correct username and password"
    });
    return;
  }
  // check if user exists in database
  pool.query(signInQuery, [body.username])
    .then( user => {
      
      // send back token if the user is in our database
      if(user) {
        const passed = bcrypt.compareSync(body.password, user.rows[0].employee_password);
        if(passed) {
          const token = jwt.sign({
            sub: user.rows[0].employee_no,
            username: user.rows[0].email
          }, process.env.TOKENKEY, {expiresIn: 1440000});
  
          res.status(200).json({
            "status": "success",
            "data": {
              "token": token,
              "userId": user.rows[0].employee_id
            }
          });
        } else {
          res.status(400).json({
            "status": "error",
            "error": "Password is incorrect"
          });
        } 
      } else {
        res.status(400).json({
          "status": "error",
          "error": "Invalid username and password"
        });
      }
    })
    .catch( e => {
      next(e);
    });
}

module.exports = signIn;
