import express from 'express';
import { getDashboardStats } from '../controllers/analyticsController';
import { authMiddleware, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/stats', authMiddleware, authorize(['admin', 'staff']), getDashboardStats);

export default router;
