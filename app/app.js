require('dotenv').config();
const express = require('express');
const cloudinary = require('cloudinary').v2;
const routeAdmin = require('../Routers/routeAdmin');

// Already using cloudinary in the env file this is just for alternatives
// Enter your cloudinary credentials below                                           
cloudinary.config({cloud_name: "tos4christ", 
api_key: "594949515392786", 
api_secret: "N0E0H0bfxGI_4CEFvgWfwNBjJWY"                       
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// route for testing
app.use('/test', (req, res) => {
  res.status(200).send('Request received');
});

// route to receive all request
app.use('/api/v1', routeAdmin);

// catch 404 error and send to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found at all');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
    res.send({
      'Server Error': err.message
    });
});

module.exports = app;
