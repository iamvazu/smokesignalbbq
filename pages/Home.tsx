import React from 'react';
import { Hero } from '../components/Hero';
import { ComboShowcase } from '../components/ComboShowcase';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { CategoryPreview } from '../components/CategoryPreview';
import { HowItWorks } from '../components/HowItWorks';
import { AboutSection } from '../components/AboutSection';
import { PRODUCTS } from '../constants';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
    const navigate = useNavigate();

    const comboProducts = PRODUCTS.filter(p => p.category === 'combo');
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

            <ComboShowcase products={comboProducts} />

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
