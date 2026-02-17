import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Seo } from '../seo/Seo';
import { generateFAQSchema, generateBreadcrumbSchema } from '../seo/SchemaGenerator';
import { generatePSeoPages, PSeoPage as PSeoPageType } from '../seo/pSeoData';
import { Flame, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';

export const PSeoPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [pageData, setPageData] = useState<PSeoPageType | null>(null);

    useEffect(() => {
        const allPages = generatePSeoPages();
        const found = allPages.find(p => p.slug === slug);
        if (found) {
            setPageData(found);
            window.scrollTo(0, 0);
        } else {
            navigate('/shop');
        }
    }, [slug, navigate]);

    if (!pageData) return null;

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            generateBreadcrumbSchema([
                { name: "Home", item: "/" },
                { name: pageData.location, item: `/${pageData.slug}` }
            ]),
            generateFAQSchema(pageData.faqs)
        ]
    };

    return (
        <div className="min-h-screen bg-charcoal text-cream">
            <Seo
                title={pageData.title}
                description={pageData.description}
                canonical={`/${pageData.slug}`}
                schema={schema}
            />

            {/* HERO */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <img src="/pitmaster.jpg" className="w-full h-full object-cover grayscale" alt="BBQ Pit" />
                    <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/80 to-charcoal" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fire/10 border border-fire/20 text-fire text-xs font-black uppercase tracking-widest mb-8">
                            <MapPin size={14} /> Service Area: {pageData.location}
                        </div>
                        <h1 className="text-4xl md:text-7xl font-display italic text-cream mb-8 leading-tight">
                            {pageData.h1}
                        </h1>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                            {pageData.content}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Button onClick={() => navigate('/shop')} icon className="px-12 py-5 text-lg">Order Now</Button>
                            <Button variant="outline" onClick={() => navigate('/events')} className="px-12 py-5 text-lg">Enquire for Events</Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="py-24 bg-white/[0.02] border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="bg-charcoal/40 p-8 rounded-3xl border border-white/5">
                            <Flame className="text-fire mb-6" size={40} />
                            <h3 className="text-2xl font-display italic text-cream mb-4">Slow-Smoked Mastery</h3>
                            <p className="text-gray-400">12-hour low and slow smoking process using only premium charcoal and indigenous wood.</p>
                        </div>
                        <div className="bg-charcoal/40 p-8 rounded-3xl border border-white/5">
                            <CheckCircle2 className="text-fire mb-6" size={40} />
                            <h3 className="text-2xl font-display italic text-cream mb-4">Certified Quality</h3>
                            <p className="text-gray-400">FSSAI certified facility maintaining highest standards of hygiene and meat sourcing.</p>
                        </div>
                        <div className="bg-charcoal/40 p-8 rounded-3xl border border-white/5">
                            <ArrowRight className="text-fire mb-6" size={40} />
                            <h3 className="text-2xl font-display italic text-cream mb-4">Same Day Delivery</h3>
                            <p className="text-gray-400">Freshly prepared and delivered across {pageData.location} within hours of smoking.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-4xl font-display italic text-fire text-center mb-16 underline underline-offset-[1rem] decoration-white/10">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {pageData.faqs.map((faq, i) => (
                            <div key={i} className="bg-white/5 p-8 rounded-2xl border border-white/5">
                                <h4 className="text-xl font-bold text-cream mb-4">{faq.q}</h4>
                                <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* INTERNAL LINKING (Hub and Spoke) */}
            <section className="py-24 border-t border-white/5">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-xs uppercase tracking-[0.3em] font-black text-gray-500 mb-12">Other Service Areas</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {generatePSeoPages().filter(p => p.slug !== slug).slice(0, 10).map(p => (
                            <button
                                key={p.slug}
                                onClick={() => navigate(`/${p.slug}`)}
                                className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-xs text-gray-400 hover:text-fire hover:border-fire/30 transition-all"
                            >
                                {p.category} {p.location}
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
