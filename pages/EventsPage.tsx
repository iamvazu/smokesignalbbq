import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Calendar,
    Users,
    MapPin,
    Flame,
    CheckCircle2,
    ArrowRight,
    Quote,
    Instagram,
    Plus,
    Minus,
    MessageSquare,
    Phone
} from 'lucide-react';
import { Button } from '../components/Button';
import { CONTACT_INFO } from '../constants';
import axios from 'axios';

// @ts-ignore
const API_URL = (import.meta as any).env.VITE_API_URL || '/api/v1';


const EVENT_TYPES = [
    {
        title: "Flea Markets & Pop-Ups",
        subtitle: "The Original Smoke Signal Experience",
        description: "We started as a Bangalore food truck in 2011. Today, we're the most sought-after stall at every major flea market in South India.",
        details: [
            "Sunday Soul Sante (Bangalore)",
            "Kochi-Muziris Biennale",
            "Hyderabad Literary Festival",
            "Chennai Music Season",
            "Corporate carnivals and family days"
        ],
        features: [
            "Full smoker setup with live fire cooking",
            "4-6 signature menu items",
            "Branded stall design (vintage Texas aesthetic)",
            "2 pitmasters in full gear",
            "Custom event-exclusive menu items"
        ],
        image: "/pitmaster.jpg"
    },
    {
        title: "Birthday Parties",
        subtitle: "Make Their Wish Come True (With BBQ)",
        description: "Forget the cake. Okay, keep the cake. But add a 14-hour smoked brisket that becomes the talking point of the party for years.",
        packages: [
            { name: "The Smokeshow", guests: "15-25", menu: "Wings, Brisket Sliders, 2 Sauces", price: "₹25,000" },
            { name: "The Pitmaster", guests: "25-50", menu: "Full spread + Ribs + Sides", price: "₹45,000" },
            { name: "The Whole Hog", guests: "50-100", menu: "Premium cuts + Live carving station", price: "₹85,000" }
        ],
        features: [
            "On-site smoking (if venue permits) or fresh delivery",
            "Chafing dishes, serving utensils, plates",
            "2 service staff",
            "2-hour service window",
            "Leftover packing (there won't be any)"
        ],
        image: "/brisket_sauce.jpg"
    }
];

const FAQ_ITEMS = [
    {
        q: "How much space do you need?",
        a: "Minimum 10x10 feet for the smoker + prep table. More space = more dramatic setup."
    },
    {
        q: "Do you provide vegetarian options?",
        a: "Our sides (mac & cheese, coleslaw, cornbread) are vegetarian. For full veg events, we partner with Bangalore's best veg caterers — we don't fake BBQ with paneer."
    },
    {
        q: "Can you do indoor events?",
        a: "Smoker must be outdoor/ventilated. We can prep offsite and serve indoors for venues that don't allow live fire."
    },
    {
        q: "What's your cancellation policy?",
        a: "100% refund if cancelled 14 days prior. 50% refund 7-13 days. No refund within 7 days (we've already bought the meat)."
    },
    {
        q: "Do you travel outside Bangalore?",
        a: "Yes. Hyderabad, Chennai, Kochi regularly. Other locations — let's talk. Travel costs added to quote."
    },
    {
        q: "Can we customize the menu?",
        a: "Absolutely. Want Chettinad-spiced brisket? Done. Want your grandmother's chutney as a side? Bring the recipe. Want a whole goat? We know a guy."
    }
];

export const EventsPage: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        eventType: 'Birthday Party',
        eventDate: '',
        location: '',
        guestCount: '',
        message: ''
    });



    const handleFormSubmit = async () => {
        setIsSubmitting(true);
        try {
            // 1. Save to Database
            const response = await axios.post(`${API_URL}/events`, formData);
            const inquiryId = response.data.id.split('-')[0].toUpperCase();

            setSubmittedInquiryId(inquiryId);
            setSubmissionSuccess(true);

            // Auto-open WhatsApp
            setTimeout(() => {
                const waLink = generateWhatsAppLink(inquiryId, formData);
                window.open(waLink, '_blank');
            }, 1000);

        } catch (error) {
            console.error('Failed to submit inquiry:', error);
            alert('Failed to submit inquiry. Please try again or message us directly on WhatsApp.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const generateWhatsAppLink = (id: string, data: typeof formData) => {
        let waMessage = `*New Event Inquiry #${id}*\n\n`;
        waMessage += `*Details:*\n`;
        waMessage += `Name: ${data.fullName}\n`;
        waMessage += `Phone: ${data.phoneNumber}\n`;
        waMessage += `Type: ${data.eventType}\n`;
        waMessage += `Date: ${data.eventDate}\n`;
        if (data.location) waMessage += `Location: ${data.location}\n`;
        waMessage += `Guests: ${data.guestCount}\n`;
        if (data.message) waMessage += `\n*Message:*\n${data.message}`;

        return `https://wa.me/91${CONTACT_INFO.phone}?text=${encodeURIComponent(waMessage)}`;
    };

    const handleWhatsAppRedirect = () => {
        if (!submittedInquiryId) return;
        const waLink = generateWhatsAppLink(submittedInquiryId, formData);
        window.open(waLink, '_blank');
    };




    return (
        <div className="bg-charcoal min-h-screen text-cream">
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/pitmaster.jpg"
                        alt="BBQ Event Smoker"
                        className="w-full h-full object-cover opacity-40 brightness-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-charcoal/40 to-charcoal" />
                </div>

                <div className="container mx-auto px-4 z-10 text-center pt-24 md:pt-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-fire uppercase tracking-[0.4em] text-xs md:text-sm font-bold mb-4 block">Bring the Smoke to Your Celebration</span>
                        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-4 italic leading-tight">
                            The Pitmaster <br /> <span className="text-fire">Comes to You</span>
                        </h1>


                        <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl font-body leading-relaxed mb-6">
                            From Bangalore's hottest flea markets to intimate birthday gatherings across South India — we bring 14 hours of authentic Texas smoke to your event.
                        </p>

                        <div className="flex flex-col md:flex-row gap-6 justify-center">
                            <Button
                                variant="primary"
                                className="rounded-full px-12 py-5 text-lg shadow-2xl"
                                onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                Get Event Quote
                            </Button>
                            <Button
                                variant="outline"
                                className="rounded-full px-12 py-5 text-lg"
                                onClick={() => window.open('https://instagram.com/smokesignalbbq', '_blank')}
                            >
                                View Past Events
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* What We Do */}
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="font-display text-4xl md:text-6xl italic mb-4">What We Do</h2>
                        <div className="w-24 h-1 bg-fire mx-auto rounded-full" />
                    </div>

                    <div className="space-y-32">
                        {/* Flea Markets */}
                        <div className="flex flex-col lg:flex-row gap-16 items-center">
                            <div className="w-full lg:w-1/2">
                                <div className="relative group">
                                    <div className="absolute -inset-4 bg-fire/20 rounded-[2rem] blur-2xl group-hover:bg-fire/30 transition-all duration-500" />
                                    <img src="/fleemarket.jpg" className="relative rounded-[2rem] shadow-2xl object-cover aspect-[4/3]" alt="Flea Market Setup" />
                                </div>

                            </div>
                            <div className="w-full lg:w-1/2">
                                <span className="text-fire text-4xl mb-4 block">🔥</span>
                                <h3 className="font-display text-3xl md:text-4xl mb-2">Flea Markets & Pop-Ups</h3>
                                <p className="text-fire font-bold uppercase tracking-widest text-sm mb-6">The Original Smoke Signal Experience</p>
                                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                                    We started as a Bangalore food truck in 2011. Today, we're the most sought-after stall at every major flea market in South India. Our setup draws crowds, our smoke draws stories, and our brisket draws repeat customers.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-white font-bold mb-4 flex items-center gap-2"><MapPin size={18} className="text-fire" /> Perfect for:</h4>
                                        <ul className="space-y-2 text-gray-400 text-sm">
                                            {["Sunday Soul Sante", "Kochi-Muziris Biennale", "Hyderabad Lit Fest", "Chennai Music Season"].map(item => (
                                                <li key={item} className="flex gap-2">• {item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-4 flex items-center gap-2"><CheckCircle2 size={18} className="text-fire" /> What you get:</h4>
                                        <ul className="space-y-2 text-gray-400 text-sm">
                                            {["Full smoker setup", "Live fire cooking", "Branded stall design", "2 pitmasters"].map(item => (
                                                <li key={item} className="flex gap-2">• {item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Birthdays */}
                        <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
                            <div className="w-full lg:w-1/2">
                                <div className="relative group">
                                    <div className="absolute -inset-4 bg-fire/20 rounded-[2rem] blur-2xl group-hover:bg-fire/30 transition-all duration-500" />
                                    <img src="/birthday_truck.jpg" className="relative rounded-[2rem] shadow-2xl object-cover aspect-[4/3]" alt="Birthday Event" />
                                </div>

                            </div>
                            <div className="w-full lg:w-1/2">
                                <span className="text-fire text-4xl mb-4 block">🎂</span>
                                <h3 className="font-display text-3xl md:text-4xl mb-2">Birthday Parties</h3>
                                <p className="text-fire font-bold uppercase tracking-widest text-sm mb-6">Make Their Wish Come True (With BBQ)</p>
                                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                                    Forget the cake. Okay, keep the cake. But add a 14-hour smoked brisket that becomes the talking point of the party for years.
                                </p>

                                <div className="bg-black/40 border border-white/10 rounded-3xl overflow-hidden mb-8">
                                    <table className="w-full text-left text-sm">
                                        <thead>
                                            <tr className="bg-white/5 border-b border-white/10">
                                                <th className="p-4 font-display text-fire">Package</th>
                                                <th className="p-4">Guests</th>
                                                <th className="p-4">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            <tr>
                                                <td className="p-4 font-bold">The Smokeshow</td>
                                                <td className="p-4 text-gray-400">15-25</td>
                                                <td className="p-4 font-bold text-fire">₹25,000</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4 font-bold">The Pitmaster</td>
                                                <td className="p-4 text-gray-400">25-50</td>
                                                <td className="p-4 font-bold text-fire">₹45,000</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4 font-bold">The Whole Hog</td>
                                                <td className="p-4 text-gray-400">50-100</td>
                                                <td className="p-4 font-bold text-fire">₹85,000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    {["On-site smoking", "Serving utensils", "Staff included", "Zero cleanup"].map(f => (
                                        <span key={f} className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-400">{f}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Private & Corporate */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-black/40 border border-white/10 p-12 rounded-[2.5rem] relative overflow-hidden group hover:border-fire/50 transition-colors">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Users size={80} />
                                </div>
                                <h3 className="font-display text-3xl mb-6 italic">Private Celebrations</h3>
                                <p className="text-gray-400 mb-8 font-body leading-relaxed">
                                    House warming, anniversaries, reunions, or even divorce parties. Your terrace, farmhouse, or office parking lot — we specialize in "impossible" venues.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-xs uppercase tracking-[0.2em] text-fire font-bold">
                                        <span>Bangalore</span>
                                        <span className="text-gray-500">Same-day setup</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs uppercase tracking-[0.2em] text-fire font-bold">
                                        <span>Hyderabad</span>
                                        <span className="text-gray-500">24-hour advance</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs uppercase tracking-[0.2em] text-fire font-bold">
                                        <span>Chennai</span>
                                        <span className="text-gray-500">48-hour advance</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-black/40 border border-white/10 p-12 rounded-[2.5rem] relative overflow-hidden group hover:border-fire/50 transition-colors">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Calendar size={80} />
                                </div>
                                <h3 className="font-display text-3xl mb-6 italic">Corporate Events</h3>
                                <p className="text-gray-400 mb-8 font-body leading-relaxed">
                                    Tired of pizza parties? Our corporate packages turn "mandatory fun" into actual fun. Team building through BBQ because nothing bonds like 14-hour brisket.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {["Google", "Microsoft", "Biocon", "Swiggy"].map(c => (
                                        <span key={c} className="text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-white/5 px-3 py-1 rounded-lg">{c}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Difference Section */}
            <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/footer_bg.jpg"
                        alt="Background"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/60" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="font-display text-4xl md:text-5xl mb-16 text-center italic">The Smoke Signal Difference</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <h4 className="text-fire font-display text-xl">1. We Bring the Theater</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">The smoker, the smoke, the pitmaster — it's not just food, it's entertainment. Your guests will film it, and their followers will ask for the location.</p>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-fire font-display text-xl">2. 14 Hours, Not 14 Minutes</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">Everyone else grills. We smoke. Real charcoal. Real wood. Real time. The flavor is non-negotiable.</p>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-fire font-display text-xl">3. Bangalore Born, South India Raised</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">We understand local tastes. Our "Ghee Roast BBQ Wings" sell out faster than our Texas Original at Bangalore events.</p>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-fire font-display text-xl">4. FSSAI Compliant & Insured</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">Proper licenses. Proper hygiene. Proper peace of mind for you and your venue. We leave it cleaner than we found it.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="font-display text-4xl mb-12 text-center italic">Event FAQ</h2>
                    <div className="space-y-4">
                        {FAQ_ITEMS.map((item, idx) => (
                            <div key={idx} className="border border-white/5 bg-white/5 rounded-2xl overflow-hidden">
                                <button
                                    className="w-full flex justify-between items-center p-6 text-left"
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                >
                                    <span className="font-bold text-cream pr-8">{item.q}</span>
                                    {openFaq === idx ? <Minus className="text-fire" size={20} /> : <Plus className="text-gray-500" size={20} />}
                                </button>
                                {openFaq === idx && (
                                    <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Corporate Clients */}
            <section className="py-16 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <p className="text-center text-gray-500 uppercase tracking-[0.3em] text-[10px] font-bold mb-8">Trusted by the Best</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                        {["Google", "Microsoft", "Biocon", "Swiggy"].map(c => (
                            <span key={c} className="text-2xl font-display text-cream">{c}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cities We Serve */}
            <section className="py-24 bg-charcoal relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/events_bg.jpg"
                        alt="Background"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/90 to-charcoal/60" />
                </div>
                <div className="container mx-auto px-4 relative z-10">

                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="font-display text-4xl mb-12 italic">Cities We Serve</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                <h4 className="text-fire font-bold mb-2">Bangalore</h4>
                                <p className="text-xs text-gray-500">Same-day setup. Home base.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                <h4 className="text-fire font-bold mb-2">Hyderabad</h4>
                                <p className="text-xs text-gray-500">24-hour advance booking.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                <h4 className="text-fire font-bold mb-2">Chennai</h4>
                                <p className="text-xs text-gray-500">48-hour advance booking.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                <h4 className="text-fire font-bold mb-2">Kochi</h4>
                                <p className="text-xs text-gray-500">72-hour advance booking.</p>
                            </div>
                        </div>
                        <p className="mt-8 text-sm text-gray-400">Mysore, Coimbatore, Mangalore, Goa — we've done them all. Just ask.</p>
                    </div>
                </div>
            </section>

            {/* Quote Form / CTA */}
            <section id="quote" className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/getaquote.png"
                        alt="Background"
                        className="w-full h-full object-cover opacity-25"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/90 to-charcoal/80" />
                </div>
                <div className="container mx-auto px-4 max-w-5xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <h2 className="font-display text-4xl md:text-5xl mb-6 italic">Get Your Quote</h2>
                            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                                Unlock the full pitmaster experience for your next celebration. Tell us about your event and we'll get back with a custom proposal within 24 hours.
                            </p>

                            <div className="space-y-8 mt-12 text-center md:text-left">
                                <div className="flex flex-col md:flex-row gap-6 items-center">
                                    <div className="w-12 h-12 rounded-full bg-fire/10 flex items-center justify-center text-fire">
                                        <MessageSquare size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-cream tracking-wider uppercase text-xs mb-1">WhatsApp Us</h4>
                                        <p className="text-fire font-display text-xl">+91 78998-70957</p>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row gap-6 items-center">
                                    <div className="w-12 h-12 rounded-full bg-fire/10 flex items-center justify-center text-fire">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-cream tracking-wider uppercase text-xs mb-1">Call for Events</h4>
                                        <p className="text-fire font-display text-xl">+91 78998-70957</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-charcoal border border-white/10 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                            {submissionSuccess ? (
                                <div className="absolute inset-0 z-10 bg-charcoal flex flex-col items-center justify-center p-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle2 size={40} className="text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-display italic text-cream mb-4">Inquiry Received!</h3>
                                    <p className="text-gray-400 mb-8 max-w-sm">
                                        Thanks {formData.fullName.split(' ')[0]}! We've saved your details (Ref: #{submittedInquiryId}). We'll get back to you within 24 hours.
                                    </p>

                                    <div className="space-y-4 w-full max-w-xs">
                                        <Button
                                            variant="primary"
                                            className="w-full py-4 rounded-xl shadow-lg bg-[#25D366] hover:bg-[#128C7E] border-transparent text-white"
                                            onClick={handleWhatsAppRedirect}
                                        >
                                            <MessageSquare className="mr-2" size={20} />
                                            Send on WhatsApp
                                            <span className="text-[10px] block opacity-80 mt-1 font-normal">(Faster Response)</span>
                                        </Button>

                                        <button
                                            onClick={() => {
                                                setSubmissionSuccess(false);
                                                setFormData({ ...formData, message: '', eventDate: '', guestCount: '' }); // Reset partial form
                                                setSubmittedInquiryId(null);
                                            }}
                                            className="text-sm text-gray-500 hover:text-white transition-colors underline decoration-dotted underline-offset-4"
                                        >
                                            Submit another inquiry
                                        </button>
                                    </div>
                                </div>
                            ) : null}

                            <form className={`space-y-6 transition-opacity duration-500 ${submissionSuccess ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} onSubmit={(e) => { e.preventDefault(); handleFormSubmit(); }}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Full Name *</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-fire transition-colors"
                                            placeholder="John Doe"
                                            required
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Phone / WhatsApp *</label>
                                        <input
                                            type="tel"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-fire transition-colors"
                                            placeholder="+91"
                                            required
                                            value={formData.phoneNumber}
                                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Event Type *</label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-fire transition-colors appearance-none text-gray-400"
                                        value={formData.eventType}
                                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                                    >
                                        <option>Birthday Party</option>
                                        <option>Corporate Event</option>
                                        <option>Wedding</option>
                                        <option>Flea Market</option>
                                        <option>Private Party</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Event Location</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-fire transition-colors"
                                        placeholder="Area, Venue, or City"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>


                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Event Date *</label>
                                        <input
                                            type="date"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-fire transition-colors text-gray-400"
                                            required
                                            value={formData.eventDate}
                                            onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Guest Count *</label>
                                        <input
                                            type="number"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-fire transition-colors"
                                            placeholder="e.g. 50"
                                            required
                                            value={formData.guestCount}
                                            onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Tell us more</label>
                                    <textarea
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-fire transition-colors h-32 resize-none"
                                        placeholder="Venue details, specific menu requirements, etc..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>

                                <Button
                                    variant="primary"
                                    icon
                                    className="w-full py-5 rounded-2xl shadow-xl disabled:opacity-50"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit for Quote'}
                                </Button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-black/40">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { text: "We hired Smoke Signal for my husband's 50th. He hasn't stopped talking about the brisket. It's been 8 months.", author: "Anjali R., Koramangala" },
                            { text: "They set up a full smoker in our office parking lot. The security guard still asks when they're coming back.", author: "HR Head, Fortune 500 Tech" },
                            { text: "Best stall at the flea market. The lines were 45 minutes and nobody complained because they could smell why.", author: "Soul Sante Organizer" },
                            { text: "I'm from Texas. This is the real deal. I drove from Hyderabad just to confirm. Worth it.", author: "Mark T., Expat" }
                        ].map((t, i) => (
                            <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/5 relative">
                                <Quote size={20} className="text-fire mb-4 opacity-50" />
                                <p className="text-sm text-gray-400 font-body leading-relaxed mb-6 italic">"{t.text}"</p>
                                <p className="text-xs font-bold text-cream uppercase tracking-widest">— {t.author}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
