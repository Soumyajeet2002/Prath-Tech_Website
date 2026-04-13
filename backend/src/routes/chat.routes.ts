import { Router } from 'express';
import { createSession, sendMessage, getNode,getChatHistory } from '../controllers/chatController';
import { validate, chatValidation } from '../middleware/validator';

const router = Router();

router.post("/session", createSession);
// POST /api/chat/session  – Start or resume a chat session
router.post('/session', validate([...chatValidation.slice(0, 1)]), createSession);

// POST /api/chat/message  – Send a message or button selection
router.post('/message', validate(chatValidation), sendMessage);

// GET /api/chat/node/:nodeId  – Get a specific node
router.get('/node/:nodeId', getNode);





router.get("/history/:sessionId", getChatHistory);

export default router;



