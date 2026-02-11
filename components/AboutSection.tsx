import React from 'react';
import { motion } from 'framer-motion';

export const AboutSection: React.FC = () => {
  return (
    <section id="story" className="py-24 bg-charcoal relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

          {/* Images Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              src="/pitmaster.jpg"
              className="rounded-lg shadow-2xl mt-12 w-full h-64 object-cover"
              alt="Pitmaster at work"
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              src="/founder.jpg"
              className="rounded-lg shadow-2xl w-full h-64 object-cover"
              alt="Founder"
            />
          </div>

          {/* Text Content */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-fire uppercase tracking-widest text-sm font-bold">Our Heritage</span>
            <h2 className="font-display text-4xl md:text-5xl text-cream mt-2 mb-6">Smoke, Fire & Passion since 2011</h2>
            <div className="space-y-6 text-gray-300 font-body leading-relaxed">
              <p>
                Smoke Signal BBQ started as a humble food truck in 2011, driven by a singular obsession: bringing authentic American BBQ to the streets of Bangalore.
              </p>
              <p>
                We believe in the old ways. No electric smokers. No gas shortcuts. Just premium meat, quality hardwood charcoal, and time. Lots of time. Our brisket is smoked for up to 14 hours until it's tender enough to slice with a spoon.
              </p>
              <p>
                From our homemade Texas-style rubs to our spicy Peri Peri twists, everything we serve is a labor of love, crafted to give you the ultimate carnivorous experience.
              </p>

              <div className="pt-6 border-t border-white/10 flex gap-8">
                <div>
                  <h4 className="font-display text-2xl text-fire">12+</h4>
                  <span className="text-sm uppercase tracking-wider text-gray-400">Years Smoking</span>
                </div>
                <div>
                  <h4 className="font-display text-2xl text-fire">100%</h4>
                  <span className="text-sm uppercase tracking-wider text-gray-400">Charcoal Cooked</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};