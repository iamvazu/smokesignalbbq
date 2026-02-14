import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { z } from 'zod';

const isUUID = (id: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

// SECURITY: Input validation schema (Whitelisting approach)
const OrderSchema = z.object({
    customerName: z.string().min(2).max(100),
    customerPhone: z.string().regex(/^[0-9+]{10,15}$/),
    addressLine1: z.string().min(5).max(255),
    city: z.string().min(2).max(100),
    items: z.array(z.object({
        productId: z.string().nullable().optional(),
        comboId: z.string().nullable().optional(),
        name: z.string(),
        quantity: z.number().int().positive().max(50),
        price: z.number().nonnegative() // Client's expected price
    })).min(1),
    totalAmount: z.number().positive(),
    deliveryFee: z.number().nonnegative(),
    taxAmount: z.number().nonnegative(),
    paymentMethod: z.string()
});

export const createOrder = async (req: Request, res: Response) => {
    try {
        console.log('📦 Checkout Request:', JSON.stringify(req.body, null, 2));

        const validatedData = OrderSchema.parse(req.body);
        const { items, customerPhone, customerName, addressLine1, city, totalAmount, deliveryFee, taxAmount, paymentMethod } = validatedData;

        // 1. Calculate Real Total Server-Side (Try to verify against DB, but allow fallback for static products)
        let serverCalculatedSubtotal = 0;
        const processedItems = [];

        for (const item of items) {
            let dbPrice = 0;
            let finalProductId = null;
            let finalComboId = null;

            if (item.productId) {
                const product = await prisma.product.findFirst({
                    where: {
                        OR: [
                            ...(isUUID(item.productId) ? [{ id: item.productId }] : []),
                            { sku: item.productId }
                        ]
                    }
                });
                if (product) {
                    dbPrice = Number(product.price);
                    finalProductId = product.id;
                }
            } else if (item.comboId) {
                const combo = await prisma.comboPack.findFirst({
                    where: {
                        OR: [
                            ...(isUUID(item.comboId) ? [{ id: item.comboId }] : []),
                            { name: item.comboId }
                        ]
                    }
                });
                if (combo) {
                    dbPrice = Number(combo.price);
                    finalComboId = combo.id;
                }
            }

            // If found in DB, use DB price. Otherwise, trust client price (for static menu items not yet in DB)
            const itemPrice = dbPrice > 0 ? dbPrice : item.price;
            serverCalculatedSubtotal += itemPrice * item.quantity;

            processedItems.push({
                productId: finalProductId,
                comboId: finalComboId,
                name: item.name,
                quantity: item.quantity,
                price: Math.round(itemPrice)
            });
        }

        const serverGst = serverCalculatedSubtotal * 0.18;
        const serverGrandTotal = Math.round(serverCalculatedSubtotal + serverGst + deliveryFee);

        // SECURITY: Verify total amount (Allow some margin for rounding, but block major manipulation)
        if (Math.abs(serverGrandTotal - Math.round(totalAmount)) > 5) {
            console.warn(`SECURITY ALERT: Price mismatch in order from ${customerPhone}. Client: ${totalAmount}, Server: ${serverGrandTotal}`);
            return res.status(400).json({ error: 'Order total mismatch. Please refresh your cart.' });
        }

        // 2. Create or Find Customer
        let customer = await prisma.customer.findFirst({ where: { phone: customerPhone } });
        if (!customer) {
            customer = await prisma.customer.create({
                data: { name: customerName, phone: customerPhone }
            });
        }

        // 3. Create Address
        const address = await prisma.address.create({
            data: { customerId: customer.id, addressLine1, city }
        });

        // 4. Create Order
        const order = await prisma.order.create({
            data: {
                customerId: customer.id,
                addressId: address.id,
                totalAmount: Math.round(totalAmount),
                deliveryFee: Math.round(deliveryFee),
                taxAmount: Math.round(serverGst),
                paymentMethod,
                items: {
                    create: processedItems
                }
            },
            include: { items: true, customer: true, address: true }
        });

        console.log('✅ Order Created:', order.id);
        res.status(201).json(order);
    } catch (error: any) {
        console.error('🔥 Order creation failed:', error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Invalid input data', details: error.flatten() });
        }
        res.status(500).json({ error: 'Failed to create order', message: error.message });
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
