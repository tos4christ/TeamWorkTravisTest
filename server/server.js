const http = require('http');
const app = require('../app/app');

const port = process.env.PORT;
const host = process.env.HOST;

const server = http.createServer(app);

server.listen(port, host, () => {
  console.log(`server listening on port ${port}`);
});

module.exports = server;
