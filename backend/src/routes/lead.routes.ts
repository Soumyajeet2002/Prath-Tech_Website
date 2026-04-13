import { Router } from 'express';
import { createLead, getAllLeads, getLeadById, updateLeadStatus } from '../controllers/leadController';
import { validate, leadValidation } from '../middleware/validator';

const router = Router();

// POST /api/leads
router.post('/', validate(leadValidation), createLead);

// GET /api/leads
router.get('/', getAllLeads);

// GET /api/leads/:id
router.get('/:id', getLeadById);

// PATCH /api/leads/:id/status
router.patch('/:id/status', updateLeadStatus);

export default router;
