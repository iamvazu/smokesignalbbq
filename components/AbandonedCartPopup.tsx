import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Phone, Sparkles } from 'lucide-react';
import { useCartStore } from '../store';

export const AbandonedCartPopup: React.FC = () => {
    const { items, lastUpdated } = useCartStore();
    const [isVisible, setIsVisible] = useState(false);
    const [hasBeenShown, setHasBeenShown] = useState(false);

    useEffect(() => {
        // Only run on client
        if (typeof window === 'undefined') return;

        // Check every minute
        const interval = setInterval(() => {
            if (hasBeenShown || items.length === 0) return;

            const now = Date.now();
            const idleTime = now - lastUpdated;

            // 💡 TIP: For testing, change this to 10 * 1000 (10 seconds)
            const thirtyMinutes = 30 * 60 * 1000;

            if (idleTime > thirtyMinutes) {

                setIsVisible(true);
                setHasBeenShown(true);
            }
        }, 60000); // Check every 60 seconds

        return () => clearInterval(interval);
    }, [items.length, lastUpdated, hasBeenShown]);

    // For testing/demo purposes, we could have a hidden way to trigger it
    // Or just comment out the 30 min check for now to show the user

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        onClick={() => setIsVisible(false)}
                    />

                    {/* Popup Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-[800px] bg-white rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-[0_30px_100px_rgba(0,0,0,1)]"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-6 right-6 z-20 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
                        >
                            <X size={20} className="text-gray-600" />
                        </button>

                        {/* Left Content (Text) */}
                        <div className="flex-1 p-8 md:p-14 flex flex-col justify-center">
                            <h2 className="text-[32px] md:text-[42px] font-display leading-[1.1] text-charcoal mb-6">
                                Not sure which BBQ to choose?
                            </h2>
                            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10">
                                Talk with our <span className="text-fire font-bold italic">BBQ AI Assistant</span> to find the perfect BBQ for your goals.
                            </p>

                            {/* CTA Button */}
                            <a
                                href="https://wa.me/917899870957?text=Hi! I need help choosing the best BBQ for my party."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-between w-full md:w-auto px-8 h-[70px] bg-white border-2 border-[#5E33FF] rounded-2xl group hover:bg-[#5E33FF] transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-[#5E33FF] rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                                        {/* WhatsApp colored icon would be better, but lucide phone for now */}
                                        <MessageSquare size={20} className="text-white group-hover:text-[#5E33FF]" />
                                    </div>
                                    <span className="text-xl font-bold text-[#5E33FF] group-hover:text-white">+91 78998 70957</span>
                                </div>
                                <div className="ml-4 w-2 h-2 rounded-full bg-[#5E33FF] group-hover:bg-white animate-pulse" />
                            </a>

                        </div>

                        {/* Right Content (Visual) */}
                        <div className="flex-1 relative min-h-[300px] bg-gradient-to-br from-[#5E33FF] to-[#8A33FF] flex items-center justify-center overflow-hidden">
                            {/* Decorative Sparkles */}
                            <div className="absolute top-10 left-10 p-4 bg-white/20 rounded-2xl backdrop-blur-md">
                                <Sparkles className="text-white w-8 h-8" />
                            </div>

                            {/* The "AI Assistant" Visual */}
                            {/* Since generate_image is failing, I'll use a stylized CSS representation or an img tag that the user can replace */}
                            <div className="relative z-10 w-full h-full flex items-center justify-center">
                                {/* Placeholder logic - usually an <img> would go here */}
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center mix-blend-overlay opacity-60" />
                                <div className="p-10 text-center">
                                    <div className="w-48 h-48 mx-auto rounded-full border-4 border-white/30 p-2 backdrop-blur-sm mb-6">
                                        <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center">
                                            <Flame className="text-white w-20 h-20 animate-pulse" />
                                        </div>
                                    </div>
                                    <p className="text-white/80 font-display text-sm uppercase tracking-widest">BBQ AI Expert Active</p>
                                </div>
                            </div>

                            {/* Dynamic Pattern Overlay */}
                            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path d="M0 100 C 20 0 50 0 100 100" fill="none" stroke="white" strokeWidth="0.5" />
                                <path d="M0 80 C 30 20 60 20 100 80" fill="none" stroke="white" strokeWidth="0.5" />
                            </svg>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

// Helper icon
const Flame = ({ className, size = 24 }: { className?: string, size?: number }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
);
