"use client";

import { motion } from "framer-motion";
import { Utensils, SprayCan, UserCheck } from "lucide-react"; // Assuming lucide-react is available
import { useLanguage } from "@/context/LanguageContext";

export function ServiceHighlight() {
    const { t } = useLanguage();

    return (
        <section className="py-20 px-6 bg-[#3E2723] text-[#FAF8F2]">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[#C5A059] tracking-widest uppercase text-sm mb-4 block">
                        {t('service.tag')}
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">
                        {t('service.title')}
                    </h2>
                    <p className="text-white/80 max-w-2xl mx-auto font-serif text-lg">
                        {t('service.desc')}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {[
                        {
                            icon: <UserCheck className="w-8 h-8" />,
                            title: t('service.1.title'),
                            desc: t('service.1.desc'),
                            image: "/imagenes/eventos/horizontales/eventos_2.webp"
                        },
                        {
                            icon: <Utensils className="w-8 h-8" />,
                            title: t('service.2.title'),
                            desc: t('service.2.desc'),
                            image: "/imagenes/comedor/horizontales/comedor_5.webp"
                        },
                        {
                            icon: <SprayCan className="w-8 h-8" />,
                            title: t('service.3.title'),
                            desc: t('service.3.desc'),
                            image: "/imagenes/habitaciones/horizontales/habitaciones_1.webp"
                        }
                    ].map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                            className="relative h-[400px] rounded-xl overflow-hidden group"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url('${service.image}')` }}
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

                            <div className="relative h-full p-8 flex flex-col items-start justify-end border border-white/10 transition-colors">
                                <div className="w-14 h-14 bg-[#C5A059] rounded-full flex items-center justify-center mb-6 text-[#3E2723] group-hover:scale-110 transition-transform shadow-lg">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-serif text-[#C5A059] mb-4">{service.title}</h3>
                                <p className="text-white/80 leading-relaxed font-sans text-sm">
                                    {service.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
