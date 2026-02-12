import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Truck, Flame, Utensils } from 'lucide-react';

const steps = [
    {
        icon: ShoppingCart,
        title: 'Order Online',
        description: 'Browse our selection of slow-smoked meats and signature sauces and add to your cart.'
    },
    {
        icon: Truck,
        title: 'Delivered Fresh',
        description: 'We deliver your BBQ vacuum-sealed and chilled to preserve maximum freshness and flavor.'
    },
    {
        icon: Flame,
        title: 'Heat for 5 Minutes',
        description: 'Follow our simple heating instructions to bring back that pit-fresh charcoal flavor.'
    },
    {
        icon: Utensils,
        title: 'Enjoy Authentic BBQ',
        description: 'Serve up a Texas-sized feast in the comfort of your own home.'
    }
];

export const HowItWorks: React.FC = () => {
    return (
        <section id="how-it-works" className="py-24 bg-burnt/10 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-fire uppercase tracking-widest text-sm font-bold">The Process</span>
                    <h2 className="font-display text-4xl md:text-5xl text-cream mt-2 mb-4">How It Works</h2>
                    <div className="w-24 h-1 bg-fire mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative text-center group"
                        >
                            {/* Connector Line for Desktop */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-[2px] bg-gradient-to-r from-fire/30 to-transparent z-0" />
                            )}

                            <div className="relative z-10">
                                <div className="w-24 h-24 bg-charcoal border border-fire/20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 transition-transform duration-300 shadow-2xl">
                                    <step.icon size={40} className="text-fire" />
                                    <span className="absolute -top-3 -right-3 w-8 h-8 bg-fire text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                                        {index + 1}
                                    </span>
                                </div>
                                <h3 className="font-display text-2xl text-cream mb-4">{step.title}</h3>
                                <p className="font-body text-gray-400 leading-relaxed px-4">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-fire/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-fire/5 blur-[100px] rounded-full pointer-events-none" />
        </section>
    );
};
