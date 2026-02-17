import { Router } from 'express';
import {
    getAllFranchiseInquiries,
    createFranchiseInquiry,
    updateFranchiseInquiryStatus,
    deleteFranchiseInquiry
} from '../controllers/franchiseInquiryController';
import { authMiddleware, authorize } from '../middleware/auth';

const router = Router();

// Public route to submit inquiry
router.post('/', createFranchiseInquiry);

// Protected routes for admin
router.get('/', authMiddleware, authorize(['admin']), getAllFranchiseInquiries);
router.patch('/:id/status', authMiddleware, authorize(['admin']), updateFranchiseInquiryStatus);
router.delete('/:id', authMiddleware, authorize(['admin']), deleteFranchiseInquiry);

export default router;
