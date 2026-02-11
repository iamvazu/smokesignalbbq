import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore, CartItem } from '../store'; // Adjust import based on where you put store.ts
import { Button } from './Button';

export const ShoppingCart: React.FC = () => {
    const { items, isOpen, toggleCart, updateQuantity, removeItem } = useCartStore();

    const handleCheckout = () => {
        // Generate WhatsApp message
        const message = `*Hello! I'd like to place an order:*\n\n` +
            items.map(item => `• ${item.quantity}x ${item.name} (${item.price})`).join('\n') +
            `\n\n*Total Items:* ${items.reduce((acc, item) => acc + item.quantity, 0)}`;

        // Open WhatsApp
        window.open(`https://wa.me/918147093243?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                        onClick={toggleCart}
                    />

                    {/* Cart Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-charcoal border-l border-burnt z-[70] flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-charcoal">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="text-fire" size={24} />
                                <h2 className="font-display text-2xl text-cream">Your Feast</h2>
                                <span className="bg-fire text-white text-xs font-bold px-2 py-1 rounded-full">{items.length}</span>
                            </div>
                            <button
                                onClick={toggleCart}
                                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                                    <ShoppingBag size={48} className="mb-4 text-gray-500" />
                                    <p className="text-xl font-display text-gray-400">Your cart is empty</p>
                                    <p className="text-gray-500 text-sm mt-2">Time to add some smoke & fire!</p>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        key={item.id}
                                        className="flex gap-4 bg-black/20 p-4 rounded-lg border border-white/5"
                                    >
                                        {/* Item Image */}
                                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-charcoal">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>

                                        {/* Item Details */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-bold text-cream text-lg leading-tight mb-1">{item.name}</h3>
                                                <p className="text-fire text-sm font-bold">{item.price}</p>
                                            </div>

                                            {/* Controls */}
                                            <div className="flex items-center justify-between mt-3">
                                                <div className="flex items-center bg-black/40 rounded-lg border border-white/10">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 'decrease')}
                                                        className="p-1.5 hover:text-fire transition-colors disabled:opacity-30"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-bold text-cream">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 'increase')}
                                                        className="p-1.5 hover:text-fire transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-gray-500 hover:text-red-500 transition-colors p-1.5"
                                                    title="Remove item"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer / Checkout */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-white/10 bg-charcoal">
                                <div className="mb-4 flex justify-between items-end">
                                    <span className="text-gray-400 text-sm uppercase tracking-wider">Total Items</span>
                                    <span className="text-2xl font-display text-fire">{items.reduce((a, b) => a + b.quantity, 0)}</span>
                                </div>

                                <Button variant="primary" onClick={handleCheckout} className="w-full py-4 text-lg">
                                    Proceed to Order via WhatsApp
                                </Button>
                                <p className="text-center text-gray-500 text-xs mt-3">
                                    Clicking this will open WhatsApp with your order details pre-filled.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
