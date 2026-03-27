// import { Request, Response } from "express";
// import chatService from "../services/chatService";
// import {
//   ApiResponse,
//   ChatMessageResponse,
//   ChatMessageRequest,
// } from "../models/types";

// // POST /api/chat/session  – Create or resume a session
// export const createSession = async (
//   req: Request,
//   res: Response,
// ): Promise<void> => {
//   const { sessionId } = req.body as { sessionId?: string };

//   if (!sessionId) {
//     res.status(400).json({
//       success: false,
//       message: "sessionId is required",
//     });
//     return;
//   }
//   const ipAddress = req.ip;
//   const userAgent = req.headers["user-agent"];

//   await chatService.createSession(sessionId, ipAddress, userAgent);

//   const welcomeNode = chatService.getNode("welcome");

//   const response: ApiResponse<ChatMessageResponse> = {
//     success: true,
//     message: "Session created",
//     data: welcomeNode ?? undefined,
//   };

//   res.status(200).json(response);
// };

// // POST /api/chat/message  – Process a message/selection
// export const sendMessage = async (
//   req: Request,
//   res: Response,
// ): Promise<void> => {
//   const body = req.body as Partial<ChatMessageRequest>;

//   if (!body.sessionId || !body.nodeId) {
//     res.status(400).json({
//       success: false,
//       message: "sessionId and nodeId are required",
//     });
//     return;
//   }

//   const result = await chatService.processMessage({
//     sessionId: body.sessionId,
//     nodeId: body.nodeId,
//     selectedOption: body.selectedOption,
//   });

//   if (!result) {
//     res.status(404).json({
//       success: false,
//       message: `Node '${body.nodeId}' not found`,
//     });
//     return;
//   }

//   const response: ApiResponse<ChatMessageResponse> = {
//     success: true,
//     message: "OK",
//     data: result,
//   };

//   res.status(200).json(response);
// };

// // GET /api/chat/node/:nodeId  – Get a specific node directly
// export const getNode = (req: Request, res: Response): void => {
//   const { nodeId } = req.params;
//   const node = chatService.getNode(nodeId);

//   if (!node) {
//     res
//       .status(404)
//       .json({ success: false, message: `Node '${nodeId}' not found` });
//     return;
//   }

//   res.status(200).json({ success: true, message: "OK", data: node });
// };




// 


import { Request, Response } from "express";
import chatService from "../services/chatService";
import { saveMessage } from "../services/messageService";
import {
  ApiResponse,
  ChatMessageResponse,
  ChatMessageRequest,
} from "../models/types";
import pool from "../config/database";
import { randomUUID } from "crypto";

// POST /api/chat/session  – Create or resume a session
export const createSession = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const sessionId = randomUUID();

  const ipAddress = req.ip;
  const userAgent = req.headers["user-agent"];

  await chatService.createSession(sessionId, ipAddress, userAgent);

  const welcomeNode = chatService.getNode("welcome");

  if (welcomeNode?.message) {
    await saveMessage(sessionId, "bot", welcomeNode.message, "welcome");
  }

  res.status(200).json({
    success: true,
    message: "Session created",
    data: {
      sessionId,
      ...welcomeNode,
    },
  });
};

// POST /api/chat/message  – Process a message/selection
export const sendMessage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const body = req.body as Partial<ChatMessageRequest>;

    if (!body.sessionId || !body.nodeId) {
      res.status(400).json({
        success: false,
        message: "sessionId and nodeId are required",
      });
      return;
    }

    const sessionCheck = await pool.query(
      "SELECT 1 FROM chat_sessions WHERE session_id = $1",
      [body.sessionId],
    );

    if (sessionCheck.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Invalid session",
      });
      return;
    }

    /* Save USER message */
    if (body.selectedOption) {
      await saveMessage(
        body.sessionId,
        "user",
        body.selectedOption,
        body.nodeId,
      );
    }

    /* Process chatbot */
    const result = await chatService.processMessage({
      sessionId: body.sessionId,
      nodeId: body.nodeId,
      selectedOption: body.selectedOption,
    });

    if (!result) {
      res.status(404).json({
        success: false,
        message: `Node '${body.nodeId}' not found`,
      });
      return;
    }

    /* Save BOT message */
    const fullMessage = [
      result.message,
      result.intro,
      result.body,
      result.features?.map((f) => f.text).join("\n"),
      result.followUp,
    ]
      .filter(Boolean)
      .join("\n\n");

    if (fullMessage) {
      await saveMessage(body.sessionId, "bot", fullMessage, result.nodeId);
    }

    await pool.query(
      `UPDATE chat_sessions 
     SET last_activity = NOW() 
     WHERE session_id = $1`,
      [body.sessionId],
    );

    res.status(200).json({
      success: true,
      message: "OK",
      data: result,
    });
  } catch (error) {
    console.error("sendMessage error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET /api/chat/node/:nodeId  – Get a specific node directly
export const getNode = (req: Request, res: Response): void => {
  const { nodeId } = req.params;
  const node = chatService.getNode(nodeId);

  if (!node) {
    res
      .status(404)
      .json({ success: false, message: `Node '${nodeId}' not found` });
    return;
  }

  res.status(200).json({ success: true, message: "OK", data: node });
};

// GET /api/chat/history/:sessionId  – Get full chat history
export const getChatHistory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { sessionId } = req.params;

  const result = await pool.query(
    `SELECT sender, message, created_at 
     FROM chat_messages 
     WHERE session_id = $1 
     ORDER BY created_at ASC`,
    [sessionId],
  );

  res.json({
    success: true,
    data: result.rows,
  });
};
