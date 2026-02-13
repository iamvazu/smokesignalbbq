import { Request, Response } from 'express';
import prisma from '../lib/prisma';

const isUUID = (id: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

export const createOrder = async (req: Request, res: Response) => {
    const {
        customerName,
        customerPhone,
        addressLine1,
        city,
        items,
        totalAmount,
        deliveryFee,
        taxAmount,
        paymentMethod
    } = req.body;

    try {
        // 1. Create or Find Customer
        let customer = await prisma.customer.findFirst({
            where: { phone: customerPhone }
        });

        if (!customer) {
            customer = await prisma.customer.create({
                data: { name: customerName, phone: customerPhone }
            });
        }

        // 2. Create Address
        const address = await prisma.address.create({
            data: {
                customerId: customer.id,
                addressLine1,
                city
            }
        });

        // 3. Create Order
        const order = await prisma.order.create({
            data: {
                customerId: customer.id,
                addressId: address.id,
                totalAmount: Math.round(Number(totalAmount)),
                deliveryFee: Math.round(Number(deliveryFee)),
                taxAmount: Math.round(Number(taxAmount)),
                paymentMethod,
                items: {
                    create: items.map((item: any) => ({
                        productId: (item.productId && isUUID(item.productId)) ? item.productId : null,
                        comboId: (item.comboId && isUUID(item.comboId)) ? item.comboId : null,
                        quantity: Number(item.quantity),
                        price: Math.round(Number(item.price))
                    }))
                }
            },
            include: {
                items: true,
                customer: true,
                address: true
            }
        });

        res.status(201).json(order);
    } catch (error) {
        console.error('Order creation failed:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};

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
            where: { id: id as string },

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
            where: { id: id as string },

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
