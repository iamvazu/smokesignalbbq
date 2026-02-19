import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const createContactInquiry = async (req: Request, res: Response) => {
    const {
        fullName,
        email,
        phoneNumber,
        subjectCategory,
        message
    } = req.body;

    try {
        const inquiry = await prisma.contactInquiry.create({
            data: {
                fullName,
                email,
                phoneNumber,
                subjectCategory,
                message,
                status: 'pending'
            }
        });

        res.status(201).json(inquiry);
    } catch (error) {
        console.error('Contact inquiry creation failed:', error);
        res.status(500).json({ error: 'Failed to create contact inquiry' });
    }
};

export const getContactInquiries = async (req: Request, res: Response) => {
    try {
        const inquiries = await prisma.contactInquiry.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch contact inquiries' });
    }
};

export const updateContactInquiryStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const inquiry = await prisma.contactInquiry.update({
            where: { id: id as string },
            data: { status }
        });
        res.json(inquiry);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update inquiry status' });
    }
};

export const deleteContactInquiry = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.contactInquiry.delete({
            where: { id: id as string }
        });
        res.json({ message: 'Inquiry deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete inquiry' });
    }
};
