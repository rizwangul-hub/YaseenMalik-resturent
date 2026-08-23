import express from 'express';
import { getSettings, updateSettings, getNotificationStats } from '../controllers/settingsController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getSettings);
router.put('/', protect, authorize('ADMIN', 'SUPER_ADMIN'), updateSettings);
router.get('/notifications', protect, authorize('ADMIN', 'SUPER_ADMIN'), getNotificationStats);

export default router;
