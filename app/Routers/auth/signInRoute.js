// const router = require('express').Router();
import { Router } from 'express';
const router = Router();

// const signInController = require('../../Controllers/signInController');
import signInController from '../../Controllers/signInController';

router.post('/', signInController);

export default router;
