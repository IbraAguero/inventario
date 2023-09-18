import { login, logout, refresh } from '../controllers/auth.controller.js';
import loginLimiter from '../middleware/loginLimiter.js';
import { Router } from 'express';

const router = Router();

router.post('/', loginLimiter, login);

router.get('/refresh', refresh);

router.post('/logout', logout);

export default router;
