import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const [
            totalOrdersToday,
            totalRevenueToday,
            totalOrdersMonth,
            totalRevenueMonth,
            pendingOrders,
            completedOrders
        ] = await Promise.all([
            prisma.order.count({ where: { createdAt: { gte: today } } }),
            prisma.order.aggregate({
                _sum: { totalAmount: true },
                where: { createdAt: { gte: today }, paymentStatus: 'paid' }
            }),
            prisma.order.count({
                where: {
                    createdAt: {
                        gte: new Date(today.getFullYear(), today.getMonth(), 1)
                    }
                }
            }),
            prisma.order.aggregate({
                _sum: { totalAmount: true },
                where: {
                    createdAt: {
                        gte: new Date(today.getFullYear(), today.getMonth(), 1)
                    },
                    paymentStatus: 'paid'
                }
            }),
            prisma.order.count({ where: { orderStatus: 'pending' } }),
            prisma.order.count({ where: { orderStatus: 'delivered' } })
        ]);

        res.json({
            today: {
                orders: totalOrdersToday,
                revenue: totalRevenueToday._sum.totalAmount || 0
            },
            month: {
                orders: totalOrdersMonth,
                revenue: totalRevenueMonth._sum.totalAmount || 0
            },
            status: {
                pending: pendingOrders,
                completed: completedOrders
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
};
