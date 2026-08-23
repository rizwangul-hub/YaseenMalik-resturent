import express from 'express';
import { getGalleryItems, createGalleryItem, deleteGalleryItem } from '../controllers/galleryController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getGalleryItems);

// Protected admin endpoints
router.post('/', protect, authorize('ADMIN', 'SUPER_ADMIN'), createGalleryItem);
router.delete('/:id', protect, authorize('ADMIN', 'SUPER_ADMIN'), deleteGalleryItem);

export default router;
