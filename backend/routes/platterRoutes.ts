import express from 'express';
import {
  getPlatters,
  getPlatterById,
  createPlatter,
  updatePlatter,
  deletePlatter,
} from '../controllers/platterController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getPlatters);
router.get('/:id', getPlatterById);

// Protected admin endpoints
router.post('/', protect, authorize('ADMIN', 'SUPER_ADMIN'), createPlatter);
router.put('/:id', protect, authorize('ADMIN', 'SUPER_ADMIN'), updatePlatter);
router.delete('/:id', protect, authorize('ADMIN', 'SUPER_ADMIN'), deletePlatter);

export default router;
