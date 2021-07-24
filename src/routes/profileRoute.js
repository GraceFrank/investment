import express from 'express';
import validationMiddleware from '../middlewares/validationMiddleware';
import {
  profileSchema,
  approveProfileSchema,
} from '../validations/ProfileValidation';
import {
  getProfile,
  createProfile,
  updateProfile, getProfiles,
} from '../controllers/profileController';
import authenticateToken from '../middlewares/authenticate';
import validateId from '../middlewares/validateIdMiddleware';
import authorize from '../middlewares/authorize';

const router = express.Router();

router.get('/', authenticateToken, getProfile);
router.post(
  '/',
  authenticateToken,
  validationMiddleware(profileSchema),
  createProfile
);
router.put(
  '/',
  authenticateToken,
  validationMiddleware(profileSchema),
  updateProfile
);
//APPROVE OR DECLINE PROFILE
router.put(
  '/:id',
  authenticateToken,
  authorize,
  validateId,
  validationMiddleware(approveProfileSchema),
  updateProfile
);
router.get(
  '/all',
  authenticateToken,
  authorize,
  getProfiles
);
router.get(
  '/:id',
  authenticateToken,
  authorize,
  validateId,
  getProfile
);

export default router;
