import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const validateDiscountCode = async (req: Request, res: Response) => {
    try {
        const { code } = req.params;
        const discount = await prisma.discountCode.findUnique({
            where: { code: code.toUpperCase() }
        });

        if (!discount || !discount.isActive) {
            return res.status(404).json({ error: 'Invalid or inactive discount code' });
        }

        if (new Date(discount.expiryDate) < new Date()) {
            return res.status(400).json({ error: 'Discount code has expired' });
        }

        if (discount.usageLimit && discount.usedCount >= discount.usageLimit) {
            return res.status(400).json({ error: 'Discount code usage limit reached' });
        }

        res.json({
            success: true,
            discount: {
                code: discount.code,
                type: discount.discountType,
                value: discount.discountValue,
                isFirstOrderOnly: discount.isFirstOrderOnly
            }
        });
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to validate discount code' });
    }
};

export const getDiscountCodes = async (req: Request, res: Response) => {
    try {
        const discounts = await prisma.discountCode.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(discounts);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch discount codes' });
    }
};

export const createDiscountCode = async (req: Request, res: Response) => {
    try {
        const { code, discountType, discountValue, expiryDate, usageLimit, isFirstOrderOnly } = req.body;

        const existing = await prisma.discountCode.findUnique({ where: { code: code.toUpperCase() } });
        if (existing) {
            return res.status(400).json({ error: 'Discount code already exists' });
        }

        const discount = await prisma.discountCode.create({
            data: {
                code: code.toUpperCase(),
                discountType,
                discountValue: parseInt(discountValue),
                expiryDate: new Date(expiryDate),
                usageLimit: usageLimit ? parseInt(usageLimit) : null,
                isFirstOrderOnly: !!isFirstOrderOnly
            }
        });
        res.status(201).json(discount);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to create discount code' });
    }
};

export const updateDiscountCode = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        if (data.expiryDate) data.expiryDate = new Date(data.expiryDate);
        if (data.discountValue) data.discountValue = parseInt(data.discountValue);
        if (data.usageLimit) data.usageLimit = parseInt(data.usageLimit);

        const discount = await prisma.discountCode.update({
            where: { id },
            data
        });
        res.json(discount);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to update discount code' });
    }
};

export const deleteDiscountCode = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.discountCode.delete({ where: { id } });
        res.json({ message: 'Discount code deleted' });
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to delete discount code' });
    }
};
