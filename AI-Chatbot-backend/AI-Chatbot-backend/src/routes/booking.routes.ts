import { Router } from 'express';
import {
  getAvailableSlots,
  createBooking,
  getAllBookings,
  getBookingById,
  cancelBooking,
} from '../controllers/bookingController';
import { validate, bookingValidation } from '../middleware/validator';

const router = Router();

// GET /api/bookings/slots
router.get('/slots', getAvailableSlots);

// POST /api/bookings
router.post('/', validate(bookingValidation), createBooking);

// GET /api/bookings
router.get('/', getAllBookings);

// GET /api/bookings/:id
router.get('/:id', getBookingById);

// PATCH /api/bookings/:id/cancel
router.patch('/:id/cancel', cancelBooking);

export default router;
