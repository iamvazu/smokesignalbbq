import { Router } from 'express';
import * as comboController from '../controllers/comboController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Public Routes
router.get('/', comboController.getAllCombos);
router.get('/:id', comboController.getComboById);

// Admin Routes (Protected)
router.post('/', authMiddleware, comboController.createCombo);
router.put('/:id', authMiddleware, comboController.updateCombo);
router.delete('/:id', authMiddleware, comboController.deleteCombo);

export default router;
