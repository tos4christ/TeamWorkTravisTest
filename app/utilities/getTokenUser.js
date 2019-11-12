// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';

const details = (token) => {
  const toker = jwt.verify(token, process.env.TOKENKEY, (err, token) => {
    if(err) console.error(err);
    return token;
  });
  return toker;
}

export default details;
