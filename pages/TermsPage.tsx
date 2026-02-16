import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, ShieldCheck, Scale, Clock } from 'lucide-react';

export const TermsPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-charcoal pt-32 pb-24 font-body">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center p-4 bg-fire/10 rounded-2xl text-fire mb-6">
                        <Scale size={40} />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-display text-cream mb-4 italic">Terms & Conditions</h1>
                    <p className="text-gray-400 uppercase tracking-[0.2em] text-xs font-bold">
                        Last Updated: February 17, 2026
                    </p>
                </motion.div>

                <div className="space-y-12 text-gray-300 leading-relaxed">
                    <section className="bg-white/5 p-8 rounded-3xl border border-white/5">
                        <h2 className="text-2xl font-display text-fire mb-6 flex items-center gap-3 italic">
                            1. INTRODUCTION
                        </h2>
                        <p className="mb-4">
                            Welcome to Smoke Signal BBQ (“we,” “our,” or “us”). These Terms and Conditions (“Terms”) govern your access to and use of our website www.smokesignalbbq.in (the “Website”), mobile applications, and services (collectively, the “Services”).
                        </p>
                        <p>
                            By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access the Services.
                        </p>

                        <div className="mt-6 space-y-2 text-sm">
                            <p><strong className="text-cream">Legal Name:</strong> Smoke Signal BBQ Private Limited</p>
                            <p><strong className="text-cream">Registered Address:</strong> Bangalore, Karnataka, India</p>
                            <p><strong className="text-cream">Email:</strong> legal@smokesignalbbq.in</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display text-fire mb-6 flex items-center gap-3 italic">
                            2. DEFINITIONS
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="py-4 font-bold text-cream">Term</th>
                                        <th className="py-4 font-bold text-cream">Definition</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-white/5">
                                        <td className="py-4 pr-4 font-bold text-fire">Customer</td>
                                        <td className="py-4">Any person who accesses or uses our Services</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="py-4 pr-4 font-bold text-fire">Order</td>
                                        <td className="py-4">A request to purchase products through our Services</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="py-4 pr-4 font-bold text-fire">Products</td>
                                        <td className="py-4">Food items, sauces, merchandise, and services offered for sale</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="border-l-4 border-fire/30 pl-8 py-2">
                        <h2 className="text-2xl font-display text-fire mb-6 italic">3. USE OF SERVICES</h2>
                        <h3 className="text-lg font-bold text-cream mb-3">3.1 Eligibility</h3>
                        <p className="mb-4">You must be at least 18 years old to use our Services. By using our Services, you represent and warrant that you have the legal capacity to enter into binding contracts.</p>

                        <h3 className="text-lg font-bold text-cream mb-3">3.2 Prohibited Activities</h3>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Use the Services for any illegal purpose</li>
                            <li>Infringe intellectual property rights</li>
                            <li>Transmit harmful code (viruses, malware)</li>
                            <li>Resell products without authorization</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display text-fire mb-6 italic">4. PRODUCTS AND ORDERS</h2>
                        <h3 className="text-lg font-bold text-cream mb-3">4.1 Product Information</h3>
                        <p className="mb-6 italic text-gray-400">Images of products are for illustrative purposes. Actual appearance may vary.</p>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <h4 className="font-bold text-fire mb-2 uppercase tracking-widest text-xs">Order Acceptance</h4>
                                <p className="text-sm">We reserve the right to refuse or cancel any order for reasons including product unavailability, pricing errors, or suspected fraud.</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <h4 className="font-bold text-fire mb-2 uppercase tracking-widest text-xs">Pricing</h4>
                                <p className="text-sm">All prices are in Indian Rupees (₹) and include GST unless stated otherwise. Delivery charges vary by distance.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display text-fire mb-6 italic">5. CANCELLATION & REFUNDS</h2>
                        <div className="bg-fire/5 border border-fire/20 p-8 rounded-3xl">
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-fire text-white flex items-center justify-center font-bold text-sm shrink-0 mt-1">1</div>
                                    <div>
                                        <p className="text-cream font-bold">Within 5 minutes of order</p>
                                        <p className="text-sm text-gray-400">Full refund if cancelled via app/WhatsApp.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-fire text-white flex items-center justify-center font-bold text-sm shrink-0 mt-1">2</div>
                                    <div>
                                        <p className="text-cream font-bold">After preparation begins</p>
                                        <p className="text-sm text-gray-400">Store credit only. Contact customer care immediately.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-fire text-white flex items-center justify-center font-bold text-sm shrink-0 mt-1">3</div>
                                    <div>
                                        <p className="text-cream font-bold">After dispatch</p>
                                        <p className="text-sm text-gray-400">No cancellation or refund possible.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section className="bg-white/5 p-8 rounded-3xl border border-white/5">
                        <h2 className="text-2xl font-display text-fire mb-6 italic">6. QUALITY GUARANTEE</h2>
                        <p className="mb-6 text-cream font-bold">We stand behind the quality of our BBQ. If you have an issue, please report it within the specified timeframes:</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="px-4 py-3 border border-white/10 rounded-xl flex justify-between items-center">
                                <span>Wrong item delivered</span>
                                <span className="text-fire font-bold">1 Hour</span>
                            </div>
                            <div className="px-4 py-3 border border-white/10 rounded-xl flex justify-between items-center">
                                <span>Missing items</span>
                                <span className="text-fire font-bold">1 Hour</span>
                            </div>
                            <div className="px-4 py-3 border border-white/10 rounded-xl flex justify-between items-center">
                                <span>Quality concerns</span>
                                <span className="text-fire font-bold">2 Hours</span>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-display text-fire mb-6 italic">7. INTELLECTUAL PROPERTY</h2>
                        <p>All content on this Website, including text, graphics, logos, images, and recipes is property of Smoke Signal BBQ and protected by copyright laws.</p>
                    </section>

                    <section className="text-center pt-8 border-t border-white/5">
                        <p className="text-gray-500 mb-4">Questions about these Terms?</p>
                        <a href="mailto:legal@smokesignalbbq.in" className="inline-block bg-white/5 px-8 py-3 rounded-full text-fire font-bold hover:bg-fire hover:text-white transition-all">
                            Contact Legal Team
                        </a>
                    </section>
                </div>
            </div>

            {/* Background Texture */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
                style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}>
            </div>
        </div>
    );
};
