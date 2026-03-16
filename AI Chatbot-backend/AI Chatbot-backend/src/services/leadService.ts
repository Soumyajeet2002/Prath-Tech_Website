import pool from '../config/database';
import { Lead, LeadCreateRequest } from '../models/types';
import emailService from './emailService';

export class LeadService {

  async createLead(data: LeadCreateRequest): Promise<Lead> {
    const { companyName, industry, numUsers, productInterested, email, mobile, notes } = data;

    const result = await pool.query<Lead>(`
      INSERT INTO leads (company_name, industry, num_users, product_interested, email, mobile, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `, [companyName, industry || null, numUsers || null, productInterested || null, email, mobile, notes || null]);

    const lead = result.rows[0];

    // Send email notifications (non-blocking)
    emailService.sendLeadNotification(lead).catch(console.error);
    emailService.sendLeadAcknowledgement(lead).catch(console.error);

    return lead;
  }

  async getLeadById(id: string): Promise<Lead | null> {
    const result = await pool.query<Lead>('SELECT * FROM leads WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async getLeadByEmail(email: string): Promise<Lead | null> {
    const result = await pool.query<Lead>(
      'SELECT * FROM leads WHERE email = $1 ORDER BY created_at DESC LIMIT 1',
      [email]
    );
    return result.rows[0] || null;
  }

  async getAllLeads(page = 1, limit = 20): Promise<{ leads: Lead[]; total: number }> {
    const offset = (page - 1) * limit;

    const [leadsResult, countResult] = await Promise.all([
      pool.query<Lead>(
        'SELECT * FROM leads ORDER BY created_at DESC LIMIT $1 OFFSET $2',
        [limit, offset]
      ),
      pool.query<{ count: string }>('SELECT COUNT(*) FROM leads'),
    ]);

    return {
      leads: leadsResult.rows,
      total: parseInt(countResult.rows[0].count),
    };
  }

  async updateLeadStatus(id: string, status: string): Promise<Lead | null> {
    const result = await pool.query<Lead>(
      'UPDATE leads SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    return result.rows[0] || null;
  }
}

export default new LeadService();
