import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { Flame, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store';
import { useNavigate } from 'react-router-dom';

interface CategoryPreviewProps {
    title: string;
    subtitle: string;
    products: Product[];
    categoryValue: string;
    onViewAll: (category: string) => void;
}

export const CategoryPreview: React.FC<CategoryPreviewProps> = ({ title, subtitle, products, categoryValue, onViewAll }) => {
    const { addItem } = useCartStore();
    const navigate = useNavigate();

    return (
        <section className="py-24 bg-charcoal border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="text-left">
                        <span className="text-fire uppercase tracking-widest text-sm font-bold">Preview</span>
                        <h2 className="font-display text-4xl md:text-5xl text-cream mt-2 mb-4 italic">{title}</h2>
                        <p className="text-gray-400 font-body max-w-xl">{subtitle}</p>
                    </div>
                    <button
                        onClick={() => onViewAll(categoryValue)}
                        className="flex items-center gap-2 text-fire font-bold uppercase tracking-widest text-sm group hover:gap-4 transition-all"
                    >
                        Explore Category <ArrowRight size={18} />
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.slice(0, 4).map((product, index) => (
                        <div
                            key={product.id}
                            className="group relative bg-[#1A1A1A] border border-white/5 rounded-2xl overflow-hidden hover:border-fire/30 transition-all duration-300 flex flex-col h-full shadow-2xl cursor-pointer"
                            onClick={() => navigate(`/product/${product.id}`)}
                        >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={`${product.name} - ${title}`}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                    loading="lazy"
                                />
                                <div className="absolute top-3 left-3 flex flex-col gap-2">
                                    {product.badges?.map((badge) => (
                                        <span key={badge} className="bg-fire text-white text-[8px] font-bold px-2 py-1 rounded-full shadow-lg">
                                            {badge}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="font-display text-lg text-cream mb-2 line-clamp-1 group-hover:text-fire transition-colors">{product.name}</h3>
                                <p className="text-fire font-bold mb-4">{product.price}</p>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addItem(product);
                                    }}
                                    aria-label={`Quick add ${product.name} to cart`}
                                    className="mt-auto w-full py-2.5 bg-transparent border border-fire/30 text-fire hover:bg-fire hover:text-white uppercase text-[10px] font-bold tracking-widest transition-all duration-300 rounded-lg flex items-center justify-center gap-2"
                                >
                                    <Flame size={14} aria-hidden="true" /> Quick Add
                                </button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
