import { Router } from 'express';
import {
  createTicket,
  getAllTickets,
  getTicketById,
  getTicketByNumber,
  updateTicketStatus,
} from '../controllers/supportController';
import { validate, supportValidation } from '../middleware/validator';

const router = Router();

// POST /api/support/tickets
router.post('/tickets', validate(supportValidation), createTicket);

// GET /api/support/tickets
router.get('/tickets', getAllTickets);

// GET /api/support/tickets/number/:ticketNumber
router.get('/tickets/number/:ticketNumber', getTicketByNumber);

// GET /api/support/tickets/:id
router.get('/tickets/:id', getTicketById);

// PATCH /api/support/tickets/:id/status
router.patch('/tickets/:id/status', updateTicketStatus);

export default router;
