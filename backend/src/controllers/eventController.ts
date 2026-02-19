import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const createEventInquiry = async (req: Request, res: Response) => {
    const {
        fullName,
        email,
        phoneNumber,
        eventType,
        eventDate,
        location,
        guestCount,
        message,
        source
    } = req.body;

    try {
        const inquiry = await prisma.eventInquiry.create({
            data: {
                fullName,
                email: email || '',
                phoneNumber,
                eventType,
                eventDate,
                location,
                guestCount: parseInt(guestCount.toString()),
                message,
                source: source || 'event',
                status: 'pending'
            }
        });


        res.status(201).json(inquiry);
    } catch (error) {
        console.error('Event inquiry creation failed:', error);
        res.status(500).json({ error: 'Failed to create event inquiry' });
    }
};

export const getEventInquiries = async (req: Request, res: Response) => {
    try {
        const inquiries = await prisma.eventInquiry.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch event inquiries' });
    }
};

export const updateEventInquiryStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const inquiry = await prisma.eventInquiry.update({
            where: { id: id as string },
            data: { status }
        });
        res.json(inquiry);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update inquiry status' });
    }
};

export const deleteEventInquiry = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.eventInquiry.delete({
            where: { id: id as string }
        });
        res.json({ message: 'Inquiry deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete inquiry' });
    }
};
