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
import { Seo } from '../seo/Seo';
import { generateOrganizationSchema } from '../seo/SchemaGenerator';

// @ts-ignore
const API_URL = (import.meta as any).env.VITE_API_URL || '/api/v1';

export const Home: React.FC = () => {
    const navigate = useNavigate();
    const [combos, setCombos] = useState<Product[]>([]);
    const [bbqProducts, setBbqProducts] = useState<Product[]>(PRODUCTS.filter(p => p.category === 'bbq' && p.subCategory !== 'combos'));
    const [sauceProducts, setSauceProducts] = useState<Product[]>(PRODUCTS.filter(p => p.category === 'sauce'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [combosRes, productsRes] = await Promise.all([
                    axios.get(`${API_URL}/combos`),
                    axios.get(`${API_URL}/products`)
                ]);

                // Map Combos
                if (combosRes.data && Array.isArray(combosRes.data)) {
                    const mappedCombos: Product[] = combosRes.data.map((c: any) => ({
                        id: c.id,
                        slug: c.slug,
                        name: c.name || 'Unnamed Combo',
                        description: c.description || '',
                        longDescription: c.longDescription || '',
                        price: `₹${c.price}`,
                        priceValue: c.price,
                        category: 'combo',
                        image: c.image || '/combo_pack.jpg',
                        badges: c.isBestValue ? ['Best Value savings'] : [],
                        isMostPopular: c.isMostPopular,
                        isBestValue: c.isBestValue,
                        weight: 'Various',
                        subCategory: 'combos',
                        heatingInstructions: c.heatingInstructions || '',
                        ingredients: c.ingredients || '',
                        storageInstructions: c.storageInstructions || ''
                    }));
                    setCombos(mappedCombos);
                }

                // Map BBQ and Sauces
                const mappedProducts: Product[] = productsRes.data.map((p: any) => ({
                    id: p.id,
                    slug: p.slug,
                    name: p.name,
                    description: p.description || '',
                    price: `₹${p.price}`,
                    priceValue: p.price,
                    image: p.images?.[0]?.imageUrl || p.image || '/product_fallback.jpg',
                    category: p.category || 'bbq',
                    subCategory: p.subCategory || 'all',
                    badges: p.badges || [],
                    weight: p.weight,
                    longDescription: p.longDescription || '',
                    isMostPopular: p.isMostPopular || false,
                    isBestValue: p.isBestValue || false,
                    heatingInstructions: p.heatingInstructions || '',
                    ingredients: p.ingredients || '',
                    storageInstructions: p.storageInstructions || ''
                }));

                setBbqProducts(mappedProducts.filter(p => p.category === 'bbq' && p.subCategory !== 'combos'));
                setSauceProducts(mappedProducts.filter(p => p.category === 'sauce'));
            } catch (error) {
                console.error('Failed to fetch data from API, using local fallback', error);
                // Fallbacks are already set in initial state or useEffect elsewhere if needed
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const featuredProducts = [...bbqProducts, ...sauceProducts].filter(p => p.badges?.includes('Best Seller') || p.badges?.includes('Most Popular')).slice(0, 3);
    if (featuredProducts.length === 0) {
        // Fallback to first few products if no best sellers marked in DB
        featuredProducts.push(...bbqProducts.slice(0, 2), ...sauceProducts.slice(0, 1));
    }

    const navigateToShop = (category?: string) => {
        if (category) {
            navigate(`/shop?category=${category}`);
        } else {
            navigate('/shop');
        }
    };

    return (
        <main>
            <Seo
                title="Bangalore's Original Authentic Texas BBQ"
                description="Experience authentic Texas-style smoked meats in Bangalore since 2011. Slow-smoked beef brisket, tender pork ribs, and handcrafted BBQ sauces delivered fresh."
                schema={generateOrganizationSchema()}
            />
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
