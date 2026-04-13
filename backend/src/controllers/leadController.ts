import { Request, Response } from 'express';
import leadService from '../services/leadService';
import { ApiResponse, Lead } from '../models/types';

// POST /api/leads
export const createLead = async (req: Request, res: Response): Promise<void> => {
  const lead = await leadService.createLead(req.body);

  const response: ApiResponse<Lead> = {
    success: true,
    message: 'Lead captured successfully. Our team will reach out within 24 hours.',
    data: lead,
  };

  res.status(201).json(response);
};

// GET /api/leads
export const getAllLeads = async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  const result = await leadService.getAllLeads(page, limit);

  res.status(200).json({
    success: true,
    message: 'OK',
    data: result.leads,
    pagination: {
      total: result.total,
      page,
      limit,
      totalPages: Math.ceil(result.total / limit),
    },
  });
};

// GET /api/leads/:id
export const getLeadById = async (req: Request, res: Response): Promise<void> => {
  const lead = await leadService.getLeadById(req.params.id);

  if (!lead) {
    res.status(404).json({ success: false, message: 'Lead not found' });
    return;
  }

  res.status(200).json({ success: true, message: 'OK', data: lead });
};

// PATCH /api/leads/:id/status
export const updateLeadStatus = async (req: Request, res: Response): Promise<void> => {
  const { status } = req.body;
  const lead = await leadService.updateLeadStatus(req.params.id, status);

  if (!lead) {
    res.status(404).json({ success: false, message: 'Lead not found' });
    return;
  }

  res.status(200).json({ success: true, message: 'Status updated', data: lead });
};
