import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../constants';
import { Product, SubCategory } from '../types';
import { Flame, ShoppingBag, Info } from 'lucide-react';
import { Button } from './Button';
import { useCartStore } from '../store';
import { ProductModal } from './ProductModal';

const categories: { label: string; value: SubCategory | 'all' | 'bbq' | 'sauce' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Combos', value: 'combos' },
  { label: 'Ready to Heat & Serve', value: 'bbq' },
  { label: 'Wings', value: 'wings' },
  { label: 'Chicken', value: 'chicken' },
  { label: 'Beef', value: 'beef' },
  { label: 'Pork', value: 'pork' },
  { label: 'Sauces', value: 'sauces' },
];


interface CardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<CardProps> = ({ product, onViewDetails }) => {
  const { addItem } = useCartStore();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-[#1A1A1A] border border-white/5 rounded-2xl overflow-hidden hover:border-fire/30 transition-all duration-300 flex flex-col h-full shadow-2xl"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
        {product.badges.map((badge) => (
          <span key={badge} className="bg-fire text-white text-[8px] md:text-[10px] font-bold px-2 py-1 rounded-full shadow-lg backdrop-blur-md">
            {badge}
          </span>
        ))}
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <img
          src={product.image}
          alt={`${product.name} - ${product.description}`}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
          loading="lazy"
        />
        <button
          onClick={() => onViewDetails(product)}
          aria-label={`View details for ${product.name}`}
          className="absolute top-3 right-3 z-20 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-fire"
        >
          <Info size={16} aria-hidden="true" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-xl text-cream group-hover:text-fire transition-colors line-clamp-1">{product.name}</h3>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-fire font-bold text-lg">{product.price}</span>
          {product.weight && <span className="text-gray-500 text-xs font-medium border-l border-gray-800 pl-2">{product.weight}</span>}
          {product.volume && <span className="text-gray-500 text-xs font-medium border-l border-gray-800 pl-2">{product.volume}</span>}
        </div>

        <p className="font-body text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-auto">
          <button
            onClick={() => addItem(product)}
            aria-label={`Add ${product.name} to cart`}
            className="w-full py-3 bg-charcoal border border-fire/30 text-fire hover:bg-fire hover:text-white uppercase text-xs font-bold tracking-widest transition-all duration-300 rounded-xl flex items-center justify-center gap-2 group/btn shadow-lg"
          >
            <Flame size={16} className="group-hover/btn:animate-pulse" aria-hidden="true" />
            Add to Cart
          </button>
        </div>

      </div>
    </motion.div>
  );
};

export const MenuGrid: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<SubCategory | 'all' | 'bbq' | 'sauce'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') return PRODUCTS;
    if (activeFilter === 'bbq') return PRODUCTS.filter(p => p.category === 'bbq');
    if (activeFilter === 'sauce') return PRODUCTS.filter(p => p.category === 'sauce');
    return PRODUCTS.filter(p => p.subCategory === activeFilter);
  }, [activeFilter]);

  return (
    <section id="shop" className="py-24 bg-charcoal relative min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-fire uppercase tracking-widest text-sm font-bold">The Smoke Signal Store</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mt-2 mb-4 italic">Ready To Heat & Serve</h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-body">Authentic Texas BBQ. Slow smoked over charcoal. Ready in minutes.</p>
          <div className="w-24 h-1 bg-fire mx-auto rounded-full mt-8" />
        </motion.div>

        {/* Filters */}
        <div className="sticky top-24 z-30 mb-12 flex justify-center">
          <div className="flex flex-wrap justify-center gap-2 p-1 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/5 shadow-2xl max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                aria-label={`Filter by ${cat.label}`}
                aria-pressed={activeFilter === cat.value}
                className={`px-4 md:px-6 py-2.5 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeFilter === cat.value
                  ? 'bg-fire text-white shadow-[0_0_20px_rgba(255,107,0,0.4)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >

                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={setSelectedProduct}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl font-display">No products found for this category.</p>
          </div>
        )}
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Background Glows */}
      <div className="absolute top-[20%] right-0 w-96 h-96 bg-fire/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-0 w-96 h-96 bg-fire/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};