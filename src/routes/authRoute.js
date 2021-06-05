import express from 'express';
import validationMiddleware from '../middlewares/validationMiddleware';
import {
  signupSchema,
  loginSchema,
  verificationSchema,
  sendVerificationSchema,
} from '../validations/authValidation';
import { login, register } from '../controllers/authController';

const router = express.Router();

router.post('/register', validationMiddleware(signupSchema), register);
router.post('/login', validationMiddleware(loginSchema), login);

export default router;
