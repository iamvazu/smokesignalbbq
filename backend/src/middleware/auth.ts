import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../lib/security';

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        role: string;
    };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        // SECURITY: Verify token using asymmetric RS256 via security library
        const decoded = verifyToken(token) as { userId: string; role: string };
        req.user = decoded;
        next();
    } catch (error) {
        // SECURITY: Don't differentiate between expired and invalid to prevent timing/probing attacks
        return res.status(401).json({ error: 'Access token invalid or expired' });
    }
};

export const authorize = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        // SECURITY: Role-based access control (RBAC) check
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }
        next();
    };
};
