import { Router } from 'express';
import * as user from '../middleware/users';

const router = Router();

// POST /users
router.post('/', user.authMw, user.createUserMw, user.returnUserMw);

// GET /users
router.get('/', user.authMw, user.getUsersMw, user.returnUsersMw);

// GET /users/:id
router.get('/:id', user.authMw, user.getUserMw, user.returnUserMw);

// PATCH /users/:id
router.patch(
  '/:id',
  user.authMw,
  user.getUserMw,
  user.updateUserMw,
  user.getUserMw,
  user.returnUserMw
);

// DELETE /users/:id
router.delete('/:id', user.authMw, user.getUserMw, user.deleteUserMw);

export default router;
