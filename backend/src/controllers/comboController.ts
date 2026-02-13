import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAllCombos = async (req: Request, res: Response) => {
    try {
        const combos = await prisma.comboPack.findMany({
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
        res.json(combos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch combos' });
    }
};

export const getComboById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const combo = await prisma.comboPack.findUnique({
            where: { id: String(id) },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
        if (!combo) return res.status(404).json({ error: 'Combo not found' });
        res.json(combo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch combo' });
    }
};

// ... (createCombo is mostly fine, image might be issue if type defs aren't updated, but will compile if I ignore or if generate worked)

export const updateCombo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, price, originalPrice, image, status, items } = req.body;

    try {
        // First delete existing items to replace them (simplest strategy for update)
        if (items) {
            await prisma.comboItem.deleteMany({
                where: { comboId: String(id) }
            });
        }

        const combo = await prisma.comboPack.update({
            where: { id: String(id) },
            data: {
                name,
                description,
                price: Number(price),
                originalPrice: Number(originalPrice),
                image,
                status,
                items: items ? {
                    create: items.map((item: any) => ({
                        productId: item.productId,
                        quantity: Number(item.quantity)
                    }))
                } : undefined
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
        res.json(combo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update combo' });
    }
};

export const deleteCombo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.comboItem.deleteMany({
            where: { comboId: String(id) }
        });

        await prisma.comboPack.delete({
            where: { id: String(id) }
        });
        res.json({ message: 'Combo deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete combo' });
    }
};
