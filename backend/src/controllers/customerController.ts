import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAllCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await prisma.customer.findMany({
            include: {
                orders: {
                    select: {
                        id: true,
                        totalAmount: true,
                        createdAt: true,
                        orderStatus: true
                    }
                },
                addresses: true
            },
            orderBy: { createdAt: 'desc' }
        });

        // Add some analytics to each customer
        const customersWithStats = customers.map(customer => {
            const totalOrders = customer.orders.length;
            const totalSpent = customer.orders.reduce((sum, order) => sum + order.totalAmount, 0);
            const lastOrderDate = customer.orders.length > 0
                ? customer.orders[0].createdAt
                : null;

            return {
                ...customer,
                totalOrders,
                totalSpent,
                lastOrderDate
            };
        });

        res.json(customersWithStats);
    } catch (error: any) {
        console.error('Failed to fetch customers:', error);
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
};

export const getCustomerById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    try {
        const customer = await prisma.customer.findUnique({
            where: { id },
            include: {
                orders: {
                    include: {
                        items: true
                    },
                    orderBy: { createdAt: 'desc' }
                },
                addresses: true
            }
        });

        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        res.json(customer);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch customer details' });
    }
};
