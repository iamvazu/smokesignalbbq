import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import prisma from './lib/prisma';

import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';

import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);

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
        app.use(express.static(mainPath));
        app.get(/^(?!\/api).*/, (req, res) => {
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
try {
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

