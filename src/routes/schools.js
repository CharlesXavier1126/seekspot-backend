import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getSchools } from '../controllers/schoolsController.js';

const router = Router();

router.get('/', authMiddleware, getSchools);

export default router;
