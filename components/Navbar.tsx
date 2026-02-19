import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, MapPin } from 'lucide-react';
import { NAV_LINKS, MENU_LINKS } from '../constants';
import { Button } from './Button';
import { useCartStore, useLocationStore } from '../store';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const MotionLink = motion(Link);

export const Navbar: React.FC = () => {

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    const isExternal = href.startsWith('/');
    const targetPath = isExternal ? href : '/';
    const targetHash = (!isExternal && href !== '#home') ? href : '';

    if (location.pathname === targetPath && targetHash.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(targetHash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

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

          {/* Group 1: Logo + Delivery Location */}
          <div className="flex items-center gap-4 z-50">
            <div className="flex flex-col items-center">
              <Link to="/" className="block" aria-label="Smoke Signal BBQ Home">
                <img
                  src="/logo_final.png"
                  alt="Smoke Signal BBQ"
                  className={`${isScrolled ? 'h-14 md:h-16 lg:h-18' : 'h-28 md:h-32 lg:h-36'} w-auto object-contain transition-all duration-300`}
                />
              </Link>
              <div className={`overflow-hidden transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 mt-0' : 'h-6 opacity-100 -mt-1'}`}>
                <span className="text-[8px] text-cream font-bold tracking-[0.1em] uppercase block px-2 py-0.5 bg-black/40 rounded-full backdrop-blur-sm border border-white/10 shadow-lg whitespace-nowrap">
                  Est. 2011 • Bangalore
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowLocationPrompt(true)}
              className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
            >
              <MapPin size={14} className="text-fire" />
              <div className="text-left hidden md:block">
                <p className="text-[8px] uppercase tracking-widest text-gray-500 font-bold">Delivering to</p>
                <div className="flex items-center gap-1">
                  <p className="text-[11px] font-bold text-cream truncate max-w-[100px]">{city || "Select Location"}</p>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                </div>
              </div>
            </button>
          </div>

          {/* Group 2: Main Links (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.href.startsWith('/') ? link.href : `/${link.href}`}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs font-black text-cream hover:text-fire uppercase tracking-widest transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-fire transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Group 3: Cart + Hamburger + Order Now */}
          <div className="flex items-center gap-4 md:gap-8">
            <button
              onClick={toggleCart}
              className="relative text-cream hover:text-fire transition-all hover:scale-110"
              aria-label="View Cart"
            >
              <ShoppingBag size={24} />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-fire text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                  {items.length}
                </span>
              )}
            </button>

            <button
              className="text-cream hover:text-fire transition-all hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              <Menu size={28} />
            </button>

            <Button
              variant="primary"
              onClick={() => navigate('/shop')}
              className="hidden md:flex rounded-full px-6 py-3 text-[10px] font-black uppercase tracking-widest shadow-fire/20 shadow-lg hover:shadow-fire/40"
            >
              Order Now
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Full Screen Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/98 backdrop-blur-xl z-[60] flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-8 right-8 text-cream hover:text-fire transition-all hover:rotate-90"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={40} />
            </button>

            <div className="flex flex-col md:flex-row gap-8 md:gap-24 w-full max-w-6xl px-4">
              {/* Main Links (Duplicate here for Mobile/Full Accessibility) */}
              <div className="flex flex-col gap-6 md:gap-8">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-fire mb-2">Main Navigation</p>
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={link.href.startsWith('/') ? link.href : `/${link.href}`}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-4xl md:text-6xl font-display italic text-cream hover:text-fire transition-all"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Extended Links (About, Contact, FAQ, Blog) */}
              <div className="flex flex-col gap-6 md:gap-8 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-24">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-fire mb-2">Discover More</p>
                {MENU_LINKS.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (NAV_LINKS.length + i) * 0.1 }}
                  >
                    <Link
                      to={link.href.startsWith('/') ? link.href : `/${link.href}`}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-2xl md:text-4xl font-display italic text-gray-500 hover:text-fire transition-all"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Order Now Button */}
                <div className="md:hidden mt-8">
                  <Button variant="primary" icon onClick={() => { navigate('/shop'); setIsMenuOpen(false); }}>
                    Order Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Bottom Footer in Menu */}
            <div className="absolute bottom-12 w-full text-center opacity-30">
              <p className="text-[10px] font-bold uppercase tracking-widest">Smokesignal BBQ • Est. 2011</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};