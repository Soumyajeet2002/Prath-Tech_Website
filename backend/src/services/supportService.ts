import pool from '../config/database';
import { SupportTicket, SupportTicketCreateRequest } from '../models/types';
import emailService from './emailService';

export class SupportService {

  // Generate ticket number like PT-2024-0001
  private async generateTicketNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const result = await pool.query<{ count: string }>(
      `SELECT COUNT(*) FROM support_tickets WHERE EXTRACT(YEAR FROM created_at) = $1`,
      [year]
    );
    const count = parseInt(result.rows[0].count) + 1;
    return `PT-${year}-${String(count).padStart(4, '0')}`;
  }

  async createTicket(data: SupportTicketCreateRequest): Promise<SupportTicket> {
    const { customerName, customerEmail, customerMobile, product, issueType, description, priority } = data;

    const ticketNumber = await this.generateTicketNumber();

    const result = await pool.query<SupportTicket>(`
      INSERT INTO support_tickets
        (ticket_number, customer_name, customer_email, customer_mobile, product, issue_type, description, priority)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `, [
      ticketNumber,
      customerName,
      customerEmail,
      customerMobile || null,
      product || null,
      issueType,
      description,
      priority || 'medium',
    ]);

    const ticket = result.rows[0];

    // Send notifications (non-blocking)
    emailService.sendTicketConfirmation(ticket).catch(console.error);
    emailService.sendTicketNotificationToTeam(ticket).catch(console.error);

    return ticket;
  }

  async getTicketById(id: string): Promise<SupportTicket | null> {
    const result = await pool.query<SupportTicket>('SELECT * FROM support_tickets WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async getTicketByNumber(ticketNumber: string): Promise<SupportTicket | null> {
    const result = await pool.query<SupportTicket>(
      'SELECT * FROM support_tickets WHERE ticket_number = $1',
      [ticketNumber]
    );
    return result.rows[0] || null;
  }

  async getAllTickets(page = 1, limit = 20): Promise<{ tickets: SupportTicket[]; total: number }> {
    const offset = (page - 1) * limit;

    const [ticketsResult, countResult] = await Promise.all([
      pool.query<SupportTicket>(
        'SELECT * FROM support_tickets ORDER BY created_at DESC LIMIT $1 OFFSET $2',
        [limit, offset]
      ),
      pool.query<{ count: string }>('SELECT COUNT(*) FROM support_tickets'),
    ]);

    return {
      tickets: ticketsResult.rows,
      total: parseInt(countResult.rows[0].count),
    };
  }

  async updateTicketStatus(id: string, status: string, assignedTo?: string): Promise<SupportTicket | null> {
    const result = await pool.query<SupportTicket>(
      `UPDATE support_tickets SET status = $1, assigned_to = COALESCE($2, assigned_to) WHERE id = $3 RETURNING *`,
      [status, assignedTo || null, id]
    );
    return result.rows[0] || null;
  }
}

export default new SupportService();
