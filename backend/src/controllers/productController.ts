import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany({
            include: { images: true }
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.findFirst({
            where: {
                OR: [
                    { id: String(id) },
                    { slug: String(id) },
                    { sku: String(id) }
                ]
            },
            include: { images: true }
        });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    const { images, ...data } = req.body;

    try {
        const product = await prisma.product.create({
            data: {
                ...data,
                images: {
                    create: images?.map((url: string) => ({ imageUrl: url })) || []
                }
            },
            include: { images: true }
        });
        res.status(201).json(product);
    } catch (error) {
        console.error('Create error:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { images, ...data } = req.body;

    try {
        const product = await prisma.product.update({
            where: { id: id as string },
            data: {
                ...data,
                images: images ? {
                    deleteMany: {},
                    create: images.map((url: string) => ({ imageUrl: url }))
                } : undefined
            },
            include: { images: true }
        });
        res.json(product);
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.product.delete({ where: { id: id as string } });

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};
