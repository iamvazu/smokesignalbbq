import React from 'react';
import { motion } from 'framer-motion';
import { SAUCES } from '../constants';
import { Button } from './Button';

export const SauceShowcase: React.FC = () => {
  return (
    <section id="sauces" className="py-24 bg-burnt relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(#EF4444 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-fire uppercase tracking-widest text-sm font-bold">Bottled Greatness</span>
            <h2 className="font-display text-4xl md:text-5xl text-cream mt-2 mb-6 leading-tight">
              Bring the <span className="text-fire">Texas Taste</span> Home
            </h2>
            <p className="font-body text-gray-300 text-lg mb-8 leading-relaxed">
              Our award-winning sauces and rubs are handcrafted in small batches.
              Whether you need a sweet glaze for your ribs or a spicy kick for your wings,
              we've bottled the essence of Smoke Signal BBQ.
            </p>
            <Button onClick={() => window.open('https://wa.me/918147093243?text=I want to buy sauces', '_blank')}>
              Shop Sauces
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SAUCES.map((sauce, index) => (
              <motion.div
                key={sauce.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-charcoal/50 p-6 rounded-xl border border-white/5 text-center group"
              >
                <div className="w-full h-64 mb-4 rounded-lg overflow-hidden relative bg-black/20">
                  <img src={sauce.image} alt={sauce.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h4 className="font-display text-xl text-cream mb-2">{sauce.name}</h4>
                <p className="font-body text-xs text-gray-400 mb-3">{sauce.description}</p>
                <span className="block text-fire font-bold mb-4">{sauce.price}</span>
                <button className="text-xs uppercase font-bold tracking-widest border-b border-fire text-cream pb-1 hover:text-fire transition-colors"
                  onClick={() => window.open(`https://wa.me/918147093243?text=Order ${sauce.name}`, '_blank')}>
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};