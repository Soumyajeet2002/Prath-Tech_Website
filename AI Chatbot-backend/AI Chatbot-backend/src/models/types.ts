// import { ChatNode } from "../data/chatFlow";

// ── API RESPONSE ──────────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// ── CHAT ──────────────────────────────────────────────────────────
export interface ChatMessageRequest {
  sessionId: string;
  nodeId: string;
  selectedOption?: string;
}

// ── CHAT ──────────────────────────────────────────────────────────
export interface ChatOption {
  label: string;
  value: string;
  nextNode: string;
  icon?: string;
}

export interface FeatureItem {
  text: string;
  icon?: string;
}

export interface ChatMessageResponse {
  nodeId: string;

  // Structured message sections
  intro?: string;
  body?: string;
  message?: string;
  followUp?: string;

  type: "message" | "form" | "slots" | "end" | "escalate";

  options?: ChatOption[];
  features?: FeatureItem[];
  formType?: "lead" | "support" | "booking";
  metadata?: Record<string, unknown>;
}

// ── LEAD ─────────────────────────────────────────────────────────
export interface LeadCreateRequest {
  companyName: string;
  industry?: string;
  numUsers?: string;
  productInterested?: string;
  email: string;
  mobile: string;
  notes?: string;
}

export interface Lead {
  id: string;
  company_name: string;
  industry: string | null;
  num_users: string | null;
  product_interested: string | null;
  email: string;
  mobile: string;
  source: string;
  status: string;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
}

// ── BOOKING ───────────────────────────────────────────────────────
export interface BookingCreateRequest {
  name: string;
  email: string;
  mobile?: string;
  companyName?: string;
  discussionType: string;
  bookingDate: string;
  timeSlot: string;
  notes?: string;
}

export interface Booking {
  id: string;
  lead_id: string | null;
  name: string;
  email: string;
  mobile: string | null;
  company_name: string | null;
  discussion_type: string;
  booking_date: Date;
  time_slot: string;
  expert_assigned: string;
  meet_link: string | null;
  status: string;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
}

// ── SUPPORT TICKET ────────────────────────────────────────────────
export interface SupportTicketCreateRequest {
  customerName: string;
  customerEmail: string;
  customerMobile?: string;
  product?: string;
  issueType: string;
  description: string;
  priority?: "low" | "medium" | "high";
}

export interface SupportTicket {
  id: string;
  ticket_number: string;
  customer_name: string;
  customer_email: string;
  customer_mobile: string | null;
  product: string | null;
  issue_type: string;
  description: string;
  priority: string;
  status: string;
  assigned_to: string | null;
  created_at: Date;
  updated_at: Date;
}

// ── TIME SLOT ─────────────────────────────────────────────────────
export interface TimeSlot {
  id: string;
  slot_time: string;
  slot_label: string;
  is_active: boolean;
}

export interface AvailableSlot {
  date: string;
  label: string;
  slots: TimeSlot[];
}
