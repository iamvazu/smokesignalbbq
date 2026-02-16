import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
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
                        <Lock size={40} />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-display text-cream mb-4 italic">Privacy Policy</h1>
                    <p className="text-gray-400 uppercase tracking-[0.2em] text-xs font-bold">
                        Last Updated: February 17, 2026
                    </p>
                </motion.div>

                <div className="space-y-12 text-gray-300 leading-relaxed">
                    <section className="bg-white/5 p-8 rounded-3xl border border-white/5">
                        <h2 className="text-2xl font-display text-fire mb-6 italic">1. INTRODUCTION</h2>
                        <p className="mb-4">
                            Smoke Signal BBQ Private Limited (“we,” “our,” or “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our website, mobile applications, and services (collectively, the “Services”).
                        </p>
                        <p>
                            We comply with the Information Technology Act, 2000 (India) and the Digital Personal Data Protection Act, 2023.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display text-fire mb-6 italic">2. INFORMATION WE COLLECT</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <h3 className="text-fire font-bold mb-3 flex items-center gap-2 uppercase tracking-widest text-xs">
                                    <div className="w-1.5 h-1.5 rounded-full bg-fire" />
                                    Identity Data
                                </h3>
                                <p className="text-sm">Name, date of birth for account creation and age verification.</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <h3 className="text-fire font-bold mb-3 flex items-center gap-2 uppercase tracking-widest text-xs">
                                    <div className="w-1.5 h-1.5 rounded-full bg-fire" />
                                    Contact Data
                                </h3>
                                <p className="text-sm">Phone number, email, and delivery address for order fulfillment.</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <h3 className="text-fire font-bold mb-3 flex items-center gap-2 uppercase tracking-widest text-xs">
                                    <div className="w-1.5 h-1.5 rounded-full bg-fire" />
                                    Payment Info
                                </h3>
                                <p className="text-sm">Tokenized payment data processed by PCI-DSS compliant gateways.</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <h3 className="text-fire font-bold mb-3 flex items-center gap-2 uppercase tracking-widest text-xs">
                                    <div className="w-1.5 h-1.5 rounded-full bg-fire" />
                                    Usage Data
                                </h3>
                                <p className="text-sm">IP address, browser type, and location data for service optimization.</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white/5 p-8 rounded-3xl border border-white/5">
                        <h2 className="text-2xl font-display text-fire mb-6 italic">3. DATA SECURITY</h2>
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="shrink-0 w-24 h-24 bg-fire/10 rounded-full flex items-center justify-center text-fire">
                                <Shield size={48} />
                            </div>
                            <div className="space-y-4">
                                <p>We implement top-tier technical measures including:</p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 text-sm">
                                    <li className="flex items-center gap-2"><span className="text-fire">✔</span> AES-256 Encryption at rest</li>
                                    <li className="flex items-center gap-2"><span className="text-fire">✔</span> TLS 1.3 Encryption in transit</li>
                                    <li className="flex items-center gap-2"><span className="text-fire">✔</span> Multi-factor authentication</li>
                                    <li className="flex items-center gap-2"><span className="text-fire">✔</span> Regular security audits</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display text-fire mb-6 italic">4. DATA SHARING</h2>
                        <p className="mb-6">We only share your information with trusted partners necessary for service delivery:</p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 text-fire uppercase tracking-widest text-[10px] font-bold">
                                        <th className="py-4">Category</th>
                                        <th className="py-4">Examples</th>
                                        <th className="py-4">Purpose</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    <tr className="border-b border-white/5">
                                        <td className="py-4 font-bold text-cream">Payment</td>
                                        <td className="py-4">Razorpay, PayU</td>
                                        <td className="py-4">Transaction processing</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="py-4 font-bold text-cream">Delivery</td>
                                        <td className="py-4">Dunzo, Shadowfax</td>
                                        <td className="py-4">Logistics fulfillment</td>
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="py-4 font-bold text-cream">Cloud</td>
                                        <td className="py-4">AWS, Google Cloud</td>
                                        <td className="py-4">Data storage (India)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="border-l-4 border-fire/30 pl-8 py-2">
                        <h2 className="text-2xl font-display text-fire mb-6 italic">5. YOUR RIGHTS</h2>
                        <div className="space-y-4">
                            <p>You have the right to access, correct, or delete your personal data. You may also withdraw your consent for marketing at any time.</p>
                            <div className="grid md:grid-cols-3 gap-4 text-xs font-bold uppercase tracking-widest text-center mt-6">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">Access Data</div>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">Request Deletion</div>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">Opt-out Marketing</div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-red-900/10 p-8 rounded-3xl border border-red-900/20">
                        <h2 className="text-2xl font-display text-fire mb-4 italic">GRIEVANCE OFFICER</h2>
                        <p className="text-sm mb-4 italic text-gray-400">Under the Information Technology Act, 2000:</p>
                        <div className="text-sm space-y-2">
                            <p><strong className="text-cream">Email:</strong> grievance@smokesignalbbq.in</p>
                            <p><strong className="text-cream">Response Time:</strong> 30 days from complaint receipt</p>
                        </div>
                    </section>

                    <section className="text-center pt-8 border-t border-white/5">
                        <p className="text-gray-500 mb-4">Privacy concerns? Dedicated support is here.</p>
                        <a href="mailto:privacy@smokesignalbbq.in" className="inline-block bg-white/5 px-8 py-3 rounded-full text-fire font-bold hover:bg-fire hover:text-white transition-all">
                            Reach Privacy Team
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
