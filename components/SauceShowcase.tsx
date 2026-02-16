import React from 'react';
import { motion } from 'framer-motion';
import { SAUCES } from '../constants';
import { Button } from './Button';
import { useCartStore } from '../store';
import { useNavigate } from 'react-router-dom';

export const SauceShowcase: React.FC = () => {
  const { addItem } = useCartStore();
  const navigate = useNavigate();

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
            className="relative overflow-hidden rounded-2xl min-h-[400px] flex flex-col justify-center"
          >
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-black/60 z-10" /> {/* Overlay for readability */}
              <iframe
                className="absolute top-1/2 left-1/2 w-[300%] h-[150%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-60 grayscale-[30%]"
                src="https://www.youtube.com/embed/laY6AOECYyw?autoplay=1&mute=1&controls=0&loop=1&playlist=laY6AOECYyw&rel=0&showinfo=0&iv_load_policy=3&playsinline=1"
                title="Sauce Background"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>

            <div className="relative z-10 p-8 md:p-12">
              <span className="text-fire uppercase tracking-widest text-sm font-bold">Pitmaster Select</span>
              <h2 className="section-title font-display text-4xl md:text-5xl text-cream mt-2 mb-6 leading-tight italic">
                Signature BBQ Sauces
              </h2>
              <p className="font-body text-gray-200 text-lg mb-8 leading-relaxed drop-shadow-md">
                Crafted by pitmasters. Smoky, bold, and authentic.
                Whether you're glazing ribs or dipping wings, our 250ml bottles bring the Texas smokehouse directly to your table.
              </p>
              <Button onClick={() => window.open('https://wa.me/917899870957?text=I want to buy sauces', '_blank')}>
                Shop Sauces
              </Button>

            </div>
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
                className="bg-charcoal/50 p-6 rounded-xl border border-white/5 text-center group cursor-pointer"
                onClick={() => navigate(`/product/${sauce.id}`)}
              >
                <div className="w-full h-64 mb-4 rounded-lg overflow-hidden relative bg-black/20">
                  <img src={sauce.image} alt={sauce.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h4 className="font-display text-xl text-cream mb-2 group-hover:text-fire transition-colors">{sauce.name}</h4>
                <p className="font-body text-xs text-gray-400 mb-3">{sauce.description}</p>
                <span className="block text-fire font-bold mb-4">{sauce.price}</span>
                <button
                  className="text-xs uppercase font-bold tracking-widest border-b border-fire text-cream pb-1 hover:text-fire transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    addItem(sauce);
                  }}
                >
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