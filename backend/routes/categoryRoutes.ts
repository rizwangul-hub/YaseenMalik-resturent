import express from 'express';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCategories);

// Protected admin endpoints
router.post('/', protect, authorize('ADMIN', 'SUPER_ADMIN'), createCategory);
router.put('/:id', protect, authorize('ADMIN', 'SUPER_ADMIN'), updateCategory);
router.delete('/:id', protect, authorize('ADMIN', 'SUPER_ADMIN'), deleteCategory);

export default router;
