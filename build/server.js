'use strict';

var http = require('http');
var app = require('../app/app');

var port = process.env.PORT || 3000;
var host = process.env.HOST || 'localhost';

var server = http.createServer(app);

server.listen(port, host, function () {
  console.log('server listening on port ' + port);
});