import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Flame, Sparkles, Copy, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || '/api/v1';

export const FirstOrderPopup: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [discountCode, setDiscountCode] = useState('WELCOME10');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Check if user has already seen or dismissed the popup
        const hasSeen = localStorage.getItem('smoke_signal_first_order_popup');
        if (!hasSeen) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 5000); // Show after 5 seconds
            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem('smoke_signal_first_order_popup', 'dismissed');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post(`${API_URL}/newsletter/subscribe`, {
                email,
                source: 'first_order_popup'
            });
            setIsSubscribed(true);
            localStorage.setItem('smoke_signal_first_order_popup', 'subscribed');
        } catch (error) {
            console.error('Subscription failed', error);
            // Even if subscription fails (e.g. email already exists), show the code
            setIsSubscribed(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const copyCode = () => {
        navigator.clipboard.writeText(discountCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        onClick={handleDismiss}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        className="relative w-full max-w-2xl bg-charcoal rounded-[40px] shadow-[0_30px_100px_rgba(239,68,68,0.3)] overflow-hidden border border-white/5"
                    >
                        {/* Interactive Background Elements */}
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-fire/20 rounded-full blur-[80px]" />
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-fire/10 rounded-full blur-[80px]" />
                        </div>

                        <div className="flex flex-col md:flex-row h-full relative z-10">
                            {/* Left Side: Visual */}
                            <div className="w-full md:w-5/12 bg-fire relative min-h-[200px] md:min-h-full">
                                <img
                                    src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80"
                                    alt="Steaming BBQ"
                                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-fire to-transparent opacity-80" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-xl rotate-12">
                                        <Flame size={32} className="text-white" />
                                    </div>
                                    <h3 className="text-4xl font-display italic tracking-wider mb-2 leading-none">CLAIM YOUR<br />OFFER</h3>
                                    <p className="text-white/80 font-bold uppercase tracking-[0.2em] text-[10px]">Exclusive Access</p>
                                </div>
                            </div>

                            {/* Right Side: Form */}
                            <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
                                <button
                                    onClick={handleDismiss}
                                    className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                {!isSubscribed ? (
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-fire">
                                                <Sparkles size={14} className="fill-fire" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">First Order Special</span>
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-display text-cream italic leading-tight">
                                                GET 10% OFF<br />YOUR FIRST BURN
                                            </h2>
                                            <p className="text-gray-400 text-sm font-body">
                                                Join our BBQ briefing for exclusive deals, pitmaster secrets, and smoked wisdom.
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="relative group">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-fire transition-colors" size={18} />
                                                <input
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Enter your email"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-fire transition-all"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full h-14 bg-fire text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-fire-dark transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-fire/20"
                                            >
                                                {isSubmitting ? (
                                                    <Loader2 className="animate-spin" size={18} />
                                                ) : (
                                                    <>GET MY DISCOUNT <ArrowRight size={16} /></>
                                                )}
                                            </button>
                                        </form>
                                        <p className="text-center text-[9px] text-gray-500 uppercase tracking-widest">
                                            We respect your inbox. No spam, just pure BBQ soul.
                                        </p>
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center space-y-8"
                                    >
                                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                                            <CheckCircle2 size={40} className="text-green-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <h2 className="text-3xl font-display text-cream italic">YOU'RE IN THE SQUAD!</h2>
                                            <p className="text-gray-400 text-sm">Use this tactical code at checkout for 10% off.</p>
                                        </div>

                                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative group overflow-hidden">
                                            <div className="absolute top-0 left-0 w-2 h-full bg-fire" />
                                            <span className="block text-[10px] text-gray-500 uppercase font-black tracking-[0.3em] mb-2">YOUR DISCOUNT CODE</span>
                                            <div className="flex items-center justify-center gap-4">
                                                <span className="text-4xl font-mono font-black text-fire tracking-widest">{discountCode}</span>
                                                <button
                                                    onClick={copyCode}
                                                    className="p-3 bg-white/10 rounded-xl hover:bg-fire hover:text-white transition-all text-gray-400"
                                                >
                                                    {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleDismiss}
                                            className="w-full h-14 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-all"
                                        >
                                            START SHOPPING
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
