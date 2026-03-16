import { Request, Response } from "express";
import chatService from "../services/chatService";
import {
  ApiResponse,
  ChatMessageResponse,
  ChatMessageRequest,
} from "../models/types";

// POST /api/chat/session  – Create or resume a session
export const createSession = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { sessionId } = req.body as { sessionId?: string };

  if (!sessionId) {
    res.status(400).json({
      success: false,
      message: "sessionId is required",
    });
    return;
  }
  const ipAddress = req.ip;
  const userAgent = req.headers["user-agent"];

  await chatService.createSession(sessionId, ipAddress, userAgent);

  const welcomeNode = chatService.getNode("welcome");

  const response: ApiResponse<ChatMessageResponse> = {
    success: true,
    message: "Session created",
    data: welcomeNode ?? undefined,
  };

  res.status(200).json(response);
};

// POST /api/chat/message  – Process a message/selection
export const sendMessage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const body = req.body as Partial<ChatMessageRequest>;

  if (!body.sessionId || !body.nodeId) {
    res.status(400).json({
      success: false,
      message: "sessionId and nodeId are required",
    });
    return;
  }

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

  const response: ApiResponse<ChatMessageResponse> = {
    success: true,
    message: "OK",
    data: result,
  };

  res.status(200).json(response);
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
