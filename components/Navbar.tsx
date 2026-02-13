import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, MapPin } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { Button } from './Button';
import { useCartStore, useLocationStore } from '../store';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const MotionLink = motion(Link);

export const Navbar: React.FC = () => {

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { city, setShowLocationPrompt } = useLocationStore();
  const { items, toggleCart } = useCartStore();
  const location = useLocation();
  const navigate = useNavigate();

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
          <div className="flex items-center gap-4 z-50">
            <div className="flex flex-col items-center">
              {/* Logo Image */}
              <Link to="/" className="block" aria-label="Smoke Signal BBQ Home">
                <img
                  src="/logo_final.png"
                  alt="Smoke Signal BBQ - Authentic American Charcoal BBQ since 2011"
                  className={`${isScrolled ? 'h-14 md:h-16 lg:h-18' : 'h-28 md:h-32 lg:h-36'} w-auto object-contain transition-all duration-300`}
                  fetchPriority="high"
                />
              </Link>
              <div className={`overflow-hidden transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 mt-0' : 'h-6 opacity-100 -mt-1'}`}>
                <span className="text-[8px] text-cream font-bold tracking-[0.1em] uppercase block px-2 py-0.5 bg-black/40 rounded-full backdrop-blur-sm border border-white/10 shadow-lg whitespace-nowrap">
                  Est. 2011 • Bangalore
                </span>
              </div>

            </div>

            {/* Location Selector */}
            <button
              onClick={() => setShowLocationPrompt(true)}
              className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all ${isScrolled ? 'opacity-100 translate-x-0' : 'opacity-70 translate-x-0'}`}
            >
              <MapPin size={14} className="text-fire" />
              <div className="text-left">
                <p className="text-[8px] uppercase tracking-widest text-gray-500 font-bold">Delivering to</p>
                <div className="flex items-center gap-1">
                  <p className="text-[11px] font-bold text-cream truncate max-w-[100px]">{city || "Select Location"}</p>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                </div>
              </div>
            </button>

          </div>


          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isShopLink = link.href === '#shop';
              const isHomeLink = link.href === '#home';
              const targetPath = isShopLink ? '/shop' : '/';
              const targetHash = isHomeLink ? '' : link.href;

              return (
                <Link
                  key={link.name}
                  to={targetPath + targetHash}
                  onClick={(e) => {
                    if (location.pathname === targetPath && targetHash.startsWith('#')) {
                      e.preventDefault();
                      const element = document.querySelector(targetHash);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-sm font-semibold text-cream hover:text-fire uppercase tracking-wider transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-fire transition-all group-hover:w-full" />
                </Link>
              );
            })}
          </div>



          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={toggleCart}
              aria-label={`View shopping cart - ${items.length} items`}
              className="relative text-cream hover:text-fire transition-colors"
            >
              <ShoppingBag size={24} aria-hidden="true" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-fire text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {items.length}
                </span>
              )}
            </button>
            <Button variant="primary" icon onClick={() => navigate('/shop')} className="rounded-full">
              Order Now
            </Button>

          </div>

          {/* Mobile Controls (Cart + Menu) */}
          <div className="lg:hidden flex items-center gap-4 z-50">
            <button
              onClick={toggleCart}
              aria-label={`View shopping cart - ${items.length} items`}
              className="text-cream hover:text-fire transition-colors relative"
            >
              <ShoppingBag size={24} aria-hidden="true" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-fire text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {items.length}
                </span>
              )}
            </button>

            <button
              className="text-cream"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            >
              {isMobileMenuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
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
              {NAV_LINKS.map((link, index) => {
                const isShopLink = link.href === '#shop';
                const isHomeLink = link.href === '#home';
                const targetPath = isShopLink ? '/shop' : '/';
                const targetHash = isHomeLink ? '' : link.href;

                return (
                  <MotionLink
                    key={link.name}
                    to={targetPath + targetHash}
                    onClick={(e: any) => {
                      if (location.pathname === targetPath && targetHash.startsWith('#')) {
                        e.preventDefault();
                        const element = document.querySelector(targetHash);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                      setIsMobileMenuOpen(false);
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-2xl font-display text-cream hover:text-fire uppercase"
                  >
                    {link.name}
                  </MotionLink>
                );
              })}



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