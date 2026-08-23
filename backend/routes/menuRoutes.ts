import express from 'express';
import {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../controllers/menuController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getMenuItems);
router.get('/:id', getMenuItemById);

// Protected admin endpoints
router.post('/', protect, authorize('ADMIN', 'SUPER_ADMIN'), createMenuItem);
router.put('/:id', protect, authorize('ADMIN', 'SUPER_ADMIN'), updateMenuItem);
router.delete('/:id', protect, authorize('ADMIN', 'SUPER_ADMIN'), deleteMenuItem);

export default router;
