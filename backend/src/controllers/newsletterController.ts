import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const subscribe = async (req: Request, res: Response) => {
    try {
        const { email, source } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        const subscriber = await prisma.newsletterSubscriber.upsert({
            where: { email },
            update: { isActive: true },
            create: { email, source: source || 'main_site' }
        });

        res.status(201).json({
            success: true,
            message: 'Subscribed successfully! BBQ tips are on the way.',
            subscriber
        });
    } catch (error: any) {
        console.error('Newsletter error:', error);
        res.status(500).json({ error: 'Failed to subscribe' });
    }
};

export const getSubscribers = async (req: Request, res: Response) => {
    try {
        const subscribers = await prisma.newsletterSubscriber.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(subscribers);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch subscribers' });
    }
};

export const deleteSubscriber = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        await prisma.newsletterSubscriber.delete({ where: { id } });
        res.json({ message: 'Subscriber removed' });
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to delete subscriber' });
    }
};
