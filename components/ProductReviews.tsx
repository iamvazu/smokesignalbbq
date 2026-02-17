import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, Send, CheckCircle2, User, Clock, AlertCircle } from 'lucide-react';
import axios from 'axios';
const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

const API_URL = (import.meta as any).env.VITE_API_URL || '/api/v1';

interface Review {
    id: string;
    customerName: string;
    rating: number;
    comment: string;
    createdAt: string;
}

interface ProductReviewsProps {
    productId?: string;
    comboId?: string;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, comboId }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        customerName: '',
        rating: 5,
        comment: ''
    });

    useEffect(() => {
        fetchReviews();
    }, [productId, comboId]);

    const fetchReviews = async () => {
        try {
            const res = await axios.get(`${API_URL}/reviews/approved`, {
                params: { productId, comboId }
            });
            setReviews(res.data);
        } catch (error) {
            console.error('Failed to fetch reviews', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post(`${API_URL}/reviews/submit`, {
                ...formData,
                productId,
                comboId
            });
            setSubmitted(true);
            setTimeout(() => {
                setShowForm(false);
                setSubmitted(false);
                setFormData({ customerName: '', rating: 5, comment: '' });
            }, 3000);
        } catch (error) {
            alert('Failed to submit review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const StarRating = ({ rating, interactive = false, onSelect }: { rating: number, interactive?: boolean, onSelect?: (r: number) => void }) => (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    disabled={!interactive}
                    onClick={() => onSelect?.(star)}
                    className={cn(
                        "transition-all duration-300",
                        interactive ? "hover:scale-125 cursor-pointer" : "cursor-default",
                        star <= rating ? "text-fire fill-fire" : "text-gray-600"
                    )}
                >
                    <Star size={interactive ? 24 : 14} />
                </button>
            ))}
        </div>
    );

    return (
        <div className="mt-24 pt-16 border-t border-white/5 relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-fire">
                        <MessageSquare size={14} className="fill-fire" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Operative Intelligence</span>
                    </div>
                    <h2 className="text-4xl font-display text-cream italic tracking-wide lowercase">Pitmaster Reviews</h2>
                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-cream hover:bg-fire hover:text-white transition-all shadow-xl"
                >
                    {showForm ? 'Cancel Report' : 'Write a Review'}
                </button>
            </div>

            <AnimatePresence mode="wait">
                {showForm ? (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-16 overflow-hidden"
                    >
                        <div className="bg-white/5 rounded-[2.5rem] p-8 md:p-12 border border-white/10 relative overflow-hidden">
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 size={40} className="text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-display text-cream italic mb-2 tracking-wide">INTELLIGENCE RECEIVED</h3>
                                    <p className="text-gray-400 text-sm">Thanks for the briefing! Your review is being moderated by the Pitmaster.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] uppercase tracking-widest text-fire font-bold ml-1">Your Tactical Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.customerName}
                                                    onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                                                    placeholder="e.g. Maverick"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-fire transition-all"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] uppercase tracking-widest text-fire font-bold ml-1">Mission Rating</label>
                                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-center">
                                                    <StarRating
                                                        rating={formData.rating}
                                                        interactive
                                                        onSelect={r => setFormData({ ...formData, rating: r })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest text-fire font-bold ml-1">Detailed Briefing (Optional)</label>
                                            <textarea
                                                value={formData.comment}
                                                onChange={e => setFormData({ ...formData, comment: e.target.value })}
                                                placeholder="Tell us about the flavour profile, tender levels, or smoke ring..."
                                                className="w-full h-[155px] bg-white/5 border border-white/10 rounded-3xl py-4 px-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-fire transition-all resize-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-10 py-5 bg-fire text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-fire-dark transition-all transform hover:scale-[1.02] shadow-2xl shadow-fire/20"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>DEPLOY REVIEW <Send size={16} /></>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                    [1, 2, 3].map(i => (
                        <div key={i} className="bg-white/2 rounded-3xl p-8 border border-white/5 h-48 animate-pulse" />
                    ))
                ) : reviews.length === 0 ? (
                    <div className="col-span-full py-12 text-center border-2 border-dashed border-white/5 rounded-3xl">
                        <AlertCircle className="mx-auto text-gray-600 mb-4" size={32} />
                        <p className="text-gray-500 uppercase tracking-widest font-black text-[10px]">No field reports detected for this target.</p>
                        <p className="text-gray-600 text-xs mt-2">Be the first operative to report!</p>
                    </div>
                ) : (
                    reviews.map((review, i) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/2 rounded-[2.5rem] p-8 border border-white/5 hover:border-white/10 transition-all flex flex-col group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-fire/5 rounded-full -mr-12 -mt-12 blur-2xl opacity-0 group-hover:opacity-100 transition-all" />

                            <div className="flex items-center justify-between mb-6 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-fire">
                                        <User size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-display text-cream tracking-wide text-lg leading-none">{review.customerName}</h4>
                                        <StarRating rating={review.rating} />
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-500 text-[9px] font-black uppercase tracking-widest">
                                    <Clock size={10} /> {new Date(review.createdAt).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="flex-1 relative z-10">
                                <p className="text-gray-400 text-sm leading-relaxed italic line-clamp-4">
                                    "{review.comment}"
                                </p>
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-green-500/80">Verified Report</span>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};
