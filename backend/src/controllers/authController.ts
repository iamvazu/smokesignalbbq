import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import {
    hashPassword,
    verifyPassword,
    generateAccessToken,
    generateRefreshToken
} from '../lib/security';
import crypto from 'crypto';

// SECURITY: Strict registration policy (min 12 chars, mixed case, numbers, symbols)
const RegisterSchema = z.object({
    email: z.string().email().toLowerCase(),
    password: z.string().min(12)
        .regex(/[a-z]/, 'Password must contain lowercase')
        .regex(/[A-Z]/, 'Password must contain uppercase')
        .regex(/[0-9]/, 'Password must contain a number')
        .regex(/[^a-zA-Z0-9]/, 'Password must contain a symbol')
});

// Relaxed login schema to handle legacy/demo credentials while still being typed
const LoginSchema = z.object({
    email: z.string().email().toLowerCase(),
    password: z.string().min(6)
});

export const login = async (req: Request, res: Response) => {
    try {
        const validatedData = LoginSchema.parse(req.body);
        const { email, password } = validatedData;

        const user = await prisma.user.findUnique({ where: { email } });

        // SECURITY: Generic error message to prevent account enumeration
        const authError = 'Invalid email or password';

        if (!user) return res.status(401).json({ error: authError });

        // SECURITY: Argon2id verification
        const isPasswordValid = await verifyPassword(user.passwordHash, password);
        if (!isPasswordValid) return res.status(401).json({ error: authError });

        // SECURITY: Generate short-lived Access Token (15m)
        const accessToken = generateAccessToken({
            userId: user.id,
            role: user.role
        });

        // SECURITY: Generate Refresh Token (Single-use rotation)
        const refreshToken = generateRefreshToken({ userId: user.id });

        // SECURITY: Store hashed refresh token in DB (SHA-256)
        const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

        await prisma.user.update({
            where: { id: user.id },
            data: { refreshTokenHash }
        });

        // SECURITY: Use Secure, HttpOnly cookies for Refresh Token
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/api/v1/auth/refresh',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.json({
            accessToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Invalid input', details: error.flatten() });
        }
        res.status(500).json({ error: 'Authentication failed' });
    }
};

export const register = async (req: Request, res: Response) => {
    // SECURITY: Registration should ideally be protected by admin-only role
    try {
        const validatedData = RegisterSchema.extend({
            name: z.string().min(2),
            role: z.enum(['admin', 'staff', 'kitchen_staff', 'delivery_partner']).optional()
        }).parse(req.body);

        const { name, email, password, role } = validatedData;

        // SECURITY: Argon2id hashing
        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: hashedPassword,
                role: role || 'staff'
            }
        });

        res.status(201).json({
            message: 'Account provisioned successfully',
            user: { id: user.id, email: user.email }
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Invalid input', details: error.flatten() });
        }
        res.status(500).json({ error: 'Provisioning failed' });
    }
};

export const logout = async (req: Request, res: Response) => {
    // SECURITY: Invalidate refresh token in DB on logout
    const { userId } = (req as any).user;
    if (userId) {
        await prisma.user.update({
            where: { id: userId },
            data: { refreshTokenHash: null }
        });
    }
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
};
