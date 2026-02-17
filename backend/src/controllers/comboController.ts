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
        const combo = await prisma.comboPack.findFirst({
            where: {
                OR: [
                    { id: String(id) },
                    { slug: String(id) }
                ]
            },
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

export const createCombo = async (req: Request, res: Response) => {
    const {
        name,
        description,
        longDescription,
        heatingInstructions,
        ingredients,
        storageInstructions,
        price,
        originalPrice,
        image,
        isMostPopular,
        isBestValue,
        status,
        slug,
        items
    } = req.body;
    // items should be array of { productId, quantity }

    try {
        const combo = await prisma.comboPack.create({
            data: {
                name,
                slug,
                description,
                longDescription,
                heatingInstructions,
                ingredients,
                storageInstructions,
                price: Number(price),
                originalPrice: Number(originalPrice),
                image,
                isMostPopular: Boolean(isMostPopular),
                isBestValue: Boolean(isBestValue),
                status: status || 'active',
                items: {
                    create: items.map((item: any) => ({
                        productId: item.productId,
                        quantity: Number(item.quantity)
                    }))
                }
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
        res.status(201).json(combo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create combo' });
    }
};

export const updateCombo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
        name,
        description,
        longDescription,
        heatingInstructions,
        ingredients,
        storageInstructions,
        price,
        originalPrice,
        image,
        isMostPopular,
        isBestValue,
        status,
        slug,
        items
    } = req.body;

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
                slug,
                description,
                longDescription,
                heatingInstructions,
                ingredients,
                storageInstructions,
                price: Number(price),
                originalPrice: Number(originalPrice),
                image,
                isMostPopular: Boolean(isMostPopular),
                isBestValue: Boolean(isBestValue),
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
