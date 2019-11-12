// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';

const jwtCheck = (req, res, next) => {

  if(!req.headers.authorization) {
    const err = new Error('Unauthorized access 1');
    res.status(401);
    err.status = 401;
    next(err);
  }
  if(req.headers.authorization) {
    const toks = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
    jwt.verify(toks, process.env.TOKENKEY, (err, tokers) => {
      if(err) console.error(err);
      
      if(!tokers) {
        const err = new Error('Unauthorized access 2');
        res.status(410);
        err.status = 401;
        next(err);
      } else  if(tokers) {
        res.status(200);
        next();
      }
    });
  } else {
    return;
  }   
}

export default jwtCheck;
