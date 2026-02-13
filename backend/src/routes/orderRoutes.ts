import { Router } from 'express';
import { getOrders, updateOrderStatus, getOrderById, createOrder } from '../controllers/orderController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Public route for creating orders
router.post('/', createOrder);

// Protected routes for admin
router.use(authMiddleware);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.put('/:id/status', updateOrderStatus);

export default router;

