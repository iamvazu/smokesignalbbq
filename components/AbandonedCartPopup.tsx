import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare } from 'lucide-react';
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
                                className="inline-flex items-center justify-between w-full md:w-auto px-8 h-[70px] bg-white border-2 border-fire rounded-2xl group hover:bg-fire transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-fire rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="w-6 h-6 fill-white group-hover:fill-fire transition-colors"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                    </div>
                                    <span className="text-xl font-bold text-fire group-hover:text-white">+91 78998 70957</span>
                                </div>
                                <div className="ml-4 w-2 h-2 rounded-full bg-fire group-hover:bg-white animate-pulse" />
                            </a>

                        </div>

                        {/* Right Content (Visual) */}
                        <div className="flex-1 relative min-h-[300px] bg-charcoal flex items-center justify-center overflow-hidden">
                            {/* The "AI Assistant" Visual */}
                            <div className="relative z-10 w-full h-full flex items-center justify-center">
                                <img src="/Smoke Signal.png" alt="Smoke Signal BBQ" className="absolute inset-0 w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent z-10" />
                                <div className="relative z-20 p-10 text-center flex flex-col items-center justify-end h-full pb-14">
                                    <p className="text-white/90 font-display text-sm uppercase tracking-widest font-bold bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                                        BBQ AI Expert Active
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

// Helper icon
// Removed unused icons
