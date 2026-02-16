import express from 'express';
import { getDashboardStats, getGoogleAnalytics } from '../controllers/analyticsController';
import { authMiddleware, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/stats', authMiddleware, authorize(['admin', 'staff']), getDashboardStats);
router.get('/google', authMiddleware, authorize(['admin', 'staff']), getGoogleAnalytics);

export default router;
