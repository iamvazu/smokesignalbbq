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
                    className="text-center mb-20"
                >
                    <span className="text-fire uppercase tracking-[0.3em] text-xs md:text-sm font-extrabold block mb-4">THE SMOKE SIGNAL BBQ STORE</span>
                    <h1 className="font-display text-5xl md:text-7xl text-cream mb-6 italic leading-tight">
                        The Pitmaster Shop
                        <span className="text-gray-500 block md:inline-block md:ml-4 font-body not-italic text-2xl md:text-4xl align-middle">— Ready To Heat & Serve</span>
                    </h1>
                    <p className="text-gray-400 max-w-3xl mx-auto uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold leading-relaxed">
                        Authentic Low & Slow BBQ Smoked Over Charcoal • Delivered Fresh to Your Door
                    </p>
                    <div className="w-32 h-1 bg-fire mx-auto rounded-full mt-12 opacity-50" />
                </motion.div>

                <div id="shop">
                    <MenuGrid products={products as any} showTitle={false} />
                </div>


            </div>
        </div>
    );
};
