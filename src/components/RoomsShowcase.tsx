"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

const roomImages = [
    "/imagenes/habitaciones/horizontales/habitaciones_1.webp",
    "/imagenes/habitaciones/horizontales/habitaciones_2.webp",
    "/imagenes/habitaciones/horizontales/habitaciones_3.webp",
    "/imagenes/habitaciones/horizontales/habitaciones_4.webp",
    "/imagenes/habitaciones/horizontales/habitaciones_5.webp",
    "/imagenes/habitaciones/horizontales/habitaciones_6.webp",
];

const bathImages = [
    "/imagenes/baños/vertical/baños_7.webp",
    "/imagenes/baños/vertical/baños_1.webp",
    "/imagenes/baños/vertical/baños_3.webp"
];

export function RoomsShowcase() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<"rooms" | "baths">("rooms");

    const images = activeTab === "rooms" ? roomImages : bathImages;

    return (
        <section className="py-24 px-6 bg-[#3E2723]" id="showcase">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[#C5A059] font-serif tracking-[0.4em] text-xs uppercase mb-4 block"
                    >
                        {t('showcase.tag')}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-12"
                    >
                        {t('showcase.title')}
                    </motion.h2>

                    {/* Tab Switcher */}
                    <div className="flex justify-center gap-8 mb-8 relative">
                        <button
                            onClick={() => setActiveTab("rooms")}
                            className={`pb-4 px-2 font-serif text-xl transition-all relative ${activeTab === "rooms" ? "text-[#C5A059]" : "text-white/40 hover:text-white/60"
                                }`}
                        >
                            {t('showcase.rooms')}
                            {activeTab === "rooms" && (
                                <motion.div
                                    layoutId="tab-underline"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A059]"
                                />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab("baths")}
                            className={`pb-4 px-2 font-serif text-xl transition-all relative ${activeTab === "baths" ? "text-[#C5A059]" : "text-white/40 hover:text-white/60"
                                }`}
                        >
                            {t('showcase.baths')}
                            {activeTab === "baths" && (
                                <motion.div
                                    layoutId="tab-underline"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A059]"
                                />
                            )}
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.p
                            key={`${activeTab}-desc`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="text-white/80 max-w-2xl mx-auto font-serif text-lg mb-12"
                        >
                            {activeTab === "rooms" ? t('showcase.rooms.desc') : t('showcase.baths.desc')}
                        </motion.p>
                    </AnimatePresence>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="contents"
                        >
                            {images.map((img, idx) => (
                                <div
                                    key={`${activeTab}-${idx}`}
                                    className={`relative group overflow-hidden rounded-2xl shadow-lg border border-white/10 ${activeTab === "baths" ? "aspect-[3/4]" : "aspect-[4/3]"
                                        }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`${activeTab} ${idx + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />

                                    {/* Subtle internal border on hover */}
                                    <div className="absolute inset-4 border border-white/0 group-hover:border-white/20 transition-all duration-700 pointer-events-none rounded-xl" />
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
