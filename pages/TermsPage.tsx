import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, ShieldCheck, Scale, Clock, Info, User, ShieldAlert, ShoppingBag, Truck, BadgeCheck, Briefcase, Calendar, Lock, MessageSquare, AlertTriangle, Gavel } from 'lucide-react';

export const TermsPage: React.FC = () => {
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
                        <Scale size={48} />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display text-cream mb-6 italic leading-tight">Terms & Conditions</h1>
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
                                Welcome to Smoke Signal BBQ (“we,” “our,” or “us”). These Terms and Conditions (“Terms”) govern your access to and use of our website www.smokesignalbbq.in (the “Website”), mobile applications, and services (collectively, the “Services”).
                            </p>
                            <p>
                                By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access the Services.
                            </p>
                            <div className="mt-10 p-6 bg-black/30 rounded-2xl border border-white/5 space-y-3 text-sm">
                                <h4 className="font-bold text-fire uppercase tracking-widest text-[10px] mb-4">Company Information</h4>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <p><strong className="text-cream">Legal Name:</strong> Smoke Signal BBQ Private Limited</p>
                                    <p><strong className="text-cream">Registered Address:</strong> Bangalore, Karnataka, India</p>
                                    <p><strong className="text-cream">CIN:</strong> [Corporate Identification Number]</p>
                                    <p><strong className="text-cream">GSTIN:</strong> [GST Registration Number]</p>
                                    <p><strong className="text-cream">FSSAI License No.:</strong> [FSSAI License Number]</p>
                                    <p><strong className="text-cream">Email:</strong> <a href="mailto:legal@smokesignalbbq.in" className="text-fire hover:underline">legal@smokesignalbbq.in</a></p>
                                    <p><strong className="text-cream">Phone:</strong> [Customer Care Number]</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 2. Definitions */}
                    <section>
                        <h2 className="text-3xl font-display text-fire mb-10 flex items-center gap-4 italic">
                            <span className="text-white/10 font-sans not-italic text-5xl">02.</span>
                            DEFINITIONS
                        </h2>
                        <div className="grid gap-4">
                            {[
                                { term: '“Customer,” “You,” “Your”', def: 'Any person who accesses or uses our Services' },
                                { term: '“Order”', def: 'A request to purchase products through our Services' },
                                { term: '“Products”', def: 'Food items, sauces, merchandise, and services offered for sale' },
                                { term: '“Delivery Partner”', def: 'Third-party logistics providers or our own delivery personnel' },
                                { term: '“Franchisee”', def: 'Independent operators licensed to operate under our brand' },
                                { term: '“User Content”', def: 'Reviews, ratings, comments, or other content submitted by users' }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col md:flex-row gap-2 md:gap-8 bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/[0.07] transition-colors">
                                    <span className="font-bold text-cream md:w-1/3 shrink-0">{item.term}</span>
                                    <span className="text-gray-400">{item.def}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 3. Use of Services */}
                    <section className="border-l-4 border-fire/20 pl-8 md:pl-12 py-4">
                        <h2 className="text-3xl font-display text-fire mb-8 flex items-center gap-4 italic">
                            <span className="text-white/10 font-sans not-italic text-5xl">03.</span>
                            USE OF SERVICES
                        </h2>

                        <div className="space-y-10">
                            <div>
                                <h3 className="text-xl font-bold text-cream mb-4 flex items-center gap-2">
                                    <User size={20} className="text-fire" />
                                    3.1 Eligibility
                                </h3>
                                <p className="mb-4">You must be at least 18 years old to use our Services. By using our Services, you represent and warrant that:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400 marker:text-fire">
                                    <li>You are at least 18 years of age</li>
                                    <li>You have the legal capacity to enter into binding contracts</li>
                                    <li>You are not barred from receiving services under applicable law</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-cream mb-4 flex items-center gap-2">
                                    <Lock size={20} className="text-fire" />
                                    3.2 Account Registration
                                </h3>
                                <p className="mb-4">To place orders, you may need to create an account. You agree to:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400 marker:text-fire">
                                    <li>Provide accurate, current, and complete information</li>
                                    <li>Maintain and update your information promptly</li>
                                    <li>Keep your password secure and confidential</li>
                                    <li>Notify us immediately of unauthorized account use</li>
                                    <li>Accept responsibility for all activities under your account</li>
                                </ul>
                                <p className="mt-4 text-sm italic text-gray-500">We reserve the right to suspend or terminate accounts with false information or suspected fraudulent activity.</p>
                            </div>

                            <div className="bg-red-950/20 p-8 rounded-3xl border border-red-500/10">
                                <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                                    <ShieldAlert size={20} />
                                    3.3 Prohibited Activities
                                </h3>
                                <p className="mb-4 text-sm uppercase tracking-widest font-bold opacity-50">You agree NOT to:</p>
                                <div className="grid md:grid-cols-2 gap-y-3 gap-x-8">
                                    {[
                                        'Use the Services for any illegal purpose',
                                        'Violate any applicable laws or regulations',
                                        'Infringe intellectual property rights',
                                        'Transmit harmful code (viruses, malware)',
                                        'Interfere with website functionality',
                                        'Harass, abuse, or harm other users',
                                        'Submit false or misleading information',
                                        'Use automated systems (bots, scrapers)',
                                        'Resell products without authorization'
                                    ].map((act, i) => (
                                        <div key={i} className="flex gap-3 text-sm">
                                            <span className="text-red-500/50 mt-1">✕</span>
                                            <span>{act}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 4. Products and Orders */}
                    <section>
                        <h2 className="text-3xl font-display text-fire mb-10 flex items-center gap-4 italic text-right md:text-left">
                            <span className="text-white/10 font-sans not-italic text-5xl">04.</span>
                            PRODUCTS AND ORDERS
                        </h2>

                        <div className="space-y-12">
                            <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
                                <h3 className="text-xl font-bold text-cream mb-4 flex items-center gap-2">
                                    <ShoppingBag size={20} className="text-fire" />
                                    4.1 Product Information
                                </h3>
                                <p className="mb-6">We make every effort to display products accurately, including descriptions, ingredients, nutritional information, allergen warnings, pricing, and availability.</p>
                                <p className="p-4 bg-fire/5 border-l-4 border-fire text-sm italic">Note: Images are for illustration; actual appearance may vary. We do not warrant that product descriptions are absolute error-free.</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-cream mb-2 flex items-center gap-2 italic">4.2 Order Placement</h3>
                                    <p className="text-sm">By placing an Order, you make an offer to purchase at the stated price and authorize us to charge your payment method.</p>
                                    <p className="text-sm font-bold text-fire uppercase tracking-widest text-[10px]">Order Acceptance</p>
                                    <p className="text-xs text-gray-400">We reserve the right to refuse/cancel orders due to unavailability, errors, or suspected fraud. Acceptance occurs only upon email/WhatsApp confirmation.</p>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-cream mb-2 flex items-center gap-2 italic">4.3 Pricing and Payment</h3>
                                    <div className="overflow-hidden rounded-xl border border-white/5 text-xs">
                                        <div className="grid grid-cols-2 bg-white/10 p-3 font-bold uppercase tracking-wider">
                                            <span>Aspect</span>
                                            <span>Terms</span>
                                        </div>
                                        {[
                                            { a: 'Currency', t: 'Indian Rupees (₹)' },
                                            { a: 'GST', t: 'Inclusive unless stated' },
                                            { a: 'Methods', t: 'UPI, Card, COD, Wallets' }
                                        ].map((row, i) => (
                                            <div key={i} className="grid grid-cols-2 p-3 border-t border-white/5">
                                                <span className="text-gray-400">{row.a}</span>
                                                <span className="text-cream">{row.t}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-gray-500 italic">Pricing Errors: We will notify you to reconfirm or provide a full refund. No obligation to supply at incorrect prices.</p>
                                </div>
                            </div>

                            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5">
                                <h3 className="text-2xl font-display text-fire mb-8 italic">4.4 Cancellation and Modifications</h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {[
                                        { time: 'Within 5 min', action: 'Cancel via App', out: 'Full Refund' },
                                        { time: 'Prep Started', action: 'Contact Care', out: 'Store Credit Only' },
                                        { time: 'After Dispatch', action: 'N/A', out: 'No Refund Possible' }
                                    ].map((box, i) => (
                                        <div key={i} className="p-6 bg-black/40 rounded-3xl border border-white/5 text-center flex flex-col items-center">
                                            <span className="text-xs font-bold text-fire uppercase tracking-[.2em] mb-2">{box.time}</span>
                                            <span className="text-cream font-bold mb-4">{box.action}</span>
                                            <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase ${box.out.includes('Full') ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-gray-400'}`}>{box.out}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 5. Delivery */}
                    <section className="bg-fire/5 p-8 md:p-12 rounded-[2.5rem] border border-fire/10">
                        <h2 className="text-3xl font-display text-fire mb-8 flex items-center gap-4 italic">
                            <span className="text-white/10 font-sans not-italic text-5xl">05.</span>
                            DELIVERY
                        </h2>

                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-cream font-bold mb-2">5.1 Delivery Areas</h4>
                                    <p className="text-sm text-gray-400">Serving specified areas in Bangalore, Hyderabad, Chennai, Kochi. Availability determined by delivery address.</p>
                                </div>
                                <div>
                                    <h4 className="text-cream font-bold mb-2 flex items-center gap-2">
                                        <Clock size={16} className="text-fire" />
                                        5.2 Timeframes
                                    </h4>
                                    <p className="text-sm text-gray-400">Standard delivery: 45-90 minutes. Times are estimates, not guarantees. Not liable for traffic, weather, or incorrect addresses.</p>
                                </div>
                                <div>
                                    <h4 className="text-cream font-bold mb-2 italic underline decoration-fire/30 underline-offset-4">5.3 Requirements</h4>
                                    <p className="text-sm text-gray-400">Valid address and contact required. Recipient must be present. Failed delivery due to customer error results in redscheduling fees or disposal without refund.</p>
                                </div>
                            </div>
                            <div className="bg-black/40 p-8 rounded-3xl border border-white/5 self-start">
                                <h4 className="text-fire font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
                                    <ShieldCheck size={18} />
                                    5.4 Food Safety
                                </h4>
                                <ul className="space-y-3 text-xs text-gray-400 leading-relaxed">
                                    <li className="flex gap-3"><span className="text-fire">•</span> Consume within recommended timeframes stated on packaging</li>
                                    <li className="flex gap-3"><span className="text-fire">•</span> Refrigerate immediately if not consuming</li>
                                    <li className="flex gap-3"><span className="text-fire">•</span> Reheat to internal temperature of 74°C (165°F)</li>
                                    <li className="text-gray-500 mt-4 italic font-medium">We are not liable for illness due to improper storage or handling post-delivery.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 6. Quality and Refunds */}
                    <section>
                        <h2 className="text-3xl font-display text-fire mb-10 flex items-center gap-4 italic">
                            <span className="text-white/10 font-sans not-italic text-5xl">06.</span>
                            QUALITY AND REFUNDS
                        </h2>
                        <div className="overflow-x-auto rounded-[2rem] border border-white/5">
                            <table className="w-full text-left border-collapse bg-white/5">
                                <thead>
                                    <tr className="bg-white/10 text-cream uppercase tracking-widest text-[10px] font-bold">
                                        <th className="p-6">Issue</th>
                                        <th className="p-6">Resolution</th>
                                        <th className="p-6">Timeframe</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm text-gray-400">
                                    <tr className="border-t border-white/5">
                                        <td className="p-6 font-bold text-cream">Wrong item delivered</td>
                                        <td className="p-6">Replacement + Apology voucher</td>
                                        <td className="p-6 font-mono text-fire">Report within 1 hr</td>
                                    </tr>
                                    <tr className="border-t border-white/5">
                                        <td className="p-6 font-bold text-cream">Missing items</td>
                                        <td className="p-6">Refund for item or redelivery</td>
                                        <td className="p-6 font-mono text-fire">Report within 1 hr</td>
                                    </tr>
                                    <tr className="border-t border-white/5">
                                        <td className="p-6 font-bold text-cream">Quality not meeting standard</td>
                                        <td className="p-6">Replacement, refund, or credit</td>
                                        <td className="p-6 font-mono text-fire">Report within 2 hrs</td>
                                    </tr>
                                    <tr className="border-t border-white/5">
                                        <td className="p-6 font-bold text-cream">Foreign object</td>
                                        <td className="p-6">Full refund + Investigation</td>
                                        <td className="p-6 font-mono text-fire">Report Immediately</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-8 grid md:grid-cols-2 gap-8 text-sm">
                            <div className="space-y-2">
                                <h4 className="text-red-400 font-bold uppercase tracking-widest text-[10px]">No Refunds For:</h4>
                                <ul className="list-disc list-inside text-gray-500 space-y-1">
                                    <li>Change of mind after delivery</li>
                                    <li>Incorrect orders by customer</li>
                                    <li>Delayed consumption degradation</li>
                                    <li>Subjective taste preferences</li>
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-green-400 font-bold uppercase tracking-widest text-[10px]">6.2 Refund Process:</h4>
                                <p className="text-gray-400">Processed within 5-7 business days to original payment method. Store credits issued immediately (6-month validity). COD refunds require bank transfer details.</p>
                            </div>
                        </div>
                    </section>

                    {/* 7. Franchise Information */}
                    <section className="bg-white/5 p-8 rounded-[2rem] border border-white/5 border-dashed">
                        <h2 className="text-3xl font-display text-fire mb-8 flex items-center gap-4 italic">
                            <span className="text-white/10 font-sans not-italic text-5xl">07.</span>
                            FRANCHISE INFORMATION
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold text-cream mb-4 flex items-center gap-2 italic">7.1 Franchise Opportunities</h3>
                                <p className="text-sm text-gray-400">Information provided is for general guidance. It is not an offer, disclosure document (FDD), or legal/financial advice.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-cream mb-4 flex items-center gap-2 italic">7.2 Franchise Application</h3>
                                <p className="text-sm text-gray-400">Application, FDD review, and qualification required. No relationship exists until a signed Franchise Agreement and payment of fees.</p>
                            </div>
                        </div>
                    </section>

                    {/* 8. Event Booking and Catering */}
                    <section>
                        <h2 className="text-3xl font-display text-fire mb-10 flex items-center gap-4 italic">
                            <span className="text-white/10 font-sans not-italic text-5xl">08.</span>
                            EVENT BOOKING & CATERING
                        </h2>
                        <p className="mb-8">Governed by separate written contracts covering scope, pricing, and liability. Website information is indicative only.</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { t: '>30 Days', p: '100% Refund ex administrative fee' },
                                { t: '15-30 Days', p: '50% Refund' },
                                { t: '7-14 Days', p: '25% Refund' },
                                { t: '<7 Days', p: 'No Refund' }
                            ].map((slot, i) => (
                                <div key={i} className="bg-white/5 p-4 rounded-2xl text-center border border-white/5">
                                    <div className="text-fire font-bold mb-2">{slot.t}</div>
                                    <div className="text-[10px] uppercase text-gray-500">{slot.p}</div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-6 text-[11px] text-gray-500 italic text-center">Force Majeure: Pandemic or natural disaster results in credit for rescheduled event within 6 months.</p>
                    </section>

                    {/* 9. Intellectual Property */}
                    <section className="bg-black/20 p-8 md:p-12 rounded-[2.5rem] border border-white/5 relative">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <BadgeCheck size={100} />
                        </div>
                        <h2 className="text-3xl font-display text-fire mb-8 italic flex items-center gap-4">
                            <span className="text-white/10 font-sans not-italic text-5xl">09.</span>
                            INTELLECTUAL PROPERTY
                        </h2>
                        <div className="space-y-8 relative z-10">
                            <div>
                                <h3 className="text-xl font-bold text-cream mb-4">9.1 Ownership</h3>
                                <p className="text-gray-400">All Website content (text, graphics, recipes, branding, software, designs) is property of Smoke Signal BBQ or its licensors, protected by Indian and international laws.</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-12">
                                <div>
                                    <h4 className="text-green-400 font-bold mb-3 italic">9.2 Limited License</h4>
                                    <ul className="text-sm text-gray-500 space-y-2">
                                        <li>Personal, non-commercial use only</li>
                                        <li>Place orders for personal consumption</li>
                                        <li>Share content on social media with attribution</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-red-400 font-bold mb-3 italic">9.2 Prohibitions</h4>
                                    <ul className="text-sm text-gray-500 space-y-2">
                                        <li>Reproduce, modify, distribute</li>
                                        <li>Frame/mirror the Website</li>
                                        <li>Remove copyright/proprietary notices</li>
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-cream mb-4">9.3 Trademarks</h3>
                                <p className="text-gray-400 italic">“Smoke Signal BBQ,” our logo, and taglines are trademarks. Use is restricted solely to identifying our products.</p>
                            </div>
                        </div>
                    </section>

                    {/* 10. User Content */}
                    <section>
                        <h2 className="text-3xl font-display text-fire mb-8 italic flex items-center gap-4">
                            <span className="text-white/10 font-sans not-italic text-5xl">10.</span>
                            USER CONTENT
                        </h2>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <h3 className="font-bold text-cream">10.1 Submission</h3>
                                <p className="text-sm text-gray-400">Submission of reviews, ratings, or photos grants us a perpetual, royalty-free license to use/display said content. You represent ownership and waive moral rights.</p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-bold text-cream">10.2 Content Standards</h3>
                                <p className="text-sm text-gray-400">Must not be defamatory, infringing, hate speech, promotional, or contain personal info of others. We reserve the right to remove content at our discretion.</p>
                            </div>
                        </div>
                    </section>

                    {/* 11. Third-Party Links */}
                    <section className="bg-white/5 p-8 rounded-3xl border border-white/5">
                        <h3 className="text-2xl font-display text-fire mb-4 italic">11. THIRD-PARTY LINKS & SERVICES</h3>
                        <p className="text-sm text-gray-400">Links to third-party services (payment, delivery, social media) are not endorsements. We are not responsible for their content/practices. Interactions are solely between you and them.</p>
                    </section>

                    {/* 12. Disclaimer of Warranties */}
                    <section className="bg-red-950/10 p-12 rounded-[2.5rem] border border-red-500/10 text-center">
                        <h3 className="text-2xl font-display text-fire mb-6 italic underline decoration-red-500/30 underline-offset-8">12. DISCLAIMER OF WARRANTIES</h3>
                        <p className="text-sm text-gray-400 max-w-3xl mx-auto uppercase tracking-tighter leading-relaxed">
                            SERVICES PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND (MERCHANTABILITY, FITNESS, ACCURACY). WE DO NOT WARRANT UNINTERRUPTED SERVICE OR VIRUS-FREE COMPONENTS.
                        </p>
                        <div className="mt-8 pt-8 border-t border-white/5">
                            <h4 className="text-xl font-bold text-cream mb-4 italic">FOOD ALLERGIES</h4>
                            <p className="text-sm text-gray-400">While we take precautions, we cannot guarantee allergen-free products due to shared kitchen facilities. Customers with severe allergies consume at their own risk.</p>
                        </div>
                    </section>

                    {/* 13. Limitation of Liability */}
                    <section>
                        <h2 className="text-3xl font-display text-fire mb-8 italic flex items-center gap-4">
                            <span className="text-white/10 font-sans not-italic text-5xl">13.</span>
                            LIMITATION OF LIABILITY
                        </h2>
                        <p className="text-sm text-gray-400 mb-8 max-w-4xl">NOT LIABLE FOR INDIRECT, INCIDENTAL, CONSEQUENTIAL DAMAGES. TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID FOR THE PRODUCT ORDER OR EVENT CONTRACT, OR ₹10,000 FOR OTHER CLAIMS.</p>
                        <div className="p-1 border border-white/5 rounded-2xl bg-gradient-to-r from-fire/10 to-transparent italic px-6 py-4 text-xs">
                            Some jurisdictions do not allow exclusions, so these may not apply to you.
                        </div>
                    </section>

                    {/* 14. Indemnification */}
                    <section className="bg-white/5 p-8 rounded-3xl border border-white/5">
                        <h3 className="text-2xl font-display text-fire mb-4 italic">14. INDEMNIFICATION</h3>
                        <p className="text-sm text-gray-400">You agree to indemnify Smoke Signal BBQ from any claims (legal fees included) arising from your use of Services, your violation of Terms, or your User Content.</p>
                    </section>

                    {/* 15. Governing Law and Dispute Resolution */}
                    <section>
                        <h2 className="text-3xl font-display text-fire mb-10 flex items-center gap-4 italic text-right md:text-left">
                            <span className="text-white/10 font-sans not-italic text-5xl">15.</span>
                            GOVERNING LAW & DISPUTE RESOLUTION
                        </h2>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-cream font-bold mb-2">15.1 Governing Law</h4>
                                    <p className="text-sm text-gray-400 font-mono">Governed by the laws of India.</p>
                                </div>
                                <div>
                                    <h4 className="text-cream font-bold mb-2">15.2 Jurisdiction</h4>
                                    <p className="text-sm text-gray-400 font-mono">Exclusive jurisdiction: Courts in Bangalore, Karnataka.</p>
                                </div>
                            </div>
                            <div className="bg-black/30 p-8 rounded-[2rem] border border-white/5">
                                <h4 className="text-fire font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-xs italic">
                                    <Gavel size={18} />
                                    15.3 Dispute Process
                                </h4>
                                <div className="space-y-4 text-xs font-mono">
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span>1. Negotiation</span>
                                        <span className="text-fire">15 Days</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span>2. Mediation</span>
                                        <span className="text-fire">30 Days</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-cream">
                                        <span>3. Arbitration</span>
                                        <span className="text-fire">Final</span>
                                    </div>
                                </div>
                                <p className="mt-6 text-[9px] text-gray-500 uppercase tracking-widest leading-relaxed">Arbitration Details: Seat: Bangalore, Language: English, under Arbitration Act, 1996.</p>
                            </div>
                        </div>
                    </section>

                    {/* 16-18. Other Provisions */}
                    <section className="bg-white/5 p-8 md:p-12 rounded-[2.5rem] border border-white/5">
                        <div className="grid md:grid-cols-3 gap-12">
                            <div>
                                <h4 className="text-fire font-bold mb-4 uppercase tracking-[.2em] text-[10px]">16. Severability</h4>
                                <p className="text-xs text-gray-400">Invalid provisions will be modified to minimum extent necessary to remain enforceable without affecting others.</p>
                            </div>
                            <div>
                                <h4 className="text-fire font-bold mb-4 uppercase tracking-[.2em] text-[10px]">17. Changes To Terms</h4>
                                <p className="text-xs text-gray-400">Effective immediately upon posting. Material changes notified via Email, Website notice, or WhatsApp.</p>
                            </div>
                            <div>
                                <h4 className="text-fire font-bold mb-4 uppercase tracking-[.2em] text-[10px]">18. Termination</h4>
                                <p className="text-xs text-gray-400">Access suspended for breach, fraud, or harming users. Licenses cease immediately upon termination.</p>
                            </div>
                        </div>
                    </section>

                    {/* 19. Contact */}
                    <section className="text-center pt-24 border-t border-white/5">
                        <h2 className="text-3xl font-display text-fire mb-4 italic flex items-center justify-center gap-4">
                            Questions? Reach Legal
                        </h2>
                        <p className="text-gray-400 mb-12">We are here to help you understand your rights.</p>
                        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <MessageSquare className="text-fire mx-auto mb-4" />
                                <h4 className="text-cream text-sm font-bold mb-1">Email</h4>
                                <p className="text-xs text-gray-500 italic">legal@smokesignalbbq.in</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <Clock className="text-fire mx-auto mb-4" />
                                <h4 className="text-cream text-sm font-bold mb-1">Hours</h4>
                                <p className="text-xs text-gray-500 italic">Mon-Sat, 9 AM - 6 PM IST</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <MapPin className="text-fire mx-auto mb-4" />
                                <h4 className="text-cream text-sm font-bold mb-1">Address</h4>
                                <p className="text-xs text-gray-500 italic">Bangalore, Karnataka, India</p>
                            </div>
                        </div>
                        <div className="p-8 bg-fire text-white rounded-[2rem] shadow-2xl shadow-fire/20 inline-block overflow-hidden relative group">
                            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                            <p className="text-sm font-bold uppercase tracking-[.3em] font-sans">
                                20. ACKNOWLEDGMENT
                            </p>
                            <p className="text-xs mt-2 font-medium">BY USING OUR SERVICES, YOU AGREE TO BE BOUND BY THESE TERMS.</p>
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

const MapPin = ({ className, size }: { className?: string, size?: number }) => (
    <svg className={className} width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
