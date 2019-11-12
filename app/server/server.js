// const http = require('http');
import http from 'http';

import app from '../app/app';
// const app = require('../app/app');

const port = process.env.PORT;
const host = process.env.HOST;

const server = http.createServer(app);

server.listen(port, host, () => {
  console.log(`server listening on port ${port}`);
});

export default server;
