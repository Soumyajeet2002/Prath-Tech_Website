import pool from "./database";
import dotenv from "dotenv";

dotenv.config();

const migrate = async (): Promise<void> => {
  const client = await pool.connect();

  try {
    console.log("Running database migrations...");

    await client.query("BEGIN");

    // ── DROP EXISTING TABLES (for clean migration) ────────────
    console.log("Dropping existing tables if any...");
    await client.query(`
      DROP TABLE IF EXISTS chat_sessions CASCADE;
      DROP TABLE IF EXISTS time_slots CASCADE;
      DROP TABLE IF EXISTS support_tickets CASCADE;
      DROP TABLE IF EXISTS bookings CASCADE;
      DROP TABLE IF EXISTS leads CASCADE;
    `);
    console.log("Old tables dropped");

    // ── LEADS TABLE ────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        company_name VARCHAR(255) NOT NULL,
        industry VARCHAR(100),
        num_users VARCHAR(50),
        product_interested VARCHAR(100),
        email VARCHAR(255) NOT NULL,
        mobile VARCHAR(20) NOT NULL,
        source VARCHAR(50) DEFAULT 'chatbot',
        status VARCHAR(50) DEFAULT 'new',
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // ── BOOKINGS TABLE ─────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        mobile VARCHAR(20),
        company_name VARCHAR(255),
        discussion_type VARCHAR(100) NOT NULL,
        booking_date DATE NOT NULL,
        time_slot VARCHAR(50) NOT NULL,
        expert_assigned VARCHAR(100) DEFAULT 'Sales Team',
        meet_link VARCHAR(500),
        status VARCHAR(50) DEFAULT 'confirmed',
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // ── SUPPORT TICKETS TABLE ──────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS support_tickets (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        ticket_number VARCHAR(20) UNIQUE NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_mobile VARCHAR(20),
        product VARCHAR(100),
        issue_type VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        priority VARCHAR(20) DEFAULT 'medium',
        status VARCHAR(50) DEFAULT 'open',
        assigned_to VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // ── CHAT SESSIONS TABLE ────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS chat_sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        session_id VARCHAR(255) UNIQUE NOT NULL,
        current_node VARCHAR(100) DEFAULT 'welcome',
        context JSONB DEFAULT '{}',
        ip_address VARCHAR(50),
        user_agent TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // ── TIME SLOTS TABLE ───────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS time_slots (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slot_time VARCHAR(50) NOT NULL,
        slot_label VARCHAR(100) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    console.log("All tables created successfully");

    // ── INDEXES ────────────────────────────────────────────────────
    console.log("Creating indexes...");
    await client.query(
      `CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);`,
    );
    await client.query(
      `CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);`,
    );
    await client.query(
      `CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);`,
    );
    await client.query(
      `CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);`,
    );
    await client.query(
      `CREATE INDEX IF NOT EXISTS idx_tickets_number ON support_tickets(ticket_number);`,
    );
    await client.query(
      `CREATE INDEX IF NOT EXISTS idx_sessions_id ON chat_sessions(session_id);`,
    );

    console.log("All indexes created successfully");

    // ── UPDATE TRIGGER ─────────────────────────────────────────────
    await client.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    for (const table of ["leads", "bookings", "support_tickets"]) {
      await client.query(`
        DROP TRIGGER IF EXISTS update_${table}_updated_at ON ${table};
        CREATE TRIGGER update_${table}_updated_at
          BEFORE UPDATE ON ${table}
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
      `);
    }

    await client.query("COMMIT");
    console.log("All migrations completed successfully!");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Migration failed:", err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
};

migrate().catch(console.error);
