import { Router } from 'express';
import { submitReview, getApprovedReviews, getAllReviews, updateReviewStatus, deleteReview } from '../controllers/reviewController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/submit', submitReview);
router.get('/approved', getApprovedReviews);

// Admin routes
router.get('/all', authMiddleware, getAllReviews);
router.patch('/:id/status', authMiddleware, updateReviewStatus);
router.delete('/:id', authMiddleware, deleteReview);

export default router;
