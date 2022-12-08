import { Router } from 'express';
import authsRoutes from './auth';
import usersRoutes from './users';

const router = Router();

router.use('/auth', authsRoutes);
router.use('/users', usersRoutes);

export default router;
