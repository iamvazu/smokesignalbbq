import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { useCartStore } from '../store';
import { Flame, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ComboShowcaseProps {
    products: Product[];
}

export const ComboShowcase: React.FC<ComboShowcaseProps> = ({ products }) => {
    const { addItem } = useCartStore();
    const navigate = useNavigate();

    // Sorting: Most Popular first, then Best Value, then by price
    const sortedProducts = [...products].sort((a, b) => {
        if (a.isMostPopular && !b.isMostPopular) return -1;
        if (!a.isMostPopular && b.isMostPopular) return 1;
        if (a.isBestValue && !b.isBestValue) return -1;
        if (!a.isBestValue && b.isBestValue) return 1;
        return (a.priceValue || 0) - (b.priceValue || 0);
    });

    return (
        <section id="combos" className="py-24 bg-charcoal relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-fire uppercase tracking-[0.3em] text-sm font-bold flex items-center justify-center gap-2 mb-4">
                        <TrendingUp size={16} /> Best Value Bundles
                    </span>
                    <h2 className="font-display text-4xl md:text-6xl text-cream mb-4 italic">The Pitmaster Combos</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto font-body">Engineered for maximum flavor and value. Experience the full Texas spread.</p>
                    <div className="w-24 h-1 bg-fire mx-auto rounded-full mt-8" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedProducts.map((product, index) => {
                        const isMostPopular = product.isMostPopular;
                        const isBestValue = product.isBestValue;

                        return (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => navigate(`/product/${product.id}`)}
                                className={`relative group rounded-[2rem] overflow-hidden border cursor-pointer ${isMostPopular ? 'border-fire ring-1 ring-fire scale-105 z-10' : 'border-white/5'
                                    } bg-[#121212] transition-all duration-500`}
                            >
                                {isMostPopular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-fire text-white py-1 px-6 rounded-b-xl text-[10px] font-bold uppercase tracking-widest z-20 shadow-xl">
                                        Most Popular
                                    </div>
                                )}
                                {isBestValue && (
                                    <div className="absolute top-4 right-4 bg-green-600 text-white py-1 px-3 rounded-full text-[8px] font-bold uppercase tracking-widest z-20 shadow-xl">
                                        Best Value
                                    </div>
                                )}

                                <div className="aspect-[16/10] overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent z-10" />
                                    <img
                                        src={product.image}
                                        alt={`${product.name} - Authentic slow-smoked BBQ combo bundle from Smoke Signal BBQ`}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60"
                                        loading="lazy"
                                    />
                                    <div className="absolute bottom-4 left-6 z-20">
                                        <h3 className="font-display text-2xl text-white mb-1">{product.name}</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-fire font-bold text-3xl">{product.price}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <p className="text-gray-400 text-sm mb-6 font-body leading-relaxed h-12 line-clamp-2">
                                        {product.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {product.badges.slice(0, 2).map(b => (
                                            <span key={b} className="text-[9px] font-bold uppercase tracking-wider bg-white/5 text-gray-400 px-3 py-1 rounded-full border border-white/5">
                                                {b}
                                            </span>
                                        ))}
                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addItem(product);
                                        }}
                                        aria-label={`Add ${product.name} to cart`}
                                        className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-2 ${isMostPopular
                                            ? 'bg-fire text-white shadow-[0_0_30px_rgba(255,107,0,0.3)] hover:bg-fire/80'
                                            : 'bg-white/5 text-cream border border-white/10 hover:border-fire hover:text-fire'
                                            }`}
                                    >
                                        <Flame size={16} aria-hidden="true" /> Quick Add to Cart
                                    </button>

                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
