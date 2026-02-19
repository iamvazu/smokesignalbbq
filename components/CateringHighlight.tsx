import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Utensils, Award } from 'lucide-react';

export const CateringHighlight: React.FC = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-black/40">
            <div className="absolute inset-0 z-0">
                <img
                    src="/pitmaster.jpg"
                    alt="Catering Background"
                    className="w-full h-full object-cover opacity-20 brightness-30"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-px bg-fire" />
                            <span className="text-fire font-black uppercase tracking-[0.3em] text-xs">Event Excellence</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-display italic text-cream mb-8 leading-tight">
                            BBQ Catering for <br /> <span className="text-fire">Weddings & Corporate Events</span>
                        </h2>

                        <p className="text-xl text-gray-400 mb-10 leading-relaxed font-body">
                            Make your next event unforgettable. From boardroom lunches to grand wedding receptions, we bring authentic 14-hour charcoal-smoked BBQ to venues across <span className="text-white font-bold">Bangalore & South India.</span>
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-fire/10 flex items-center justify-center text-fire shrink-0">
                                    <Utensils size={20} />
                                </div>
                                <div>
                                    <h4 className="text-cream font-bold text-sm mb-1 uppercase tracking-widest">20-500+ Guests</h4>
                                    <p className="text-xs text-gray-500">Flexible packages for any size</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-fire/10 flex items-center justify-center text-fire shrink-0">
                                    <Award size={20} />
                                </div>
                                <div>
                                    <h4 className="text-cream font-bold text-sm mb-1 uppercase tracking-widest">Full-Service</h4>
                                    <p className="text-xs text-gray-500">Staff, setup, and live carving</p>
                                </div>
                            </div>
                        </div>

                        <Link
                            to="/catering"
                            className="group inline-flex items-center gap-4 px-10 py-5 bg-fire text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl shadow-fire/30 hover:scale-105 transition-all"
                        >
                            Explore Catering Services
                            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
