import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Flame, Target, ShieldCheck, TrendingUp, Users, MapPin,
    ArrowRight, CheckCircle2, XCircle, Download, Phone,
    Calendar, Mail, Globe, Clock, ChevronDown, Rocket,
    Zap, Gem, Award, PieChart, Briefcase, Info,
    MessageSquare, HelpCircle, Star, User, Loader2
} from 'lucide-react';
import axios from 'axios';
import { CONTACT_INFO } from '../constants';

// @ts-ignore
const API_URL = (import.meta as any).env.VITE_API_URL || '/api/v1';

export const FranchisePage: React.FC = () => {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: 'City of Interest',
        preferredModel: 'Preferred Model',
        investmentRange: 'Investment Cap',
        netWorth: 'My Net Worth',
        experience: '',
        message: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const scrollToForm = () => {
        const formElement = document.getElementById('franchise-form');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic Validation
        if (formData.city === 'City of Interest' || formData.investmentRange === 'Investment Cap') {
            alert('Please select your city and investment range.');
            return;
        }

        setIsSubmitting(true);
        try {
            await axios.post(`${API_URL}/franchise`, {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                city: formData.city,
                investmentRange: formData.investmentRange,
                businessOrg: formData.preferredModel,
                experience: formData.experience,
                message: formData.message
            });
            setFormSubmitted(true);
            window.scrollTo({ top: document.getElementById('franchise-form')?.offsetTop || 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to submit application. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-charcoal text-cream font-body overflow-x-hidden">
            {/* SEO Metadata (Mental Note: Should be handled by Helmet or similar in real app) */}

            {/* HERO SECTION */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-charcoal/60 to-charcoal z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1920&q=80"
                        alt="BBQ Flames"
                        className="w-full h-full object-cover scale-105 animate-slow-zoom"
                    />
                </div>

                <div className="container mx-auto px-4 relative z-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fire/20 border border-fire/30 text-fire text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-4 md:mb-6">
                            <span>🇮🇳</span>
                            BHARAT National Expansion
                        </div>
                        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display italic text-cream mb-4 md:mb-6 drop-shadow-2xl leading-[1.1]">
                            Own a Piece of <br />
                            <span className="text-fire">Bangalore's Original</span> <br />
                            American BBQ
                        </h1>
                        <p className="text-sm md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto mb-8 md:mb-10 font-medium leading-relaxed">
                            Since 2011 • 15 Years of Heritage <br />
                            Now Franchising Across South India
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={scrollToForm}
                                className="px-8 py-4 bg-fire text-white rounded-full font-bold uppercase tracking-widest hover:bg-fire-dark transition-all transform hover:scale-105 flex items-center gap-3 shadow-xl shadow-fire/20"
                            >
                                Apply Now <ArrowRight size={20} />
                            </button>
                            <button className="px-8 py-4 bg-white/5 border border-white/10 text-cream rounded-full font-bold uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-md">
                                Get Franchise Kit
                            </button>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50 z-20 cursor-pointer" onClick={scrollToForm}>
                    <ChevronDown size={32} className="text-fire" />
                </div>
            </section>

            {/* QUICK STATS */}
            <div className="relative z-30 -mt-16 sm:-mt-20 mb-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto bg-charcoal/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-3xl">
                        <div className="text-center">
                            <span className="block text-2xl md:text-4xl font-display text-fire italic mb-1">₹25-35L</span>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Investment</span>
                        </div>
                        <div className="text-center border-l border-white/10">
                            <span className="block text-2xl md:text-4xl font-display text-fire italic mb-1">18-24 Mo</span>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">ROI Target</span>
                        </div>
                        <div className="text-center border-l border-white/10">
                            <span className="block text-2xl md:text-4xl font-display text-fire italic mb-1">4 Cities</span>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Phase 1 Areas</span>
                        </div>
                        <div className="text-center border-l border-white/10">
                            <span className="block text-2xl md:text-4xl font-display text-fire italic mb-1">15 Yrs</span>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Brand Heritage</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 1: WHY SMOKE SIGNAL BBQ? */}
            <section className="py-20 md:py-32 bg-black/20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        <div className="max-w-xl mx-auto lg:mx-0">
                            <span className="text-fire font-bold uppercase tracking-[0.2em] text-[10px] md:text-sm mb-4 block">The Opportunity</span>
                            <h2 className="text-3xl md:text-5xl font-display italic text-cream mb-8 leading-[1.2] font-extrabold">
                                There are zero organized <br className="hidden md:block" />
                                players in India's ₹500Cr <br className="hidden md:block" />
                                <span className="text-fire">BBQ Market.</span>
                            </h2>
                            <p className="text-gray-400 text-base md:text-lg mb-10 leading-relaxed font-medium">
                                While biryani chains fight for market share, authentic American BBQ remains untouched. We've spent 15 years perfecting the craft so you don't have to.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                                {[
                                    { title: 'Market Demand', desc: 'Post-pandemic demand for premium, authentic experiences.' },
                                    { title: 'Cloud-First Model', desc: 'Reduced real estate risk with optimized delivery ops.' },
                                    { title: 'Tech Driven', desc: 'Mature delivery ecosystem & automated ordering.' },
                                    { title: 'Category Leader', desc: 'The first-mover advantage in the authentic BBQ niche.' }
                                ].map((item, i) => (
                                    <div key={i} className="p-5 md:p-6 bg-white/5 rounded-2xl border border-white/5 group hover:border-fire/20 transition-all">
                                        <div className="w-10 h-10 rounded-full bg-fire/10 flex items-center justify-center text-fire mb-4 group-hover:bg-fire group-hover:text-white transition-colors">
                                            <Zap size={18} />
                                        </div>
                                        <h4 className="font-bold text-cream mb-2 text-sm md:text-base">{item.title}</h4>
                                        <p className="text-[11px] md:text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative mt-12 lg:mt-0">
                            <div className="absolute inset-0 bg-fire blur-[120px] opacity-10 rounded-full" />
                            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                                <h3 className="text-xl md:text-2xl font-display italic text-cream mb-6 p-4 text-center">The BBQ Advantage</h3>
                                <div className="space-y-px overflow-hidden rounded-2xl border border-white/5 shadow-2xl">
                                    <div className="grid grid-cols-2 bg-white/10 p-4 md:p-6 text-[9px] md:text-xs font-bold uppercase tracking-widest text-center">
                                        <span className="text-gray-400 border-r border-white/10">Other Brands</span>
                                        <span className="text-fire">Smoke Signal BBQ</span>
                                    </div>
                                    {[
                                        { other: 'Grilled meat with sauce', us: '14-hour hardwood smoked' },
                                        { other: 'Commodity pricing', us: 'Premium (₹800 AOV)' },
                                        { other: 'No brand story', us: '15-year heritage' },
                                        { other: 'High competition', us: 'Blue ocean market' },
                                        { other: 'Complex operations', us: 'Simple, repeatable system' }
                                    ].map((row, i) => (
                                        <div key={i} className="grid grid-cols-2 p-4 md:p-6 bg-black/40 border-t border-white/5 group hover:bg-white/[0.02] transition-colors items-center text-center">
                                            <span className="text-[11px] md:text-sm text-gray-500 border-r border-white/10 pr-2">{row.other}</span>
                                            <div className="flex items-center justify-center gap-2 pl-2">
                                                <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                                                <span className="text-[11px] md:text-sm text-cream font-medium">{row.us}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: FRANCHISE MODELS */}
            <section className="py-20 md:py-32 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 md:mb-24">
                        <h2 className="text-3xl md:text-5xl font-display italic text-cream mb-4">Choose Your Path</h2>
                        <p className="text-gray-400 tracking-[0.2em] uppercase text-[10px] md:text-xs font-bold">Tailored models for every investor profile</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
                        {/* Model A */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-white/5 rounded-[2.5rem] border border-white/5 p-8 md:p-10 flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Globe size={80} />
                            </div>
                            <span className="text-fire font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] mb-3 md:mb-4 block">Model A</span>
                            <h3 className="text-3xl md:text-4xl font-display italic text-cream mb-4 leading-none">Cloud Kitchen</h3>
                            <p className="text-xs md:text-sm text-gray-400 mb-8 font-medium">For Operators Who Want to Start Fast</p>

                            <div className="space-y-4 mb-10 text-xs md:text-sm">
                                <div className="flex justify-between border-b border-white/5 pb-3">
                                    <span className="text-gray-400">Investment</span>
                                    <span className="text-cream font-bold">₹25-35 Lakhs</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-3">
                                    <span className="text-gray-400">Space</span>
                                    <span className="text-cream font-bold">600-800 sq ft</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-3">
                                    <span className="text-gray-400">Target ROI</span>
                                    <span className="text-fire font-bold">12-18 Months</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Ideal For</span>
                                    <span className="text-cream font-bold text-right">First-time Owners</span>
                                </div>
                            </div>

                            <div className="mt-auto space-y-4">
                                <h4 className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.2em] mb-2">What You Receive</h4>
                                <ul className="grid grid-cols-1 gap-3">
                                    {['2 Commercial Smokers', 'WhatsApp Ordering System', 'Kitchen Setup Design', 'Partner Integrations'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-xs md:text-sm text-gray-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-fire outline outline-4 outline-fire/20 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Model B */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-fire/10 rounded-[2.5rem] border border-fire/20 p-8 md:p-10 flex flex-col relative overflow-hidden shadow-2xl shadow-fire/10 border-2 scale-100 lg:scale-105">
                            <div className="absolute top-0 right-0 py-6 px-12 bg-fire text-white text-[8px] md:text-[10px] font-black rotate-45 transform translate-x-12 -translate-y-8 uppercase tracking-widest shadow-xl">Most Popular</div>
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Gem size={100} />
                            </div>
                            <span className="text-fire font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] mb-4 block">Model B</span>
                            <h3 className="text-3xl md:text-4xl font-display italic text-cream mb-4 leading-none">Dine-In</h3>
                            <p className="text-xs md:text-sm text-cream/70 mb-8 font-medium italic">For Investors Who Want the Full Experience</p>

                            <div className="space-y-4 mb-10 text-xs md:text-sm">
                                <div className="flex justify-between border-b border-white/10 pb-3">
                                    <span className="text-cream/50">Investment</span>
                                    <span className="text-cream font-bold">₹50-70 Lakhs</span>
                                </div>
                                <div className="flex justify-between border-b border-white/10 pb-3">
                                    <span className="text-cream/50">Space</span>
                                    <span className="text-cream font-bold">1.5k-2k sq ft</span>
                                </div>
                                <div className="flex justify-between border-b border-white/10 pb-3">
                                    <span className="text-cream/50">Focus</span>
                                    <span className="text-fire font-bold">Catering + Events</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-cream/50">Break-even</span>
                                    <span className="text-cream font-bold">24-30 Months</span>
                                </div>
                            </div>

                            <div className="mt-auto space-y-4">
                                <h4 className="text-[10px] uppercase font-bold text-cream/40 tracking-[0.2em] mb-2">Premium Inclusions</h4>
                                <ul className="grid grid-cols-1 gap-3">
                                    {['Texas-themed Interiors', 'Live Visible Smokers', 'Full Bar Licensing Support', 'Events & Music Ops'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-xs md:text-sm text-cream/90">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cream outline outline-4 outline-cream/10 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Model C */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-white/5 rounded-[2.5rem] border border-white/5 p-8 md:p-10 flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Award size={80} />
                            </div>
                            <span className="text-fire font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] mb-4 block">Model C</span>
                            <h3 className="text-3xl md:text-4xl font-display italic text-cream mb-4 leading-none">Master Franchise</h3>
                            <p className="text-xs md:text-sm text-gray-400 mb-8 font-medium">For Strategic Area Developers</p>

                            <div className="space-y-4 mb-10 text-xs md:text-sm">
                                <div className="flex justify-between border-b border-white/5 pb-3">
                                    <span className="text-gray-400">Territory</span>
                                    <span className="text-cream font-bold">Entire City</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-3">
                                    <span className="text-gray-400">Scale</span>
                                    <span className="text-cream font-bold text-right">5 Units / 3 Yrs</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-3">
                                    <span className="text-gray-400">Revenue</span>
                                    <span className="text-fire font-bold">Fees + Royalties</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Min Net Worth</span>
                                    <span className="text-cream font-bold">₹5 Crore+</span>
                                </div>
                            </div>

                            <div className="mt-auto p-6 bg-fire/5 rounded-2xl border border-fire/10">
                                <p className="text-[10px] md:text-xs text-gray-300 italic leading-relaxed">"Ideal for multi-unit operators or real estate developers looking for an exclusive portfolio anchor."</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: WHAT YOU RECEIVE */}
            <section className="py-24 bg-black/40">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-fire font-bold uppercase tracking-widest text-xs mb-4 block">Full Ecosystem</span>
                        <h2 className="text-4xl md:text-6xl font-display italic text-cream mb-6">Our Support System</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-16 mb-24">
                        <div className="bg-white/5 p-12 rounded-[3.5rem] border border-white/10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                                <Rocket size={100} />
                            </div>
                            <h3 className="text-2xl font-display italic text-fire mb-8">Pre-Opening Blitz</h3>
                            <div className="space-y-8">
                                {[
                                    { phase: 'Site Selection', s: 'Territory analysis & lease negotiation', t: 'Wks 1-2' },
                                    { phase: 'Kitchen Design', s: 'Equipment & ventilation blueprints', t: 'Wks 3-4' },
                                    { phase: 'Training', s: 'HQ Residency + On-site drills', t: 'Wks 5-10' },
                                    { phase: 'Launch', s: 'Influencer event & PR coverage', t: 'Wks 13-14' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="text-sm font-bold text-cream bg-white/10 w-16 h-8 flex items-center justify-center rounded-lg border border-white/5 shrink-0 uppercase tracking-tighter">{item.t}</div>
                                        <div>
                                            <h4 className="font-bold text-cream mb-1">{item.phase}</h4>
                                            <p className="text-xs text-gray-500">{item.s}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-fire/5 p-12 rounded-[3.5rem] border border-fire/10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                                <TrendingUp size={100} />
                            </div>
                            <h3 className="text-2xl font-display italic text-fire mb-8">Ongoing Growth</h3>
                            <div className="space-y-8">
                                {[
                                    { f: 'Monthly', a: 'Operations', d: 'Quality audits & performance coaching' },
                                    { f: 'Continuous', a: 'Marketing', d: 'National campaigns & local toolkit' },
                                    { f: 'Weekly', a: 'Supply Chain', d: 'Bulk pricing & proprietary blends' },
                                    { f: 'Quarterly', a: 'Innovation', d: 'New recipe development & seasonal specials' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="text-[10px] font-bold text-fire bg-fire/10 w-20 h-8 flex items-center justify-center rounded-lg border border-fire/20 shrink-0 uppercase tracking-widest">{item.f}</div>
                                        <div>
                                            <h4 className="font-bold text-cream mb-1">{item.a}</h4>
                                            <p className="text-xs text-gray-500">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 p-12 rounded-[4rem] border border-white/5">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h3 className="text-4xl font-display italic text-cream mb-6">The 6-Week Pitmaster Residency</h3>
                                <p className="text-gray-400 mb-8 font-medium">We don't just teach you to cook; we teach you the science of smoke and the art of business.</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
                                        <h4 className="text-fire font-bold text-xs uppercase tracking-widest mb-2">Weeks 1-2</h4>
                                        <p className="text-xs leading-relaxed">Smoke theory, hand-on 14-hour protocols, and FSSAI mastery.</p>
                                    </div>
                                    <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
                                        <h4 className="text-fire font-bold text-xs uppercase tracking-widest mb-2">Weeks 3-4</h4>
                                        <p className="text-xs leading-relaxed">Business ops, cost control, inventory & tech stack training.</p>
                                    </div>
                                    <div className="p-6 bg-black/40 rounded-3xl border border-white/5 col-span-2">
                                        <h4 className="text-fire font-bold text-xs uppercase tracking-widest mb-2">Weeks 5-6 (On-Site)</h4>
                                        <p className="text-xs leading-relaxed">Staff hiring, live service observation, soft launch feedback loops and grand opening blitz.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative rounded-[3rem] overflow-hidden group shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800&q=80"
                                    alt="Training BBQ"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent flex items-end p-8">
                                    <p className="text-cream text-sm italic font-medium">"Our training program is designed to turn enthusiasts into efficient operators, regardless of F&B background."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: FINANCIALS */}
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-display italic text-cream text-center mb-16 md:mb-24 leading-tight">Setting Expectations: <br /> <span className="text-fire">The Financial Roadmap</span></h2>

                    <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-start max-w-6xl mx-auto">
                        <div className="bg-white/5 p-8 md:p-12 rounded-[3rem] border border-white/5 shadow-2xl">
                            <h3 className="text-xl md:text-2xl font-display italic text-fire mb-8">Cloud Kitchen Breakdown</h3>
                            <div className="space-y-5 md:space-y-6 text-xs md:text-sm">
                                {[
                                    { label: 'Franchise Fee', val: '₹8,00,000', note: '5-year license, renewable' },
                                    { label: 'Kitchen Equipment', val: '₹10,00,000', note: 'Smokers, cold storage, prep' },
                                    { label: 'Security Deposit', val: '₹1,20,000', note: '6 months rent avg.' },
                                    { label: 'Initial Inventory', val: '₹2,50,000', note: '2-week opening stock' },
                                    { label: 'Working Capital', val: '₹3,00,000', note: '3-month operational buffer' },
                                    { label: 'Marketing Launch', val: '₹1,50,000', note: 'Local + digital blitz' }
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-start border-b border-white/5 pb-4 md:pb-5">
                                        <div>
                                            <p className="font-bold text-cream mb-1">{item.label}</p>
                                            <p className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest leading-none">{item.note}</p>
                                        </div>
                                        <span className="text-cream font-mono font-bold">{item.val}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between pt-6 md:pt-8">
                                    <span className="text-lg md:text-xl font-display italic text-fire">Total Estimated</span>
                                    <span className="text-xl md:text-2xl font-display italic text-cream">₹26,20,000</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8 md:space-y-12">
                            <div className="bg-fire/10 p-8 md:p-12 rounded-[3rem] border border-fire/20 shadow-2xl">
                                <h3 className="text-xl md:text-2xl font-display italic text-cream mb-8">Revenue Projections</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-[10px] md:text-xs">
                                        <thead>
                                            <tr className="border-b border-white/10 text-cream/50 uppercase tracking-widest text-[8px] md:text-[9px]">
                                                <th className="py-4 text-left">Year</th>
                                                <th className="py-4 text-center px-2">Annual Rev</th>
                                                <th className="py-4 text-center px-2">Net Profit</th>
                                                <th className="py-4 text-right">Cumulative ROI</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                { y: 'Y1', r: '₹30L', p: '₹3L', roi: '11%' },
                                                { y: 'Y2', r: '₹60L', p: '₹9L', roi: '46%' },
                                                { y: 'Y3', r: '₹96L', p: '₹19L', roi: '119%' }
                                            ].map((row, i) => (
                                                <tr key={i} className="border-b border-white/5 group bg-transparent hover:bg-white/[0.02] transition-colors">
                                                    <td className="py-5 md:py-6 font-bold text-fire italic text-xs md:text-sm">{row.y}</td>
                                                    <td className="py-5 md:py-6 text-center text-cream font-medium">{row.r}</td>
                                                    <td className="py-5 md:py-6 text-center text-green-400 font-bold">{row.p}</td>
                                                    <td className="py-5 md:py-6 text-right text-cream font-mono">{row.roi}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <p className="mt-6 text-[9px] md:text-[10px] text-gray-500 italic leading-relaxed text-center opacity-60">*Projections based on 60% gross margin and scaling optimization. Results vary.</p>
                            </div>

                            <div className="bg-black/30 p-8 md:p-12 rounded-[3rem] border border-white/5 shadow-xl">
                                <h3 className="text-lg md:text-xl font-bold text-cream mb-8 italic text-center lg:text-left">Recurring Fees</h3>
                                <div className="grid grid-cols-2 gap-x-8 md:gap-x-12 gap-y-8">
                                    <div>
                                        <span className="text-2xl md:text-3xl font-display font-bold text-fire">6%</span>
                                        <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-500 font-bold mt-1">Monthly Royalty</p>
                                    </div>
                                    <div>
                                        <span className="text-2xl md:text-3xl font-display font-bold text-fire">2%</span>
                                        <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-500 font-bold mt-1">Marketing Fund</p>
                                    </div>
                                    <div className="col-span-2 pt-6 border-t border-white/5">
                                        <span className="text-lg md:text-xl font-bold text-cream italic">₹5,000</span>
                                        <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-500 font-bold mt-1">Monthly Technology & Support Fee</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: IDEAL FRANCHISEE */}
            <section className="py-24 bg-white/5">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display italic text-cream mb-4">Who are we looking for?</h2>
                        <p className="text-gray-400 tracking-widest uppercase text-xs font-bold">The personas that thrive in our system</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto mb-20">
                        <div className="p-10 bg-black/40 rounded-[3rem] border border-white/5 hover:border-fire/30 transition-colors">
                            <h3 className="text-2xl font-display italic text-fire mb-6 flex items-center gap-3">
                                <User size={24} /> The Operator
                            </h3>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li className="flex gap-3"><span className="text-fire">✔</span> Age: 28-45, Full-time commitment</li>
                                <li className="flex gap-3"><span className="text-fire">✔</span> Skills: Operations & team leadership</li>
                                <li className="flex gap-3"><span className="text-fire">✔</span> Mindset: Quality obsession & hustle</li>
                                <li className="flex gap-3 font-bold text-cream">Ideal for Cloud Kitchens</li>
                            </ul>
                        </div>
                        <div className="p-10 bg-black/40 rounded-[3rem] border border-white/5 hover:border-fire/30 transition-colors">
                            <h3 className="text-2xl font-display italic text-fire mb-6 flex items-center gap-3">
                                <TrendingUp size={24} /> The Investor
                            </h3>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li className="flex gap-3"><span className="text-fire">✔</span> Age: 35-55, Portfolio balancer</li>
                                <li className="flex gap-3"><span className="text-fire">✔</span> Liquid Capital: ₹50-75L</li>
                                <li className="flex gap-3"><span className="text-fire">✔</span> Skills: Networth leverage & ownership</li>
                                <li className="flex gap-3 font-bold text-cream">Ideal for Dine-In or FOCO Model</li>
                            </ul>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        <div className="bg-green-500/5 p-10 rounded-[3rem] border border-green-500/10">
                            <h4 className="text-green-500 font-bold uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
                                <CheckCircle2 size={16} /> Green Flags
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {['Failed & Learned Previously', 'Active on Social Media', 'Cooking Enthusiast', 'Long-term (5yr) Mindset'].map((item, i) => (
                                    <div key={i} className="p-4 bg-white/5 rounded-2xl flex items-center gap-3 text-xs text-green-200/50">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-red-500/5 p-10 rounded-[3rem] border border-red-500/10">
                            <h4 className="text-red-400 font-bold uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
                                <XCircle size={16} /> Red Flags
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {['Expects Fully Passive ROI', 'Multiple Biz Distractions', 'Insufficient Backup Capital', '"I Know Better" Attitude'].map((item, i) => (
                                    <div key={i} className="p-4 bg-white/5 rounded-2xl flex items-center gap-3 text-xs text-red-200/50">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 6: AVAILABLE TERRITORIES */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-fire/5 blur-[200px] rounded-full" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display italic text-cream mb-4">Phase 1: Now Open</h2>
                        <p className="text-gray-400 tracking-widest uppercase text-[10px] font-bold">Limited slots per city to ensure unit profitability</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {[
                            { city: 'Hyderabad', p: '10M', pop: 'High Potential', slots: '2 Slots Left', desc: 'Tech hub, strong meat culture' },
                            { city: 'Chennai', p: '11M', pop: 'High Potential', slots: '2 Slots Left', desc: 'Coastal, meat-loving market' },
                            { city: 'Coimbatore', p: '2.8M', pop: 'Medium Potential', slots: '1 Slot Left', desc: 'Industrial, low competition' },
                            { city: 'Kochi', p: '2.1M', pop: 'Medium Potential', slots: '1 Slot Left', desc: 'Tourism & seafood integration' }
                        ].map((item, i) => (
                            <div key={i} className="p-8 bg-black/40 rounded-[2.5rem] border border-white/5 flex flex-col items-center text-center group hover:bg-fire transition-all duration-500 hover:-translate-y-2">
                                <h4 className="text-2xl font-display text-cream italic mb-2 group-hover:text-white">{item.city}</h4>
                                <div className="text-[10px] font-bold text-fire uppercase tracking-widest mb-4 group-hover:text-cream/80">{item.pop}</div>
                                <p className="text-xs text-gray-500 mb-6 group-hover:text-white/70">{item.desc}</p>
                                <div className="mt-auto px-4 py-2 bg-fire/10 rounded-full border border-fire/20 text-fire text-[10px] font-black uppercase tracking-widest group-hover:bg-white group-hover:text-fire transition-colors">
                                    {item.slots}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 text-center text-[10px] text-gray-600 uppercase tracking-[0.5em] font-bold italic">
                        Phase 2 (2027): Mumbai • Pune • Delhi NCR • Chandigarh • Jaipur
                    </div>
                </div>
            </section>

            {/* SECTION 7: APPLICATION PROCESS */}
            <section className="py-24 bg-black/40">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-display italic text-cream text-center mb-20 leading-tight">Step-by-Step <br /> <span className="text-fire">To Grand Opening</span></h2>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute top-0 bottom-0 left-[20px] md:left-1/2 w-px bg-white/10" />

                        <div className="space-y-12 relative z-10">
                            {[
                                { step: 1, title: 'Inquiry', time: 'Day 1', desc: 'Submit the application form below.' },
                                { step: 2, title: 'Screening', time: 'Day 3', desc: '30-minute discovery call with our team.' },
                                { step: 3, title: 'Discovery Day', time: 'Day 14', desc: 'Visit HQ, taste the product, meet the pitmasters.' },
                                { step: 4, title: 'Approval', time: 'Day 30', desc: 'Background checks and financial verification.' },
                                { step: 5, title: 'Site Selection', time: 'Wks 6-8', desc: 'Territory mapping and lease negotiation.' },
                                { step: 6, title: 'Launch', time: 'Week 16', desc: 'Grand opening with full marketing support.' }
                            ].map((item, i) => (
                                <div key={i} className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="w-full md:w-1/2 flex flex-col md:px-12 text-left md:text-right group">
                                        {i % 2 !== 0 ? (
                                            <div className="text-left">
                                                <h4 className="text-lg font-bold text-cream mb-1">{item.title}</h4>
                                                <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
                                            </div>
                                        ) : (
                                            <div className="md:text-right">
                                                <h4 className="text-lg font-bold text-cream mb-1">{item.title}</h4>
                                                <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-fire text-white flex items-center justify-center font-bold text-sm border-4 border-charcoal shadow-lg shadow-fire/40 shrink-0">
                                        {item.step}
                                    </div>
                                    <div className="w-full md:w-1/2 flex md:px-12 text-left">
                                        <span className="text-xs font-bold text-fire uppercase tracking-widest">{item.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 8: FAQ */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-display italic text-fire text-center mb-16 underline decoration-white/5 underline-offset-[2rem]">Common Questions</h2>

                    <div className="space-y-4">
                        {[
                            { q: 'Do I need F&B experience?', a: 'Not required for Cloud Kitchen (we train you). Preferred for Dine-In. Business operations experience is essential.' },
                            { q: 'Can I own multiple territories?', a: 'Yes, after successful operation of your first unit for 12 months.' },
                            { q: 'Can I customize the menu?', a: 'The core menu is mandatory. Regional adaptations (Ghee Roast, Chettinad) are encouraged with corporate approval.' },
                            { q: 'Do you provide financing?', a: 'We don\'t provide direct financing, but we can introduce you to lenders familiar with our revenue-ready model.' },
                            { q: 'What if I want to sell my franchise?', a: 'We have right of first refusal. There is a transfer fee of 5% of the sale price.' },
                            { q: 'How long is the franchise agreement?', a: 'Initial term is 5 years, renewable for additional 5-year buckets.' }
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                                <button
                                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                    className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors">
                                    <span className="font-bold text-cream pr-4">{item.q}</span>
                                    <ChevronDown size={20} className={`text-fire transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {activeFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden">
                                            <div className="p-6 pt-0 text-sm text-gray-400 leading-relaxed">
                                                {item.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 10: CALL TO ACTION + FORM */}
            <section id="franchise-form" className="py-20 md:py-32 bg-charcoal relative">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 max-w-6xl mx-auto items-start">
                        <div className="lg:w-5/12">
                            <h2 className="text-4xl md:text-6xl font-display italic text-fire mb-8 leading-[1.1]">Ready to bring <br className="hidden md:block" /> the smoke to <br className="hidden md:block" /> your city?</h2>
                            <p className="text-lg md:text-xl text-gray-400 mb-12 leading-relaxed">Join 15 years of heritage. Build something that lasts.</p>

                            <div className="space-y-6 mb-12">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-fire group-hover:bg-fire group-hover:text-white transition-all shadow-xl shrink-0">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h5 className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-1">Email Inquiry</h5>
                                        <p className="text-cream font-bold group-hover:text-fire transition-colors text-sm md:text-base">franchise@smokesignalbbq.in</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group border-t border-white/5 pt-6">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-fire group-hover:bg-fire group-hover:text-white transition-all shadow-xl shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h5 className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-1">Business Line</h5>
                                        <p className="text-cream font-bold group-hover:text-fire transition-colors text-sm md:text-base">+91 97415 54063</p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all font-bold uppercase tracking-widest text-[10px] md:text-xs">
                                <span>Get Franchise Kit (PDF)</span>
                                <Download size={20} className="text-fire" />
                            </button>
                        </div>

                        <div className="lg:w-7/12 w-full relative">
                            <AnimatePresence mode="wait">
                                {!formSubmitted ? (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.05 }}
                                        className="bg-black/40 p-8 md:p-12 rounded-[3rem] border border-white/5 shadow-3xl text-xs md:text-sm"
                                        onSubmit={handleSubmit}>
                                        <h3 className="text-xl md:text-2xl font-display text-cream italic mb-8 border-b border-white/10 pb-6 text-center lg:text-left">Franchise Application</h3>

                                        <div className="space-y-8">
                                            {/* Section 1 */}
                                            <div className="space-y-5 md:space-y-6">
                                                <p className="text-[10px] text-fire uppercase tracking-widest font-bold mb-4">1. Basic Information</p>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Full Name"
                                                    required
                                                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-fire outline-none transition-all placeholder:text-gray-600"
                                                />
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        placeholder="Email"
                                                        required
                                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-fire outline-none transition-all placeholder:text-gray-600"
                                                    />
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        placeholder="Phone / WhatsApp"
                                                        required
                                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-fire outline-none transition-all placeholder:text-gray-600"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                                    <div className="relative">
                                                        <select
                                                            name="city"
                                                            value={formData.city}
                                                            onChange={handleInputChange}
                                                            className="w-full px-6 py-4 bg-white/10 border border-white/10 rounded-2xl focus:border-fire outline-none transition-all appearance-none cursor-pointer text-gray-300">
                                                            <option disabled className="bg-charcoal text-gray-600">City of Interest</option>
                                                            <option className="bg-charcoal">Hyderabad</option>
                                                            <option className="bg-charcoal">Chennai</option>
                                                            <option className="bg-charcoal">Coimbatore</option>
                                                            <option className="bg-charcoal">Kochi</option>
                                                            <option className="bg-charcoal">Other</option>
                                                        </select>
                                                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                                                    </div>
                                                    <div className="relative">
                                                        <select
                                                            name="preferredModel"
                                                            value={formData.preferredModel}
                                                            onChange={handleInputChange}
                                                            className="w-full px-6 py-4 bg-white/10 border border-white/10 rounded-2xl focus:border-fire outline-none transition-all appearance-none cursor-pointer text-gray-300">
                                                            <option disabled className="bg-charcoal text-gray-600">Preferred Model</option>
                                                            <option className="bg-charcoal">Cloud Kitchen</option>
                                                            <option className="bg-charcoal">Dine-In</option>
                                                            <option className="bg-charcoal">Master Franchise</option>
                                                        </select>
                                                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Section 2 */}
                                            <div className="space-y-5 md:space-y-6 pt-4 border-t border-white/5">
                                                <p className="text-[10px] text-fire uppercase tracking-widest font-bold mb-4">2. Financial Capacity</p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                                    <div className="relative">
                                                        <select
                                                            name="investmentRange"
                                                            value={formData.investmentRange}
                                                            onChange={handleInputChange}
                                                            className="w-full px-6 py-4 bg-white/10 border border-white/10 rounded-2xl focus:border-fire outline-none transition-all appearance-none cursor-pointer text-gray-300">
                                                            <option disabled className="bg-charcoal text-gray-600">Investment Cap</option>
                                                            <option className="bg-charcoal">₹15-25L</option>
                                                            <option className="bg-charcoal">₹25-35L</option>
                                                            <option className="bg-charcoal">₹35-50L</option>
                                                            <option className="bg-charcoal">₹50L+</option>
                                                        </select>
                                                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                                                    </div>
                                                    <div className="relative">
                                                        <select
                                                            name="netWorth"
                                                            value={formData.netWorth}
                                                            onChange={handleInputChange}
                                                            className="w-full px-6 py-4 bg-white/10 border border-white/10 rounded-2xl focus:border-fire outline-none transition-all appearance-none cursor-pointer text-gray-300">
                                                            <option disabled className="bg-charcoal text-gray-600">My Net Worth</option>
                                                            <option className="bg-charcoal">₹50L-1Cr</option>
                                                            <option className="bg-charcoal">₹1-2Cr</option>
                                                            <option className="bg-charcoal">₹2-5Cr</option>
                                                            <option className="bg-charcoal">₹5Cr+</option>
                                                        </select>
                                                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Section 3 */}
                                            <div className="space-y-5 md:space-y-6 pt-4 border-t border-white/5">
                                                <p className="text-[10px] text-fire uppercase tracking-widest font-bold mb-4">3. Experience & Intent</p>
                                                <textarea
                                                    name="experience"
                                                    value={formData.experience}
                                                    onChange={handleInputChange}
                                                    placeholder="Tell us about your Business / F&B Experience"
                                                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-3xl focus:border-fire outline-none transition-all h-32 placeholder:text-gray-600"
                                                />
                                                <div className="flex items-start gap-4 p-2">
                                                    <input type="checkbox" required id="form-ack" className="accent-fire rounded mt-1 cursor-pointer" />
                                                    <label htmlFor="form-ack" className="text-[10px] md:text-[11px] text-gray-500 leading-relaxed cursor-pointer">
                                                        I acknowledge this is a formal inquiry and my information will be kept confidential for review.
                                                    </label>
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full py-6 md:py-8 bg-fire text-white rounded-3xl font-black uppercase tracking-widest hover:bg-fire-dark transition-all transform hover:scale-[1.01] shadow-2xl shadow-fire/30 text-xs md:text-sm flex items-center justify-center gap-4 disabled:opacity-70">
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="animate-spin" size={20} /> Submitting Application...
                                                    </>
                                                ) : (
                                                    'Submit Comprehensive Application'
                                                )}
                                            </button>
                                        </div>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-black/40 p-12 py-32 rounded-[3.5rem] border border-green-500/20 shadow-3xl text-center">
                                        <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                                            <CheckCircle2 size={48} />
                                        </div>
                                        <h3 className="text-3xl font-display italic text-cream mb-4">Inquiry Received!</h3>
                                        <p className="text-gray-400 mb-12">Thanks for your interest. A copy of our Franchise Kit PDF has been sent to your email. Our team will review your application and call you within 48 hours.</p>
                                        <div className="flex justify-center gap-12 border-t border-white/5 pt-12">
                                            <div className="text-center">
                                                <Clock className="mx-auto mb-2 text-fire" size={20} />
                                                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Team Contact In</span>
                                                <p className="text-cream text-xs font-bold font-mono">48 Hours</p>
                                            </div>
                                            <div className="text-center">
                                                <Mail className="mx-auto mb-2 text-fire" size={20} />
                                                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Franchise Kit</span>
                                                <p className="text-cream text-xs font-bold font-mono">Sent to Inbox</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setFormSubmitted(false)}
                                            className="mt-12 text-xs font-bold text-gray-500 underline hover:text-fire transition-colors">
                                            Edit Application
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
