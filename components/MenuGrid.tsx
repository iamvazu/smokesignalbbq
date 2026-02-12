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
      className="group relative bg-burnt/40 border border-white/5 p-4 rounded-xl overflow-hidden hover:border-fire/30 transition-all duration-300 flex flex-col h-full"
    >
      {/* Hover Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 z-10" />
      <div className="absolute inset-0 bg-fire/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

      {/* Image */}
      <div className="relative h-64 overflow-hidden rounded-lg mb-4 z-10 shrink-0">
        {item.tag && (
          <span className="absolute top-2 right-2 bg-fire text-white text-xs font-bold px-3 py-1 rounded-full z-20 shadow-lg">
            {item.tag}
          </span>
        )}
        <img
          src={item.image}
          alt={item.alt || item.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-2xl text-cream group-hover:text-fire transition-colors">{item.name}</h3>
          <span className="font-body font-bold text-lg text-fire">{item.price}</span>
        </div>
        <p className="font-body text-gray-400 text-sm mb-6 line-clamp-2">{item.description}</p>

        <div className="mt-auto">
          {item.variants ? (
            <div className="flex gap-2">
              {item.variants.map((variant) => (
                <button
                  key={variant.name}
                  className="flex-1 py-3 border border-fire/50 text-fire hover:bg-fire hover:text-white uppercase text-xs font-bold tracking-widest transition-all duration-300 rounded flex items-center justify-center gap-2"
                  onClick={() => addItem(item, variant)}
                >
                  <Flame size={14} /> {variant.name}
                </button>
              ))}
            </div>
          ) : (
            <button
              className="w-full py-3 border border-fire/50 text-fire hover:bg-fire hover:text-white uppercase text-xs font-bold tracking-widest transition-all duration-300 rounded flex items-center justify-center gap-2"
              onClick={() => addItem(item)}
            >
              <Flame size={14} /> Add to Order
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const MenuGrid: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('All');
  const [isVegOnly, setIsVegOnly] = React.useState(false);

  const categories = ['All', 'Smoked Meats & Steaks', 'Burgers', 'Wings', 'Ribs'];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesTab =
      activeTab === 'All'
        ? true
        : activeTab === 'Smoked Meats & Steaks'
          ? item.category === 'steaks'
          : item.category === activeTab.toLowerCase();

    const matchesVeg = isVegOnly ? item.isVeg : true;

    return matchesTab && matchesVeg;
  });

  return (
    <section id="menu" className="py-24 bg-charcoal relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-fire uppercase tracking-widest text-sm font-bold">From the Pit</span>
          <h2 className="section-title font-display text-4xl md:text-5xl text-cream mt-2 mb-4">Our Signature Smoked Items</h2>
          <div className="w-24 h-1 bg-fire mx-auto rounded-full mb-8" />

          {/* Filters */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 bg-black/20 p-1 rounded-full border border-white/5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === cat
                    ? 'bg-fire text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Veg Toggle */}
            <div className="flex items-center gap-3 bg-black/20 px-4 py-2 rounded-full border border-white/5">
              <span className={`text-xs font-bold uppercase tracking-wider ${!isVegOnly ? 'text-cream' : 'text-gray-500'}`}>All</span>
              <button
                onClick={() => setIsVegOnly(!isVegOnly)}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${isVegOnly ? 'bg-green-500' : 'bg-gray-600'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${isVegOnly ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
              <span className={`text-xs font-bold uppercase tracking-wider ${isVegOnly ? 'text-green-500' : 'text-gray-500'}`}>Veg Only</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <Card key={item.id} item={item} index={index} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center text-center py-20 text-gray-500">
              <p className="text-xl font-display mb-2">No items found</p>
              <p>Try changing your filters.</p>
            </div>
          )}
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