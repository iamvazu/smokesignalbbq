import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock, Zap, Award } from 'lucide-react';

const methodology = [
    {
        icon: Flame,
        title: '100% Charcoal Fuel',
        description: 'Zero gas. Zero electricity. We use only premium hardwood charcoal to impart that unmistakable deep, smoky flavor that defines true Texas BBQ.'
    },
    {
        icon: Clock,
        title: '14-Hour Low & Slow',
        description: 'Time is our secret ingredient. Our briskets are smoked for up to 14 hours at strictly controlled low temperatures to render every ounce of fat into pure flavor.'
    },
    {
        icon: Zap,
        title: 'Hand-Rubbed Perfection',
        description: 'Every piece of meat is hand-trimmed and coated in our signature dry rubs, featuring a proprietary blend of 12+ spices crafted for the perfect bark.'
    },
    {
        icon: Award,
        title: 'Texas Heritage',
        description: 'Following the traditional methods of the Hill Country, we bring authentic pitmaster techniques to Bangalore, unchanged since we started in 2011.'
    }
];

export const PitmasterMethodology: React.FC = () => {
    return (
        <section className="py-24 bg-black/40 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <motion.div
                        className="lg:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-fire uppercase tracking-widest text-sm font-bold">The Craft</span>
                        <h2 className="font-display text-4xl md:text-5xl text-cream mt-2 mb-6">The Pitmaster's Way</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            True BBQ isn't just about heat—it's about the chemistry of smoke, meat, and time. In Bangalore, where shortcuts are common, we remain the last of the old guard, using 100% charcoal fired pits.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {methodology.map((item, i) => (
                                <div key={i} className="flex flex-col gap-3">
                                    <div className="w-12 h-12 bg-fire/10 rounded-xl flex items-center justify-center text-fire border border-fire/20">
                                        <item.icon size={24} />
                                    </div>
                                    <h4 className="font-display text-xl text-cream">{item.title}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="lg:w-1/2 relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl">
                            <img
                                src="/pitmaster_work.jpg"
                                alt="Pitmaster smoking brisket over charcoal"
                                className="w-full h-auto brightness-75 hover:brightness-100 transition-all duration-700 hover:scale-105"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1594041680534-e1291845119a?auto=format&fit=crop&w=800&q=80";
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                            <div className="absolute bottom-10 left-10">
                                <span className="text-fire font-black text-6xl opacity-20">EST. 2011</span>
                            </div>
                        </div>

                        {/* Decorative floating stats */}
                        <div className="absolute -top-6 -right-6 bg-charcoal border border-white/10 p-6 rounded-3xl shadow-2xl backdrop-blur-xl hidden md:block">
                            <p className="text-fire font-black text-3xl leading-none">14H</p>
                            <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">Smoke Time</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
