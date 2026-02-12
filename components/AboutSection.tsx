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
              alt="Smoke Signal BBQ Authentic Pitmaster slow smoking brisket in Bangalore"
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              src="/founder.jpg"
              className="rounded-lg shadow-2xl w-full h-64 object-cover object-top"
              alt="Smoke Signal BBQ Founder dedicated to authentic Texas BBQ since 2011"
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
            <h2 className="section-title font-display text-4xl md:text-5xl text-cream mt-2 mb-4">Our Heritage: Smoke, Fire & Passion since 2011</h2>
            <h3 className="font-display text-2xl text-fire mb-6">The Original Bangalore Pitmasters</h3>
            <div className="space-y-6 text-gray-300 font-body leading-relaxed">
              <p>
                Smoke Signal BBQ didn't start in a corporate kitchen; it began as a humble food truck in 2011, driven by a singular obsession: bringing the uncompromising soul of American BBQ to the streets of Bangalore.
              </p>
              <p>
                While others took shortcuts with electric smokers or gas grills, we stayed true to the old ways. For over 12 years, we have mastered the art of 100% charcoal-fired cooking. Our signature <a href="#menu" className="text-fire hover:underline hover:text-red-400 transition-colors">brisket</a> is slow-smoked for up to 14 hours over premium hardwood charcoal until it is tender enough to slice with a spoon.
              </p>
              <p>
                From our <a href="#sauces" className="text-fire hover:underline hover:text-red-400 transition-colors">handcrafted Texas-style rubs</a> to our spicy Peri Peri twists, every item on our <a href="#menu" className="text-fire hover:underline hover:text-red-400 transition-colors">menu</a> is a labor of love. We don't just serve meat; we deliver a decade of fire-tested expertise in every bite.
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