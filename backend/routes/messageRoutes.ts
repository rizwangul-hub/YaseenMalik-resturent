import express from 'express';
import { createMessage, getMessages, markAsRead, deleteMessage } from '../controllers/messageController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createMessage);

// Protected Admin Inbox Routes
router.get('/', protect, authorize('ADMIN', 'SUPER_ADMIN'), getMessages);
router.put('/:id/read', protect, authorize('ADMIN', 'SUPER_ADMIN'), markAsRead);
router.delete('/:id', protect, authorize('ADMIN', 'SUPER_ADMIN'), deleteMessage);

export default router;
