import app from "./app";
import pool from "./config/database";
import dotenv from "dotenv";

dotenv.config();

const PORT = parseInt(process.env.PORT || "5000");

const startServer = async (): Promise<void> => {
  try {
    // Test DB connection
    await pool.query("SELECT 1");
    console.log("Database connection verified");

    app.listen(PORT, () => {
      console.log("");
      console.log("🚀 ─────────────────────────────────────────────");
      console.log(`🚀  Prath Tech Chatbot API`);
      console.log(`🚀  Running on: http://localhost:${PORT}`);
      console.log(`🚀  Environment: ${process.env.NODE_ENV || "development"}`);
      console.log("🚀 ─────────────────────────────────────────────");
      console.log("");
      console.log("📡 API Endpoints:");
      console.log(`   GET  http://localhost:${PORT}/health`);
      console.log(`   POST http://localhost:${PORT}/api/chat/session`);
      console.log(`   POST http://localhost:${PORT}/api/chat/message`);
      console.log(`   POST http://localhost:${PORT}/api/leads`);
      console.log(`   GET  http://localhost:${PORT}/api/bookings/slots`);
      console.log(`   POST http://localhost:${PORT}/api/bookings`);
      console.log(`   POST http://localhost:${PORT}/api/support/tickets`);
      console.log("");
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("\n⚠️  SIGTERM received. Shutting down gracefully...");
  await pool.end();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("\n⚠️  SIGINT received. Shutting down gracefully...");
  await pool.end();
  process.exit(0);
});

startServer();
