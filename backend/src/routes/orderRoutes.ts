import { Router } from 'express';
import { getOrders, updateOrderStatus, getOrderById, createOrder, requestInvoice } from '../controllers/orderController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/', createOrder);
router.post('/:id/invoice', requestInvoice);


// Protected routes for admin
router.use(authMiddleware);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.put('/:id', updateOrderStatus);

export default router;

