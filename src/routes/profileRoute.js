import express from 'express';
import validationMiddleware from '../middlewares/validationMiddleware';
import {
  profileSchema,
  approveProfileSchema,
  uploadIdCardValidation,
} from '../validations/ProfileValidation';
import { uploadFile } from '../middlewares/fileUploadMiddleware';
import {
  getProfile,
  createProfile,
  updateProfile,
  getProfiles,
  uploadIdCard,
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
router.put(
  '/upload',
  authenticateToken,
  uploadFile.single('idCard'),
  validationMiddleware(uploadIdCardValidation),
  uploadIdCard
);

// APPROVE OR DECLINE PROFILE
router.put(
  '/:id',
  authenticateToken,
  authorize,
  validateId,
  validationMiddleware(approveProfileSchema),
  updateProfile
);
router.get('/all', authenticateToken, authorize, getProfiles);
router.get('/:id', authenticateToken, authorize, validateId, getProfile);

export default router;
