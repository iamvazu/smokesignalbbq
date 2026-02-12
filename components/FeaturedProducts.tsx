import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { useCartStore } from '../store';
import { Flame, Star } from 'lucide-react';

interface FeaturedProductsProps {
    products: Product[];
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
    const { addItem } = useCartStore();

    return (
        <section className="py-24 bg-burnt/5 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-fire uppercase tracking-widest text-sm font-bold flex items-center justify-center gap-2">
                        <Star size={14} fill="currentColor" /> Hall of Flame <Star size={14} fill="currentColor" />
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl text-cream mt-2 mb-4">Pitmaster Favorites</h2>
                    <div className="w-24 h-1 bg-fire mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.slice(0, 3).map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group h-[500px] overflow-hidden rounded-3xl"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="flex items-center gap-2 mb-3">
                                    {product.badges.map(b => (
                                        <span key={b} className="bg-fire text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                                            {b}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="font-display text-3xl text-white mb-2">{product.name}</h3>
                                <p className="text-gray-300 font-body text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    {product.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-fire font-bold text-2xl">{product.price}</span>
                                    <button
                                        onClick={() => addItem(product)}
                                        className="p-4 bg-fire text-white rounded-2xl hover:bg-fire/80 transition-colors shadow-xl"
                                    >
                                        <Flame size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
