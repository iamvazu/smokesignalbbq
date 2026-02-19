import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Seo } from '../seo/Seo';
import {
    Users,
    Calendar,
    MapPin,
    Flame,
    CheckCircle2,
    Star,
    Award,
    MessageCircle,
    Phone,
    Mail,
    ArrowRight,
    Utensils,
    ChefHat,
    ShieldCheck,
    Clock
} from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CONTACT_INFO } from '../constants';

// @ts-ignore
const API_URL = (import.meta as any).env.VITE_API_URL || '/api/v1';

const CateringPage: React.FC = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        eventDate: '',
        guestCount: '',
        eventType: 'Corporate Event',
        location: '',
        message: ''
    });

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Include eventType in the payload
            const response = await axios.post(`${API_URL}/events`, {
                ...formData,
                eventType: `Catering: ${formData.eventType}`
            });
            const inquiryId = response.data.id.split('-')[0].toUpperCase();

            setSubmittedInquiryId(inquiryId);
            setSubmissionSuccess(true);

            // GA Event Tracking
            if (typeof (window as any).gtag === 'function') {
                (window as any).gtag('event', 'generate_lead', {
                    event_category: 'Catering',
                    event_label: formData.eventType,
                    value: 1
                });
            }

            // Auto-open WhatsApp
            setTimeout(() => {
                const waLink = generateWhatsAppLink(inquiryId, formData);
                window.open(waLink, '_blank');
            }, 1000);

        } catch (error) {
            console.error('Failed to submit catering inquiry:', error);
            alert('Failed to submit inquiry. Please try again or message us directly on WhatsApp.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const generateWhatsAppLink = (id: string, data: typeof formData) => {
        let waMessage = `*New Catering Inquiry #${id}*\n\n`;
        waMessage += `*Details:*\n`;
        waMessage += `Name: ${data.fullName}\n`;
        waMessage += `Phone: ${data.phoneNumber}\n`;
        waMessage += `Email: ${data.email}\n`;
        waMessage += `Type: ${data.eventType}\n`;
        waMessage += `Date: ${data.eventDate}\n`;
        waMessage += `Guests: ${data.guestCount}\n`;
        waMessage += `Location: ${data.location}\n`;
        if (data.message) waMessage += `\n*Message:*\n${data.message}`;

        return `https://wa.me/91${CONTACT_INFO.phone}?text=${encodeURIComponent(waMessage)}`;
    };

    const cateringSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Texas BBQ Catering Services Bangalore",
        "description": "Premium Texas BBQ catering for corporate events, weddings & parties in Bangalore. 14-hour smoked brisket, full-service setup, 20-500+ guests.",
        "provider": {
            "@type": "Restaurant",
            "name": "Smoke Signal BBQ",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "RS Palaya, Kammanahalli",
                "addressLocality": "Bangalore",
                "addressRegion": "Karnataka",
                "addressCountry": "IN"
            },
            "telephone": "+91-78998-70957"
        },
        "areaServed": [
            { "@type": "City", "name": "Bangalore" },
            { "@type": "City", "name": "Hyderabad" },
            { "@type": "City", "name": "Chennai" }
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "BBQ Catering Packages",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Full-Service BBQ Buffet",
                        "description": "Complete catering with chafing dishes, serving staff, and on-site setup"
                    },
                    "price": "1200",
                    "priceCurrency": "INR"
                }
            ]
        }
    };

    return (
        <div className="min-h-screen bg-charcoal text-cream pb-24">
            <Seo
                title="BBQ Catering Bangalore: Corporate Events & Weddings | Texas BBQ Catering Services"
                description="Premium Texas BBQ catering for corporate events, weddings & parties in Bangalore. 14-hour smoked brisket, full-service setup, 20-500+ guests. Get custom quote in 24 hours."
                keywords={['BBQ catering Bangalore', 'wedding catering Bangalore', 'corporate catering Bangalore', 'Texas BBQ catering']}
                schema={cateringSchema}
            />

            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden mb-24">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/combo6.png"
                        alt="Catering Hero"
                        className="w-full h-full object-cover opacity-40 brightness-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-charcoal/40 to-charcoal" />
                </div>

                <div className="container mx-auto px-4 relative z-10 pt-24 md:pt-32 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-5xl mx-auto"
                    >
                        <span className="text-fire uppercase tracking-[0.4em] text-xs md:text-sm font-bold mb-4 block">Premium Event Catering</span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display italic leading-[1.1] mb-6 tracking-tight">
                            Texas BBQ Catering <br /> <span className="text-fire">For Every Occasion</span>
                        </h1>
                        <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl font-body leading-relaxed mb-10">
                            From boardroom lunches to grand wedding receptions, bring authentic 14-hour charcoal-smoked BBQ to your event. Full-service catering for <span className="text-white font-bold">20 to 500+ guests</span> across Bangalore, Hyderabad & Chennai.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Button
                                variant="primary"
                                className="px-12 py-5 rounded-full text-lg shadow-2xl hover:scale-105 transition-transform"
                                onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                Get Catering Quote
                            </Button>
                            <a
                                href="tel:+917899870957"
                                className="px-12 py-5 bg-white/5 border border-white/10 rounded-full text-lg hover:bg-white/10 transition-colors"
                            >
                                Call +91 78998-70957
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* How It Works - 5 Steps */}
            <section className="container mx-auto px-4 mb-32">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-display italic text-cream mb-4">How Our Catering Works</h2>
                    <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-sm">5 Steps to Event Success</p>
                </div>

                <div className="max-w-5xl mx-auto space-y-12">
                    {[
                        {
                            num: '1',
                            title: 'Request a Custom Quote',
                            text: 'Contact us via WhatsApp, phone, or our catering form with your event details: date, number of guests, venue location, and occasion type. Our catering manager will respond within 24 hours with availability and initial recommendations.',
                            details: [
                                'Event date & time (48-72h notice required)',
                                'Guest count (20 minimum for full service)',
                                'Venue address (All Bangalore + Outstation)',
                                'Event type (Corporate, Wedding, Private)',
                                'Service style (Buffet, Plated, Live Station)'
                            ],
                            contact: true
                        },
                        {
                            num: '2',
                            title: 'Customize Your Menu & Service',
                            text: 'Work with our catering team to design the perfect menu for your guests. Choose from our signature 14-hour smoked meats, sides, sauces, and service options.',
                            options: [
                                { name: '🍽️ Full-Service Buffet', desc: 'Complete setup with chafing dishes, staff, and on-site carving station.', price: '₹1,200-1,800/person' },
                                { name: '🔥 Live Smoking Station', desc: 'Experiential live pitmaster presentation and on-site smoking.', price: '₹1,800-2,500/person' },
                                { name: '📦 DIY BBQ Boxes', desc: 'Pre-packed individual meals, ideal for office lunches.', price: '₹800-1,200/person' },
                                { name: '🎩 Plated Dinner', desc: 'White-glove service for upscale weddings and dinners.', price: '₹2,000-3,000/person' }
                            ]
                        },
                        {
                            num: '3',
                            title: 'Tasting & Finalization',
                            text: "For events over ₹50,000, we offer complimentary tasting sessions at our Kammanahalli kitchen. Sample the brisket, ribs, and sides you're considering to ensure perfection.",
                            subtext: '50% advance payment required to lock your date.'
                        },
                        {
                            num: '4',
                            title: 'Professional Setup & Service',
                            text: 'Our team arrives 2-3 hours before service to set up smokers, buffet lines, and dining areas. We handle everything: cooking, serving, and maintaining food quality.',
                            timeline: [
                                { t: '2:00 PM', a: 'Team arrives & unload equipment' },
                                { t: '4:00 PM', a: 'Final food prep & sauce station ready' },
                                { t: '7:00 PM', a: 'Main buffet opens, live carving begins' },
                                { t: '11:00 PM', a: 'Venue cleaned & equipment removed' }
                            ]
                        },
                        {
                            num: '5',
                            title: 'Cleanup & Follow-Up',
                            text: 'We leave your venue cleaner than we found it. Packaged leftovers are safely stored for you to take home or donate. We follow up to ensure everything exceeded expectations.',
                            highlight: 'Our Cleanup Promise: All equipment removed, kitchen sanitized, and trash collected.'
                        }
                    ].map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 relative overflow-hidden group hover:bg-white/[0.08] transition-colors"
                        >
                            <div className="flex flex-col lg:flex-row gap-12">
                                <div className="lg:w-1/3">
                                    <div className="w-16 h-16 rounded-2xl bg-fire flex items-center justify-center font-display text-4xl italic mb-6 shadow-2xl shadow-fire/20">
                                        {step.num}
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-display italic text-cream mb-4">{step.title}</h3>
                                    <p className="text-gray-400 leading-relaxed mb-6">{step.text}</p>

                                    {step.contact && (
                                        <div className="space-y-3">
                                            <a href="https://wa.me/917899870957" className="flex items-center gap-2 text-fire font-bold text-xs uppercase tracking-widest hover:translate-x-2 transition-transform">
                                                <MessageCircle size={16} /> WhatsApp: +91 78998-70957
                                            </a>
                                            <a href="tel:+917899870957" className="flex items-center gap-2 text-fire font-bold text-xs uppercase tracking-widest hover:translate-x-2 transition-transform">
                                                <Phone size={16} /> Call: +91 78998-70957
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <div className="lg:w-2/3 border-l border-white/10 lg:pl-12">
                                    {step.details && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {step.details.map((d, i) => (
                                                <div key={i} className="flex items-start gap-3 text-sm text-gray-300 italic">
                                                    <CheckCircle2 size={16} className="text-fire mt-1 shrink-0" />
                                                    <span>{d}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {step.options && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            {step.options.map((opt, i) => (
                                                <div key={i} className="bg-charcoal p-6 rounded-2xl border border-white/5">
                                                    <h5 className="text-fire font-bold mb-2 uppercase tracking-widest text-[10px]">{opt.name}</h5>
                                                    <p className="text-xs text-gray-400 mb-3">{opt.desc}</p>
                                                    <p className="text-sm font-bold text-cream italic">{opt.price}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {step.timeline && (
                                        <div className="space-y-4">
                                            {step.timeline.map((item, i) => (
                                                <div key={i} className="flex items-center gap-6">
                                                    <span className="text-fire font-black text-xs uppercase tracking-widest w-20">{item.t}</span>
                                                    <span className="text-gray-400 italic text-sm border-l border-white/10 pl-6 py-1">{item.a}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {step.subtext && <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mt-8">Note: {step.subtext}</p>}
                                    {step.highlight && <p className="text-fire font-display text-xl italic mt-4">{step.highlight}</p>}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Catering Occasions */}
            <section className="bg-black/40 py-32 mb-32">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-display italic text-cream mb-4">BBQ for Every Occasion</h2>
                        <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-sm italic underline decoration-fire underline-offset-8">Where the smoke meets your guests</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                icon: '🏢',
                                title: 'Corporate Catering',
                                desc: 'Boardroom lunches, team offsites, product launches, and annual dinners. Impress clients and reward teams with authentic Texas BBQ.',
                                items: ['Boxed lunches', 'Buffet setup', 'Live stations', 'Branded packaging'],
                                clients: 'Google, Microsoft, Biocon, Swiggy'
                            },
                            {
                                icon: '💒',
                                title: 'Wedding Catering',
                                desc: 'Make your reception unforgettable. From intimate gatherings to 500+ guest celebrations, the meat is the talk of the town.',
                                items: ['Reception dinners', 'Cocktail appetizers', 'Late-night snacks', 'Custom consultations'],
                                testimonial: '"The brisket was the talk of our wedding." — Anjali R.'
                            },
                            {
                                icon: '🎉',
                                title: 'Private Parties',
                                desc: 'Birthdays, anniversaries, housewarmings. Backyard BBQ setups, poolside parties, and terrace gatherings.',
                                items: ['Backyard setups', 'Poolside parties', 'Terrace gatherings', 'Milestone events'],
                                highlight: 'Minimum 20 guests for full service'
                            }
                        ].map((card, i) => (
                            <div key={i} className="bg-charcoal p-12 rounded-[4rem] border border-white/10 flex flex-col h-full hover:border-fire/50 transition-all group">
                                <span className="text-6xl mb-8 block grayscale group-hover:grayscale-0 transition-all">{card.icon}</span>
                                <h3 className="text-3xl font-display italic text-cream mb-6">{card.title}</h3>
                                <p className="text-gray-400 mb-8 leading-relaxed flex-grow">{card.desc}</p>
                                <ul className="space-y-3 mb-12">
                                    {card.items.map((item, j) => (
                                        <li key={j} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-500">
                                            <div className="w-1.5 h-1.5 rounded-full bg-fire" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                {card.clients && <p className="text-[10px] text-gray-600 font-bold uppercase italic mt-auto">Clients: {card.clients}</p>}
                                {card.testimonial && <p className="text-xs text-fire italic mt-auto">{card.testimonial}</p>}
                                {card.highlight && <p className="text-xs text-green-500/80 font-bold mt-auto uppercase tracking-widest">{card.highlight}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Coverage Area */}
            <section className="container mx-auto px-4 mb-32">
                <div className="max-w-4xl mx-auto rounded-[4rem] bg-fire p-12 md:p-24 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                    <div className="relative z-10 text-white">
                        <h2 className="text-4xl md:text-6xl font-display italic mb-12">Bangalore & Beyond</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { city: 'Bangalore', note: 'Same-day setup' },
                                { city: 'Hyderabad', note: '24-hour booking' },
                                { city: 'Chennai', note: '48-hour booking' },
                                { city: 'Kochi & Goa', note: '72-hour booking' }
                            ].map((loc, i) => (
                                <div key={i} className="border-r border-white/20 last:border-0 pr-4 text-center sm:text-left">
                                    <h4 className="text-2xl font-display italic mb-1">{loc.city}</h4>
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-70">{loc.note}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-16 text-lg tracking-wide max-w-2xl mx-auto">
                            Mysore, Coimbatore, Mangalore, and other South Indian cities—<span className="font-bold underline cursor-pointer" onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}>ask us about custom travel catering.</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* Quote Form */}
            <section id="quote-form" className="container mx-auto px-4 scroll-mt-24">
                <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-20">
                    <div className="lg:w-1/3 pt-12">
                        <h2 className="text-5xl font-display italic text-cream mb-8 leading-tight">Book Your <span className="text-fire">Catering Experience</span></h2>
                        <p className="text-gray-400 mb-12">Fill out the form and our catering manager will respond within 24 hours with your custom proposal.</p>

                        <div className="space-y-12">
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-fire shrink-0">
                                    <MessageCircle size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">WhatsApp Response</p>
                                    <p className="text-xl font-display italic">+91 78998-70957</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-fire shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Email Inquiry</p>
                                    <p className="text-base font-display italic uppercase truncate">catering@smokesignalbbq.in</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-2/3 bg-white/5 border border-white/10 p-10 md:p-16 rounded-[4rem] shadow-3xl relative overflow-hidden">
                        {submissionSuccess && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 z-20 bg-charcoal flex flex-col items-center justify-center p-8 text-center"
                            >
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 size={40} className="text-green-500" />
                                </div>
                                <h3 className="text-3xl font-display italic text-cream mb-4">Quote Requested!</h3>
                                <p className="text-gray-400 mb-8 max-w-sm">
                                    Thanks {formData.fullName.split(' ')[0]}! Ref: #{submittedInquiryId}. We'll get back to you within 24 hours.
                                </p>
                                <Button
                                    variant="primary"
                                    className="px-10 py-4 rounded-xl bg-[#25D366] hover:bg-[#128C7E] border-transparent text-white"
                                    onClick={() => window.open(generateWhatsAppLink(submittedInquiryId!, formData), '_blank')}
                                >
                                    Chat on WhatsApp
                                </Button>
                                <button
                                    onClick={() => setSubmissionSuccess(false)}
                                    className="mt-6 text-xs text-gray-500 underline decoration-dotted underline-offset-4"
                                >
                                    Send another request
                                </button>
                            </motion.div>
                        )}

                        <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-fire ml-1">Your Name *</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-charcoal border border-white/10 rounded-2xl px-6 py-4 focus:border-fire outline-none transition-colors"
                                    placeholder="Full Name"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-fire ml-1">Phone / WhatsApp *</label>
                                <input
                                    type="tel"
                                    required
                                    className="w-full bg-charcoal border border-white/10 rounded-2xl px-6 py-4 focus:border-fire outline-none transition-colors"
                                    placeholder="+91"
                                    value={formData.phoneNumber}
                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-fire ml-1">Email Address *</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-charcoal border border-white/10 rounded-2xl px-6 py-4 focus:border-fire outline-none transition-colors"
                                    placeholder="email@company.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-fire ml-1">Event Date *</label>
                                <input
                                    type="date"
                                    required
                                    className="w-full bg-charcoal border border-white/10 rounded-2xl px-6 py-4 focus:border-fire outline-none transition-colors text-gray-400"
                                    value={formData.eventDate}
                                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-fire ml-1">Number of Guests *</label>
                                <select
                                    required
                                    className="w-full bg-charcoal border border-white/10 rounded-2xl px-6 py-4 focus:border-fire outline-none transition-colors text-gray-400 appearance-none"
                                    value={formData.guestCount}
                                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                                >
                                    <option value="">Select range</option>
                                    <option>20-50 guests</option>
                                    <option>50-100 guests</option>
                                    <option>100-200 guests</option>
                                    <option>200-500 guests</option>
                                    <option>500+ guests</option>
                                </select>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-fire ml-1">Event Type *</label>
                                <select
                                    required
                                    className="w-full bg-charcoal border border-white/10 rounded-2xl px-6 py-4 focus:border-fire outline-none transition-colors text-gray-400 appearance-none"
                                    value={formData.eventType}
                                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                                >
                                    <option>Corporate Event</option>
                                    <option>Wedding Reception</option>
                                    <option>Birthday Party</option>
                                    <option>Private Party</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-fire ml-1">Venue / Location *</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-charcoal border border-white/10 rounded-2xl px-6 py-4 focus:border-fire outline-none transition-colors"
                                    placeholder="Area in Bangalore or full address"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-fire ml-1">Additional Details</label>
                                <textarea
                                    className="w-full bg-charcoal border border-white/10 rounded-2xl px-6 py-6 focus:border-fire outline-none transition-colors h-40 resize-none"
                                    placeholder="Tell us about your celebration, dietary requirements, or vision..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="md:col-span-2 pt-4">
                                <Button
                                    variant="primary"
                                    className="w-full py-6 rounded-3xl text-sm font-black uppercase tracking-[0.3em] shadow-2xl flex items-center justify-center gap-3"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending Request...' : 'Request Catering Quote'} <ArrowRight size={20} />
                                </Button>
                                <p className="text-[10px] text-gray-600 text-center mt-6 font-bold uppercase tracking-widest">We typically respond within 12-24 hours</p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CateringPage;
export { CateringPage };
