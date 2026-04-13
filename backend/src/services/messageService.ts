import pool from "../config/database";

export async function saveMessage(
  sessionId: string,
  sender: "user" | "bot",
  message: string,
  nodeId?: string,
) {
  await pool.query(
    `INSERT INTO chat_messages 
     (session_id, sender, message, node_id)
     VALUES ($1, $2, $3, $4)`,
    [sessionId, sender, message, nodeId || null],
  );
}
