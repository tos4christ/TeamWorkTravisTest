const jwt = require('jsonwebtoken');

const details = (token) => {
  const toker = jwt.verify(token, process.env.TOKENKEY, (err, token) => {
    if(err) console.error(err);
    return token;
  });
  return toker;
}

module.exports = details;
