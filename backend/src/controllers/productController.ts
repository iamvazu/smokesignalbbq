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

export const createProduct = async (req: Request, res: Response) => {
    const { name, description, category, subCategory, sku, weight, price, discountPrice, costPrice, stock, images } = req.body;

    try {
        const product = await prisma.product.create({
            data: {
                name,
                description,
                category,
                subCategory,
                sku,

                weight,
                price,
                discountPrice,
                costPrice,
                stock,
                images: {
                    create: images?.map((url: string) => ({ imageUrl: url })) || []
                }
            },
            include: { images: true }
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const product = await prisma.product.update({
            where: { id: id as string },

            data: {
                ...data,
                images: data.images ? {
                    deleteMany: {},
                    create: data.images.map((url: string) => ({ imageUrl: url }))
                } : undefined
            },
            include: { images: true }
        });
        res.json(product);
    } catch (error) {
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
