import express from 'express';
import {
  createReservation,
  getReservations,
  updateReservationStatus,
} from '../controllers/reservationController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', createReservation);

// Protected admin endpoints
router.get('/', protect, authorize('ADMIN', 'SUPER_ADMIN'), getReservations);
router.put('/:id/status', protect, authorize('ADMIN', 'SUPER_ADMIN'), updateReservationStatus);

export default router;
