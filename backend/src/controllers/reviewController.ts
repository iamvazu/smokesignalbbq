import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const submitReview = async (req: Request, res: Response) => {
    try {
        const { productId, comboId, customerName, rating, comment } = req.body;

        if (!customerName || !rating) {
            return res.status(400).json({ error: 'Name and rating are required' });
        }

        const review = await prisma.review.create({
            data: {
                productId,
                comboId,
                customerName,
                rating: parseInt(rating),
                comment,
                status: 'pending'
            }
        });

        res.status(201).json({
            success: true,
            message: 'Thanks! Your review has been submitted for moderation.',
            review
        });
    } catch (error: any) {
        console.error('Review submission error:', error);
        res.status(500).json({ error: 'Failed to submit review' });
    }
};

export const getApprovedReviews = async (req: Request, res: Response) => {
    try {
        const { productId, comboId } = req.query;
        const reviews = await prisma.review.findMany({
            where: {
                status: 'approved',
                productId: productId && productId !== 'undefined' ? (productId as string) : undefined,
                comboId: comboId && comboId !== 'undefined' ? (comboId as string) : undefined
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(reviews);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};

// Admin methods
export const getAllReviews = async (req: Request, res: Response) => {
    try {
        const reviews = await prisma.review.findMany({
            include: {
                product: { select: { name: true } },
                combo: { select: { name: true } }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(reviews);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch all reviews' });
    }
};

export const updateReviewStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // approved, rejected
        const review = await prisma.review.update({
            where: { id },
            data: { status }
        });
        res.json(review);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to update review status' });
    }
};

export const deleteReview = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.review.delete({ where: { id } });
        res.json({ message: 'Review deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to delete review' });
    }
};
