import { Router } from 'express';
import {
    createEventInquiry,
    getEventInquiries,
    updateEventInquiryStatus,
    deleteEventInquiry
} from '../controllers/eventController';
import { authMiddleware } from '../middleware/auth';


const router = Router();

// Public route to submit inquiry
router.post('/', createEventInquiry);

// Protected routes for admin
router.get('/', authMiddleware, getEventInquiries);
router.patch('/:id/status', authMiddleware, updateEventInquiryStatus);
router.delete('/:id', authMiddleware, deleteEventInquiry);


export default router;
