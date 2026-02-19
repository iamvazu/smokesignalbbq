import React, { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { ComboShowcase } from '../components/ComboShowcase';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { CategoryPreview } from '../components/CategoryPreview';
import { HowItWorks } from '../components/HowItWorks';
import { AboutSection } from '../components/AboutSection';
import { PitmasterMethodology } from '../components/PitmasterMethodology';
import { ComparisonSection } from '../components/ComparisonSection';
import { PRODUCTS } from '../constants';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Product } from '../types';
import { Seo } from '../seo/Seo';
import { generateRestaurantSchema, generateFAQSchema } from '../seo/SchemaGenerator';

// @ts-ignore
const API_URL = (import.meta as any).env.VITE_API_URL || '/api/v1';

const HOME_FAQS = [
    {
        q: "Where can I buy authentic Texas BBQ in Bangalore?",
        a: "Smoke Signal BBQ delivers authentic Texas-style BBQ across Bangalore. Established in 2011, we offer ready-to-heat smoked meats including brisket, ribs, and pulled pork, slow-smoked for up to 14 hours over charcoal."
    },
    {
        q: "What is ready-to-heat BBQ?",
        a: "Our ready-to-heat BBQ is vacuum-sealed to preserve smoke-fresh flavor. Simply heat the sealed pack in boiling water for 5-7 minutes and it's ready to serve."
    },
    {
        q: "How long is your brisket smoked?",
        a: "Our signature brisket is slow-smoked for 14 hours over premium hardwood charcoal to achieve the perfect bark and tenderness."
    },
    {
        q: "Do you offer BBQ catering in Bangalore?",
        a: "Yes, Smoke Signal BBQ offers premium BBQ catering services for corporate events, private parties, and weddings in Bangalore. We specialize in authentic Texas-style smoked meats."
    },
    {
        q: "What makes Smoke Signal BBQ different?",
        a: "We are Bangalore's original pitmasters since 2011. Unlike others, we use 100% charcoal for smoking and no gas or electricity, ensuring the most authentic Texas BBQ flavor."
    }
];

const HOME_KEYWORDS = ['BBQ Bangalore', 'Texas BBQ Bangalore', 'Smoked Brisket Bangalore', 'BBQ Delivery Bangalore', 'Ready to Heat BBQ'];

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
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const featuredProducts = React.useMemo(() => {
        const filtered = [...bbqProducts, ...sauceProducts].filter(p => p.badges?.includes('Best Seller') || p.badges?.includes('Most Popular')).slice(0, 3);
        if (filtered.length === 0 && (bbqProducts.length > 0 || sauceProducts.length > 0)) {
            return [...bbqProducts.slice(0, 2), ...sauceProducts.slice(0, 1)];
        }
        return filtered;
    }, [bbqProducts, sauceProducts]);

    const navigateToShop = (category?: string) => {
        if (category) {
            navigate(`/shop?category=${category}`);
        } else {
            navigate('/shop');
        }
    };

    const homeSchema = React.useMemo(() => [
        generateRestaurantSchema(),
        generateFAQSchema(HOME_FAQS)
    ], []);

    return (
        <main>
            <Seo
                title="Bangalore's Original Authentic Texas BBQ since 2011"
                description="Bangalore's first authentic Texas-style BBQ. Slow-smoked brisket, tender ribs, and signature sauces smoked for 14 hours over charcoal. Delivery across Bangalore."
                keywords={HOME_KEYWORDS}
                schema={homeSchema}
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

            <PitmasterMethodology />

            <ComparisonSection />
        </main>
    );
};
