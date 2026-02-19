import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Seo } from '../seo/Seo';
import {
    Phone,
    Mail,
    MapPin,
    MessageSquare,
    Truck,
    Calendar,
    Users,
    CreditCard,
    ArrowRight,
    CheckCircle2,
    Instagram,
    Facebook
} from 'lucide-react';
import { Button } from '../components/Button';
import { CONTACT_INFO } from '../constants';
import axios from 'axios';

// @ts-ignore
const API_URL = (import.meta as any).env.VITE_API_URL || '/api/v1';

const contactCategories = [
    { id: 'service', label: 'Customer Service', icon: MessageSquare, description: 'Order support, feedback, and general queries.' },
    { id: 'catering', label: 'Catering Enquiry', icon: Users, description: 'Bulk orders for house parties and corporate events.' },
    { id: 'events', label: 'Event Enquiry', icon: Calendar, description: 'Book our truck or stall for festivals and large events.' },
    { id: 'vendor', label: 'Vendor/Partnership', icon: ArrowRight, description: 'Supply inquiries and business collaborations.' },
    { id: 'payment', label: 'Bill Payments', icon: CreditCard, description: 'Payment verification and invoicing support.' },
    { id: 'delivery', label: 'Delivery Support', icon: Truck, description: 'Real-time tracking and logistics assistance.' },
];

export const ContactPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('service');
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('sending');

        try {
            await axios.post(`${API_URL}/contacts`, {
                ...formData,
                subjectCategory: selectedCategory
            });
            setFormStatus('success');
        } catch (error) {
            console.error('Failed to send contact inquiry:', error);
            setFormStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-charcoal text-cream pb-24">
            <Seo
                title="Contact Smoke Signal BBQ: Support, Catering & Event Enquiries"
                description="Get in touch with Bangalore's original Texas BBQ. Contact us for customer service, catering for 20-500 guests, vendor partnerships, or payment support."
                keywords={['Contact Smoke Signal BBQ', 'BBQ Catering Bangalore', 'Event Catering Bangalore', 'BBQ Vendor Bangalore']}
            />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-12 md:mb-24">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/events_bg.jpg"
                        alt="Contact Us"
                        className="w-full h-full object-cover opacity-40 brightness-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-charcoal/40 to-charcoal" />
                </div>

                <div className="container mx-auto px-4 relative z-10 pt-24 md:pt-32 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <span className="text-fire uppercase tracking-[0.4em] text-xs md:text-sm font-bold mb-4 block">Command Center</span>
                        <h1 className="text-4xl md:text-7xl font-display italic leading-[1.1] mb-6 tracking-tight">
                            Get In <span className="text-fire">Touch</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-body">
                            Whether you're planning a wedding for 500 or have a quick question about your order, our team is standing by.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">

                    {/* Left Side: Category Selection & Info */}
                    <div className="lg:col-span-5 space-y-12">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-display italic text-cream mb-8">What can we help with?</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                                {contactCategories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`text-left p-6 rounded-3xl border transition-all duration-300 group ${selectedCategory === cat.id
                                            ? 'bg-fire/10 border-fire shadow-[0_0_30px_rgba(239,68,68,0.15)]'
                                            : 'bg-white/5 border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`p-3 rounded-2xl transition-colors ${selectedCategory === cat.id ? 'bg-fire text-white' : 'bg-white/5 text-gray-400 group-hover:text-fire'
                                                }`}>
                                                <cat.icon size={24} />
                                            </div>
                                            <div>
                                                <h4 className={`font-display text-lg tracking-wide ${selectedCategory === cat.id ? 'text-fire' : 'text-cream'}`}>
                                                    {cat.label}
                                                </h4>
                                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{cat.description}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Direct Contact Info */}
                        <div className="bg-white/5 rounded-[3rem] p-10 border border-white/10 space-y-8">
                            <h3 className="font-display text-2xl text-fire italic">Direct Intelligence</h3>

                            <div className="space-y-6">
                                <a href={`tel:+91${CONTACT_INFO.phone}`} className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 rounded-full bg-fire/10 flex items-center justify-center text-fire group-hover:bg-fire group-hover:text-white transition-all">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-black tracking-widest text-gray-500">Call Support</p>
                                        <p className="text-lg font-bold text-cream">+91 78998-70957</p>
                                    </div>
                                </a>

                                <a href={CONTACT_INFO.whatsapp} target="_blank" className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all">
                                        <MessageSquare size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-black tracking-widest text-gray-500">WhatsApp Dispatch</p>
                                        <p className="text-lg font-bold text-cream">Instant Response</p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 rounded-full bg-fire/10 flex items-center justify-center text-fire">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-black tracking-widest text-gray-500">Smokehouse Base</p>
                                        <p className="text-sm font-medium text-cream leading-relaxed">{CONTACT_INFO.location}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/10 flex gap-4">
                                <a href="https://instagram.com/smokesignalbbq" className="p-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-fire transition-all">
                                    <Instagram size={20} />
                                </a>
                                <a href="#" className="p-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-[#1877F2] transition-all">
                                    <Facebook size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[4rem] p-8 md:p-16 relative overflow-hidden shadow-2xl sticky top-24">
                            {formStatus === 'success' ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-20"
                                >
                                    <div className="w-24 h-24 bg-fire/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-fire/20">
                                        <CheckCircle2 size={48} className="text-fire" />
                                    </div>
                                    <h3 className="text-4xl font-display italic text-cream mb-4">Message Intercepted</h3>
                                    <p className="text-gray-400 max-w-sm mx-auto mb-10">Message sent and a team member will be in touch with you shortly.</p>
                                    <Button variant="outline" onClick={() => setFormStatus('idle')}>Send Another</Button>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="mb-12">
                                        <p className="text-fire font-black uppercase tracking-[0.3em] text-[10px] mb-2">Transmission Form</p>
                                        <h3 className="text-3xl md:text-5xl font-display italic text-cream">Send a Message</h3>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-fire ml-1">Full Name *</label>
                                                <input
                                                    required
                                                    type="text"
                                                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-5 text-cream focus:outline-none focus:border-fire transition-all"
                                                    placeholder="Enter name..."
                                                    value={formData.fullName}
                                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-fire ml-1">Phone Number *</label>
                                                <input
                                                    required
                                                    type="tel"
                                                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-5 text-cream focus:outline-none focus:border-fire transition-all"
                                                    placeholder="+91..."
                                                    value={formData.phoneNumber}
                                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-fire ml-1">Email Address *</label>
                                            <input
                                                required
                                                type="email"
                                                className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-5 text-cream focus:outline-none focus:border-fire transition-all"
                                                placeholder="email@example.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-fire ml-1">Subject Category *</label>
                                            <select
                                                required
                                                value={selectedCategory}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-5 text-cream focus:outline-none focus:border-fire transition-all appearance-none"
                                            >
                                                {contactCategories.map(cat => (
                                                    <option key={cat.id} value={cat.id} className="bg-charcoal">{cat.label}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-fire ml-1">Mission Details *</label>
                                            <textarea
                                                required
                                                rows={5}
                                                className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-5 text-cream focus:outline-none focus:border-fire transition-all resize-none"
                                                placeholder="Tell us more about your enquiry..."
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            />
                                        </div>

                                        {formStatus === 'error' && (
                                            <p className="text-fire text-center text-sm">Failed to send transmission. Please try again or call us.</p>
                                        )}

                                        <Button
                                            variant="primary"
                                            type="submit"
                                            className="w-full py-6 rounded-[2rem] text-lg"
                                            disabled={formStatus === 'sending'}
                                        >
                                            {formStatus === 'sending' ? 'Sending Tactical Msg...' : 'Send Transmission'}
                                        </Button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bill Payments Section */}
                <section className="mt-24 md:mt-40">
                    <div className="bg-black/20 border border-white/10 rounded-[4rem] p-10 md:p-20 overflow-hidden relative">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-fire/5 blur-[100px] pointer-events-none" />

                        <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
                            <div className="lg:w-1/2 space-y-6">
                                <span className="text-fire font-black uppercase tracking-[0.4em] text-[10px]">Finance & Payments</span>
                                <h2 className="text-4xl md:text-6xl font-display italic text-cream">Bill Payments & Invoicing</h2>
                                <p className="text-gray-400 text-lg leading-relaxed font-body">
                                    Need to settle a catering bill or verify a payment? We accept all major UPI platforms and bank transfers for bulk orders and business accounts.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                                    <div className="bg-white/5 border border-white/5 p-6 rounded-3xl">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">GPay / UPI ID</p>
                                        <p className="text-xl font-bold text-cream">{CONTACT_INFO.gpay}@okaxis</p>
                                    </div>
                                    <div className="bg-white/5 border border-white/5 p-6 rounded-3xl">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Billing Name</p>
                                        <p className="text-xl font-bold text-cream">Smoke Signal BBQ</p>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:w-1/2 flex justify-center">
                                <div className="relative group">
                                    <div className="absolute -inset-4 bg-fire/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="bg-white p-8 rounded-[3rem] shadow-2xl relative">
                                        <div className="w-64 h-64 bg-gray-100 rounded-2xl flex flex-col items-center justify-center text-center p-6 border-4 border-dashed border-gray-300">
                                            <CreditCard size={48} className="text-gray-400 mb-4" />
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">QR Verification Required</p>
                                            <p className="text-[10px] text-gray-400 mt-2">Contact support for secure 3D payment links</p>
                                        </div>
                                        <div className="mt-6 text-center">
                                            <p className="text-charcoal font-black uppercase tracking-widest text-[10px]">Official Settlement Port</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ContactPage;
