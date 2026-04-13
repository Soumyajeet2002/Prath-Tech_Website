import { Request, Response } from 'express';
import supportService from '../services/supportService';
import { ApiResponse, SupportTicket } from '../models/types';

// POST /api/support/tickets
export const createTicket = async (req: Request, res: Response): Promise<void> => {
  const ticket = await supportService.createTicket(req.body);

  const response: ApiResponse<SupportTicket> = {
    success: true,
    message: `Support ticket raised! Your ticket number is ${ticket.ticket_number}. We'll respond within 4 business hours.`,
    data: ticket,
  };

  res.status(201).json(response);
};

// GET /api/support/tickets
export const getAllTickets = async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  const result = await supportService.getAllTickets(page, limit);

  res.status(200).json({
    success: true,
    message: 'OK',
    data: result.tickets,
    pagination: {
      total: result.total,
      page,
      limit,
      totalPages: Math.ceil(result.total / limit),
    },
  });
};

// GET /api/support/tickets/:id
export const getTicketById = async (req: Request, res: Response): Promise<void> => {
  const ticket = await supportService.getTicketById(req.params.id);

  if (!ticket) {
    res.status(404).json({ success: false, message: 'Ticket not found' });
    return;
  }

  res.status(200).json({ success: true, message: 'OK', data: ticket });
};

// GET /api/support/tickets/number/:ticketNumber
export const getTicketByNumber = async (req: Request, res: Response): Promise<void> => {
  const ticket = await supportService.getTicketByNumber(req.params.ticketNumber);

  if (!ticket) {
    res.status(404).json({ success: false, message: 'Ticket not found' });
    return;
  }

  res.status(200).json({ success: true, message: 'OK', data: ticket });
};

// PATCH /api/support/tickets/:id/status
export const updateTicketStatus = async (req: Request, res: Response): Promise<void> => {
  const { status, assignedTo } = req.body;
  const ticket = await supportService.updateTicketStatus(req.params.id, status, assignedTo);

  if (!ticket) {
    res.status(404).json({ success: false, message: 'Ticket not found' });
    return;
  }

  res.status(200).json({ success: true, message: 'Status updated', data: ticket });
};
