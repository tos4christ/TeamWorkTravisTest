const router = require('express').Router();
const createUserRoute = require('./auth/createUserRoute');
const signInRoute = require('./auth/signInRoute');
const gifRoutes = require('./gifRoutes');
const articleRoutes = require('./articleRoutes');
const feedRoute = require('./feedRoute');
const jwtCheck = require('../utilities/jwtCheck');



router.use('/auth/create-user', jwtCheck, createUserRoute);

router.use('/auth/signin', signInRoute);

router.use('/gifs', jwtCheck, gifRoutes);

router.use('/articles', jwtCheck, articleRoutes);

router.use('/feed', jwtCheck, feedRoute);

module.exports = router;
