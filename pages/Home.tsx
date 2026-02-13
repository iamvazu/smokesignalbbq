import React, { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { ComboShowcase } from '../components/ComboShowcase';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { CategoryPreview } from '../components/CategoryPreview';
import { HowItWorks } from '../components/HowItWorks';
import { AboutSection } from '../components/AboutSection';
import { PRODUCTS } from '../constants';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Product } from '../types';

// @ts-ignore
const API_URL = (import.meta as any).env.VITE_API_URL || '/api/v1';

export const Home: React.FC = () => {
    const navigate = useNavigate();
    const [combos, setCombos] = useState<Product[]>([]);
    const [loadingCombos, setLoadingCombos] = useState(true);

    useEffect(() => {
        const fetchCombos = async () => {
            try {
                const res = await axios.get(`${API_URL}/combos`);
                if (res.data && Array.isArray(res.data)) {
                    const mappedCombos: Product[] = res.data.map((c: any) => ({
                        id: c.id,
                        name: c.name || 'Unnamed Combo',
                        description: c.description || '',
                        price: `₹${c.price}`,
                        priceValue: c.price,
                        category: 'combo',
                        image: c.image || '/combo_pack.jpg', // Fallback image
                        badges: c.items && c.items.length > 3 ? ['Best Value'] : [], // Simple logic for badges
                        weight: 'Various',
                        subCategory: 'combos'
                    }));
                    setCombos(mappedCombos);
                } else {
                    // Fallback to local if API empty or fails
                    setCombos(PRODUCTS.filter(p => p.category === 'combo'));
                }
            } catch (error) {
                console.error('Failed to fetch combos', error);
                setCombos(PRODUCTS.filter(p => p.category === 'combo'));
            } finally {
                setLoadingCombos(false);
            }
        };
        fetchCombos();
    }, []);

    const bbqProducts = PRODUCTS.filter(p => p.category === 'bbq' && p.subCategory !== 'combos');
    const sauceProducts = PRODUCTS.filter(p => p.category === 'sauce');
    const featuredProducts = PRODUCTS.filter(p => p.badges.includes('Best Seller') || p.badges.includes('Most Popular')).slice(0, 3);

    const navigateToShop = (category?: string) => {
        if (category) {
            navigate(`/shop?category=${category}`);
        } else {
            navigate('/shop');
        }
    };

    return (
        <main>
            <Hero />

            <ComboShowcase products={combos} />

            <FeaturedProducts products={featuredProducts} />

            <CategoryPreview
                title="Ready to Heat & Serve BBQ"
                subtitle="Authentic Texas BBQ. Slow smoked over charcoal. Ready in minutes."
                products={bbqProducts}
                categoryValue="bbq"
                onViewAll={() => navigateToShop('bbq')}
            />

            <CategoryPreview
                title="Signature BBQ Sauces"
                subtitle="Crafted by pitmasters. Smoky, bold, and authentic."
                products={sauceProducts}
                categoryValue="sauce"
                onViewAll={() => navigateToShop('sauce')}
            />

            <HowItWorks />

            <AboutSection />
        </main>
    );
};
