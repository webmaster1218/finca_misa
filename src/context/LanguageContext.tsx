"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    es: {
        // Navbar
        'nav.finca': 'La Masía',
        'nav.experiences': 'Experiencias',
        'nav.testimonials': 'Testimonios',
        'nav.rooms': 'Alojamiento',
        'nav.location': 'Ubicación',
        'nav.reserve': 'Reservar',

        // Hero
        'hero.title': 'Villa Grande',
        'hero.subtitle': 'La Masía',
        'hero.location': 'Llanogrande, Rionegro',
        'hero.title_part1': 'VILLA GRANDE',
        'hero.title_part2': 'LA MISÍA',
        'hero.subtitle_long': 'Una joya arquitectónica en la Milla de Oro. Donde el estilo colonial y el confort moderno crean una experiencia inolvidable.',
        'hero.cta': 'Vivir la Experiencia',

        // Rooms Section
        'rooms.tag': 'Confort y Estilo',
        'rooms.title': '9 Habitaciones Exclusivas',
        'rooms.desc.title': 'Capacidad para 15 personas en un entorno de hacienda tradicional.',
        'rooms.staff': 'Servicio personalizado incluido: <span class="text-[#9a7d45] font-bold">Personal de limpieza</span>, camarera y <span class="text-[#9a7d45] font-bold">preparación de alimentos</span> para una estancia sin preocupaciones.',
        'rooms.hospedaje': 'Distribución',

        // Amenities
        'amenity.rooms': '9 Habitaciones',
        'amenity.beds': '12 Camas',
        'amenity.baths': '9 Baños',
        'amenity.people': '15 Personas',
        'amenity.pool': 'Jacuzzi - Turco - Fuentes',
        'amenity.water': 'Agua Caliente',
        'amenity.parking': 'Parqueadero Privado',
        'amenity.kiosk': 'Kiosco y BBQ',
        'amenity.firepit': 'Fogata y Picnic',
        'amenity.wifi': 'WiFi y TV Cable',

        // Booking Card
        'booking.price': 'Consultar Precio',
        'booking.night': 'noche',
        'booking.checkin': 'Llegada',
        'booking.checkout': 'Salida',
        'booking.guests': 'Huéspedes',
        'booking.button': 'Consultar Disponibilidad',
        'booking.button.done': 'Consulta enviada',
        'booking.no_charge': 'No se hará ningún cargo por el momento',
        'booking.service_fee': 'Tarifa de servicio',
        'booking.total': 'Total estimado',
        'booking.nights': 'noches',
        'booking.night_single': 'noche',
        'booking.guest_label': 'huésped',
        'booking.guests_label': 'huéspedes',
        'booking.infant_label': 'bebé',
        'booking.infants_label': 'bebés',
        'booking.pet_label': 'mascota',
        'booking.pets_label': 'mascotas',

        // Experiences
        'exp.tag': 'Entretenimiento Total',
        'exp.title': 'Para Disfrutar al Máximo',
        'exp.suites.title': 'Zona Húmeda',
        'exp.suites.desc': 'Jacuzzi y Turco para relajación total',
        'exp.eco.title': 'Deportes',
        'exp.eco.desc': 'Fútbol, Voleibol y Ping Pong',
        'exp.relax.title': 'Juegos y Bar',
        'exp.relax.desc': 'Billar Pool y Barra de tragos',
        'exp.events.title': 'Al Aire Libre',
        'exp.events.desc': 'BBQ, Fogata y Picnic en jardines',
        'exp.diamond.title': 'Social y Eventos',
        'exp.diamond.desc': 'Salón social y Kiosco para reuniones',

        // Cerro Tusa Feature (REPLACED by Architecture/Details)
        'feature.tag': 'Arquitectura Única',
        'feature.title': 'Estilo Colonial Mexicano',
        'feature.desc': '“Cada rincón de Villa Grande La Masía cuenta una historia. Piezas antiguas originales, patios con fuentes y corredores que evocan las grandes haciendas de antaño.”',
        'feature.cta': 'Conocer más',
        'feature.caption': '"Un viaje en el tiempo con el confort de hoy."',

        // Location
        'location.tag': 'Ubicación Privilegiada',
        'location.title': 'En la Milla de Oro',
        'location.visit': 'Visítanos',
        'location.address_label': 'Dirección',
        'location.parcelacion': 'Vereda Tres Puertas',
        'location.ref_label': 'Cercanía',
        'location.ref_val': 'A 10 min del Aeropuerto JMC',
        'location.google_btn': 'VER EN GOOGLE MAPS',

        // Footer
        'footer.contact': 'Contacto',
        'footer.navigation': 'Navegación',
        'footer.privacy': 'Privacidad',
        'footer.terms': 'Términos',
        'footer.policies': 'Políticas y Términos',
        'footer.rights': 'Todos los derechos reservados.',
        'footer.brand_desc': 'Villa Grande La Masía: Exclusividad, tradición y descanso en el corazón de Llanogrande.',

        // Gallery
        'gallery.tag': 'Nuestra Finca',
        'gallery.title': 'Galería Fotográfica',
        // placeholders for gallery keys if needed, dynamic likely better
        'gallery.img1': 'Fachada Principal',
        'gallery.img2': 'Jardines Interiores',
        'gallery.img3': 'Detalles Coloniales',
        'gallery.img4': 'Zona Húmeda',
        'gallery.img5': 'Salas de Estar',
        'gallery.img6': 'Iluminación Nocturna',
        'gallery.img7': 'Corredores',
        'gallery.img8': 'Habitaciones',
        'gallery.img9': 'Espacios Sociales',

        // Testimonials
        'testimonials.tag': 'Experiencias Reales',
        'testimonials.title': 'Lo que dicen nuestros huéspedes',
        'testimonials.res1.text': '“La arquitectura es impresionante, realmente te sientes en otra época pero con todas las comodidades. El servicio del personal fue impecable, la comida deliciosa.”',
        'testimonials.res2.text': '“Perfecta para nuestra reunión familiar. Los niños disfrutaron las canchas y el ping pong, y los adultos el jacuzzi y el bar. La ubicación cerca del aeropuerto es muy conveniente.”',
        'testimonials.res3.text': '“Celebramos un evento corporativo y el salón social funcionó de maravilla. Los jardines son hermosos para fotos. Muy recomendada.”',

        // Policies
        'policies.hero_title': 'Políticas y Términos',
        'policies.privacy_title': 'Política de Privacidad',
        'policies.privacy_content': 'En Villa Grande La Masía, su privacidad es nuestra prioridad...',
        'policies.terms_title': 'Términos y Condiciones',
        'policies.terms_content': 'Las reservas están sujetas a disponibilidad...',
        'policies.back_home': 'Volver al Inicio',

        // Common
        'common.available': 'Disponible',
        'common.occupied': 'Ocupado',
        'common.clear_dates': 'Borrar fechas',
        'common.close': 'Cerrar',
    },
    en: {
        // Navbar
        'nav.finca': 'La Masía',
        'nav.experiences': 'Experiencias',
        'nav.testimonials': 'Testimonios',
        'nav.rooms': 'Alojamiento',
        'nav.location': 'Ubicación',
        'nav.reserve': 'Reservar',

        // Hero
        'hero.title': 'Villa Grande',
        'hero.subtitle': 'La Masía',
        'hero.location': 'Llanogrande, Rionegro',
        'hero.title_part1': 'VILLA GRANDE',
        'hero.title_part2': 'LA MISÍA',
        'hero.subtitle_long': 'Una joya arquitectónica en la Milla de Oro. Donde el estilo colonial y el confort moderno crean una experiencia inolvidable.',
        'hero.cta': 'Vivir la Experiencia',

        // Rooms Section
        'rooms.tag': 'Confort y Estilo',
        'rooms.title': '9 Habitaciones Exclusivas',
        'rooms.desc.title': 'Capacidad para 15 personas en un entorno de hacienda tradicional.',
        'rooms.staff': 'Servicio personalizado incluido: <span class="text-[#9a7d45] font-bold">Personal de limpieza</span>, camarera y <span class="text-[#9a7d45] font-bold">preparación de alimentos</span> para una estancia sin preocupaciones.',
        'rooms.hospedaje': 'Distribución',

        // Amenities
        'amenity.rooms': '9 Habitaciones',
        'amenity.beds': '12 Camas',
        'amenity.baths': '9 Baños',
        'amenity.people': '15 Personas',
        'amenity.pool': 'Jacuzzi - Turco - Fuentes',
        'amenity.water': 'Agua Caliente',
        'amenity.parking': 'Parqueadero Privado',
        'amenity.kiosk': 'Kiosco y BBQ',
        'amenity.firepit': 'Fogata y Picnic',
        'amenity.wifi': 'WiFi y TV Cable',

        // Booking Card
        'booking.price': 'Consultar Precio',
        'booking.night': 'noche',
        'booking.checkin': 'Llegada',
        'booking.checkout': 'Salida',
        'booking.guests': 'Huéspedes',
        'booking.button': 'Consultar Disponibilidad',
        'booking.button.done': 'Consulta enviada',
        'booking.no_charge': 'No se hará ningún cargo por el momento',
        'booking.service_fee': 'Tarifa de servicio',
        'booking.total': 'Total estimado',
        'booking.nights': 'noches',
        'booking.night_single': 'noche',
        'booking.guest_label': 'huésped',
        'booking.guests_label': 'huéspedes',
        'booking.infant_label': 'bebé',
        'booking.infants_label': 'bebés',
        'booking.pet_label': 'mascota',
        'booking.pets_label': 'mascotas',

        // Experiences
        'exp.tag': 'Entretenimiento Total',
        'exp.title': 'Para Disfrutar al Máximo',
        'exp.suites.title': 'Zona Húmeda',
        'exp.suites.desc': 'Jacuzzi y Turco para relajación total',
        'exp.eco.title': 'Deportes',
        'exp.eco.desc': 'Fútbol, Voleibol y Ping Pong',
        'exp.relax.title': 'Juegos y Bar',
        'exp.relax.desc': 'Billar Pool y Barra de tragos',
        'exp.events.title': 'Al Aire Libre',
        'exp.events.desc': 'BBQ, Fogata y Picnic en jardines',
        'exp.diamond.title': 'Social y Eventos',
        'exp.diamond.desc': 'Salón social y Kiosco para reuniones',

        // Cerro Tusa Feature (REPLACED by Architecture/Details)
        'feature.tag': 'Arquitectura Única',
        'feature.title': 'Estilo Colonial Mexicano',
        'feature.desc': '“Cada rincón de Villa Grande La Masía cuenta una historia. Piezas antiguas originales, patios con fuentes y corredores que evocan las grandes haciendas de antaño.”',
        'feature.cta': 'Conocer más',
        'feature.caption': '"Un viaje en el tiempo con el confort de hoy."',

        // Location
        'location.tag': 'Ubicación Privilegiada',
        'location.title': 'En la Milla de Oro',
        'location.visit': 'Visítanos',
        'location.address_label': 'Dirección',
        'location.parcelacion': 'Vereda Tres Puertas',
        'location.ref_label': 'Cercanía',
        'location.ref_val': 'A 10 min del Aeropuerto JMC',
        'location.google_btn': 'VER EN GOOGLE MAPS',

        // Footer
        'footer.contact': 'Contacto',
        'footer.navigation': 'Navegación',
        'footer.privacy': 'Privacidad',
        'footer.terms': 'Términos',
        'footer.policies': 'Políticas y Términos',
        'footer.rights': 'Todos los derechos reservados.',
        'footer.brand_desc': 'Villa Grande La Masía: Exclusividad, tradición y descanso en el corazón de Llanogrande.',

        // Gallery
        'gallery.tag': 'Nuestra Finca',
        'gallery.title': 'Galería Fotográfica',
        // placeholders for gallery keys if needed, dynamic likely better
        'gallery.img1': 'Fachada Principal',
        'gallery.img2': 'Jardines Interiores',
        'gallery.img3': 'Detalles Coloniales',
        'gallery.img4': 'Zona Húmeda',
        'gallery.img5': 'Salas de Estar',
        'gallery.img6': 'Iluminación Nocturna',
        'gallery.img7': 'Corredores',
        'gallery.img8': 'Habitaciones',
        'gallery.img9': 'Espacios Sociales',

        // Testimonials
        'testimonials.tag': 'Experiencias Reales',
        'testimonials.title': 'Lo que dicen nuestros huéspedes',
        'testimonials.res1.text': '“La arquitectura es impresionante, realmente te sientes en otra época pero con todas las comodidades. El servicio del personal fue impecable, la comida deliciosa.”',
        'testimonials.res2.text': '“Perfecta para nuestra reunión familiar. Los niños disfrutaron las canchas y el ping pong, y los adultos el jacuzzi y el bar. La ubicación cerca del aeropuerto es muy conveniente.”',
        'testimonials.res3.text': '“Celebramos un evento corporativo y el salón social funcionó de maravilla. Los jardines son hermosos para fotos. Muy recomendada.”',

        // Policies
        'policies.hero_title': 'Políticas y Términos',
        'policies.privacy_title': 'Política de Privacidad',
        'policies.privacy_content': 'En Villa Grande La Masía, su privacidad es nuestra prioridad...',
        'policies.terms_title': 'Términos y Condiciones',
        'policies.terms_content': 'Las reservas están sujetas a disponibilidad...',
        'policies.back_home': 'Volver al Inicio',

        // Common
        'common.available': 'Disponible',
        'common.occupied': 'Ocupado',
        'common.clear_dates': 'Borrar fechas',
        'common.close': 'Cerrar',
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('es');

    useEffect(() => {
        const saved = localStorage.getItem('language') as Language;
        if (saved && (saved === 'es' || saved === 'en')) {
            setLanguage(saved);
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    const t = (key: string) => {
        return translations[language][key as keyof typeof translations['es']] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
