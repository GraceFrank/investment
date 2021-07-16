import express from 'express';
import authorize from '../middlewares/authorize';
import authenticateToken from '../middlewares/authenticate';
import validationMiddleware from '../middlewares/validationMiddleware';
import {
  signupSchema,
  forgotPasswordSchema,
} from '../validations/authValidation';
import {
  getAllUsers,
  updateUser,
  createAdminUser,
} from '../controllers/userController';

const router = express.Router();

router.get('/', authenticateToken, authorize, getAllUsers);
router.post(
  '/',
  authenticateToken,
  authorize,
  validationMiddleware(signupSchema),
  createAdminUser
);
router.put(
  '/:id/change-password',
  authenticateToken,
  authorize,
  validationMiddleware(forgotPasswordSchema),
  updateUser
);

export default router;
