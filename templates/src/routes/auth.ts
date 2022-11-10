import { Router } from 'express';
import * as user from '../middleware/users';

const router = Router();

// POST /auth/login
router.post('/login', user.loginMw);

// POST /auth/register
router.post('/register', user.createUserMw);

export default router;
