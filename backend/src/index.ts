import dotenv from 'dotenv';
dotenv.config();

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


import path from 'path';

import fs from 'fs';
import bcrypt from 'bcryptjs';

async function bootstrap() {
    console.log('🛡️  Running startup checks...');
    try {
        const adminEmail = 'admin@smokesignal.com';
        const admin = await prisma.user.findUnique({ where: { email: adminEmail } });

        if (!admin) {
            console.log('✨ No admin found. Creating default admin...');
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await prisma.user.create({
                data: {
                    email: adminEmail,
                    name: 'Super Admin',
                    passwordHash: hashedPassword,
                    role: 'admin'
                }
            });
            console.log('✅ Default admin created: admin@smokesignal.com / admin123');
        } else {
            console.log('✅ Admin user verified.');
        }
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

// SECURITY: General rate limiting for the entire app (increased for static assets)
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again later.' }
});

// SECURITY: Strict rate limiting for sensitive endpoints (Auth)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Strict limit for logins/registrations
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many authentication attempts. Please try again in 15 minutes.' }
});

const app = express();
const PORT = process.env.PORT || 5000;

// SECURITY: Trust Heroku proxy for accurate IP tracking
app.set('trust proxy', 1);

// SECURITY: Helmet for strict HTTP security headers
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
                "https://*.google.com"
            ],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        }
    },
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

app.use(express.json({ limit: '10kb' })); // SECURITY: Limit payload size to prevent DoS
app.use(generalLimiter);



// API Routes
app.use('/api/v1/auth', authLimiter, authRoutes); // Apply strict limit to auth
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/posts', blogRoutes);
app.use('/api/v1/combos', comboRoutes);



app.get('/health', (req, res) => {

    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve Static Files
const publicPath = path.join(__dirname, '../public');
console.log('Serving static files from:', publicPath);

if (fs.existsSync(publicPath)) {
    // 1. Admin Dashboard (SPA)
    const adminPath = path.join(publicPath, 'admin');
    if (fs.existsSync(adminPath)) {
        console.log('Admin path found:', adminPath);
        app.use('/admin', express.static(adminPath));
        app.get(/^\/admin\/.*/, (req, res) => {
            res.sendFile(path.join(adminPath, 'index.html'));
        });
    }

    // 2. Main Site (SPA)
    const mainPath = path.join(publicPath, 'main');
    if (fs.existsSync(mainPath)) {
        console.log('Main path found:', mainPath);
        // Serve static files with a specific limit to avoid catching SPA routes
        app.use(express.static(mainPath, {
            index: false
        }));

        // Final fallback for SPA routing
        app.get(/^(?!\/api|\/admin).*/, (req, res) => {
            res.sendFile(path.join(mainPath, 'index.html'));
        });
    }

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
            console.log(`- API: http://localhost:${PORT}/api/v1`);
            console.log(`- Admin: http://localhost:${PORT}/admin`);
            console.log(`- Site: http://localhost:${PORT}/`);
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

// Handle uncaught errors
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

