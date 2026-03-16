import pool from '../config/database';
import { Booking, BookingCreateRequest, AvailableSlot, TimeSlot } from '../models/types';
import emailService from './emailService';

export class BookingService {

  async createBooking(data: BookingCreateRequest): Promise<Booking> {
    const { name, email, mobile, companyName, discussionType, bookingDate, timeSlot, notes } = data;

    // Check if slot is already taken
    const existing = await pool.query(
      `SELECT id FROM bookings WHERE booking_date = $1 AND time_slot = $2 AND status != 'cancelled'`,
      [bookingDate, timeSlot]
    );

    if (existing.rows.length > 0) {
      throw new Error('This time slot is already booked. Please choose another.');
    }

    const result = await pool.query<Booking>(`
      INSERT INTO bookings (name, email, mobile, company_name, discussion_type, booking_date, time_slot, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `, [name, email, mobile || null, companyName || null, discussionType, bookingDate, timeSlot, notes || null]);

    const booking = result.rows[0];

    // Send confirmation emails (non-blocking)
    emailService.sendBookingConfirmation(booking).catch(console.error);
    emailService.sendBookingNotificationToTeam(booking).catch(console.error);

    return booking;
  }

  async getAvailableSlots(): Promise<AvailableSlot[]> {
    // Get all active time slots
    const slotsResult = await pool.query<TimeSlot>(
      'SELECT * FROM time_slots WHERE is_active = true ORDER BY slot_time'
    );
    const allSlots = slotsResult.rows;

    const today = new Date();
    const availableDays: AvailableSlot[] = [];

    // Build next 7 days excluding Sundays
    let daysAdded = 0;
    let offset = 0;

    while (daysAdded < 5) {
      const date = new Date(today);
      date.setDate(today.getDate() + offset);
      offset++;

      // Skip Sundays (0)
      if (date.getDay() === 0) continue;

      const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD

      // Get already booked slots for this date
      const bookedResult = await pool.query<{ time_slot: string }>(
        `SELECT time_slot FROM bookings WHERE booking_date = $1 AND status != 'cancelled'`,
        [dateStr]
      );
      const bookedSlots = bookedResult.rows.map(r => r.time_slot);

      // Filter out booked slots
      const availableSlots = allSlots.filter(s => !bookedSlots.includes(s.slot_label));

      const label = daysAdded === 0
        ? 'Today'
        : daysAdded === 1
          ? 'Tomorrow'
          : date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' });

      availableDays.push({
        date: dateStr,
        label,
        slots: availableSlots,
      });

      daysAdded++;
    }

    return availableDays;
  }

  async getBookingById(id: string): Promise<Booking | null> {
    const result = await pool.query<Booking>('SELECT * FROM bookings WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async getAllBookings(page = 1, limit = 20): Promise<{ bookings: Booking[]; total: number }> {
    const offset = (page - 1) * limit;

    const [bookingsResult, countResult] = await Promise.all([
      pool.query<Booking>(
        'SELECT * FROM bookings ORDER BY booking_date DESC, time_slot ASC LIMIT $1 OFFSET $2',
        [limit, offset]
      ),
      pool.query<{ count: string }>('SELECT COUNT(*) FROM bookings'),
    ]);

    return {
      bookings: bookingsResult.rows,
      total: parseInt(countResult.rows[0].count),
    };
  }

  async cancelBooking(id: string): Promise<Booking | null> {
    const result = await pool.query<Booking>(
      `UPDATE bookings SET status = 'cancelled' WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0] || null;
  }
}

export default new BookingService();
