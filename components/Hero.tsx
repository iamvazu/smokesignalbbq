import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';
import { useLocationStore } from '../store';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { city } = useLocationStore();

  // Extract major area or city name for headline
  const displayCity = city ? city.split(',')[0] : 'Bangalore';

  return (

    <section id="home" className="relative min-h-screen w-full flex items-start bg-charcoal pb-24">
      {/* Background Image */}
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-black/50 z-20" /> {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent z-20" />

        {/* Anti-YouTube UI Overlays */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-black z-30" /> {/* Top bar hide */}

        <iframe
          className="absolute top-1/2 left-1/2 w-[110%] h-[110%] md:w-[177.77vh] md:h-full min-w-full min-h-[56.25vw] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-60 border-none scale-110"
          src={`https://www.youtube.com/embed/S0pjch8mdTg?autoplay=1&mute=1&loop=1&playlist=S0pjch8mdTg&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : 'https://smokesignalbbq.in'}`}
          title="Smoke Signal BBQ Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Floating Smoke/Embers Effects (CSS based for performance + overlays) */}
      <div className="absolute inset-0 z-1 pointer-events-none opacity-30 mix-blend-screen overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-fire/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-texasRed/20 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative text-center md:text-left pt-36 md:pt-48 lg:pt-56">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >

          <div className="flex items-center gap-2 text-fire mb-4 justify-center md:justify-start">
            <span className="w-12 h-[1px] bg-fire" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">The Original Since 2011</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl text-cream leading-[1.1] mb-6 drop-shadow-2xl italic">
            Bangalore's Original <span className="text-fire block md:inline">Texas BBQ.</span> <br />
            <span className="text-white">Ready to Heat & Eat.</span>
          </h1>

          <p className="font-body text-gray-300 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            Slow-smoked for over 14 hours over real charcoal in {displayCity}. <br className="hidden lg:block" />
            Authentic pitmaster flavor, delivered fresh to your door.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center md:justify-start items-center">
            <Button
              variant="primary"
              icon
              className="rounded-full lg:px-10 lg:py-4 lg:text-sm shadow-[0_0_25px_rgba(239,68,68,0.5)]"
              onClick={() => document.getElementById('combos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Order Now
            </Button>
            <Button
              variant="outline"
              className="rounded-full lg:px-10 lg:py-4 lg:text-sm"
              onClick={() => navigate('/shop')}
            >
              View Menu
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