import { Router } from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { authMiddleware, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getProducts);
router.post('/', authMiddleware, authorize(['admin', 'manager']), createProduct);
router.put('/:id', authMiddleware, authorize(['admin', 'manager']), updateProduct);
router.delete('/:id', authMiddleware, authorize(['admin', 'manager']), deleteProduct);

export default router;
