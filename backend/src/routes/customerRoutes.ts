import { Router } from 'express';
import { getAllCustomers, getCustomerById } from '../controllers/customerController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// All customer routes are protected
router.use(authMiddleware);

router.get('/', getAllCustomers);
router.get('/:id', getCustomerById);

export default router;
