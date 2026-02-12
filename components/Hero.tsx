import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-charcoal">
      {/* Background Image */}
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent z-10" />

        <iframe
          className="absolute top-1/2 left-1/2 w-[177.77vh] h-full min-w-full min-h-[56.25vw] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-60"
          src="https://www.youtube.com/embed/S0pjch8mdTg?autoplay=1&mute=1&controls=0&loop=1&playlist=S0pjch8mdTg&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1"
          title="Smoke Signal BBQ"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Floating Smoke/Embers Effects (CSS based for performance + overlays) */}
      <div className="absolute inset-0 z-1 pointer-events-none opacity-30 mix-blend-screen">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-fire/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-texasRed/20 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative text-center md:text-left pt-56 md:pt-72 lg:pt-80">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >


          <h1 className="font-display text-5xl md:text-7xl lg:text-7xl text-cream leading-tight mb-6 drop-shadow-2xl">
            Authentic American Charcoal BBQ in Bangalore
          </h1>

          <p className="font-body text-gray-300 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            Slow-smoked brisket, fall-off-the-bone ribs, and handcrafted Texas sauces. Cooked entirely on charcoal grills for that unmistakable smoky flavor.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <Button variant="primary" icon onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}>
              Start Order
            </Button>
            <Button variant="outline" onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}>
              Our Story
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-cream/50 z-20 flex flex-col items-center"
      >
        <span className="text-[10px] uppercase tracking-widest mb-2">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-fire to-transparent" />
      </motion.div>
    </section>
  );
};