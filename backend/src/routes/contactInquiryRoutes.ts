import { Router } from 'express';
import {
    createContactInquiry,
    getContactInquiries,
    updateContactInquiryStatus,
    deleteContactInquiry
} from '../controllers/contactInquiryController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Public route to submit inquiry
router.post('/', createContactInquiry);

// Protected routes for admin
router.get('/', authMiddleware, getContactInquiries);
router.patch('/:id/status', authMiddleware, updateContactInquiryStatus);
router.delete('/:id', authMiddleware, deleteContactInquiry);

export default router;
