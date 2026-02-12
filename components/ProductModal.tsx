import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, ShieldCheck, Thermometer, Box, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';
import { Button } from './Button';
import { useCartStore } from '../store';

interface ProductModalProps {
    product: Product | null;
    onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
    const { addItem } = useCartStore();

    if (!product) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/90 backdrop-blur-md"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-5xl bg-charcoal border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-fire transition-colors"
                    >
                        <X size={24} />
                    </button>

                    {/* Image Section */}
                    <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                        {product.badges.map((badge, i) => (
                            <span
                                key={badge}
                                className="absolute top-4 left-4 bg-fire text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg"
                                style={{ top: `${16 + i * 30}px` }}
                            >
                                {badge}
                            </span>
                        ))}
                    </div>

                    {/* Content Section */}
                    <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
                        <div className="flex flex-col h-full">
                            <div className="mb-8">
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="font-display text-3xl md:text-4xl text-cream leading-tight">{product.name}</h2>
                                    <span className="text-2xl font-bold text-fire ml-4">{product.price}</span>
                                </div>
                                <p className="text-gray-400 font-body text-lg italic mb-6">
                                    {product.weight || product.volume}
                                </p>
                                <p className="text-gray-300 font-body leading-relaxed mb-8">
                                    {product.longDescription || product.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 mb-12">
                                {product.heatingInstructions && (
                                    <div className="flex gap-4">
                                        <div className="shrink-0 w-10 h-10 bg-fire/10 rounded-lg flex items-center justify-center text-fire">
                                            <Thermometer size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-cream text-sm uppercase tracking-wider mb-1">Heating Instructions</h4>
                                            <p className="text-gray-400 text-sm">{product.heatingInstructions}</p>
                                        </div>
                                    </div>
                                )}
                                {product.ingredients && (
                                    <div className="flex gap-4">
                                        <div className="shrink-0 w-10 h-10 bg-fire/10 rounded-lg flex items-center justify-center text-fire">
                                            <ShieldCheck size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-cream text-sm uppercase tracking-wider mb-1">Ingredients</h4>
                                            <p className="text-gray-400 text-sm">{product.ingredients}</p>
                                        </div>
                                    </div>
                                )}
                                {product.storageInstructions && (
                                    <div className="flex gap-4">
                                        <div className="shrink-0 w-10 h-10 bg-fire/10 rounded-lg flex items-center justify-center text-fire">
                                            <Box size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-cream text-sm uppercase tracking-wider mb-1">Storage</h4>
                                            <p className="text-gray-400 text-sm">{product.storageInstructions}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-auto">
                                <Button
                                    className="w-full py-6 rounded-2xl text-lg shadow-xl mb-8"
                                    icon
                                    onClick={() => {
                                        addItem(product);
                                        onClose();
                                    }}
                                >
                                    Add to Cart
                                </Button>

                                {product.relatedProductIds && product.relatedProductIds.length > 0 && (
                                    <div>
                                        <h4 className="font-bold text-cream text-[10px] uppercase tracking-[0.2em] mb-4 opacity-50">You might also like</h4>
                                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                            {product.relatedProductIds.map(id => {
                                                const related = PRODUCTS.find(p => p.id === id);

                                                if (!related) return null;
                                                return (
                                                    <button
                                                        key={id}
                                                        onClick={() => {
                                                            // In a real app we'd navigate, here we can just switch product
                                                            // but for simplicity let's just show the name
                                                        }}
                                                        className="flex-shrink-0 w-32 group/rel"
                                                    >
                                                        <div className="aspect-square rounded-xl overflow-hidden mb-2">
                                                            <img src={related.image} className="w-full h-full object-cover group-hover/rel:scale-110 transition-transform" />
                                                        </div>
                                                        <p className="text-[10px] text-cream font-bold truncate">{related.name}</p>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
