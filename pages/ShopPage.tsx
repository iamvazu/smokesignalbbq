import React, { useState, useEffect } from 'react';
import { MenuGrid } from '../components/MenuGrid';
import { motion } from 'framer-motion';
import { Search, Filter, ShoppingBag } from 'lucide-react';
import axios from 'axios';
import { PRODUCTS } from '../constants'; // Fallback

// Use environment variable or default
// @ts-ignore
const API_URL = (import.meta as any).env.VITE_API_URL || '/api/v1';



export const ShopPage: React.FC = () => {
    const [products, setProducts] = useState(PRODUCTS);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('all');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_URL}/products`);
                if (response.data && response.data.length > 0) {
                    // Map backend product to frontend Product type
                    const mappedProducts = response.data.map((p: any) => ({
                        id: p.id,
                        name: p.name,
                        description: p.description || '',
                        price: `₹${p.price}`,
                        priceValue: p.price,
                        image: p.images?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=800&auto=format&fit=crop',
                        category: p.category || 'bbq',
                        subCategory: p.subCategory || 'all',
                        badges: p.badges || [],
                        weight: p.weight ? `${p.weight}g` : undefined,
                        // Add other fields as needed
                    }));
                    setProducts(mappedProducts);
                }

            } catch (error) {
                console.error('Failed to fetch products, using local fallback', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="pt-32 pb-20 min-h-screen bg-charcoal">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="font-display text-5xl md:text-6xl text-cream mb-4">The Pitmaster Shop</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto uppercase tracking-widest text-sm font-bold">
                        Authentic Low & Slow BBQ • Delivered Fresh to Your Door
                    </p>
                </motion.div>

                {/* Filters/Categories could go here if MenuGrid doesn't handle it well enough for a full page */}

                <div id="shop">
                    <MenuGrid products={products as any} />
                </div>

            </div>
        </div>
    );
};
