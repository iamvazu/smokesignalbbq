import React from 'react';
import { motion } from 'framer-motion';
import { Seo } from '../seo/Seo';
import {
    CheckCircle2,
    Truck,
    Flame,
    ShoppingBag,
    Play,
    Clock,
    ShieldCheck,
    MapPin,
    ArrowRight,
    Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HowItWorksPage: React.FC = () => {
    const navigate = useNavigate();

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Order and Enjoy Texas BBQ at Home in Bangalore",
        "description": "Four-step process to order 14-hour smoked brisket from Smoke Signal BBQ: order online, we smoke over charcoal, vacuum-seal delivery, heat in 5 minutes.",
        "image": "https://smokesignalbbq.in/images/process-hero.jpg",
        "totalTime": "PT4H",
        "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": "INR",
            "value": "2000-3000"
        },
        "supply": [
            { "@type": "HowToSupply", "name": "Internet connection" },
            { "@type": "HowToSupply", "name": "Pot of boiling water or microwave" }
        ],
        "tool": [
            { "@type": "HowToTool", "name": "Kitchen stove or microwave" },
            { "@type": "HowToTool", "name": "Tongs (optional)" }
        ],
        "step": [
            {
                "@type": "HowToStep",
                "position": 1,
                "name": "Choose Your Smoked Meats Online",
                "text": "Browse menu at smokesignalbbq.in, select brisket, pork, ribs, or combos. Order before 4 PM for same-day delivery.",
                "url": "https://smokesignalbbq.in/how-it-works#step1"
            },
            {
                "@type": "HowToStep",
                "position": 2,
                "name": "We Smoke Your Meat Fresh Over Charcoal",
                "text": "Pitmasters smoke your order for 12-14 hours over hardwood charcoal. Brisket gets 14 hours, pork gets 12 hours, ribs get 6 hours.",
                "url": "https://smokesignalbbq.in/how-it-works#step2"
            },
            {
                "@type": "HowToStep",
                "position": 3,
                "name": "Vacuum Sealed and Delivered Fresh",
                "text": "Hot-packed in vacuum bags, delivered chilled in insulated bags within 2-4 hours across 15+ Bangalore areas.",
                "url": "https://smokesignalbbq.in/how-it-works#step3"
            },
            {
                "@type": "HowToStep",
                "position": 4,
                "name": "Heat for 5 Minutes and Serve",
                "text": "Boil in bag for 5 minutes or microwave for 3-4 minutes. Serve immediately with sauces and sides.",
                "url": "https://smokesignalbbq.in/how-it-works#step4"
            }
        ]
    };

    return (
        <div className="min-h-screen bg-charcoal text-cream pb-24">
            <Seo
                title="How Smoke Signal BBQ Works: Order, Delivery & Heating Guide | Texas BBQ Bangalore"
                description="Discover how Bangalore's original Texas BBQ works. Order online, get fresh vacuum-sealed delivery, and enjoy 14-hour smoked brisket at home in 5 minutes."
                keywords={['how BBQ works', 'BBQ delivery Bangalore', 'reheating brisket', 'Texas BBQ process']}
                schema={howToSchema}
            />

            {/* Hero Section */}
            <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden mb-24">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/combo6.png"
                        alt="BBQ Feast Background"
                        className="w-full h-full object-cover opacity-40 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/80 to-charcoal" />
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                <div className="container mx-auto px-4 relative z-10 pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-5xl mx-auto text-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex justify-center gap-3 mb-10 flex-wrap"
                        >
                            {['✓ Established 2011', '✓ 15+ Bangalore Areas', '✓ Same-Day Delivery', '✓ 5-Minute Heating'].map((badge, idx) => (
                                <span key={idx} className="bg-fire/10 backdrop-blur-md border border-fire/20 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-fire shadow-xl">
                                    {badge}
                                </span>
                            ))}
                        </motion.div>

                        <h1 className="text-6xl md:text-9xl font-display italic leading-[0.9] mb-10 tracking-tighter">
                            <span className="block text-cream opacity-90">From Our Pit</span>
                            <span className="block text-fire drop-shadow-[0_5px_15px_rgba(255,107,0,0.4)]">To Your Plate</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6 font-medium">
                            Enjoy authentic 14-hour Texas smoked meats at home <span className="text-white">without the wait.</span> Four simple steps: We smoke it. We seal it. We deliver it. You heat it.
                        </p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="inline-block px-8 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm"
                        >
                            <span className="text-fire font-bold text-lg md:text-xl italic">Ready in 5 minutes, not 14 hours.</span>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Decorative Scroll Indicator or Element */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">The Process</span>
                    <div className="w-px h-12 bg-gradient-to-b from-fire to-transparent" />
                </div>
            </section>

            {/* Step-by-Step Process */}
            <section className="container mx-auto px-4 mb-32 space-y-24">
                {/* Step 1 */}
                <div id="step1" className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-12 h-12 rounded-2xl bg-fire flex items-center justify-center font-display text-2xl italic">1</span>
                            <h2 className="text-3xl md:text-5xl font-display italic tracking-wide">Choose Your Smoked Meats Online</h2>
                        </div>
                        <p className="text-lg text-gray-400 leading-relaxed mb-8">
                            Browse our menu of 14-hour charcoal-smoked meats at <span className="text-cream font-bold">smokesignalbbq.in</span>. Select from brisket, pulled pork, St. Louis ribs, BBQ chicken, and our signature sauces.
                        </p>
                        <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
                            <h4 className="text-fire font-black uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                                <Star size={16} /> Popular Choices for Beginners
                            </h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-fire mt-2.5 shrink-0" />
                                    <span className="text-gray-300"><strong>The Brisket Box:</strong> 1kg smoked brisket + original sauce (serves 4)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-fire mt-2.5 shrink-0" />
                                    <span className="text-gray-300"><strong>Pork Lover's Pack:</strong> Pulled pork + ribs + spicy peri-peri sauce</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-fire mt-2.5 shrink-0" />
                                    <span className="text-gray-300"><strong>Full Texas Spread:</strong> Brisket + pork + ribs + chicken + 3 sauces</span>
                                </li>
                            </ul>
                            <div className="mt-8 pt-6 border-t border-white/5">
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
                                    <span className="text-fire">Pro Tip:</span> Order before 4 PM for same-day delivery. Minimum order ₹500. Free delivery on orders above ₹1,500.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 relative group">
                        <div className="absolute inset-0 bg-fire blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity" />
                        <img src="/menu_featured.jpg" alt="Menu Selection" className="relative z-10 rounded-[3rem] border border-white/10 shadow-2xl" />
                    </div>
                </div>

                {/* Step 2 */}
                <div id="step2" className="flex flex-col lg:flex-row-reverse items-center gap-16">
                    <div className="lg:w-1/2">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-12 h-12 rounded-2xl bg-fire flex items-center justify-center font-display text-2xl italic">2</span>
                            <h2 className="text-3xl md:text-5xl font-display italic tracking-wide">We Smoke Fresh Over Charcoal</h2>
                        </div>
                        <p className="text-lg text-gray-400 leading-relaxed mb-8">
                            Unlike other Bangalore BBQ restaurants that use gas or electric shortcuts, we smoke your meat to order using 100% hardwood charcoal. Our pitmasters start the fire at 3 AM.
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {[
                                { meat: 'Brisket', time: '14 Hours' },
                                { meat: 'Pulled Pork', time: '12 Hours' },
                                { meat: 'St. Louis Ribs', time: '6 Hours' },
                                { meat: 'BBQ Chicken', time: '4 Hours' }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">{item.meat}</p>
                                    <p className="text-xl font-display text-cream italic">{item.time}</p>
                                </div>
                            ))}
                        </div>
                        <div className="bg-fire/10 rounded-3xl p-8 border border-fire/20">
                            <h4 className="text-fire font-black uppercase tracking-widest text-sm mb-4">Why This Matters</h4>
                            <p className="text-gray-300 italic leading-relaxed">
                                Hot-packing seals in the smoke flavor and natural juices. By the time you heat it, the meat has rested perfectly—something impossible with restaurant-fresh BBQ.
                            </p>
                        </div>
                    </div>
                    <div className="lg:w-1/2 relative">
                        <img src="/pitmaster_work.jpg" alt="Smoking Process" className="rounded-[3rem] border border-white/10 shadow-2xl" />
                        <div className="absolute -bottom-8 -right-8 bg-charcoal p-8 rounded-[2rem] border border-white/10 shadow-2xl hidden md:block">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-400">
                                    <Clock size={16} className="text-fire" /> 3 AM: Fire Started
                                </div>
                                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-400">
                                    <Clock size={16} className="text-fire" /> 5 AM: Meat Goes On
                                </div>
                                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-cream">
                                    <Clock size={16} className="text-green-500 animate-pulse" /> Final Resting...
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 3 */}
                <div id="step3" className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-12 h-12 rounded-2xl bg-fire flex items-center justify-center font-display text-2xl italic">3</span>
                            <h2 className="text-3xl md:text-5xl font-display italic tracking-wide">Vacuum Sealed & Delivered</h2>
                        </div>
                        <p className="text-lg text-gray-400 leading-relaxed mb-8">
                            Immediately after smoking, we vacuum-seal your meat while still hot to lock in pit-fresh flavor. Delivered chilled across 15+ Bangalore areas within 2-4 hours.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-8">
                            {['Indiranagar', 'Koramangala', 'HSR Layout', 'Whitefield', 'Kammanahalli', 'MG Road', 'Marathahalli', 'Jayanagar'].map(area => (
                                <span key={area} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                    {area}
                                </span>
                            ))}
                            <span className="px-3 py-1.5 bg-fire/10 border border-fire/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-fire">+ 5 More</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <h4 className="text-cream font-bold mb-3 flex items-center gap-2">
                                    <ShieldCheck size={16} className="text-green-500" /> Tactical Packaging
                                </h4>
                                <ul className="text-xs text-gray-500 space-y-2 uppercase tracking-widest">
                                    <li>✓ Food-grade sealing</li>
                                    <li>✓ Insulated thermal bags</li>
                                    <li>✓ Eco-friendly materials</li>
                                </ul>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <h4 className="text-cream font-bold mb-3 flex items-center gap-2">
                                    <Truck size={16} className="text-fire" /> Delivery Options
                                </h4>
                                <ul className="text-xs text-gray-500 space-y-2 uppercase tracking-widest">
                                    <li>✓ Same-Day (Before 4PM)</li>
                                    <li>✓ Scheduled Slots</li>
                                    <li>✓ Express (2-Hour)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        <img src="/events_bg.jpg" alt="Tactical Delivery" className="rounded-[3rem] border border-white/10 shadow-2xl opacity-80" />
                    </div>
                </div>

                {/* Step 4 */}
                <div id="step4" className="flex flex-col lg:flex-row-reverse items-center gap-16">
                    <div className="lg:w-1/2">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-12 h-12 rounded-2xl bg-fire flex items-center justify-center font-display text-2xl italic">4</span>
                            <h2 className="text-3xl md:text-5xl font-display italic tracking-wide">Heat for 5 Mins & Serve</h2>
                        </div>
                        <p className="text-lg text-gray-400 leading-relaxed mb-8">
                            Your BBQ arrives ready to heat—no preparation, no cleanup, no 14-hour wait. The meat tastes exactly as it did when pulled from our smoker.
                        </p>

                        <div className="space-y-4 mb-10">
                            <div className="p-6 bg-fire rounded-3xl border border-fire shadow-2xl shadow-fire/20">
                                <h5 className="font-display text-xl text-white italic mb-2">Recommended: Boil-in-Bag</h5>
                                <p className="text-white/80 text-sm mb-4">Submerge bag in boiling water for 5 mins. Retains 95% moisture.</p>
                                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white">
                                    <span className="flex items-center gap-1"><CheckCircle2 size={14} /> Fastest</span>
                                    <span className="flex items-center gap-1"><CheckCircle2 size={14} /> Juiciest</span>
                                    <span className="flex items-center gap-1"><CheckCircle2 size={14} /> Traditional</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                                    <h5 className="font-display text-lg text-cream italic mb-1">Oven</h5>
                                    <p className="text-xs text-gray-500 leading-relaxed">150°C for 20 mins. Best for large quantities.</p>
                                </div>
                                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                                    <h5 className="font-display text-lg text-cream italic mb-1">Microwave</h5>
                                    <p className="text-xs text-gray-500 leading-relaxed">70% power for 4 mins. Quickest alternative.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-charcoal p-8 rounded-3xl border-2 border-dashed border-fire/30">
                            <h4 className="text-fire font-black uppercase tracking-widest text-xs mb-4">Pitmaster Serving Suggestion</h4>
                            <p className="text-gray-400 italic">"Serve sliced brisket with simple white bread, pickles, and raw onions. Let the smoke speak for itself."</p>
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        <img src="/Combo pack 1.png" alt="Finished Meal" className="rounded-[3rem] border border-white/10 shadow-2xl" />
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="bg-black/40 py-24 mb-32">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-display italic text-cream mb-4">Ready-to-Heat vs. Restaurant</h2>
                        <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-sm italic">Why smart BBQ lovers choose Smoke Signal</p>
                    </div>

                    <div className="max-w-5xl mx-auto overflow-hidden rounded-[3rem] border border-white/10 bg-charcoal/50 backdrop-blur-xl shadow-3xl">
                        <div className="grid grid-cols-3 bg-white/5 border-b border-white/10">
                            <div className="p-8 font-black uppercase tracking-widest text-[10px] text-gray-500 border-r border-white/10">Factor</div>
                            <div className="p-8 font-black uppercase tracking-widest text-[10px] text-fire border-r border-white/10">Smoke Signal Ready-to-Heat</div>
                            <div className="p-8 font-black uppercase tracking-widest text-[10px] text-gray-500">Traditional Restaurant</div>
                        </div>
                        {[
                            { f: 'Time Investment', s: '5 Minutes Heating', r: '1-2 Hours (Travel + Dining)', win: true },
                            { f: 'Meat Quality', s: 'Rested 24 Hours (More Tender)', r: 'Served Immediately (Tougher)', win: true },
                            { f: 'Convenience', s: 'Eat in Pajamas/At Home', r: 'Traffic, Parking, Dressing Up', win: true },
                            { f: 'Leftovers', s: 'Vacuum Sealed (Lasts 10 Days)', r: 'Dry Out Quickly', win: true },
                            { f: 'Authenticity', s: '14-Hour Charcoal Smoking', r: 'Often Gas/Pressure Cooked', win: false }
                        ].map((row, idx) => (
                            <div key={idx} className="grid grid-cols-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                                <div className="p-8 text-sm font-bold text-gray-400 border-r border-white/5">{row.f}</div>
                                <div className={`p-8 text-sm ${row.win ? 'text-cream font-bold' : 'text-cream'} border-r border-white/5 flex items-center gap-2`}>
                                    {row.win && <CheckCircle2 size={16} className="text-green-500 shrink-0" />} {row.s}
                                </div>
                                <div className="p-8 text-sm text-gray-500">{row.r}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 max-w-3xl mx-auto">
                        <blockquote className="text-center">
                            <p className="text-2xl md:text-3xl text-cream italic leading-relaxed mb-6">
                                "I lived in Texas for 10 years. This is the only Bangalore BBQ that tastes like home. The format means I can have authentic brisket on Tuesday night without planning."
                            </p>
                            <cite className="text-fire font-black uppercase tracking-[0.3em] text-xs">— Rahul M., Koramangala</cite>
                        </blockquote>
                    </div>
                </div>
            </section>

            {/* Video Placeholder */}
            <section className="container mx-auto px-4 mb-32 text-center">
                <h2 className="text-4xl md:text-6xl font-display italic text-cream mb-6">See the Process in Action</h2>
                <p className="text-gray-400 mb-12 max-w-2xl mx-auto">Watch how we transform raw brisket into fall-apart tender Texas BBQ—and how you can enjoy it at home in 5 minutes.</p>

                <div className="max-w-5xl mx-auto relative group rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl aspect-video bg-black flex items-center justify-center">
                    <img src="/events_bg.jpg" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" alt="Process Video" />
                    <button className="relative z-10 w-24 h-24 bg-fire text-white rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all">
                        <Play size={40} className="ml-2" />
                    </button>
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent opacity-60" />
                    <div className="absolute bottom-12 left-12 text-left">
                        <p className="text-xs font-black uppercase tracking-[0.4em] text-fire mb-2">Documentary</p>
                        <h4 className="text-3xl font-display italic text-cream">From 3 AM Fire to Your Dinner Table</h4>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="container mx-auto px-4">
                <div className="bg-fire rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-7xl font-display italic text-white mb-6">Ready to Taste Perfection?</h2>
                        <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                            Join 50,000+ Bangalore BBQ lovers. First-time customers get <span className="text-white font-bold underline">10% off</span> with code <span className="bg-white/20 px-3 py-1 rounded-lg">FIRSTSMOKE</span>.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button
                                onClick={() => navigate('/shop')}
                                className="px-12 py-5 bg-white text-fire rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl"
                            >
                                Order BBQ Now
                            </button>
                            <button
                                onClick={() => navigate('/shop?category=combos')}
                                className="px-12 py-5 bg-black/20 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-black/30 transition-all border border-white/30"
                            >
                                View Pitmaster Combos
                            </button>
                        </div>
                        <div className="mt-12 flex flex-wrap justify-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                            <span>✓ Same-day delivery</span>
                            <span>✓ Halal certified</span>
                            <span>✓ Antibiotic-free</span>
                            <span>✓ 100% Charcoal Smoked</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorksPage;
export { HowItWorksPage };
