import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAllFranchiseInquiries = async (req: Request, res: Response) => {
    try {
        const inquiries = await prisma.franchiseInquiry.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch franchise inquiries' });
    }
};

export const createFranchiseInquiry = async (req: Request, res: Response) => {
    const { name, email, phone, city, investmentRange, businessOrg, experience, message } = req.body;

    if (!name || !email || !phone || !city || !investmentRange) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const inquiry = await prisma.franchiseInquiry.create({
            data: {
                name,
                email,
                phone,
                city,
                investmentRange,
                businessOrg,
                experience,
                message
            }
        });
        res.status(201).json(inquiry);
    } catch (error) {
        console.error('Franchise Inquiry Error:', error);
        res.status(500).json({ error: 'Failed to submit franchise inquiry' });
    }
};

export const updateFranchiseInquiryStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const inquiry = await prisma.franchiseInquiry.update({
            where: { id },
            data: { status }
        });
        res.json(inquiry);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update status' });
    }
};

export const deleteFranchiseInquiry = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.franchiseInquiry.delete({
            where: { id }
        });
        res.json({ message: 'Inquiry deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete inquiry' });
    }
};
