import { Router } from 'express';
import { register, verifyAndRegister, login } from '../controllers/authController.js';

const router = Router();

router.post('/register', register);
router.post('/register/verify', verifyAndRegister);
router.post('/login', login);

export default router;
