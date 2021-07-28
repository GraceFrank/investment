import express from 'express';
import validationMiddleware from '../middlewares/validationMiddleware';
import {
  signupSchema,
  loginSchema,
  sendMailSchema,
  changePasswordSchema,
  forgotPasswordSchema,
} from '../validations/authValidation';
import {
  login,
  register,
  validateConfirmationToken,
  sendVerificationEmail,
  requestPasswordReset,
  changePassword,
  resetPassword,
} from '../controllers/authController';
import { adminLogin } from '../controllers/AdminControllers.js/adminAuthController';
import authenticateToken from '../middlewares/authenticate';

const router = express.Router();

router.post('/register', validationMiddleware(signupSchema), register);
router.post('/login', validationMiddleware(loginSchema), login);
router.get('/verify', authenticateToken, validateConfirmationToken);
router.post(
  '/send-verification',
  validationMiddleware(sendMailSchema),
  sendVerificationEmail
);

// change password when logged in
router.put(
  '/change-password',
  authenticateToken,
  validationMiddleware(changePasswordSchema),
  changePassword
);

// Change password via reset link sent to email
router.put(
  '/reset-password',
  authenticateToken,
  validationMiddleware(forgotPasswordSchema),
  resetPassword
);

// Requst to reset password
router.post(
  '/forgot-password',
  validationMiddleware(sendMailSchema),
  requestPasswordReset
);

router.post('/admin/login', validationMiddleware(loginSchema), adminLogin);

export default router;
