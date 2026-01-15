"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, any> = {
    es: {
        // Navbar
        'nav.finca': 'La Masía',
        'nav.experiences': 'Experiencias',
        'nav.testimonials': 'Testimonios',
        'nav.rooms': 'Alojamiento',
        'nav.location': 'Ubicación',
        'nav.reserve': 'Reservar',
        'nav.lang_en': 'English',
        'nav.lang_es': 'Español',

        // Hero
        'hero.title': 'Villa Grande',
        'hero.subtitle': 'La Masía',
        'hero.location': 'Llanogrande, Rionegro',
        'hero.title_part1': 'VILLA GRANDE',
        'hero.title_part2': 'LA MASIA',
        'hero.subtitle_long': 'Una joya arquitectónica en la Milla de Oro. Donde el estilo colonial y el confort moderno crean una experiencia inolvidable.',
        'hero.cta': 'Vivir la Experiencia',

        // Intro
        'intro.tag': 'Bienvenido a la Experiencia',
        'intro.title1': 'Villa Grande',
        'intro.title2': 'La Masía',
        'intro.desc': 'Una auténtica casa de campo de estilo colonial, donde cada rincón cuenta una historia. Decorada con piezas antiguas originales para evocar la calidez de los ranchos mexicanos.',
        'intro.stat.rooms': 'Habitaciones',
        'intro.stat.capacity': 'Capacidad',
        'intro.stat.people': '15 Personas',
        'intro.stat.baths': 'Baños',
        'intro.stat.location': 'Ubicación',

        // Service Highlight
        'service.tag': 'Experiencia Hotelera',
        'service.title': 'Servicio Personalizado Incluido',
        'service.desc': 'Olvídese "de todo". Su estancia incluye un equipo dedicado para que solo se preocupe de disfrutar.',
        'service.1.title': 'Camarera y Limpieza',
        'service.1.desc': 'Servicio diario de limpieza, tendido de camas y orden para mantener la frescura de la finca.',
        'service.2.title': 'Preparación de Alimentos',
        'service.2.desc': 'Nuestro personal se encarga de la preparación de sus comidas (desayuno y almuerzo), usted solo trae los ingredientes.',
        'service.3.title': 'Espacios Impecables',
        'service.3.desc': 'Mantenimiento constante de zonas húmedas y áreas sociales durante su estancia.',

        // Rooms Section
        'rooms.tag': 'Confort y Estilo',
        'rooms.title': 'Reserva la Finca',
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
        'booking.capacity_note': 'Este alojamiento tiene una capacidad máxima de 16 huéspedes, sin contar bebés.',
        'booking.available': 'Disponible',
        'booking.occupied': 'Ocupado',
        'booking.clear_dates': 'Borrar fechas',

        // Experiences
        'exp.tag': 'Entretenimiento Total',
        'exp.title': 'Experiencias Inolvidables',
        'exp.desc': 'Descubra una amplia variedad de actividades diseñadas para todas las edades y gustos. Desde relajación total hasta diversión activa en contacto con la naturaleza.',
        'exp.cat.wellness': 'Bienestar y Relax',
        'exp.cat.events': 'Eventos & Auditorio',
        'exp.cat.sports': 'Deportes y Diversión',
        'exp.cat.kids': 'Diversión Infantil',
        'exp.cat.firepit': 'Fogata & Picnic',
        'exp.item.jacuzzi': 'Jacuzzi Climatizado',
        'exp.item.steam': 'Turco',
        'exp.item.auditorium': 'Auditorio',
        'exp.item.social': 'Salón Social',
        'exp.item.event_spaces': 'Espacios para Eventos',
        'exp.item.soccer': 'Fútbol',
        'exp.item.volleyball': 'Voleibol',
        'exp.item.pool_table': 'Billar Pool',
        'exp.item.ping_pong': 'Ping Pong',
        'exp.item.playground': 'Parque Infantil',
        'exp.item.games': 'Juegos',
        'exp.item.firepit': 'Fogata',
        'exp.item.picnic': 'Picnic Nocturno',

        // Location
        'location.tag': 'Ubicación Privilegiada',
        'location.title': 'En la Milla de Oro',
        'location.desc': 'Situada estratégicamente en el corazón de Llanogrande, nuestra finca ofrece el equilibrio perfecto entre la serenidad del campo y la cercanía a los mejores servicios.',
        'location.visit': 'Visítanos',
        'location.address_label': 'Dirección',
        'location.parcelacion': 'Vereda Tres Puertas',
        'location.ref_label': 'Cercanía',
        'location.ref_val': 'A 10 min del Aeropuerto JMC',
        'location.google_btn': 'VER EN GOOGLE MAPS',

        // Footer
        'footer.contact': 'Contacto',
        'footer.navigation': 'Navegación',
        'footer.policies': 'Políticas y Términos',
        'footer.rights': 'Todos los derechos reservados.',
        'footer.brand_desc': 'Villa Grande La Masía: Exclusividad, tradición y descanso en el corazón de Llanogrande.',

        // Gallery
        'gallery.tag': 'Nuestra Finca',
        'gallery.title': 'Galería Fotográfica',
        'gallery.desc': 'Un recorrido visual por los rincones más especiales de nuestra finca. Explore la arquitectura, los paisajes y la calidez de nuestros espacios.',
        'gallery.img1': 'Fachada Principal',
        'gallery.img2': 'Jardines',
        'gallery.img3': 'Fogata natural',
        'gallery.img4': 'Espacios para compartir',
        'gallery.img5': 'Kiosko',

        // Testimonials
        'testimonials.tag': 'Experiencias Reales',
        'testimonials.title': 'Lo que dicen nuestros huéspedes',
        'testimonials.res1.text': '“La arquitectura es impresionante, realmente te sientes en otra época pero con todas las comodidades. El servicio del personal fue impecable, la comida deliciosa.”',
        'testimonials.res2.text': '“Perfecta para nuestra reunión familiar. Los niños disfrutaron las canchas y el ping pong, y los adultos el jacuzzi y el bar. La ubicación cerca del aeropuerto es muy conveniente.”',
        'testimonials.res3.text': '“Celebramos un evento corporativo y el salón social funcionó de maravilla. Los jardines son hermosos para fotos. Muy recomendada.”',
        'testimonials.loc.res1': 'Medellín, CO',
        'testimonials.loc.res2': 'Evento Corporativo',
        'testimonials.loc.res3': 'Bogotá, CO',

        // Policies
        'policies.hero_title': 'Políticas y Términos',
        'policies.privacy_title': 'Política de Privacidad',
        'policies.privacy_content': 'En Villa Grande La Masía, su privacidad es nuestra prioridad...',
        'policies.terms_title': 'Términos y Condiciones',
        'policies.terms_content': 'Las reservas están sujetas a disponibilidad...',
        'policies.back_home': 'Volver al Inicio',

        // Showcase
        'showcase.tag': 'Descanso Superior',
        'showcase.title': 'Alojamiento & Detalles',
        'showcase.rooms': 'Habitaciones',
        'showcase.rooms.desc': 'Habitaciones amplias y acogedoras diseñadas para un descanso profundo en un ambiente colonial.',
        'showcase.baths': 'Baños de Lujo',
        'showcase.baths.desc': 'Espacios de relajación con acabados premium y grifería de lujo para su confort.',

        // Common & WhatsApp
        'common.help': '¿Necesitas ayuda?',
        'common.whatsapp_aria': 'Contactar por WhatsApp',
        'common.available': 'Disponible',
        'common.occupied': 'Ocupado',
        'common.close': 'Cerrar',
        'common.guests': 'Huéspedes',
        'common.brand_name': 'Villa Grande La Masía',
    },
    en: {
        // Navbar
        'nav.finca': 'The Hacienda',
        'nav.experiences': 'Experiences',
        'nav.testimonials': 'Testimonials',
        'nav.rooms': 'Accommodation',
        'nav.location': 'Location',
        'nav.reserve': 'Book Now',
        'nav.lang_en': 'English',
        'nav.lang_es': 'Spanish',

        // Hero
        'hero.title': 'Villa Grande',
        'hero.subtitle': 'The Hacienda',
        'hero.location': 'Llanogrande, Rionegro',
        'hero.title_part1': 'VILLA GRANDE',
        'hero.title_part2': 'LA MASIA',
        'hero.subtitle_long': 'An architectural jewel in the Golden Mile. Where colonial style and modern comfort create an unforgettable experience.',
        'hero.cta': 'Live the Experience',

        // Intro
        'intro.tag': 'Welcome to the Experience',
        'intro.title1': 'Villa Grande',
        'intro.title2': 'La Masía',
        'intro.desc': 'An authentic colonial-style country house, where every corner tells a story. Decorated with original antique pieces to evoke the warmth of Mexican ranches.',
        'intro.stat.rooms': 'Rooms',
        'intro.stat.capacity': 'Capacity',
        'intro.stat.people': '15 People',
        'intro.stat.baths': 'Baths',
        'intro.stat.location': 'Location',

        // Service Highlight
        'service.tag': 'Hotel Experience',
        'service.title': 'Personalized Service Included',
        'service.desc': 'Forget about "everything". Your stay includes a dedicated team so you only worry about enjoying.',
        'service.1.title': 'Housekeeping & Cleaning',
        'service.1.desc': 'Daily cleaning service, bed making and tidying to maintain the freshness of the villa.',
        'service.2.title': 'Meal Preparation',
        'service.2.desc': 'Our staff takes care of preparing your meals (breakfast and lunch), you only bring the ingredients.',
        'service.3.title': 'Impeccable Spaces',
        'service.3.desc': 'Constant maintenance of wet areas and social spaces during your stay.',

        // Rooms Section
        'rooms.tag': 'Comfort and Style',
        'rooms.title': 'Book the Villa',
        'rooms.desc.title': 'Capacity for 15 people in a traditional hacienda setting.',
        'rooms.staff': 'Personalized service included: <span class="text-[#9a7d45] font-bold">Housekeeping staff</span>, maid and <span class="text-[#9a7d45] font-bold">food preparation</span> for a worry-free stay.',
        'rooms.hospedaje': 'Distribution',

        // Amenities
        'amenity.rooms': '9 Bedrooms',
        'amenity.beds': '12 Beds',
        'amenity.baths': '9 Bathrooms',
        'amenity.people': '15 Guests',
        'amenity.pool': 'Jacuzzi - Steam - Fountains',
        'amenity.water': 'Hot Water',
        'amenity.parking': 'Private Parking',
        'amenity.kiosk': 'Kiosk and BBQ',
        'amenity.firepit': 'Firepit and Picnic',
        'amenity.wifi': 'WiFi and Cable TV',

        // Booking Card
        'booking.price': 'Check Price',
        'booking.night': 'night',
        'booking.checkin': 'Check-in',
        'booking.checkout': 'Check-out',
        'booking.guests': 'Guests',
        'booking.button': 'Check Availability',
        'booking.button.done': 'Request Sent',
        'booking.no_charge': 'No charge will be made at this time',
        'booking.service_fee': 'Service fee',
        'booking.total': 'Estimated Total',
        'booking.nights': 'nights',
        'booking.night_single': 'night',
        'booking.guest_label': 'guest',
        'booking.guests_label': 'guests',
        'booking.infant_label': 'infant',
        'booking.infants_label': 'infants',
        'booking.pet_label': 'pet',
        'booking.pets_label': 'pets',

        // Experiences
        'exp.tag': 'Total Entertainment',
        'exp.title': 'Unforgettable Experiences',
        'exp.desc': 'Discover a wide variety of activities designed for all ages and tastes. From total relaxation to active fun in contact with nature.',
        'exp.cat.wellness': 'Wellness and Relax',
        'exp.cat.events': 'Events & auditorium',
        'exp.cat.sports': 'Sports and Fun',
        'exp.cat.kids': 'Kids Fun',
        'exp.cat.firepit': 'Firepit & Picnic',
        'exp.item.jacuzzi': 'Heated Jacuzzi',
        'exp.item.steam': 'Steam Room',
        'exp.item.auditorium': 'Auditorium',
        'exp.item.social': 'Social Lounge',
        'exp.item.event_spaces': 'Event Spaces',
        'exp.item.soccer': 'Soccer',
        'exp.item.volleyball': 'Volleyball',
        'exp.item.pool_table': 'Pool Table',
        'exp.item.ping_pong': 'Ping Pong',
        'exp.item.playground': 'Playground',
        'exp.item.games': 'Games',
        'exp.item.firepit': 'Firepit',
        'exp.item.picnic': 'Night Picnic',

        // Location
        'location.tag': 'Privileged Location',
        'location.title': 'On the Golden Mile',
        'location.desc': 'Strategically located in the heart of Llanogrande, our villa offers the perfect balance between countryside serenity and proximity to the best services.',
        'location.visit': 'Visit Us',
        'location.address_label': 'Address',
        'location.parcelacion': 'Tres Puertas Sector',
        'location.ref_label': 'Proximity',
        'location.ref_val': '10 min from JMC Airport',
        'location.google_btn': 'VIEW ON GOOGLE MAPS',

        // Footer
        'footer.contact': 'Contact',
        'footer.navigation': 'Navigation',
        'footer.policies': 'Policies & Terms',
        'footer.rights': 'All rights reserved.',
        'footer.brand_desc': 'Villa Grande La Masía: Exclusivity, tradition, and rest in the heart of Llanogrande.',

        // Gallery
        'gallery.tag': 'Our Villa',
        'gallery.title': 'Photo Gallery',
        'gallery.desc': 'A visual journey through the most special corners of our villa. Explore the architecture, landscapes, and warmth of our spaces.',
        'gallery.img1': 'Principal Facade',
        'gallery.img2': 'Gardens',
        'gallery.img3': 'Natural Firepit',
        'gallery.img4': 'Shared Spaces',
        'gallery.img5': 'Kiosk',

        // Testimonials
        'testimonials.tag': 'Real Experiences',
        'testimonials.title': 'What our guests say',
        'testimonials.res1.text': '“The architecture is impressive, you really feel in another era but with all the comforts. The staff service was impeccable, the food delicious.”',
        'testimonials.res2.text': '“Perfect for our family gathering. The kids enjoyed the courts and ping pong, and the adults the jacuzzi and bar. The location near the airport is very convenient.”',
        'testimonials.res3.text': '“We celebrated a corporate event and the social lounge worked wonderfully. The gardens are beautiful for photos. Highly recommended.”',
        'testimonials.loc.res1': 'Medellín, CO',
        'testimonials.loc.res2': 'Corporate Event',
        'testimonials.loc.res3': 'Bogotá, CO',

        // Policies
        'policies.hero_title': 'Policies and Terms',
        'policies.privacy_title': 'Privacy Policy',
        'policies.privacy_content': 'At Villa Grande La Masía, your privacy is our priority...',
        'policies.terms_title': 'Terms and Conditions',
        'policies.terms_content': 'Reservations are subject to availability...',
        'policies.back_home': 'Back to Home',

        // Showcase
        'showcase.tag': 'Superior Rest',
        'showcase.title': 'Accommodation & Details',
        'showcase.rooms': 'Rooms',
        'showcase.rooms.desc': 'Spacious and cozy rooms designed for deep rest in a colonial atmosphere.',
        'showcase.baths': 'Luxury Bathrooms',
        'showcase.baths.desc': 'Relaxation spaces with premium finishes and luxury faucets for your comfort.',

        // Common & WhatsApp
        'common.help': 'Need help?',
        'common.whatsapp_aria': 'Contact via WhatsApp',
        'common.available': 'Available',
        'common.occupied': 'Occupied',
        'common.close': 'Close',
        'common.brand_name': 'Villa Grande La Masía',
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
