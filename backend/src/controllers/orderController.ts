import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                customer: true,
                address: true,
                items: {
                    include: {
                        product: true,
                        combo: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { orderStatus, paymentStatus, deliveryStatus } = req.body;

    try {
        const order = await prisma.order.update({
            where: { id },
            data: {
                orderStatus,
                paymentStatus,
                deliveryStatus
            }
        });
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order' });
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                customer: true,
                address: true,
                items: {
                    include: {
                        product: true,
                        combo: true
                    }
                },
                payments: true
            }
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch order details' });
    }
};
