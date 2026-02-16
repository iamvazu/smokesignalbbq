import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, Info, List, Share2, ShieldCheck, Clock, UserCheck, HelpCircle, Globe, MessageCircle, MapPin, Mail, Phone, Scale, AlertCircle } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-charcoal pt-32 pb-24 font-body">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center justify-center p-5 bg-fire/10 rounded-3xl text-fire mb-8 shadow-2xl shadow-fire/10">
                        <Lock size={48} />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display text-cream mb-6 italic leading-tight">Privacy Policy</h1>
                    <div className="flex items-center justify-center gap-4 text-gray-400 uppercase tracking-[0.3em] text-xs font-bold">
                        <span className="w-8 h-px bg-white/10" />
                        Last Updated: February 17, 2026
                        <span className="w-8 h-px bg-white/10" />
                    </div>
                </motion.div>

                <div className="space-y-16 text-gray-300 leading-relaxed">

                    {/* 1. Introduction */}
                    <section className="bg-white/5 p-8 md:p-12 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700">
                            <Info size={120} />
                        </div>
                        <h2 className="text-3xl font-display text-fire mb-8 flex items-center gap-4 italic">
                            <span className="text-white/10 font-sans not-italic text-5xl">01.</span>
                            INTRODUCTION
                        </h2>
                        <div className="space-y-4 relative z-10">
                            <p className="text-lg text-cream/90 font-medium">
                                Smoke Signal BBQ Private Limited (“we,” “our,” or “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our website, mobile applications, and services (collectively, the “Services”).
                            </p>
                            <div className="mt-8 grid md:grid-cols-2 gap-4 text-xs font-mono text-gray-400 uppercase tracking-widest">
                                <div className="p-4 bg-black/30 rounded-xl border border-white/5">IT Act, 2000 (India)</div>
                                <div className="p-4 bg-black/30 rounded-xl border border-white/5">DPDP Act, 2023</div>
                            </div>
                        </div>
                    </section>

                    {/* 2. Information We Collect */}
                    <section>
                        <h2 className="text-3xl font-display text-fire mb-10 flex items-center gap-4 italic">
                            <span className="text-white/10 font-sans not-italic text-5xl">02.</span>
                            INFORMATION WE COLLECT
                        </h2>

                        <div className="grid gap-6">
                            {[
                                { title: '2.1 Personal Information You Provide', desc: 'Identity (Name, DOB), Contact (Phone, Email, Address), Payment (Tokenized details), Order History, Event Details, Feedback, Franchise Application info.', icon: <UserCheck /> },
                                { title: '2.2 Automatically Collected', desc: 'Device (IP, Browser, OS), Usage (Pages visited, time, clicks), Location (GPS/IP), Cookies (Session IDs, preferences).', icon: <Database /> },
                                { title: '2.3 Third-Party Sources', desc: 'Payment processors, Delivery partners (status/location), Social media connections, and Marketing partners.', icon: <Share2 /> }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 bg-white/5 p-8 rounded-3xl border border-white/5 items-start">
                                    <div className="shrink-0 w-12 h-12 bg-fire/10 rounded-xl flex items-center justify-center text-fire">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-cream mb-2 italic">{item.title}</h3>
                                        <p className="text-sm text-gray-400">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-6 p-4 bg-black/40 rounded-xl text-xs text-gray-500 italic border-l-2 border-fire/30">
                            Payment Info: We do not store complete card numbers. All data is tokenized by PCI-DSS compliant gateways like Razorpay or Stripe.
                        </p>
                    </section>

                    {/* 3. How We Use */}
                    <section className="bg-white/5 p-8 md:p-12 rounded-[2.5rem] border border-white/5">
                        <h2 className="text-3xl font-display text-fire mb-10 italic flex items-center gap-4">
                            <span className="text-white/10 font-sans not-italic text-5xl">03.</span>
                            HOW WE USE YOUR INFORMATION
                        </h2>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-sm">
                            {[
                                { p: 'Order Processing', l: 'Contract', i: 'Contact, Address, Payment' },
                                { p: 'Delivery Fulfillment', l: 'Contract', i: 'Address, Phone, Location' },
                                { p: 'Customer Support', l: 'Legitimate Interest', i: 'Relevant History' },
                                { p: 'Marketing (Opt-in)', l: 'Consent', i: 'Email, Phone, Preferences' },
                                { p: 'Legal Compliance', l: 'Legal Obligation', i: 'Identity, Transactions' },
                                { p: 'Fraud Prevention', l: 'Legitimate Interest', i: 'Device, Patterns' }
                            ].map((row, i) => (
                                <div key={i} className="space-y-2 pb-6 border-b border-white/5">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-cream">{row.p}</span>
                                        <span className="text-[10px] bg-fire/10 text-fire px-2 py-0.5 rounded-full uppercase font-bold">{row.l}</span>
                                    </div>
                                    <p className="text-gray-500 text-xs">Used: {row.i}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 4. Cookies */}
                    <section>
                        <h2 className="text-3xl font-display text-fire mb-10 italic flex items-center gap-4">
                            <span className="text-white/10 font-sans not-italic text-5xl">04.</span>
                            COOKIES & TRACKING
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div className="space-y-4">
                                <h4 className="text-cream font-bold italic">4.1 Types We Use</h4>
                                <div className="space-y-2 text-xs">
                                    <p><strong className="text-fire">Essential:</strong> Functionality & Security (Session)</p>
                                    <p><strong className="text-fire">Preferences:</strong> Lang, Location, Items (1 Year)</p>
                                    <p><strong className="text-fire">Analytics:</strong> Google Analytics behavior (2 Years)</p>
                                    <p><strong className="text-fire">Marketing:</strong> FB Pixel, Retargeting (90 Days)</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-cream font-bold italic">4.2 Your Choices</h4>
                                <p className="text-xs text-gray-500">Manage via browser settings, our cookie banner, or dedicated opt-out tools (e.g., Google Analytics Opt-out add-on). Blocking essential cookies may break site features.</p>
                            </div>
                        </div>
                    </section>

                    {/* 5. How We Share */}
                    <section className="bg-fire/5 p-8 md:p-12 rounded-[2.5rem] border border-fire/10">
                        <h2 className="text-3xl font-display text-fire mb-8 italic flex items-center gap-4">
                            <span className="text-white/10 font-sans not-italic text-5xl">05.</span>
                            HOW WE SHARE INFORMATION
                        </h2>
                        <div className="space-y-8">
                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    { t: 'Service Providers', d: 'Payment (Razorpay), Delivery (Dunzo), Cloud (AWS), Analytics (Google).' },
                                    { t: 'Franchisees', d: 'Order details shared with specific location for fulfillment.' },
                                    { t: 'Legal/Business', d: 'Court orders, compliance, or in case of business merger/sale.' }
                                ].map((box, i) => (
                                    <div key={i} className="p-6 bg-black/30 rounded-2xl border border-white/5">
                                        <h4 className="text-cream font-bold text-sm mb-2">{box.t}</h4>
                                        <p className="text-xs text-gray-500">{box.d}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-center text-xs italic text-gray-500">We will seek explicit consent for any purpose not listed above.</p>
                        </div>
                    </section>

                    {/* 6. Security */}
                    <section>
                        <h2 className="text-3xl font-display text-fire mb-10 italic flex items-center gap-4">
                            <span className="text-white/10 font-sans not-italic text-5xl">06.</span>
                            DATA SECURITY
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h4 className="text-cream font-bold italic">6.1 Measures</h4>
                                <div className="grid grid-cols-1 gap-4 text-xs font-mono">
                                    <div className="flex justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                                        <span>Encryption (Transit)</span>
                                        <span className="text-fire">TLS 1.3</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                                        <span>Encryption (Rest)</span>
                                        <span className="text-fire">AES-256</span>
                                    </div>
                                    <p className="text-gray-500 italic p-1">Includes Multi-factor Auth, Access control, and regular audits.</p>
                                </div>
                            </div>
                            <div className="bg-red-950/20 p-8 rounded-3xl border border-red-500/10">
                                <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2 uppercase tracking-widest text-[10px]">
                                    <AlertCircle size={16} />
                                    6.2 Data Breach
                                </h4>
                                <p className="text-xs text-gray-400">In case of unauthorized access, we notify affected users within 72 hours (where feasible) and take immediate remedial action.</p>
                            </div>
                        </div>
                    </section>

                    {/* 7. Retention */}
                    <section className="bg-white/5 p-8 rounded-3xl border border-white/5 border-dashed">
                        <h2 className="text-3xl font-display text-fire mb-8 italic flex items-center gap-4">
                            <span className="text-white/10 font-sans not-italic text-5xl">07.</span>
                            DATA RETENTION
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { t: 'Accounts', p: 'Duration + 2yr' },
                                { t: 'Order History', p: '7 Years (Tax)' },
                                { t: 'Payment/Audit', p: '7 Years' },
                                { t: 'Marketing', p: 'Until Unsub' }
                            ].map((item, i) => (
                                <div key={i} className="p-4 bg-black/20 rounded-2xl text-center border border-white/5">
                                    <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">{item.t}</div>
                                    <div className="text-sm text-cream font-mono">{item.p}</div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 text-[10px] text-gray-600 italic text-center">User-deleted accounts are held for 90 days before permanent removal.</p>
                    </section>

                    {/* 8. Your Rights */}
                    <section>
                        <h2 className="text-3xl font-display text-fire mb-10 italic flex items-center gap-4">
                            <span className="text-white/10 font-sans not-italic text-5xl">08.</span>
                            YOUR RIGHTS
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden">
                            {[
                                { t: '8.1 Access', d: 'Request a copy of info' },
                                { t: '8.2 Correction', d: 'Fix inaccuracies' },
                                { t: '8.3 Deletion', d: 'Right to be Forgotten' },
                                { t: '8.4 Withdraw', d: 'Opt-out of marketing' },
                                { t: '8.5 Portability', d: 'Data in JSON/CSV' },
                                { t: '8.6 Object', d: 'Object to processing' },
                                { t: '8.7 Restriction', d: 'Restrict processing' }
                            ].map((r, i) => (
                                <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center flex flex-col items-center">
                                    <span className="text-cream font-bold text-xs mb-2">{r.t}</span>
                                    <span className="text-[10px] text-gray-500 uppercase font-mono">{r.d}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 9-11. Procedures */}
                    <section className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <h4 className="text-fire font-bold uppercase tracking-widest text-[10px]">09. Exercise Rights</h4>
                            <p className="text-xs text-gray-400">Email privacy@smokesignalbbq.in. Response within 30 days. Verification required.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-fire font-bold uppercase tracking-widest text-[10px]">10. Children Policy</h4>
                            <p className="text-xs text-gray-400">Not intended for ages &lt;13. We delete inadvertent collections immediately.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-fire font-bold uppercase tracking-widest text-[10px]">11. Intl Transfers</h4>
                            <p className="text-xs text-gray-400">Currently all data in India. Future transfers will ensure adequate protection.</p>
                        </div>
                    </section>

                    {/* 12-14. Platform specific */}
                    <section className="bg-white/5 p-8 md:p-12 rounded-[2.5rem] border border-white/5">
                        <div className="grid md:grid-cols-3 gap-12">
                            <div className="space-y-4">
                                <h4 className="text-green-500 font-bold flex items-center gap-2">
                                    <MessageCircle size={18} />
                                    12. WhatsApp
                                </h4>
                                <p className="text-xs text-gray-400 italic">Opt-in messaging for updates. Retained per policy. Subject to WhatsApp platform terms.</p>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-blue-400 font-bold flex items-center gap-2">
                                    <MapPin size={18} />
                                    13. Location
                                </h4>
                                <p className="text-xs text-gray-400 italic">Precise GPS for delivery; Approx IP for suggestions. Control via device settings.</p>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-orange-400 font-bold flex items-center gap-2">
                                    <Mail size={18} />
                                    14. Marketing
                                </h4>
                                <p className="text-xs text-gray-400 italic">Emails/WhatsApp with clear opt-out. Transactional messages always sent.</p>
                            </div>
                        </div>
                    </section>

                    {/* 15-16. Legal stuff */}
                    <section className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-display text-fire italic">15. POLICY CHANGES</h2>
                            <p className="text-sm text-gray-400">Material changes notified via Email + Website banner. Continued use constitutes acceptance.</p>
                        </div>
                        <div className="bg-red-950/20 p-8 rounded-[2rem] border border-red-500/10">
                            <h2 className="text-xl font-display text-red-400 mb-6 italic flex items-center gap-4">
                                16. GRIEVANCE OFFICER
                            </h2>
                            <div className="space-y-2 text-xs font-mono">
                                <p><strong className="text-cream uppercase tracking-tighter">Email:</strong> <a href="mailto:grievance@smokesignalbbq.in" className="text-fire">grievance@smokesignalbbq.in</a></p>
                                <p><strong className="text-cream uppercase tracking-tighter">Response:</strong> 30 Days</p>
                            </div>
                        </div>
                    </section>

                    {/* 17. Contact */}
                    <section className="text-center pt-24 border-t border-white/5">
                        <h2 className="text-3xl font-display text-fire mb-4 italic flex items-center justify-center gap-4">
                            Privacy Inquiries
                        </h2>
                        <p className="text-gray-400 mb-12">Dedicated support for your data security.</p>
                        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-16">
                            <a href="mailto:privacy@smokesignalbbq.in" className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-fire/10 transition-colors group">
                                <Mail className="text-fire mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                <h4 className="text-cream text-sm font-bold mb-1">Email Support</h4>
                                <p className="text-xs text-gray-500 italic">privacy@smokesignalbbq.in</p>
                            </a>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <Clock className="text-fire mx-auto mb-4" />
                                <h4 className="text-cream text-sm font-bold mb-1">Hours</h4>
                                <p className="text-xs text-gray-500 italic">Mon-Sat, 9 AM - 6 PM IST</p>
                            </div>
                        </div>
                        <div className="p-8 bg-fire text-white rounded-[2rem] shadow-2xl shadow-fire/20 inline-block overflow-hidden relative group">
                            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                            <p className="text-sm font-bold uppercase tracking-[.3em] font-sans">
                                18. ACKNOWLEDGMENT
                            </p>
                            <p className="text-xs mt-2 font-medium italic">BY USING OUR SERVICES, YOU CONSENT TO THIS PRIVACY POLICY.</p>
                        </div>
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
