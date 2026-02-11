import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuGrid } from './components/MenuGrid';
import { SauceShowcase } from './components/SauceShowcase';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { ShoppingCart } from './components/ShoppingCart';

function App() {
  // Smooth scroll behavior for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="bg-charcoal min-h-screen text-cream selection:bg-fire selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <SauceShowcase />
        <MenuGrid />
        <AboutSection />
      </main>
      <ShoppingCart />
      <Footer />
    </div>
  );
}

export default App;