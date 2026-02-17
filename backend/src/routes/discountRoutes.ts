import { Router } from 'express';
import { validateDiscountCode, getDiscountCodes, createDiscountCode, updateDiscountCode, deleteDiscountCode } from '../controllers/discountController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/validate/:code', validateDiscountCode);

// Admin routes
router.get('/', authMiddleware, getDiscountCodes);
router.post('/', authMiddleware, createDiscountCode);
router.put('/:id', authMiddleware, updateDiscountCode);
router.delete('/:id', authMiddleware, deleteDiscountCode);

export default router;
