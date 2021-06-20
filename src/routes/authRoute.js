import express from 'express';
import validationMiddleware from '../middlewares/validationMiddleware';
import {
  signupSchema,
  loginSchema,
  verificationSchema,
  sendVerificationSchema,
  changePasswordSchema,
} from '../validations/authValidation';
import {
  login,
  register,
  validateConfirmationToken,
  sendVerificationEmail,
} from '../controllers/authController';
import authenticateToken from '../middlewares/authenticate';

const router = express.Router();

router.post('/register', validationMiddleware(signupSchema), register);
router.post('/login', validationMiddleware(loginSchema), login);
router.post(
  '/verify',
  authenticateToken,
  validationMiddleware(verificationSchema),
  validateConfirmationToken
);
router.post(
  '/send-verification',
  validationMiddleware(sendVerificationSchema),
  sendVerificationEmail
);
router.put(
  '/change-password',
  authenticateToken,
  validationMiddleware(changePasswordSchema),
  validateConfirmationToken
);

export default router;
