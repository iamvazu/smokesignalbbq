import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { Button } from './Button';
import { useCartStore } from '../store';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items, toggleCart } = useCartStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-charcoal/95 backdrop-blur-md py-4 shadow-2xl border-b border-burnt' : 'bg-transparent py-6'
          }`}
      >
        <div className="w-full pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] md:pl-[max(3rem,env(safe-area-inset-left))] md:pr-[max(3rem,env(safe-area-inset-right))] lg:pl-[max(5rem,env(safe-area-inset-left))] lg:pr-[max(5rem,env(safe-area-inset-right))] flex items-center justify-between">
          <div className="flex flex-col items-center z-50">
            {/* Logo Image */}
            <a href="#" className="block">
              <img
                src="/logo_final.png"
                alt="Smoke Signal BBQ"
                className={`${isScrolled ? 'h-16 md:h-20 lg:h-24' : 'h-32 md:h-40 lg:h-52'} w-auto object-contain transition-all duration-300`}
              />
            </a>
            <div className={`overflow-hidden transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 mt-0' : 'h-8 opacity-100 -mt-2'}`}>
              <span className="text-[10px] text-cream font-bold tracking-[0.1em] uppercase block px-3 py-1 bg-black/40 rounded-full backdrop-blur-sm border border-white/10 shadow-lg whitespace-nowrap">
                Est. 2011 • Bangalore
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-cream hover:text-fire uppercase tracking-wider transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-fire transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={toggleCart}
              className="relative text-cream hover:text-fire transition-colors"
            >
              <ShoppingBag size={24} />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-fire text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {items.length}
                </span>
              )}
            </button>
            <Button variant="primary" icon onClick={() => window.location.href = '#shop'} className="rounded-full">
              Order Now
            </Button>

          </div>

          {/* Mobile Controls (Cart + Menu) */}
          <div className="lg:hidden flex items-center gap-4 z-50">
            <button
              onClick={toggleCart}
              className="text-cream hover:text-fire transition-colors relative"
            >
              <ShoppingBag size={24} />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-fire text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {items.length}
                </span>
              )}
            </button>

            <button
              className="text-cream"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-charcoal z-40 flex flex-col items-center justify-center lg:hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-2xl font-display text-cream hover:text-fire uppercase"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button onClick={toggleCart}>
                  View Cart ({items.length})
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};