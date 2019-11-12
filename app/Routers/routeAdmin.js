// const router = require('express').Router();
import { Router } from 'express';

// const createUserRoute = require('./auth/createUserRoute');
import createUserRoute from './auth/createUserRoute';

// const signInRoute = require('./auth/signInRoute');
import signInRoute from './auth/signInRoute';

// const gifRoutes = require('./gifRoutes');
import gifRoutes from './gifRoutes';

// const articleRoutes = require('./articleRoutes');
import articleRoutes from './articleRoutes';

// const feedRoute = require('./feedRoute');
import feedRoute from './feedRoute';

// const jwtCheck = require('../utilities/jwtCheck');
import jwtCheck from '../utilities/jwtCheck';

const router = Router();

router.use('/auth/create-user', jwtCheck, createUserRoute);

router.use('/auth/signin', signInRoute);

router.use('/gifs', jwtCheck, gifRoutes);

router.use('/articles', jwtCheck, articleRoutes);

router.use('/feed', jwtCheck, feedRoute);

export default router;
