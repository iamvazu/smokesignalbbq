import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, MapPin, Loader2, ShieldCheck, CheckCircle2, Mail, Send } from 'lucide-react';

import axios from 'axios';
import { useCartStore } from '../store';
import { Button } from './Button';

// @ts-ignore
const API_URL = (import.meta as any).env.VITE_API_URL || '/api/v1';


// RS Palaya, Kammanahalli Coordinates (Approx)
const STORE_LOCATION = { lat: 13.0097, lng: 77.6366 };

export const ShoppingCart: React.FC = () => {
    const { items, isOpen, toggleCart, updateQuantity, removeItem, clearCart } = useCartStore();

    const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [deliveryError, setDeliveryError] = useState<string | null>(null);

    // User Details State
    const [userDetails, setUserDetails] = useState({
        name: '',
        mobile: '',
        address: '',
        email: ''
    });

    const [orderSuccess, setOrderSuccess] = useState<{ id: string, fullId: string } | null>(null);

    const [sendingEmail, setSendingEmail] = useState(false);
    const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent'>('idle');


    // Calculations
    const subtotal = items.reduce((acc, item) => acc + ((item.priceValue || 0) * item.quantity), 0);
    const gst = subtotal * 0.18;
    const finalTotal = subtotal + gst + (deliveryFee || 0);

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const handleCalculateDelivery = () => {
        setIsCalculating(true);
        setDeliveryError(null);

        if (!navigator.geolocation) {
            setDeliveryError("Geolocation is not supported");
            setIsCalculating(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                const distance = calculateDistance(STORE_LOCATION.lat, STORE_LOCATION.lng, userLat, userLng);

                // Fetch Area Name using Reverse Geocoding (Nominatim)
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLat}&lon=${userLng}`)
                    .then(res => res.json())
                    .then(data => {
                        const addr = data.address;
                        const area = addr.suburb || addr.neighbourhood || addr.village || addr.subdivision || addr.residential || '';
                        const city = addr.city || addr.town || addr.state_district || '';

                        if (area || city) {
                            setUserDetails(prev => ({
                                ...prev,
                                address: `${area}${area && city ? ', ' : ''}${city}`
                            }));
                        }
                    })
                    .catch(e => console.error("Geocoding failed", e));

                if (subtotal >= 999) {
                    setDeliveryFee(0);
                } else {
                    const cost = 55 + (Math.ceil(distance) * 15);
                    setDeliveryFee(Math.round(cost));
                }
                setIsCalculating(false);
            },
            () => {
                setDeliveryError("Enable location for delivery estimate");
                setIsCalculating(false);
            }
        );
    };

    const handleCheckout = async () => {
        if (!userDetails.name || !userDetails.mobile || !userDetails.address) {
            alert("Please fill in all delivery details");
            return;
        }

        setIsCalculating(true);
        try {
            // 1. Create Order in Backend
            const orderData = {
                customerName: userDetails.name,
                customerPhone: userDetails.mobile,
                addressLine1: userDetails.address,
                city: "Bangalore",
                items: items.map(item => ({
                    productId: item.category !== 'combo' ? item.id : undefined,
                    comboId: item.category === 'combo' ? item.id : undefined,
                    name: item.name,
                    quantity: item.quantity,
                    price: Number(item.priceValue)
                })),
                totalAmount: Math.round(finalTotal),
                deliveryFee: deliveryFee || 0,
                taxAmount: Math.round(gst),
                paymentMethod: "WhatsApp/COD"
            };

            const response = await axios.post(`${API_URL}/orders`, orderData);
            const orderId = response.data.id.split('-')[0].toUpperCase();

            // 2. Generate WhatsApp message
            let message = `*🔥 NEW ORDER REQUEST 🔥*\n`;
            message += `Order ID: #${orderId}\n`;
            message += `----------------------------\n\n`;

            message += `*👤 CUSTOMER DETAILS*\n`;
            message += `Name: ${userDetails.name}\n`;
            message += `Phone: ${userDetails.mobile}\n`;
            message += `Address: ${userDetails.address}\n\n`;

            message += `*🛒 ORDER SUMMARY*\n`;
            items.forEach(item => {
                message += `• ${item.quantity}x ${item.name} ${item.variant ? `(${item.variant})` : ''} - ₹${(item.priceValue || 0) * item.quantity}\n`;
            });

            message += `\n*💰 BILLING*\n`;
            message += `Subtotal: ₹${subtotal}\n`;
            message += `GST (18%): ₹${gst.toFixed(2)}\n`;

            if (deliveryFee !== null) {
                message += `Delivery: ${deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}\n`;
            }

            message += `\n*TOTAL: ₹${finalTotal.toFixed(2)}*\n`;
            message += `----------------------------\n`;
            message += `_Please confirm your order by replying to this message._`;

            // 3. Redirect to WhatsApp
            window.open(`https://wa.me/917899870957?text=${encodeURIComponent(message)}`, '_blank');

            // 4. Set Success State
            setOrderSuccess({ id: orderId, fullId: response.data.id });
            clearCart();

            // Don't toggleCart yet, show success view


        } catch (error: any) {
            console.error('Failed to create order', error);
            const errorMsg = error.response?.data?.error || "Something went wrong while placing your order. Please try again.";
            alert(`Error: ${errorMsg}`);
        } finally {
            setIsCalculating(false);
        }
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSendInvoice = async () => {
        if (!userDetails.email || !orderSuccess) return;
        setSendingEmail(true);
        setEmailStatus('sending');
        try {
            await axios.post(`${API_URL}/orders/${orderSuccess.fullId}/invoice`, { email: userDetails.email });
            setEmailStatus('sent');
        } catch (error) {
            setEmailStatus('idle');
            alert("Failed to send invoice. Please try again.");
        } finally {
            setSendingEmail(false);
        }
    };


    const handleClose = () => {
        setOrderSuccess(null);
        setEmailStatus('idle');
        toggleCart();
    };


    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                        onClick={toggleCart}
                    />

                    {/* Cart Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-charcoal border-l border-burnt z-[70] flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-charcoal">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="text-fire" size={24} />
                                <h2 className="font-display text-2xl text-cream">Your Feast</h2>
                                <span className="bg-fire text-white text-xs font-bold px-2 py-1 rounded-full">{items.length}</span>
                            </div>
                            <button
                                onClick={toggleCart}
                                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Cart Items or Success View */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                            {orderSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center p-6 space-y-6"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full" />
                                        <CheckCircle2 size={80} className="text-green-500 relative" />
                                    </div>

                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-display text-cream">Order Placed!</h2>
                                        <p className="text-gray-400">
                                            Your order <span className="text-fire font-bold">#{orderSuccess.id}</span> is successfully placed.
                                        </p>
                                    </div>

                                    <div className="bg-black/30 p-4 rounded-xl border border-white/5 w-full">
                                        <p className="text-sm text-gray-300 leading-relaxed mb-4">
                                            Please check your <span className="text-[#25D366] font-bold">WhatsApp</span> messages for updates. We've sent you the order summary there.
                                        </p>

                                        <div className="space-y-3">
                                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Want a digital invoice?</p>
                                            <div className="flex gap-2">
                                                <div className="relative flex-1">
                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        placeholder="Enter your email"
                                                        value={userDetails.email}
                                                        onChange={handleInputChange}
                                                        disabled={emailStatus === 'sent'}
                                                        className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-cream placeholder-gray-600 focus:outline-none focus:border-fire/50 disabled:opacity-50"
                                                    />
                                                </div>
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    onClick={handleSendInvoice}
                                                    disabled={!userDetails.email || emailStatus !== 'idle'}
                                                    className="px-4 shrink-0"
                                                >
                                                    {emailStatus === 'sending' ? <Loader2 className="animate-spin" size={16} /> :
                                                        emailStatus === 'sent' ? <CheckCircle2 size={16} /> :
                                                            <Send size={16} />}
                                                </Button>
                                            </div>
                                            {emailStatus === 'sent' && (
                                                <p className="text-[10px] text-green-500 flex items-center justify-center gap-1">
                                                    <CheckCircle2 size={10} /> Invoice sent successfully!
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        onClick={handleClose}
                                        className="mt-4 border border-white/10 hover:bg-white/5"
                                    >
                                        Back to Menu
                                    </Button>
                                </motion.div>
                            ) : items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                                    <ShoppingBag size={48} className="mb-4 text-gray-500" />
                                    <p className="text-xl font-display text-gray-400">Your cart is empty</p>
                                    <p className="text-gray-500 text-sm mt-2">Time to add some smoke & fire!</p>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        key={item.variantId}
                                        className="flex gap-4 bg-black/20 p-4 rounded-lg border border-white/5"
                                    >
                                        {/* Item Image */}
                                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-charcoal">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>

                                        {/* Item Details */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-bold text-cream text-lg leading-tight mb-1">{item.name}</h3>
                                                {item.variant && <span className="text-xs uppercase tracking-wider text-fire border border-fire/30 px-1 rounded mb-1 inline-block">{item.variant}</span>}
                                                <p className="text-gray-300 text-sm font-bold">₹{item.priceValue || 0} x {item.quantity}</p>
                                            </div>

                                            {/* Controls */}
                                            <div className="flex items-center justify-between mt-3">
                                                <div className="flex items-center bg-black/40 rounded-lg border border-white/10">
                                                    <button
                                                        onClick={() => updateQuantity(item.variantId, 'decrease')}
                                                        className="p-1.5 hover:text-fire transition-colors disabled:opacity-30"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-bold text-cream">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.variantId, 'increase')}
                                                        className="p-1.5 hover:text-fire transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(item.variantId)}
                                                    className="text-gray-500 hover:text-red-500 transition-colors p-1.5"
                                                    title="Remove item"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer / Checkout */}
                        {items.length > 0 && !orderSuccess && (

                            <div className="flex-none max-h-[60vh] overflow-y-auto p-4 border-t border-white/10 bg-charcoal shadow-[0_-5px_20px_rgba(0,0,0,0.5)] z-20">
                                {/* Bill Details */}
                                <div className="space-y-2 mb-4 bg-black/20 p-3 rounded-lg">
                                    <div className="flex justify-between text-gray-400 text-xs">
                                        <span>Subtotal</span>
                                        <span>₹{subtotal}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400 text-sm">
                                        <span>GST (18%)</span>
                                        <span>₹{gst.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-gray-400 text-xs">
                                        <span>Delivery (Approx)</span>
                                        {deliveryFee !== null ? (
                                            <span className={deliveryFee === 0 ? "text-green-500 font-bold" : "text-fire font-bold"}>
                                                {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                                            </span>
                                        ) : (
                                            <button
                                                onClick={handleCalculateDelivery}
                                                disabled={isCalculating}
                                                className="flex items-center gap-1 text-xs text-fire border border-fire/50 px-2 py-0.5 rounded hover:bg-fire hover:text-white transition-colors disabled:opacity-50"
                                            >
                                                {isCalculating ? "Detecting..." : "Use My Location"}
                                            </button>
                                        )}
                                    </div>
                                    {subtotal < 999 && (
                                        <div className="mt-2">
                                            <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                                                <span>Free delivery at ₹999</span>
                                                <span>Add ₹{999 - subtotal} more</span>
                                            </div>
                                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-fire transition-all duration-500"
                                                    style={{ width: `${(subtotal / 999) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {subtotal >= 999 && (
                                        <p className="text-[10px] text-green-500 mt-1 flex items-center gap-1">
                                            <ShieldCheck size={10} /> You've unlocked FREE Delivery!
                                        </p>
                                    )}

                                    {deliveryError && (
                                        <p className="text-red-500 text-[10px] text-right bg-red-500/10 p-1 rounded">{deliveryError}</p>
                                    )}
                                    <div className="h-px bg-white/10 my-2" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-cream font-bold text-base">Grand Total</span>
                                        <span className="text-xl font-display text-fire">₹{finalTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* User Details Form */}
                                <div className="space-y-2 mb-4">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={userDetails.name}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/20 border border-white/10 rounded p-2 text-sm text-cream placeholder-gray-500 focus:outline-none focus:border-fire/50"
                                    />
                                    <input
                                        type="tel"
                                        name="mobile"
                                        placeholder="Mobile Number"
                                        value={userDetails.mobile}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/20 border border-white/10 rounded p-2 text-sm text-cream placeholder-gray-500 focus:outline-none focus:border-fire/50"
                                    />
                                    <textarea
                                        name="address"
                                        placeholder="Delivery Address"
                                        value={userDetails.address}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/20 border border-white/10 rounded p-2 text-sm text-cream placeholder-gray-500 focus:outline-none focus:border-fire/50 h-16 resize-none"
                                    />
                                </div>

                                <Button
                                    variant="primary"
                                    onClick={handleCheckout}
                                    className="w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={!userDetails.name || !userDetails.mobile || !userDetails.address}
                                >
                                    Place Order via WhatsApp
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
