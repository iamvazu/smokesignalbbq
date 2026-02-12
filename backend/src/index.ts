import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './lib/prisma';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';

import path from 'path';

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

// 1. Admin Dashboard (SPA)
app.use('/admin', express.static(path.join(publicPath, 'admin')));
app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(publicPath, 'admin', 'index.html'));
});

// 2. Main Site (SPA)
app.use(express.static(path.join(publicPath, 'main')));
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'main', 'index.html'));
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});
