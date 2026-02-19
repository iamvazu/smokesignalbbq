import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Seo } from '../seo/Seo';
import { HelpCircle, Plus, Minus, Phone, Mail, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

const faqFullData = [
    {
        q: "Where can I buy authentic Texas BBQ in Bangalore?",
        a: "Smoke Signal BBQ is Bangalore's original authentic Texas BBQ, established in 2011. We deliver ready-to-heat smoked meats across 15+ Bangalore areas including Indiranagar, Koramangala, HSR Layout, Whitefield, Kammanahalli, and MG Road. Unlike other BBQ restaurants that use electric smokers or gas grills, we slow-smoke our brisket, pulled pork, and ribs for up to 14 hours over premium hardwood charcoal using traditional Texas pitmaster techniques.",
        extra: "Order online at smokesignalbbq.in or call +91 78998-70957 for same-day delivery."
    },
    {
        q: "What is ready to heat BBQ and how does it work?",
        a: "Ready-to-heat BBQ is professionally smoked meat that is vacuum-sealed immediately after smoking to lock in flavor and freshness. Here's how it works:",
        list: [
            "We smoke it: Our pitmasters smoke brisket for 14 hours, pulled pork for 12 hours, and ribs for 6 hours over real charcoal",
            "We seal it: Hot-packed and vacuum-sealed to preserve that pit-fresh flavor",
            "We deliver it: Chilled delivery across Bangalore in insulated packaging",
            "You heat it: Simply boil in bag for 5 minutes or microwave for 3-4 minutes",
            "You enjoy it: Serve authentic Texas BBQ at home without the all-day cooking"
        ],
        footer: "Ready-to-heat BBQ gives you restaurant-quality smoked meats without investing in expensive smokers or spending 14 hours tending a fire."
    },
    {
        q: "How long is your brisket smoked and what makes it special?",
        a: "Our signature brisket is slow-smoked for up to 14 hours over premium hardwood charcoal until it reaches the perfect tenderness—you can literally slice it with a spoon.",
        listTitle: "What makes our brisket special:",
        list: [
            "100% charcoal fired: No electric smokers, no gas shortcuts—just authentic hardwood charcoal",
            "Texas-style rub: Handcrafted spice blend with kosher salt, black pepper, and secret spices",
            "Bark formation: 14 hours creates the perfect smoky crust (bark) while keeping the inside juicy",
            "Smoke ring: Authentic pink smoke ring that proves real low-and-slow cooking",
            "Antibiotic-free meat: We use only high-quality, antibiotic-free beef"
        ],
        footer: "Most Bangalore restaurants use pressure cookers or gas grills and finish in 2-3 hours. Our 14-hour process is why food critics call us Bangalore's most authentic American BBQ."
    },
    {
        q: "Do you deliver BBQ to Indiranagar, Koramangala, and Whitefield?",
        a: "Yes, Smoke Signal BBQ delivers to 15+ areas across Bangalore including:",
        list: ["Indiranagar", "Koramangala", "HSR Layout", "Whitefield", "Kammanahalli", "MG Road", "Marathahalli", "Electronic City", "JP Nagar", "Jayanagar"],
        footer: "We deliver 7 days a week, 9 AM to 11 PM. Orders placed before 4 PM qualify for same-day delivery in most areas. Delivery is free for orders above ₹1,500."
    },
    {
        q: "Do you offer BBQ catering for weddings and corporate events in Bangalore?",
        a: "Absolutely! Smoke Signal BBQ specializes in Texas BBQ catering for weddings, corporate events, house parties, and celebrations across Bangalore. Since 2011, we've catered over 500 events.",
        listTitle: "Catering options include:",
        list: [
            "DIY BBQ boxes (ready-to-heat, self-serve)",
            "Live smoking stations with our pitmaster",
            "Full-service buffet setup with staff",
            "Custom menus for 20 to 500+ guests"
        ]
    },
    {
        q: "What is the difference between charcoal BBQ and gas BBQ?",
        a: "The difference between charcoal and gas BBQ is night and day, and it's why Smoke Signal BBQ refuses to use gas:",
        table: {
            headers: ["Charcoal BBQ (Our Method)", "Gas BBQ (Others)"],
            rows: [
                ["Hardwood charcoal creates authentic smoke flavor", "Propane gas has no flavor—just heat"],
                ["Produces smoke ring (pink layer under the bark)", "No smoke ring possible"],
                ["Reaches 107°C-121°C ideal for low-and-slow", "Harder to maintain stable low temperatures"],
                ["14-hour smoking creates tender, fall-apart meat", "Typically 2-3 hours, tougher texture"],
                ["Authentic Texas pitmaster tradition", "Convenience cooking, compromised flavor"]
            ]
        },
        footer: "Real Texas BBQ requires real fire. That's why we've used 100% charcoal since 2011, even though it means waking up at 3 AM to start the smoker."
    },
    {
        q: "How do I reheat smoked meat without drying it out?",
        a: "Reheating smoked meat properly is crucial to maintain that pit-fresh juiciness. Here's the Smoke Signal BBQ approved method:",
        methods: [
            {
                title: "Method 1: Boil-in-Bag (Recommended)",
                steps: ["Keep meat in its vacuum-sealed bag", "Bring pot of water to gentle boil", "Submerge bag completely for 5 minutes", "Remove and serve"]
            },
            {
                title: "Method 2: Oven",
                steps: ["Preheat to 150°C", "Add 2-3 tbsp broth", "Cover tightly with foil", "Heat for 15-20 mins"]
            }
        ],
        footer: "Pro tip: Never reheat smoked meat on high heat or grill—it will dry out. Low and slow is the BBQ way, even for reheating!"
    },
    {
        q: "Is your BBQ halal certified and what about antibiotics?",
        a: "Yes, Smoke Signal BBQ is 100% Halal certified. All our meats are sourced from Halal-certified suppliers and prepared according to Islamic dietary laws. Our license number is 21224191000177.",
        listTitle: "Our quality commitments:",
        list: ["100% Halal certified", "Antibiotic-free meat", "No artificial preservatives", "Freshly smoked daily"]
    },
    {
        q: "How much does brisket cost per kg and what are your prices?",
        a: "Our smoked meats are priced to reflect the 14-hour charcoal smoking process and premium antibiotic-free ingredients:",
        list: [
            "Smoked Brisket: ₹2,400 per kg",
            "Pulled Pork: ₹1,800 per kg",
            "St. Louis Ribs: ₹1,600 per rack",
            "BBQ Chicken: ₹900 per kg"
        ],
        footer: "Free delivery on orders above ₹1,500. While our prices are higher than mass-market BBQ, remember: you're paying for 14 hours of expert pitmaster labor."
    },
    {
        q: "Why is Smoke Signal BBQ called the best BBQ in Bangalore?",
        a: "Smoke Signal BBQ has been voted Bangalore's best American BBQ by food bloggers, critics, and thousands of customers since 2011. Here's why:",
        list: [
            "Only authentic Texas method (100% Charcoal)",
            "Longest track record (Since 2011)",
            "Real trained pitmasters",
            "Quality ingredients (Antibiotic-free)",
            "Consistent 4.8/5 star rating"
        ]
    },
    {
        q: "How long does smoked meat last in the fridge and can I freeze it?",
        a: "Our vacuum-sealed smoked meats have excellent shelf life:",
        listTitle: "Storage Guide:",
        list: [
            "Fridge (Unopened): 7-10 days",
            "Fridge (Opened): 3-4 days",
            "Freezer (Unopened): Up to 3 months"
        ],
        footer: "Pro tip: For best flavor, consume within 3 days of delivery."
    },
    {
        q: "What should I order for my first time trying Texas BBQ?",
        a: "New to Texas BBQ? Start with our Pitmaster's First Timer Box—it's designed to showcase the full Smoke Signal experience. It includes 500g Brisket, 500g Pulled Pork, Half Rack Ribs, and signature sauces.",
        footer: "First-time customers get 10% off with code FIRSTSMOKE."
    },
    {
        q: "What is the difference between Texas BBQ and Kansas City BBQ?",
        a: "Smoke Signal BBQ specializes in Central Texas-style BBQ, which focuses on the meat and simple salt/pepper rubs, whereas Kansas City style is known for thick, sweet tomato-based sauces.",
        footer: "We believe meat is the hero—smoke and beef flavor dominate."
    },
    {
        q: "How do I order BBQ online for delivery in Bangalore?",
        a: "Ordering is simple: Visit smokesignalbbq.in, select your items, and checkout using UPI or Card. We deliver 7 days a week, 9 AM to 11 PM.",
        footer: "Orders before 4 PM qualify for same-day delivery."
    },
    {
        q: "What is the history of Smoke Signal BBQ and who is the founder?",
        a: "Smoke Signal BBQ was founded in 2011 by Dexter Ross as Bangalore's first BBQ food truck. Our mission has always been to bring authentic, uncompromising Texas-style BBQ to India using 100% charcoal fire.",
        footer: "Dexter Ross brought Texas pitmaster techniques to Bangalore, and we've stayed true to that legacy for over 12 years."
    }
];

export const FaqPage: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const navigate = useNavigate();

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqFullData.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a + (item.footer ? " " + item.footer : "")
            }
        }))
    };

    return (
        <div className="min-h-screen bg-charcoal text-cream pt-32 pb-24">
            <Seo
                title="BBQ FAQ: Texas BBQ Delivery, Catering & Ready-to-Heat Meats in Bangalore"
                description="Find answers about Bangalore's best Texas BBQ delivery. Learn about our 14-hour smoked brisket, ready-to-heat meals, catering services, delivery areas, and authentic charcoal smoking process. Est. 2011."
                keywords={['BBQ FAQ', 'BBQ Delivery Bangalore', 'Texas BBQ Bangalore', 'Smoked Meat Reheating', 'Halal BBQ Bangalore']}
                schema={faqSchema}
            />

            <div className="container mx-auto px-4">
                {/* Hero Section */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fire/10 border border-fire/20 text-fire text-xs font-black uppercase tracking-widest mb-8"
                    >
                        <HelpCircle size={14} /> Intelligence Center
                    </motion.div>
                    <h1 className="text-4xl md:text-7xl font-display italic text-cream mb-8 leading-tight">
                        Frequently Asked <br /> Questions
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                        Everything you need to know about Smoke Signal BBQ's authentic American smoked meats, delivery, catering, and our 14-hour charcoal smoking process. Can't find your answer? Call us at <a href="tel:+917899870957" className="text-fire font-bold hover:underline">+91 78998-70957</a>.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-4xl mx-auto space-y-4">
                    {faqFullData.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className={`w-full text-left p-6 md:p-8 rounded-[2.5rem] border transition-all duration-300 flex items-center justify-between gap-4 ${activeIndex === index
                                        ? 'bg-white/5 border-fire/30 shadow-2xl scale-[1.02]'
                                        : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                                    }`}
                            >
                                <h2 className={`font-display text-xl md:text-2xl tracking-wide transition-colors ${activeIndex === index ? 'text-fire' : 'text-cream'
                                    }`}>
                                    {faq.q}
                                </h2>
                                <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center border transition-all ${activeIndex === index
                                        ? 'bg-fire border-fire text-white'
                                        : 'bg-white/5 border-white/10 text-gray-500'
                                    }`}>
                                    {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-8 md:p-12 pt-4 bg-white/[0.01] border-x border-b border-white/5 rounded-b-[2.5rem] -mt-8 text-gray-400 font-body leading-relaxed text-lg">
                                            <p className="mb-4">{faq.a}</p>

                                            {faq.list && (
                                                <div className="mb-6 bg-white/5 p-6 rounded-2xl border border-white/5">
                                                    {faq.listTitle && <h4 className="text-cream font-bold mb-3">{faq.listTitle}</h4>}
                                                    <ul className="space-y-2">
                                                        {faq.list.map((item, i) => (
                                                            <li key={i} className="flex items-start gap-3">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-fire mt-2.5 shrink-0" />
                                                                <span>{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {faq.table && (
                                                <div className="mb-6 overflow-x-auto">
                                                    <table className="w-full text-sm text-left border-collapse border border-white/10 rounded-xl overflow-hidden">
                                                        <thead className="bg-white/5">
                                                            <tr>
                                                                {faq.table.headers.map((h, i) => (
                                                                    <th key={i} className="p-4 border border-white/10 text-cream font-bold">{h}</th>
                                                                ))}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {faq.table.rows.map((row, i) => (
                                                                <tr key={i} className="hover:bg-white/[0.02]">
                                                                    {row.map((cell, j) => (
                                                                        <td key={j} className="p-4 border border-white/10">{cell}</td>
                                                                    ))}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )}

                                            {faq.methods && (
                                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                                    {faq.methods.map((method, i) => (
                                                        <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                                            <h4 className="text-fire font-bold mb-3 uppercase tracking-wider text-xs">{method.title}</h4>
                                                            <ul className="space-y-1.5 text-sm">
                                                                {method.steps.map((step, j) => (
                                                                    <li key={j} className="flex items-center gap-2">
                                                                        <span className="text-white/20 font-mono">{j + 1}.</span>
                                                                        {step}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {faq.footer && <p className="mt-4 font-bold text-cream/80">{faq.footer}</p>}
                                            {faq.extra && <p className="mt-4 text-fire font-bold italic">{faq.extra}</p>}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Still Have Questions CTA */}
                <div className="max-w-4xl mx-auto mt-24">
                    <div className="bg-fire rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-display italic mb-6">Still Have Questions?</h2>
                            <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">
                                Our BBQ experts are here to help. Reach out to us directly for any specific queries about your orders or events.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <a
                                    href={`https://wa.me/917899870957`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-12 py-5 bg-white text-fire rounded-full font-black uppercase tracking-widest text-sm flex items-center gap-2 hover:bg-cream transition-all shadow-xl"
                                >
                                    <MessageCircle size={20} /> WhatsApp Us
                                </a>
                                <Button variant="outline" className="px-12 py-5 text-white border-white hover:bg-white hover:text-fire" onClick={() => navigate('/shop')}>
                                    Order BBQ Now <ArrowRight size={20} className="ml-2" />
                                </Button>
                            </div>
                            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-widest text-white/60">
                                <div className="flex items-center gap-2">
                                    <Phone size={16} /> +91 78998-70957
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail size={16} /> hello@smokesignalbbq.in
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
