import { NextResponse } from 'next/server';
import ical from 'ical-generator';

export async function GET() {
    try {
        // Generar un calendario básico sin reservas internas por ahora
        const calendar = ical({
            name: 'La Juana - Venecia Reservations',
            prodId: { company: 'La Juana', product: 'Booking System', language: 'ES' },
            timezone: 'America/Bogota'
        });

        return new NextResponse(calendar.toString(), {
            status: 200,
            headers: {
                'Content-Type': 'text/calendar; charset=utf-8',
                'Content-Disposition': 'attachment; filename="reservas.ics"',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
        });
    } catch (error: any) {
        // En caso de error fatal, devolvemos un iCal básico para no romper la conexión
        return new NextResponse('BEGIN:VCALENDAR\nVERSION:2.0\nEND:VCALENDAR', {
            status: 200,
            headers: { 'Content-Type': 'text/calendar' }
        });
    }
}
