"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const testimonials = [
    {
        name: "Familia Restrepo",
        locationKey: "testimonials.loc.res1",
        textKey: "testimonials.res1.text",
        rating: 5,
        image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=400",
    },
    {
        name: "Andrés Jaramillo",
        locationKey: "testimonials.loc.res2",
        textKey: "testimonials.res2.text",
        rating: 5,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    },
    {
        name: "Mariana Velez",
        locationKey: "testimonials.loc.res3",
        textKey: "testimonials.res3.text",
        rating: 5,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
    }
];

export function Testimonials() {
    const { t } = useLanguage();

    return (
        <section id="testimonios" className="py-24 md:py-32 px-6 bg-[#3E2723] relative overflow-hidden">
            {/* Elegant background accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[#C5A059] font-serif tracking-[0.4em] text-xs mb-6 uppercase"
                    >
                        {t('testimonials.tag')}
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-8"
                    >
                        {t('testimonials.title')}
                    </motion.h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-[1px] bg-[#C5A059]/40" />
                        <div className="w-2 h-2 rotate-45 border border-[#C5A059]" />
                        <div className="w-12 h-[1px] bg-[#C5A059]/40" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {testimonials.map((testi, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl flex flex-col relative group transition-all duration-500 hover:bg-white/10 hover:-translate-y-2 h-full"
                        >
                            <div className="mb-6 flex justify-between items-start">
                                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[#C5A059]/20 transition-colors">
                                    <Quote className="w-6 h-6 text-[#C5A059]" />
                                </div>
                                <div className="flex gap-0.5">
                                    {[...Array(testi.rating)].map((_, star) => (
                                        <Star key={star} className="w-3 h-3 fill-[#C5A059] text-[#C5A059]" />
                                    ))}
                                </div>
                            </div>

                            <p className="text-white/80 font-serif text-lg leading-relaxed mb-8 flex-grow">
                                "{t(testi.textKey)}"
                            </p>

                            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/10">
                                <div className="w-12 h-12 rounded-full overflow-hidden border border-[#C5A059]/50">
                                    <img
                                        src={testi.image}
                                        alt={testi.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-white font-serif font-bold text-sm uppercase tracking-wider">
                                        {testi.name}
                                    </h4>
                                    <p className="text-[#C5A059] font-serif text-xs tracking-wide">
                                        {t(testi.locationKey)}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
