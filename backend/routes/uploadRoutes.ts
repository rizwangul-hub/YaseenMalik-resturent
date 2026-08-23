import express from 'express';
import { uploadImage } from '../controllers/uploadController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Allow authenticated admins to upload images to Cloudinary
router.post('/', protect, authorize('ADMIN', 'SUPER_ADMIN'), uploadImage);

export default router;
