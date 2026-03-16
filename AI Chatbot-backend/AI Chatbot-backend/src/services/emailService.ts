import nodemailer from 'nodemailer';
import { Lead, Booking, SupportTicket } from '../models/types';
import dotenv from 'dotenv';

dotenv.config();

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  private get fromAddress(): string {
    return `"${process.env.COMPANY_NAME || 'Prath Technologies'}" <${process.env.SMTP_USER}>`;
  }

  private get companyEmail(): string {
    return process.env.COMPANY_EMAIL || process.env.SMTP_USER || '';
  }

  // ── LEAD EMAILS ────────────────────────────────────────────────
  async sendLeadNotification(lead: Lead): Promise<void> {
    await this.transporter.sendMail({
      from: this.fromAddress,
      to: this.companyEmail,
      subject: `🔔 New Lead: ${lead.company_name} – ${lead.product_interested || 'General Inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #1a56db;">New Lead from Website Chatbot</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Company</b></td><td style="padding: 8px; border: 1px solid #ddd;">${lead.company_name}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Industry</b></td><td style="padding: 8px; border: 1px solid #ddd;">${lead.industry || '—'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>No. of Users</b></td><td style="padding: 8px; border: 1px solid #ddd;">${lead.num_users || '—'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Product Interested</b></td><td style="padding: 8px; border: 1px solid #ddd;">${lead.product_interested || '—'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Email</b></td><td style="padding: 8px; border: 1px solid #ddd;">${lead.email}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Mobile</b></td><td style="padding: 8px; border: 1px solid #ddd;">${lead.mobile}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Notes</b></td><td style="padding: 8px; border: 1px solid #ddd;">${lead.notes || '—'}</td></tr>
          </table>
          <p style="color: #666; font-size: 12px;">Received at: ${new Date(lead.created_at).toLocaleString('en-IN')}</p>
        </div>
      `,
    });
  }

  async sendLeadAcknowledgement(lead: Lead): Promise<void> {
    await this.transporter.sendMail({
      from: this.fromAddress,
      to: lead.email,
      subject: `Thank you for your interest – Prath Technologies`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #1a56db;">Thank you, ${lead.company_name}! 👋</h2>
          <p>We have received your inquiry about <b>${lead.product_interested || 'our products'}</b>.</p>
          <p>Our team will reach out to you within <b>24 business hours</b> at:</p>
          <ul>
            <li>📧 Email: ${lead.email}</li>
            <li>📱 Mobile: ${lead.mobile}</li>
          </ul>
          <p>In the meantime, feel free to explore more at our website.</p>
          <br/>
          <p>Best regards,<br/><b>Prath Technologies Sales Team</b></p>
        </div>
      `,
    });
  }

  // ── BOOKING EMAILS ─────────────────────────────────────────────
  async sendBookingConfirmation(booking: Booking): Promise<void> {
    const formattedDate = new Date(booking.booking_date).toLocaleDateString('en-IN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    await this.transporter.sendMail({
      from: this.fromAddress,
      to: booking.email,
      subject: `✅ Meeting Confirmed – ${formattedDate} at ${booking.time_slot}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #1a56db;">Your Meeting is Confirmed! ✅</h2>
          <div style="background: #f0f7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p>📅 <b>Date:</b> ${formattedDate}</p>
            <p>⏰ <b>Time:</b> ${booking.time_slot} (IST)</p>
            <p>💼 <b>Discussion Type:</b> ${booking.discussion_type}</p>
            <p>👨‍💼 <b>Expert:</b> ${booking.expert_assigned}</p>
            <p>📞 <b>Mode:</b> Google Meet / Phone Call</p>
          </div>
          <p>We'll send you the meeting link closer to the time.</p>
          <p>If you need to reschedule, please reply to this email.</p>
          <br/>
          <p>Best regards,<br/><b>Prath Technologies Team</b></p>
        </div>
      `,
    });
  }

  async sendBookingNotificationToTeam(booking: Booking): Promise<void> {
    const formattedDate = new Date(booking.booking_date).toLocaleDateString('en-IN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    await this.transporter.sendMail({
      from: this.fromAddress,
      to: this.companyEmail,
      subject: `📅 New Meeting: ${booking.name} – ${formattedDate} ${booking.time_slot}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #1a56db;">New Meeting Booked</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Name</b></td><td style="padding: 8px; border: 1px solid #ddd;">${booking.name}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Company</b></td><td style="padding: 8px; border: 1px solid #ddd;">${booking.company_name || '—'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Email</b></td><td style="padding: 8px; border: 1px solid #ddd;">${booking.email}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Mobile</b></td><td style="padding: 8px; border: 1px solid #ddd;">${booking.mobile || '—'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Discussion Type</b></td><td style="padding: 8px; border: 1px solid #ddd;">${booking.discussion_type}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Date</b></td><td style="padding: 8px; border: 1px solid #ddd;">${formattedDate}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Time</b></td><td style="padding: 8px; border: 1px solid #ddd;">${booking.time_slot} (IST)</td></tr>
          </table>
        </div>
      `,
    });
  }

  // ── SUPPORT TICKET EMAILS ──────────────────────────────────────
  async sendTicketConfirmation(ticket: SupportTicket): Promise<void> {
    await this.transporter.sendMail({
      from: this.fromAddress,
      to: ticket.customer_email,
      subject: `🎫 Support Ticket Raised – ${ticket.ticket_number}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #1a56db;">Support Ticket Received ✅</h2>
          <div style="background: #f0f7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p>🎫 <b>Ticket Number:</b> ${ticket.ticket_number}</p>
            <p>🔧 <b>Issue Type:</b> ${ticket.issue_type}</p>
            <p>📋 <b>Priority:</b> ${ticket.priority.toUpperCase()}</p>
            <p>📦 <b>Product:</b> ${ticket.product || '—'}</p>
          </div>
          <p>Our support team will respond within <b>4 business hours</b>.</p>
          <p>You can track your ticket by referencing: <b>${ticket.ticket_number}</b></p>
          <br/>
          <p>Best regards,<br/><b>Prath Technologies Support Team</b></p>
        </div>
      `,
    });
  }

  async sendTicketNotificationToTeam(ticket: SupportTicket): Promise<void> {
    await this.transporter.sendMail({
      from: this.fromAddress,
      to: this.companyEmail,
      subject: `🆕 New Support Ticket: ${ticket.ticket_number} – ${ticket.issue_type}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #e53e3e;">New Support Ticket</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Ticket No.</b></td><td style="padding: 8px; border: 1px solid #ddd;">${ticket.ticket_number}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Customer</b></td><td style="padding: 8px; border: 1px solid #ddd;">${ticket.customer_name}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Email</b></td><td style="padding: 8px; border: 1px solid #ddd;">${ticket.customer_email}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Mobile</b></td><td style="padding: 8px; border: 1px solid #ddd;">${ticket.customer_mobile || '—'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Product</b></td><td style="padding: 8px; border: 1px solid #ddd;">${ticket.product || '—'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Issue Type</b></td><td style="padding: 8px; border: 1px solid #ddd;">${ticket.issue_type}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Priority</b></td><td style="padding: 8px; border: 1px solid #ddd;">${ticket.priority.toUpperCase()}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><b>Description</b></td><td style="padding: 8px; border: 1px solid #ddd;">${ticket.description}</td></tr>
          </table>
          <p style="color: #666; font-size: 12px;">Raised at: ${new Date(ticket.created_at).toLocaleString('en-IN')}</p>
        </div>
      `,
    });
  }
}

export default new EmailService();
