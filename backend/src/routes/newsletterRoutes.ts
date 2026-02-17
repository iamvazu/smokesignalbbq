import { Router } from 'express';
import { subscribe, getSubscribers, deleteSubscriber } from '../controllers/newsletterController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/subscribe', subscribe);

// Admin routes
router.get('/subscribers', authMiddleware, getSubscribers);
router.delete('/:id', authMiddleware, deleteSubscriber);

export default router;
