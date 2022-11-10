import { Router } from 'express';
import filesRoutes from './files';

const router = Router();

router.use('/files', filesRoutes);

export default router;
