import express from 'express';
import validationMiddleware from '../middlewares/validationMiddleware';
import { signupSchema } from '../validations/authValidation';
import { login, register } from '../controllers/authController';

const router = express.Router();

router.post('/login', login);
router.post('/register', validationMiddleware(signupSchema), register);

export default router;
