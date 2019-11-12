// const router = require('express').Router();
import { Router } from 'express';
const router = Router();

// const createUserController = require('../../Controllers/createUserController');
import createUserController from '../../Controllers/createUserController';

router.post('/', createUserController);

export default router;
