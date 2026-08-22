import express from 'express';
import { createOrder, trackOrder, getOrders, getOrderById, updateOrderStatus } from '../controllers/orderController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', createOrder);
router.get('/track', trackOrder);

// Protected admin endpoints
router.get('/', protect, authorize('ADMIN', 'SUPER_ADMIN'), getOrders);
router.get('/:id', protect, authorize('ADMIN', 'SUPER_ADMIN'), getOrderById);
router.put('/:id/status', protect, authorize('ADMIN', 'SUPER_ADMIN'), updateOrderStatus);

export default router;
