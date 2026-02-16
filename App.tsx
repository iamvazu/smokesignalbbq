import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ShoppingCart } from './components/ShoppingCart';
import { AbandonedCartPopup } from './components/AbandonedCartPopup';
import { OffersPopup } from './components/OffersPopup';
import { useCartStore } from './store';
import { Home } from './pages/Home';
import { ShopPage } from './pages/ShopPage';
import { ProductPage } from './pages/ProductPage';
import { EventsPage } from './pages/EventsPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { FranchisePage } from './pages/FranchisePage';



function App() {
  const { items, toggleCart } = useCartStore();
  const location = useLocation();

  // GA Tracking and Smooth scroll behavior for anchor links
  useEffect(() => {
    // Page view tracking
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('config', 'G-YM8DDTWV6Q', {
        page_path: location.pathname,
        page_title: document.title
      });
    }

    document.documentElement.style.scrollBehavior = 'smooth';
    window.scrollTo(0, 0);
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, [location.pathname]);

  return (
    <div className="bg-charcoal min-h-screen text-cream selection:bg-fire selection:text-white">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/franchise" element={<FranchisePage />} />

        {/* Redirect old anchor links if needed or just let Navbar handle it */}
      </Routes>

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
      <OffersPopup />
    </div>
  );
}

export default App;