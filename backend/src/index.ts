import dotenv from 'dotenv';
dotenv.config();
console.log('🚀 App starting...');
console.log('NODE_ENV:', process.env.NODE_ENV);

import express from 'express';
import cors from 'cors';
import prisma from './lib/prisma';

import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import eventRoutes from './routes/eventRoutes';
import blogRoutes from './routes/blogRoutes';
import comboRoutes from './routes/comboRoutes';
import customerRoutes from './routes/customerRoutes';
import franchiseRoutes from './routes/franchiseInquiryRoutes';


import path from 'path';

import fs from 'fs';
import { hashPassword } from './lib/security';

async function bootstrap() {
    console.log('🛡️  Running startup checks...');
    try {
        const adminEmail = 'admin@smokesignal.com';
        const hashedPassword = await hashPassword('admin123');

        await prisma.user.upsert({
            where: { email: adminEmail },
            update: { passwordHash: hashedPassword }, // Ensure it matches latest Argon2id
            create: {
                email: adminEmail,
                name: 'Super Admin',
                passwordHash: hashedPassword,
                role: 'admin'
            }
        });
        console.log('✅ Default admin verified/refreshed: admin@smokesignal.com / admin123');
    } catch (error: any) {
        if (error.code === 'P2021') {
            console.error('❌ DATABASE ERROR: Tables do not exist. Please run migrate command.');
        } else {
            console.error('⚠️  Startup check failed:', error.message);
        }
    }
}


import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';

// DISABLED: Temporarily disabled rate limiting for development ease
const generalLimiter = (req: any, res: any, next: any) => next();
const authLimiter = (req: any, res: any, next: any) => next();

const app = express();
const PORT = process.env.PORT || 5000;

// SECURITY: Trust Heroku proxy for accurate IP tracking
app.set('trust proxy', 1);

// SECURITY: Helmet for HTTP security headers
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: [
                "'self'",
                "'unsafe-inline'",
                "'unsafe-eval'",
                "https://*.google.com",
                "https://*.googletagmanager.com",
                "https://*.google-analytics.com",
                "https://*.youtube.com",
                "https://*.ytimg.com",
                "https://cdn.tailwindcss.com"
            ],
            styleSrc: [
                "'self'",
                "'unsafe-inline'",
                "https://fonts.googleapis.com",
                "https://cdn.tailwindcss.com"
            ],
            imgSrc: [
                "'self'",
                "data:",
                "https://res.cloudinary.com",
                "https://images.unsplash.com",
                "https://*.googletagmanager.com",
                "https://*.google-analytics.com",
                "https://*.google.com",
                "https://*.ytimg.com"
            ],
            connectSrc: [
                "'self'",
                "https://*.google-analytics.com",
                "https://*.analytics.google.com",
                "https://*.googletagmanager.com",
                "https://*.google.com",
                "https://*.youtube.com",
                "https://stats.g.doubleclick.net",
                "https://nominatim.openstreetmap.org",
                "https://api.wa.me"
            ],
            fontSrc: [
                "'self'",
                "https://fonts.gstatic.com",
                "https://fonts.googleapis.com"
            ],
            frameSrc: [
                "'self'",
                "https://*.youtube.com",
                "https://*.youtube-nocookie.com",
                "https://*.google.com",
                "https://*.doubleclick.net"
            ],
            objectSrc: ["'none'"],
        }
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
    referrerPolicy: { policy: "no-referrer-when-downgrade" },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }
}));

// SECURITY: Prevent HTTP Parameter Pollution
app.use(hpp());

// SECURITY: Origin Whitelisting (No wildcards in production)
const whitelist = [
    'https://smokesignalbbq.in',
    'https://www.smokesignalbbq.in',
    'http://localhost:3000',
    'http://localhost:5173'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS security policy'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json({ limit: '10kb' }));

// API Routes
app.use('/api/v1', generalLimiter);
app.use('/api/v1/auth', authLimiter, authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/posts', blogRoutes);
app.use('/api/v1/combos', comboRoutes);
app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/franchise', franchiseRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve Static Files
const publicPath = path.join(__dirname, '../public');
console.log('Serving static files from:', publicPath);

if (fs.existsSync(publicPath)) {
    app.use(express.static(publicPath));

    const adminPath = path.join(publicPath, 'admin');
    const mainPath = path.join(publicPath, 'main');

    // 1. Admin Dashboard Static Files
    if (fs.existsSync(adminPath)) {
        app.use('/admin', express.static(adminPath, {
            extensions: ['html', 'htm']
        }));
    }

    // 2. Main Site Static Files
    if (fs.existsSync(mainPath)) {
        app.use(express.static(mainPath, {
            extensions: ['html', 'htm']
        }));
    }

    // 3. SPA Fallbacks & Catch-all Routing
    app.get(/.*/, (req, res) => {
        const url = req.path;

        // Skip API routes (let them 404 naturally)
        if (url.startsWith('/api')) {
            return res.status(404).json({ error: 'API route not found' });
        }

        // Admin SPA Fallback
        if (url.startsWith('/admin')) {
            const indexPath = path.join(adminPath, 'index.html');
            if (fs.existsSync(indexPath)) {
                return res.sendFile(indexPath, (err) => {
                    if (err && !res.headersSent) res.status(404).send('Admin dashboard not found');
                });
            }
        }

        // Main Site SPA Fallback
        const mainIndexPath = path.join(mainPath, 'index.html');
        if (fs.existsSync(mainIndexPath)) {
            return res.sendFile(mainIndexPath, (err) => {
                if (err && !res.headersSent) res.status(404).send('Page not found');
            });
        }

        res.status(404).send('Not Found');
    });


    app.use('/api', (req, res) => {
        res.status(404).json({ error: 'API route not found' });
    });
} else {
    console.warn('CRITICAL: Public directory not found at', publicPath);
}

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const startServer = async () => {
    try {
        await bootstrap();
        app.listen(PORT, () => {
            console.log(`🚀 Monolith Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('FATAL: Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

// Graceful Shutdown
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

