import pool from "./database";
import dotenv from "dotenv";

dotenv.config();

const seed = async (): Promise<void> => {
  const client = await pool.connect();

  try {
    console.log("Seeding database...");

    await client.query("BEGIN");

    // Default time slots (IST)
    const slots = [
      { time: "10:00", label: "10:00 – 10:30 AM" },
      { time: "11:30", label: "11:30 – 12:00 PM" },
      { time: "14:00", label: "2:00 – 2:30 PM" },
      { time: "16:00", label: "4:00 – 4:30 PM" },
    ];

    for (const slot of slots) {
      await client.query(
        `
        INSERT INTO time_slots (slot_time, slot_label, is_active)
        VALUES ($1, $2, true)
        ON CONFLICT DO NOTHING;
      `,
        [slot.time, slot.label],
      );
    }

    await client.query("COMMIT");
    console.log("Database seeded successfully!");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Seeding failed:", err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
};

seed().catch(console.error);
