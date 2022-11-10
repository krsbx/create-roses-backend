import { Router } from 'express';
import * as file from '../middleware/files';

const router = Router();

// POST /files
router.post('/', file.fileUploadMw, file.createFileMw, file.returnFileMw);

// GET /files
router.get('/', file.getFilesMw, file.returnFilesMw);

// GET /files/:id
router.get('/:id', file.getFileMw, file.returnFileMw);

// PATCH /files/:id
router.patch(
  '/:id',
  file.getFileMw,
  file.fileUploadMw,
  file.updateFileMw,
  file.getFileMw,
  file.returnFileMw
);

// DELETE /files/:id
router.delete('/:id', file.getFileMw, file.deleteFileMw);

export default router;
