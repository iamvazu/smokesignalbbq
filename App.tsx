import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from './store';
import { MenuGrid as Shop } from './components/MenuGrid';
import { FeaturedProducts } from './components/FeaturedProducts';
import { CategoryPreview } from './components/CategoryPreview';
import { HowItWorks } from './components/HowItWorks';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { ShoppingCart } from './components/ShoppingCart';
import { PRODUCTS } from './constants';
import { ComboShowcase } from './components/ComboShowcase';
import { AbandonedCartPopup } from './components/AbandonedCartPopup';


function App() {

  const { items, toggleCart } = useCartStore();

  // Smooth scroll behavior for anchor links

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const comboProducts = PRODUCTS.filter(p => p.category === 'combo');
  const bbqProducts = PRODUCTS.filter(p => p.category === 'bbq' && p.subCategory !== 'combos');
  const sauceProducts = PRODUCTS.filter(p => p.category === 'sauce');
  const featuredProducts = PRODUCTS.filter(p => p.badges.includes('Best Seller') || p.badges.includes('Most Popular')).slice(0, 3);

  const scrollToShop = (filter?: string) => {
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-charcoal min-h-screen text-cream selection:bg-fire selection:text-white">
      <Navbar />
      <main>
        <Hero />

        <ComboShowcase products={comboProducts} />

        <FeaturedProducts products={featuredProducts} />

        <CategoryPreview
          title="Ready to Heat & Serve BBQ"
          subtitle="Authentic Texas BBQ. Slow smoked over charcoal. Ready in minutes."
          products={bbqProducts}
          categoryValue="bbq"
          onViewAll={() => scrollToShop('bbq')}
        />

        <CategoryPreview
          title="Signature BBQ Sauces"
          subtitle="Crafted by pitmasters. Smoky, bold, and authentic."
          products={sauceProducts}
          categoryValue="sauce"
          onViewAll={() => scrollToShop('sauce')}
        />

        <HowItWorks />

        <Shop />

        <AboutSection />
      </main>
      <ShoppingCart />

      {/* Floating Cart Button for Mobile */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: items.length > 0 ? 1 : 0,
          opacity: items.length > 0 ? 1 : 0
        }}
        onClick={toggleCart}
        className="fixed bottom-6 right-6 z-40 lg:hidden bg-fire text-white p-4 rounded-2xl shadow-[0_10px_30px_rgba(255,107,0,0.5)] flex items-center justify-center"
      >
        <ShoppingBag size={24} />
        <span className="absolute -top-2 -right-2 bg-white text-fire text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-fire shadow-lg">
          {items.length}
        </span>
      </motion.button>

      <Footer />
      <AbandonedCartPopup />
    </div>

  );
}



export default App;