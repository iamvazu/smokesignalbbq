import React from 'react';
import { motion } from 'framer-motion';
import { Seo } from '../seo/Seo';
import {
    Flame,
    Clock,
    Zap,
    Award,
    ShieldCheck,
    Check,
    X,
    MessageSquare,
    Instagram,
    ArrowRight
} from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

const methodology = [
    {
        icon: Flame,
        title: '100% Charcoal Fuel',
        description: 'Zero gas. Zero electricity. We use only premium hardwood charcoal to impart that unmistakable deep, smoky flavor.'
    },
    {
        icon: Clock,
        title: '14-Hour Low & Slow',
        description: 'Time is our secret ingredient. Our briskets are smoked for up to 14 hours at strictly controlled low temperatures.'
    },
    {
        icon: Zap,
        title: 'Hand-Rubbed Perfection',
        description: 'Every piece of meat is hand-trimmed and coated in our signature dry rubs, featuring a proprietary blend of 12+ spices.'
    },
    {
        icon: Award,
        title: 'Texas Heritage',
        description: 'Following traditional Hill Country methods, we bring authentic pitmaster techniques to Bangalore, unchanged since 2011.'
    }
];

const comparisonData = [
    { feature: 'Fuel Source', smokesignal: '100% Hardwood Charcoal', others: 'Gas/Electric/Liquid Smoke' },
    { feature: 'Smoking Time', smokesignal: '14+ Hours (Brisket)', others: '4-6 Hours (Flash Smoked)' },
    { feature: 'Freshness', smokesignal: 'Vacuum-Sealed Fresh', others: 'Frozen Premade' },
    { feature: 'Authenticity', smokesignal: 'Texas Pitmaster Method', others: 'Commercial Oven Baked' },
    { feature: 'Experience', smokesignal: 'Established since 2011', others: 'New Market Entrants' }
];

export const AboutPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-charcoal text-cream pb-24">
            <Seo
                title="About Smoke Signal BBQ: Bangalore's Original Texas BBQ Heritage"
                description="Discover the story of Bangalore's first authentic Texas BBQ. From our humble 2011 food truck roots to mastering the 14-hour charcoal smoke. Meet the pitmasters behind the fire."
                keywords={['About Smoke Signal BBQ', 'Texas BBQ History Bangalore', 'Dexter Ross BBQ', 'Pitmaster Methodology']}
            />

            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden mb-24">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/footer_bg.jpg"
                        alt="Smoke Signal BBQ Heritage"
                        className="w-full h-full object-cover opacity-40 brightness-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-charcoal/40 to-charcoal" />
                </div>

                <div className="container mx-auto px-4 relative z-10 pt-36 md:pt-48 lg:pt-56 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <span className="text-fire uppercase tracking-[0.4em] text-xs md:text-sm font-bold mb-4 block">Est. 2011 • Bangalore</span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display italic leading-[1.1] mb-6 tracking-tight">
                            A Decade of <br /> <span className="text-fire">Smoke & Fire</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10 font-medium font-body">
                            We didn't just start a restaurant; we started a mission to bring uncompromising, 100% charcoal-fired Texas BBQ to India.
                        </p>
                    </motion.div>
                </div>

                {/* Animated Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 1, duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cream/40">The Heritage</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-fire to-transparent" />
                </motion.div>
            </section>

            {/* Section 1: Our Heritage */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        <div className="w-full lg:w-1/2 relative h-[400px] md:h-[600px]">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="absolute left-0 top-0 w-[60%] h-full z-10"
                            >
                                <img src="/pitmaster.jpg" className="w-full h-full object-cover rounded-[2.5rem] shadow-2xl brightness-75" alt="Pitmaster at work" />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="absolute right-0 bottom-12 w-[55%] h-[70%] z-20"
                            >
                                <img src="/founder.jpg" className="w-full h-full object-cover rounded-[2.5rem] shadow-2xl border-8 border-charcoal" alt="Our Founder" />
                            </motion.div>
                        </div>

                        <div className="w-full lg:w-1/2">
                            <span className="text-fire font-black uppercase tracking-[0.3em] text-xs block mb-4">The Story</span>
                            <h2 className="text-4xl md:text-6xl font-display italic text-cream mb-8">Our Heritage</h2>
                            <div className="space-y-6 text-gray-400 text-lg leading-relaxed font-body">
                                <p>
                                    Smoke Signal BBQ didn't start in a corporate kitchen; it began as a humble food truck in 2011, driven by a singular obsession: bringing the uncompromising soul of American BBQ to the streets of Bangalore.
                                </p>
                                <p>
                                    While others took shortcuts with electric smokers or gas grills, we stayed true to the old ways. For over 12 years, we have mastered the art of 100% charcoal-fired cooking.
                                </p>
                                <p>
                                    Our signature brisket is slow-smoked for up to 14 hours over premium hardwood charcoal until it is tender enough to slice with a spoon. Every item on our menu is a labor of love, delivering a decade of fire-tested expertise in every bite.
                                </p>

                                <div className="grid grid-cols-2 gap-8 pt-8">
                                    <div className="border-l-2 border-fire pl-6">
                                        <p className="text-4xl font-display text-fire italic">12+</p>
                                        <p className="text-[10px] uppercase font-black tracking-widest text-gray-500">Years of Fire</p>
                                    </div>
                                    <div className="border-l-2 border-fire pl-6">
                                        <p className="text-4xl font-display text-fire italic">50K+</p>
                                        <p className="text-[10px] uppercase font-black tracking-widest text-gray-500">Happy BBQ Lovers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Our Craft (The Methodology) */}
            <section className="py-32 bg-black/30 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <span className="text-fire font-black uppercase tracking-[0.3em] text-xs block mb-4">The Pitmaster Way</span>
                        <h2 className="text-4xl md:text-6xl font-display italic text-cream">Our Craft</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {methodology.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:border-fire/30 transition-all group"
                            >
                                <div className="w-16 h-16 bg-fire/10 rounded-2xl flex items-center justify-center text-fire mb-8 group-hover:scale-110 transition-transform">
                                    <item.icon size={32} />
                                </div>
                                <h4 className="text-2xl font-display italic text-cream mb-4">{item.title}</h4>
                                <p className="text-gray-500 leading-relaxed font-body">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-24 relative rounded-[3rem] overflow-hidden group">
                        <img src="/pitmaster_brisket.png" className="w-full h-[500px] object-cover brightness-50 group-hover:scale-105 transition-transform duration-700" alt="Authentic smoking process" />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                        <div className="absolute bottom-12 left-12 right-12 text-center md:text-left">
                            <h3 className="text-3xl font-display italic text-cream mb-4">"No Shortcuts. No Gas. Just Fire."</h3>
                            <p className="text-gray-400 max-w-2xl font-body">Our pitmasters start the fires at 3 AM daily to ensure that every slice of brisket delivered to your door has the authentic texture and depth of flavor that only charcoal and time can provide.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Why Smoke Signal BBQ */}
            <section className="py-32 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-2 text-fire mb-4">
                            <ShieldCheck size={16} />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">The Truth In Smoke</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display italic text-cream">Why Smoke Signal?</h2>
                        <p className="text-gray-400 mt-4 max-w-xl mx-auto font-body">See how we stack up against the short-cuts commonly taken in the industry.</p>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white/5 rounded-[4rem] border border-white/10 overflow-hidden shadow-3xl backdrop-blur-md">
                            <div className="grid grid-cols-3 p-10 border-b border-white/10 bg-white/5">
                                <div className="text-gray-500 font-bold uppercase text-[10px] tracking-widest pt-2">Feature</div>
                                <div className="text-fire font-black uppercase text-xs tracking-[0.2em] text-center bg-fire/5 py-4 rounded-3xl border border-fire/20 shadow-lg">Smoke Signal BBQ</div>
                                <div className="text-gray-500 font-bold uppercase text-[10px] tracking-widest text-center pt-2">Typical Others</div>
                            </div>

                            {comparisonData.map((item, i) => (
                                <div key={i} className={`grid grid-cols-3 p-10 items-center ${i !== comparisonData.length - 1 ? 'border-b border-white/5' : ''} hover:bg-white/[0.02] transition-colors`}>
                                    <div className="text-cream font-display text-xl italic">{item.feature}</div>
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                            <Check size={20} />
                                        </div>
                                        <span className="text-white text-xs font-black text-center uppercase tracking-widest">{item.smokesignal}</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-3 opacity-40">
                                        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                                            <X size={20} />
                                        </div>
                                        <span className="text-gray-400 text-xs font-bold text-center uppercase tracking-widest">{item.others}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="container mx-auto px-4 mt-24">
                <div className="bg-fire rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_50px_100px_rgba(239,68,68,0.3)]">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-7xl font-display italic text-white mb-6 animate-pulse">Join the Movement</h2>
                        <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-body">
                            Experience the difference authenticity makes. Join tens of thousands of Bangalore BBQ lovers today.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Button
                                variant="primary"
                                className="px-16 py-6 bg-charcoal text-white rounded-full font-black uppercase tracking-widest text-lg hover:bg-black hover:scale-105 transition-all shadow-3xl border-2 border-white/20"
                                onClick={() => navigate('/shop')}
                            >
                                Order Now
                            </Button>
                            <a
                                href="https://instagram.com/smokesignalbbq"
                                target="_blank"
                                className="px-16 py-6 bg-white border-2 border-white rounded-full font-black uppercase tracking-widest text-lg text-fire hover:bg-transparent hover:text-white transition-all flex items-center gap-3 shadow-xl"
                            >
                                <Instagram size={24} /> Follow Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
