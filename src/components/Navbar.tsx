"use client";

import { useState, useEffect } from "react";
import { Trees, Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.finca'), href: "#intro" },
    { name: t('nav.experiences'), href: "#experiencias" },
    { name: t('nav.testimonials'), href: "#testimonios" },
    { name: t('nav.rooms'), href: "#habitaciones" },
    { name: t('nav.location'), href: "#ubicacion" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-6 ${isScrolled ? "bg-[#fdfaf6]/95 backdrop-blur-sm shadow-md py-4" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 md:flex hidden">
          <div className="flex gap-8">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`nav-link text-sm uppercase tracking-widest ${isScrolled ? "text-slate-800" : "text-white"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <Link href="/" className="relative flex items-center justify-center w-40 h-16 group">
          <img
            src="/imagenes/logo/logo_la_masia-sin-fondo.png"
            alt="Villa Grande La Masía Logo"
            className={`h-full w-auto transition-all ${isScrolled ? "brightness-50" : "brightness-0 invert"}`}
          />
        </Link>

        <div className="flex-1 md:flex hidden justify-end items-center gap-8">
          <div className="flex gap-8">
            {navLinks.slice(3).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`nav-link text-sm uppercase tracking-widest ${isScrolled ? "text-slate-800" : "text-white"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all ${isScrolled ? "text-[#3e2723]" : "text-white"} hover:opacity-70`}
            >
              <Globe className="w-4 h-4" />
              {language === 'es' ? 'EN' : 'ES'}
            </button>

            <a
              href="#habitaciones"
              className={`px-6 py-2 border font-serif italic text-sm transition-all ${isScrolled
                ? "border-[#3e2723] text-[#3e2723] hover:bg-[#3e2723] hover:text-white"
                : "border-white text-white hover:bg-white hover:text-[#3e2723]"
                }`}
            >
              {t('nav.reserve')}
            </a>
          </div>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? "text-slate-950" : "text-white"} />
          ) : (
            <Menu className={isScrolled ? "text-slate-950" : "text-white"} />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#fdfaf6] border-t border-[#9a7d45]/20 mt-6 -mx-6 px-6 py-8 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-serif italic text-2xl text-[#3e2723]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex flex-col gap-4 items-center">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#3e2723]"
                >
                  <Globe className="w-5 h-5" />
                  {language === 'es' ? t('nav.lang_en') : t('nav.lang_es')}
                </button>

                <a
                  href="#habitaciones"
                  className="btn-classic justify-center w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.reserve')}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
