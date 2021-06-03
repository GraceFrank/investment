import express from 'express';
import validationMiddleware from '../middlewares/validationMiddleware';
import { signupSchema } from '../validations/authValidation';
import { login, register } from '../controllers/authController';

const router = express.Router();

router.post('/register', validationMiddleware(signupSchema), register);
router.post('/login', login);

export default router;
