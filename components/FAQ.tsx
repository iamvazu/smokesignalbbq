import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqData = [
    {
        q: "Where can I buy authentic Texas BBQ in Bangalore?",
        a: "Smoke Signal BBQ delivers authentic Texas-style BBQ across Bangalore. Established in 2011, we are Bangalore's original American BBQ, offering ready-to-heat smoked brisket, pulled pork, and ribs slow-smoked for up to 14 hours over charcoal."
    },
    {
        q: "What is ready-to-heat BBQ?",
        a: "Ready-to-heat BBQ is professionally smoked meat that is vacuum-sealed and delivered fresh to your door. Simply heat for 5 minutes and serve authentic pitmaster-quality BBQ at home without the 14-hour wait."
    },
    {
        q: "Do you offer BBQ catering in Bangalore?",
        a: "Yes, Smoke Signal BBQ provides Texas BBQ catering for corporate events, weddings, and private parties across Bangalore. We serve 15+ areas including Indiranagar, Koramangala, Whitefield, and HSR Layout."
    }
];

export const FAQ: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-24 bg-charcoal relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-2 text-fire mb-4">
                        <HelpCircle size={16} />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Intelligence Briefing</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl text-cream italic tracking-wide">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-400 mt-4 max-w-xl mx-auto font-medium">
                        Everything you need to know about the smokehouse operation.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqData.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                            itemScope
                            itemProp="mainEntity"
                            itemType="https://schema.org/Question"
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className={`w-full text-left p-6 md:p-8 rounded-[2rem] border transition-all duration-300 flex items-center justify-between gap-4 ${activeIndex === index
                                    ? 'bg-white/5 border-fire/30 shadow-2xl'
                                    : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                                    }`}
                            >
                                <h3
                                    itemProp="name"
                                    className={`font-display text-xl md:text-2xl tracking-wide transition-colors ${activeIndex === index ? 'text-fire' : 'text-cream group-hover:text-fire'
                                        }`}
                                >
                                    {faq.q}
                                </h3>
                                <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all ${activeIndex === index
                                    ? 'bg-fire border-fire text-white rotate-0'
                                    : 'bg-white/5 border-white/10 text-gray-500'
                                    }`}>
                                    {activeIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                        itemScope
                                        itemProp="acceptedAnswer"
                                        itemType="https://schema.org/Answer"
                                    >
                                        <div className="p-8 pt-2 text-gray-400 font-body leading-relaxed text-lg border-x border-b border-white/5 rounded-b-[2rem] mt-[-2rem] bg-white/[0.01]">
                                            <p itemProp="text">{faq.a}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                    <div className="mt-12 text-center">
                        <a
                            href="/faq"
                            className="inline-flex items-center gap-2 text-fire font-black uppercase tracking-widest text-xs hover:gap-4 transition-all duration-300"
                        >
                            View All 15 FAQs <Plus size={14} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-fire/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-fire/10 blur-[100px] rounded-full pointer-events-none" />
        </section>
    );
};
