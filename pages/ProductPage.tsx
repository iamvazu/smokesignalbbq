import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { useCartStore } from '../store';
import { Button } from '../components/Button';
import { Flame, Thermometer, ShieldCheck, Box, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Seo } from '../seo/Seo';
import { generateProductSchema, generateBreadcrumbSchema } from '../seo/SchemaGenerator';

export const ProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addItem } = useCartStore();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductData = async () => {
            // First check local constants
            const foundProduct = PRODUCTS.find(p => p.id === id);

            if (foundProduct) {
                setProduct(foundProduct);
                window.scrollTo(0, 0);
                setLoading(false);
                return;
            }

            // If not found in constants, fetch from backend
            try {
                const API_URL = (import.meta as any).env.VITE_API_URL || '/api/v1';
                // Try fetching as product first, then combo
                const responses = await Promise.allSettled([
                    axios.get(`${API_URL}/products/${id}`),
                    axios.get(`${API_URL}/combos/${id}`)
                ]);

                const successRes = responses.find(r => r.status === 'fulfilled' && (r as any).value.data);

                if (successRes) {
                    const data = (successRes as any).value.data;
                    const isCombo = (successRes as any).value.config.url.includes('/combos/');

                    setProduct({
                        id: data.id,
                        slug: data.slug,
                        name: data.name,
                        description: data.description || '',
                        longDescription: data.longDescription || data.description || '',
                        price: `₹${data.price}`,
                        priceValue: data.price,
                        image: isCombo ? data.image : (data.images?.[0]?.imageUrl || data.image),
                        category: isCombo ? 'combo' : (data.category || 'bbq'),
                        subCategory: isCombo ? 'combos' : (data.subCategory || 'all'),
                        badges: data.badges || [],
                        heatingInstructions: data.heatingInstructions || '',
                        ingredients: data.ingredients || '',
                        storageInstructions: data.storageInstructions || '',
                        weight: data.weight,
                    });
                }
            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoading(false);
                window.scrollTo(0, 0);
            }
        };

        fetchProductData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-charcoal flex items-center justify-center">
                <div className="animate-spin text-fire">
                    <ShoppingBag size={48} />
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-charcoal flex items-center justify-center pt-24 text-center">
                <div>
                    <h2 className="text-3xl font-display text-cream mb-4">Product Not Found</h2>
                    <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-charcoal pt-32 pb-24">
            <Seo
                title={`${product.name} | American BBQ Delivery`}
                description={`Order ${product.name} from Smoke Signal BBQ. ${product.description} Fresh smokehouse delivery anywhere in Bangalore.`}
                canonical={`/product/${id}`}
                ogType="product"
                ogImage={product.image}
                schema={{
                    "@context": "https://schema.org",
                    "@graph": [
                        generateProductSchema(product),
                        generateBreadcrumbSchema([
                            { name: "Home", item: "/" },
                            { name: "Shop", item: "/shop" },
                            { name: product.name, item: `/product/${id}` }
                        ])
                    ]
                }}
            />
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-fire transition-colors mb-12 uppercase tracking-widest text-xs font-bold"
                >
                    <ArrowLeft size={16} /> Back
                </button>

                <div className="flex flex-col lg:flex-row gap-16 lg:items-start">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:w-1/2"
                    >
                        <div className="relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl bg-black/20 aspect-square">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-contain p-8 md:p-16 hover:scale-105 transition-transform duration-700"
                            />
                            {product.badges?.map((badge, i) => (
                                <span
                                    key={badge}
                                    className="absolute top-6 left-6 bg-fire text-white text-[10px] md:text-xs font-bold px-4 py-1.5 rounded-full shadow-lg"
                                    style={{ top: `${24 + i * 40}px` }}
                                >
                                    {badge}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:w-1/2"
                    >
                        <div className="mb-10">
                            <h1 className="font-display text-4xl md:text-6xl text-cream mb-4 leading-tight italic">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-6 mb-8">
                                <span className="text-4xl font-bold text-fire">{product.price}</span>
                                <span className="text-gray-400 font-body text-xl italic pt-1">
                                    {product.weight || product.volume}
                                </span>
                            </div>
                            <p className="text-gray-300 font-body text-lg leading-relaxed mb-10">
                                {product.longDescription || product.description}
                            </p>

                            <Button
                                className="w-full md:w-auto px-12 py-6 rounded-2xl text-lg shadow-xl"
                                icon
                                onClick={() => addItem(product)}
                            >
                                Add to Cart
                            </Button>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 pt-8 border-t border-white/5">
                            {product.heatingInstructions && (
                                <div className="flex gap-4">
                                    <div className="shrink-0 w-12 h-12 bg-fire/10 rounded-xl flex items-center justify-center text-fire border border-fire/20">
                                        <Thermometer size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-cream text-sm uppercase tracking-wider mb-2">Heating</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">{product.heatingInstructions}</p>
                                    </div>
                                </div>
                            )}
                            {product.ingredients && (
                                <div className="flex gap-4">
                                    <div className="shrink-0 w-12 h-12 bg-fire/10 rounded-xl flex items-center justify-center text-fire border border-fire/20">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-cream text-sm uppercase tracking-wider mb-2">Ingredients</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">{product.ingredients}</p>
                                    </div>
                                </div>
                            )}
                            {product.storageInstructions && (
                                <div className="flex gap-4">
                                    <div className="shrink-0 w-12 h-12 bg-fire/10 rounded-xl flex items-center justify-center text-fire border border-fire/20">
                                        <Box size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-cream text-sm uppercase tracking-wider mb-2">Storage</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">{product.storageInstructions}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Related Products */}
                        {product.relatedProductIds && product.relatedProductIds.length > 0 && (
                            <div className="pt-8 border-t border-white/5">
                                <h4 className="font-bold text-cream text-xs uppercase tracking-[0.3em] mb-8 opacity-50 text-center md:text-left">Complementary Pairings</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                                    {product.relatedProductIds.map(relId => {
                                        const related = PRODUCTS.find(p => p.id === relId);
                                        if (!related) return null;
                                        return (
                                            <button
                                                key={relId}
                                                onClick={() => navigate(`/product/${relId}`)}
                                                className="group text-left"
                                            >
                                                <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-white/5 border border-white/5">
                                                    <img src={related.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                                <p className="text-xs text-cream font-bold truncate mb-1">{related.name}</p>
                                                <p className="text-fire text-[10px] font-bold">{related.price}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Background Texture */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
                style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}>
            </div>
        </div>
    );
};
