import { Request, Response } from 'express';
import bookingService from '../services/bookingService';
import { ApiResponse, Booking } from '../models/types';

// GET /api/bookings/slots
export const getAvailableSlots = async (_req: Request, res: Response): Promise<void> => {
  const slots = await bookingService.getAvailableSlots();

  res.status(200).json({
    success: true,
    message: 'OK',
    data: slots,
  });
};

// POST /api/bookings
export const createBooking = async (req: Request, res: Response): Promise<void> => {
  const booking = await bookingService.createBooking(req.body);

  const response: ApiResponse<Booking> = {
    success: true,
    message: 'Meeting scheduled successfully! A confirmation has been sent to your email.',
    data: booking,
  };

  res.status(201).json(response);
};

// GET /api/bookings
export const getAllBookings = async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  const result = await bookingService.getAllBookings(page, limit);

  res.status(200).json({
    success: true,
    message: 'OK',
    data: result.bookings,
    pagination: {
      total: result.total,
      page,
      limit,
      totalPages: Math.ceil(result.total / limit),
    },
  });
};

// GET /api/bookings/:id
export const getBookingById = async (req: Request, res: Response): Promise<void> => {
  const booking = await bookingService.getBookingById(req.params.id);

  if (!booking) {
    res.status(404).json({ success: false, message: 'Booking not found' });
    return;
  }

  res.status(200).json({ success: true, message: 'OK', data: booking });
};

// PATCH /api/bookings/:id/cancel
export const cancelBooking = async (req: Request, res: Response): Promise<void> => {
  const booking = await bookingService.cancelBooking(req.params.id);

  if (!booking) {
    res.status(404).json({ success: false, message: 'Booking not found' });
    return;
  }

  res.status(200).json({ success: true, message: 'Booking cancelled', data: booking });
};
