"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image"; // Assuming Image component is from Next.js

const galleryImages = [
    { url: "/imagenes/fachada/vertical/fachada_1.webp", span: "md:col-span-1 md:row-span-1", key: "gallery.img1" }, // Top Left
    { url: "/imagenes/fogata/vertical/fogata_2.webp", span: "md:col-span-1 md:row-span-2", key: "gallery.img3" }, // Center Large
    { url: "/imagenes/zonas verdes/horizontales/zonas_verdes_3.webp", span: "md:col-span-1 md:row-span-1", key: "gallery.img2" }, // Top Right
    { url: "/imagenes/fachada/vertical/fachada_10.webp", span: "md:col-span-1 md:row-span-1", key: "gallery.img4" }, // Bottom Left
    { url: "/imagenes/kiosko/horizontales/kiosko_1.webp", span: "md:col-span-1 md:row-span-1", key: "gallery.img5" },    // Bottom Right
];

export function Gallery() {
    const { t } = useLanguage();

    return (
        <section className="py-24 px-6 bg-[#FAF8F2]" id="galeria">
            <div className="max-w-7xl mx-auto mb-16 text-center">
                <span className="text-[#9C3931] font-serif tracking-widest uppercase text-sm mb-4 block">
                    {t('gallery.tag')}
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#3e2723] mb-6">
                    {t('gallery.title')}
                </h2>
                <p className="text-[#3e2723]/80 max-w-2xl mx-auto font-serif text-lg">
                    {t('gallery.desc')}
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[900px] auto-rows-[300px]">
                {galleryImages.map((image, idx) => (
                    <motion.div
                        key={idx}
                        className={`relative group overflow-hidden rounded-2xl shadow-xl ${image.span}`}
                    >
                        <Image
                            src={image.url}
                            alt={t(image.key)}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

                        {/* Minimalistic Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                <h3 className="text-white font-serif text-2xl tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                    {t(image.key)}
                                </h3>
                                <div className="w-8 h-[1px] bg-[#9a7d45] mt-4 scale-0 group-hover:scale-100 transition-transform duration-700 delay-100" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Artistic dark fade at the bottom to connect with next section */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </section>
    );
}