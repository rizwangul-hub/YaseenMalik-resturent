import express from 'express';
import { getUsers, updateUser, deleteUser } from '../controllers/userController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.use(protect);
router.use(authorize('ADMIN', 'SUPER_ADMIN'));

router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
