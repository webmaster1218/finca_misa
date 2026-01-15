"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const amenitiesData = [
    {
        titleKey: "exp.cat.wellness",
        itemsKeys: ["exp.item.jacuzzi", "exp.item.steam"],
        images: [
            "/imagenes/zonas humedas/jacuzzi_1.webp",
            "/imagenes/zonas humedas/turco_1.webp"
        ],
        colSpan: "md:col-span-2",
        rowSpan: "md:row-span-1",
    },
    {
        titleKey: "exp.cat.events",
        itemsKeys: ["exp.item.auditorium", "exp.item.social", "exp.item.event_spaces"],
        images: [
            "/imagenes/auditorio/vertical/auditorio_1.webp",
            "/imagenes/auditorio/vertical/auditorio_2.webp",
            "/imagenes/eventos/horizontales/eventos_1.webp"
        ],
        colSpan: "md:col-span-1",
        rowSpan: "md:row-span-1",
    },
    {
        titleKey: "exp.cat.sports",
        itemsKeys: ["exp.item.soccer", "exp.item.volleyball", "exp.item.pool_table", "exp.item.ping_pong"],
        images: [
            "/imagenes/billar/horizontales/billar_1.webp",
            "/imagenes/zonas verdes/horizontales/zonas_verdes_28.webp"
        ],
        colSpan: "md:col-span-1",
        rowSpan: "md:row-span-1",
    },
    {
        titleKey: "exp.cat.kids",
        itemsKeys: ["exp.item.playground", "exp.item.games"],
        images: [
            "/imagenes/zonas verdes/horizontales/zonas_verdes_29.webp",
            "/imagenes/zonas verdes/horizontales/zonas_verdes_10.webp",
            "/imagenes/zonas verdes/horizontales/zonas_verdes_12.webp"
        ],
        colSpan: "md:col-span-1",
        rowSpan: "md:row-span-1",
    },
    {
        titleKey: "exp.cat.firepit",
        itemsKeys: ["exp.item.firepit", "exp.item.picnic"],
        images: [
            "/imagenes/fogata/vertical/fogata_1.webp",
            "/imagenes/fogata/vertical/fogata_2.webp",
            "/imagenes/fogata/vertical/fogata_3.webp"
        ],
        colSpan: "md:col-span-1",
        rowSpan: "md:row-span-1",
    }
];

function ExperienceCard({ item, idx }: { item: typeof amenitiesData[0], idx: number }) {
    const { t } = useLanguage();
    const [currentImg, setCurrentImg] = useState(0);

    const nextImg = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImg((prev) => (prev + 1) % item.images.length);
    };

    const prevImg = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImg((prev) => (prev - 1 + item.images.length) % item.images.length);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className={`relative group overflow-hidden rounded-xl shadow-lg ${item.colSpan} ${item.rowSpan}`}
        >
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentImg}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                        const swipe = info.offset.x;
                        if (swipe < -50) nextImg(new MouseEvent('click') as any);
                        if (swipe > 50) prevImg(new MouseEvent('click') as any);
                    }}
                >
                    <Image
                        src={item.images[currentImg]}
                        alt={t(item.titleKey)}
                        fill
                        className="object-cover pointer-events-none"
                        priority={idx === 0}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Subtle overlay for text readability without heavy gradient */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors pointer-events-none" />

            {/* Navigation Buttons - Hidden on touch devices by default but visible on hover for desktop */}
            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 md:group-hover:opacity-100 transition-opacity pointer-events-none">
                <button
                    onClick={prevImg}
                    className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all transform hover:scale-110 pointer-events-auto"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={nextImg}
                    className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all transform hover:scale-110 pointer-events-auto"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Image Indicators */}
            <div className="absolute top-4 right-4 flex gap-1.5 pointer-events-none">
                {item.images.map((_, i) => (
                    <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImg ? "bg-[#C5A059] w-4" : "bg-white/50"}`}
                    />
                ))}
            </div>

            <div className="absolute bottom-0 left-0 p-8 w-full pointer-events-none">
                <h3 className="text-2xl font-serif text-white mb-3 tracking-wide">{t(item.titleKey)}</h3>
                <div className="flex flex-wrap gap-2">
                    {item.itemsKeys.map((subKey, i) => (
                        <span key={i} className="text-[10px] uppercase tracking-widest bg-[#C5A059] text-white px-3 py-1 rounded-full font-medium shadow-sm">
                            {t(subKey)}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export function ExperienceGrid() {
    const { t } = useLanguage();
    return (
        <section className="py-24 px-6 bg-[#FAF8F2]" id="experiencias">
            <div className="max-w-7xl mx-auto mb-16 text-center">
                <span className="text-[#9C3931] font-serif tracking-widest uppercase text-sm mb-4 block">
                    {t('exp.tag')}
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#3E2723] mb-6">
                    {t('exp.title')}
                </h2>
                <p className="text-[#3E2723]/80 max-w-2xl mx-auto font-serif text-lg">
                    {t('exp.desc')}
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:grid-rows-2 auto-rows-[400px] md:auto-rows-fr h-auto md:h-[800px]">
                {amenitiesData.map((item, idx) => (
                    <ExperienceCard key={idx} item={item} idx={idx} />
                ))}
            </div>
        </section>
    );
}
