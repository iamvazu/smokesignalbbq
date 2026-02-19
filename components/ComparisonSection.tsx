import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ShieldCheck } from 'lucide-react';

const comparisonData = [
    { feature: 'Fuel Source', smokesignal: '100% Hardwood Charcoal', others: 'Gas/Electric/Liquid Smoke' },
    { feature: 'Smoking Time', smokesignal: '14+ Hours (Brisket)', others: '4-6 Hours (Flash Smoked)' },
    { feature: 'Freshness', smokesignal: 'Vacuum-Sealed Fresh', others: 'Frozen Premade' },
    { feature: 'Authenticity', smokesignal: 'Texas Pitmaster Method', others: 'Commercial Oven Baked' },
    { feature: 'Experience', smokesignal: 'Established since 2011', others: 'New Market Entrants' }
];

export const ComparisonSection: React.FC = () => {
    return (
        <section className="py-24 bg-charcoal relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-2 text-fire mb-4">
                        <ShieldCheck size={16} />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">The Truth In Smoke</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl text-cream italic">Why Smoke Signal?</h2>
                    <p className="text-gray-400 mt-4 max-w-xl mx-auto">See how we stack up against the shortcuts commonly taken in the industry.</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/5 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl backdrop-blur-md">
                        <div className="grid grid-cols-3 p-8 border-b border-white/10 bg-white/5">
                            <div className="text-gray-500 font-bold uppercase text-[10px] tracking-widest pt-2">Feature</div>
                            <div className="text-fire font-black uppercase text-xs tracking-[0.2em] text-center bg-fire/5 py-4 rounded-2xl border border-fire/20">Smoke Signal BBQ</div>
                            <div className="text-gray-500 font-bold uppercase text-[10px] tracking-widest text-center pt-2">Typical Others</div>
                        </div>

                        {comparisonData.map((item, i) => (
                            <div key={i} className={`grid grid-cols-3 p-8 items-center ${i !== comparisonData.length - 1 ? 'border-b border-white/5' : ''}`}>
                                <div className="text-cream font-display text-lg">{item.feature}</div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                        <Check size={16} />
                                    </div>
                                    <span className="text-white text-xs font-bold text-center">{item.smokesignal}</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 opacity-50">
                                    <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                                        <X size={16} />
                                    </div>
                                    <span className="text-gray-400 text-xs font-medium text-center">{item.others}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
