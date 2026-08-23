import express from 'express';
import { getReviews, createReview, approveReview, deleteReview } from '../controllers/reviewController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getReviews);
router.post('/', createReview);

// Protected admin endpoints
router.put('/:id/approve', protect, authorize('ADMIN', 'SUPER_ADMIN'), approveReview);
router.delete('/:id', protect, authorize('ADMIN', 'SUPER_ADMIN'), deleteReview);

export default router;
