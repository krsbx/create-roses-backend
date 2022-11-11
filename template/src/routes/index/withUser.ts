import { Router } from 'express';
import authsRoutes from './auths';
import usersRoutes from './users';

const router = Router();

router.use('/auth', authsRoutes);
router.use('/users', usersRoutes);

export default router;
