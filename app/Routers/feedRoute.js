// const router = require('express').Router();
import { Router } from 'express';
const router = Router();

// const feedController = require('../Controllers/feedController');
import feedController from '../Controllers/feedController';

router.get('/', feedController);

export default router;
