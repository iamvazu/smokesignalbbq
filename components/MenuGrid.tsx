import React from 'react';
import { motion } from 'framer-motion';
import { MENU_ITEMS } from '../constants';
import { MenuItem } from '../types';
import { Flame } from 'lucide-react';
import { Button } from './Button';
import { useCartStore } from '../store';

interface CardProps {
  item: MenuItem;
  index: number;
}

const Card: React.FC<CardProps> = ({ item, index }) => {
  const { addItem } = useCartStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-burnt/40 border border-white/5 p-4 rounded-xl overflow-hidden hover:border-fire/30 transition-all duration-300"
    >
      {/* Hover Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 z-10" />
      <div className="absolute inset-0 bg-fire/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

      {/* Image */}
      <div className="relative h-64 overflow-hidden rounded-lg mb-4 z-10">
        {item.tag && (
          <span className="absolute top-2 right-2 bg-fire text-white text-xs font-bold px-3 py-1 rounded-full z-20 shadow-lg">
            {item.tag}
          </span>
        )}
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-2xl text-cream group-hover:text-fire transition-colors">{item.name}</h3>
          <span className="font-body font-bold text-lg text-fire">{item.price}</span>
        </div>
        <p className="font-body text-gray-400 text-sm mb-6 line-clamp-2">{item.description}</p>

        <button
          className="w-full py-3 border border-fire/50 text-fire hover:bg-fire hover:text-white uppercase text-xs font-bold tracking-widest transition-all duration-300 rounded flex items-center justify-center gap-2"
          onClick={() => addItem(item)}
        >
          <Flame size={14} /> Add to Order
        </button>
      </div>
    </motion.div>
  );
};

export const MenuGrid: React.FC = () => {
  return (
    <section id="menu" className="py-24 bg-charcoal relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-fire uppercase tracking-widest text-sm font-bold">From the Pit</span>
          <h2 className="font-display text-4xl md:text-5xl text-cream mt-2 mb-4">Our Signature Smoked Meats</h2>
          <div className="w-24 h-1 bg-fire mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MENU_ITEMS.map((item, index) => (
            <Card key={item.id} item={item} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button variant="outline" onClick={() => window.open('https://wa.me/918147093243?text=Send Menu PDF', '_blank')}>
            Download Full Menu
          </Button>
        </div>
      </div>
    </section>
  );
};