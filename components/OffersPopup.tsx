import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Navigation, ArrowRight, Zap, ShoppingCart } from 'lucide-react';
import { useLocationStore, useCartStore } from '../store';
import { PRODUCTS } from '../constants';

// Sample Offer Items
const OFFER_ITEMS = [
    {
        id: 'offer-wings',
        name: 'BBQ Spicy Wings (Special Offer)',
        weight: '250g',
        price: '₹249',
        originalPrice: '₹349',
        priceValue: 249,
        discount: '28% off',
        image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 'offer-texas-sauce',
        name: 'BBQ Texas Sauce (Sampler)',
        weight: '100ml',
        price: '₹99',
        originalPrice: '₹149',
        priceValue: 99,
        discount: '33% off',
        image: 'https://images.unsplash.com/photo-1585325701956-60dd9c8524bc?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 'offer-chicken-steak',
        name: 'Pepper Garlic Chicken Steak',
        weight: '250g',
        price: '₹349',
        originalPrice: '₹449',
        priceValue: 349,
        discount: '22% off',
        image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=400&q=80',
    }
];

export const OffersPopup: React.FC = () => {
    const { hasCheckedLocation, showLocationPrompt, city, setLocation, setShowLocationPrompt, setHasCheckedLocation } = useLocationStore();
    const { addItem } = useCartStore();
    const [isOffersVisible, setIsOffersVisible] = useState(false);
    const [isDetecting, setIsDetecting] = useState(false);

    useEffect(() => {
        // Show location prompt on first enter
        if (!hasCheckedLocation) {
            const timer = setTimeout(() => {
                setShowLocationPrompt(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [hasCheckedLocation, setShowLocationPrompt]);

    const handleDetectLocation = () => {
        setIsDetecting(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    // In a real app, reverse geocode here. 
                    // For demo, we'll use Bangalore since that's our base.
                    try {
                        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
                        const data = await response.json();
                        const cityName = data.city || data.locality || "Bangalore";

                        setLocation({ lat: latitude, lng: longitude }, cityName);
                        setIsDetecting(false);
                        setShowLocationPrompt(false);
                        // Show offers after successful location detection
                        setTimeout(() => setIsOffersVisible(true), 1000);
                    } catch (error) {
                        setLocation({ lat: latitude, lng: longitude }, "Bangalore");
                        setIsDetecting(false);
                        setShowLocationPrompt(false);
                        setTimeout(() => setIsOffersVisible(true), 1000);
                    }
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setIsDetecting(false);
                    // Fallback to manual or just Bangalore
                    setLocation({ lat: 12.9716, lng: 77.5946 }, "Bangalore");
                    setShowLocationPrompt(false);
                    setTimeout(() => setIsOffersVisible(true), 1000);
                }
            );
        } else {
            setIsDetecting(false);
            setLocation({ lat: 12.9716, lng: 77.5946 }, "Bangalore");
            setShowLocationPrompt(false);
            setTimeout(() => setIsOffersVisible(true), 1000);
        }
    };

    const handleCloseLocation = () => {
        setShowLocationPrompt(false);
        setHasCheckedLocation(true);
    };

    return (
        <>
            {/* Location Detection Prompt */}
            <AnimatePresence>
                {showLocationPrompt && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={handleCloseLocation}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-fire/5 rounded-full -mr-16 -mt-16" />

                            <div className="flex flex-col items-center text-center relative z-10">
                                <div className="w-20 h-20 bg-fire/10 rounded-full flex items-center justify-center mb-6">
                                    <MapPin className="text-fire w-10 h-10" />
                                </div>
                                <h2 className="text-2xl font-display text-charcoal mb-4 uppercase italic tracking-wide">Where are you?</h2>
                                <p className="text-gray-600 mb-8 font-body">
                                    Detect your location to see exclusive pitmaster offers in your area.
                                </p>

                                <button
                                    onClick={handleDetectLocation}
                                    disabled={isDetecting}
                                    className="w-full h-14 bg-charcoal text-white rounded-2xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-fire transition-colors disabled:opacity-50"
                                >
                                    {isDetecting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Detecting...
                                        </>
                                    ) : (
                                        <>
                                            <Navigation size={18} />
                                            Detect Precise Location
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={handleCloseLocation}
                                    className="mt-4 text-gray-400 text-xs uppercase tracking-widest font-bold hover:text-charcoal transition-colors"
                                >
                                    Maybe Later
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Offers Popup */}
            <AnimatePresence>
                {isOffersVisible && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            onClick={() => setIsOffersVisible(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative w-full max-w-lg bg-[#FAF7F2] rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-charcoal p-8 text-center relative">
                                <button
                                    onClick={() => setIsOffersVisible(false)}
                                    className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Zap size={14} className="text-fire fill-fire" />
                                    <span className="text-fire font-bold uppercase tracking-[0.2em] text-[10px]">Flash Sale</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-display text-white italic tracking-wide">
                                    OFFERS YOU'LL LOVE!
                                </h2>
                                <p className="text-gray-400 font-body text-sm mt-2">
                                    Starting from <span className="text-fire font-bold">₹99</span> • Fresh in <span className="text-cream">{city || "Bangalore"}</span>
                                </p>
                            </div>

                            {/* Offers List */}
                            <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto">
                                <div className="space-y-4">
                                    {OFFER_ITEMS.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="bg-white rounded-3xl p-4 flex items-center gap-4 shadow-sm border border-black/5 group"
                                        >
                                            <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 relative">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                <div className="absolute top-1 right-1 bg-green-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                                                    {item.discount}
                                                </div>
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="font-display text-base text-charcoal leading-tight mb-1">{item.name}</h3>
                                                <p className="text-gray-400 text-[10px] mb-2">{item.weight}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xl font-bold text-charcoal">{item.price}</span>
                                                    <span className="text-gray-300 text-xs line-through">{item.originalPrice}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    // Map offer item to product type
                                                    addItem({
                                                        id: item.id,
                                                        name: item.name,
                                                        price: item.price,
                                                        priceValue: item.priceValue,
                                                        image: item.image,
                                                        description: item.name,
                                                        category: 'bbq',
                                                        subCategory: 'wings',
                                                        badges: ['Flash Sale'],
                                                        longDescription: item.name,
                                                        relatedProductIds: []
                                                    } as any);
                                                }}
                                                className="bg-charcoal text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-fire transition-colors shadow-lg"
                                            >
                                                Add
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-8 pt-0">
                                <button
                                    onClick={() => {
                                        setIsOffersVisible(false);
                                        document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="w-full py-4 border-2 border-charcoal/10 rounded-2xl text-charcoal font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-charcoal hover:text-white transition-all transform hover:-translate-y-1"
                                >
                                    EXPLORE ALL <ArrowRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};
