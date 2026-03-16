import pool from "../config/database";
import { chatFlow } from "../data/chatFlow";
import { ChatMessageRequest, ChatMessageResponse } from "../models/types";

export class ChatService {
  // Get a node safely
  getNode(nodeId: string): ChatMessageResponse | null {
    const node = chatFlow[nodeId];
    if (!node) return null;

    return {
      nodeId: node.id,
      message: node.message ?? undefined,
      intro: node.intro ?? undefined,
      body: node.body ?? undefined,
      followUp: node.followUp ?? undefined,
      options: node.options ?? [],
      features: node.features ?? [],
      type: node.type,
      formType: node.formType,
      metadata: node.metadata ?? {},
    };
  }

  async processMessage(
    req: ChatMessageRequest,
  ): Promise<ChatMessageResponse | null> {
    const { sessionId, nodeId, selectedOption } = req;

    const currentNode = chatFlow[nodeId];
    if (!currentNode) return null;

    // If user sent something (button click OR typed input)
    if (selectedOption) {
      // First: check exact menu match (button click)
      if (currentNode.options) {
        const chosen = currentNode.options.find(
          (o) => o.value === selectedOption,
        );

        if (chosen) {
          await this.updateSession(sessionId, chosen.nextNode);
          return this.getNode(chosen.nextNode);
        }
      }

      // Second: try keyword intent detection (typed input)
      const resolvedNode = this.resolveTextToNode(selectedOption);

      if (resolvedNode && chatFlow[resolvedNode]) {
        await this.updateSession(sessionId, resolvedNode);
        return this.getNode(resolvedNode);
      }

      // Final fallback → Escalate to Human
      return this.getEscalationNode(selectedOption);
    }

    return this.getNode(nodeId);
  }

  // Fallback message for free text
  private getFallbackNode(input: string): ChatMessageResponse {
    return {
      nodeId: "custom_query_response",
      message: `I understand you're asking: "${input}"\n\nPlease select one of the menu options below so I can guide you better.`,
      type: "message",
      options: [
        {
          label: "Explore Products",
          value: "products",
          nextNode: "products_menu",
        },
        {
          label: "Talk to Sales",
          value: "talk_sales",
          nextNode: "lead_capture",
        },
        {
          label: "Main Menu",
          value: "main_menu",
          nextNode: "welcome",
        },
      ],
      features: [],
      metadata: {},
    };
  }

  private getEscalationNode(input: string): ChatMessageResponse {
    return {
      nodeId: "human_escalation",
      message: `I understand you're asking: "${input}"\n\nLet me connect you with a human agent for better assistance.`,
      type: "escalate",
      options: [],
      features: [],
      metadata: {},
    };
  }

  private resolveTextToNode(input: string): string | null {
    const text = input.toLowerCase();

    const keywordMap: Record<string, string> = {
      product: "products_menu",
      products: "products_menu",
      erp: "erp_intro",
      hr: "hrms_intro",
      payroll: "hrms_intro",
      sms: "sms_intro",
      service: "it_services",
      services: "it_services",
      support: "support_intro",
      contact: "lead_capture",
      sales: "lead_capture",
    };

    for (const keyword in keywordMap) {
      if (text.includes(keyword)) {
        return keywordMap[keyword];
      }
    }

    return null;
  }

  async createSession(
    sessionId: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<void> {
    await pool.query(
      `
      INSERT INTO chat_sessions (session_id, current_node, ip_address, user_agent)
      VALUES ($1, 'welcome', $2, $3)
      ON CONFLICT (session_id) DO UPDATE
      SET last_activity = NOW();
      `,
      [sessionId, ipAddress || null, userAgent || null],
    );
  }

  async updateSession(sessionId: string, currentNode: string): Promise<void> {
    await pool.query(
      `
      UPDATE chat_sessions
      SET current_node = $1,
          last_activity = NOW()
      WHERE session_id = $2;
      `,
      [currentNode, sessionId],
    );
  }

  async getSession(sessionId: string): Promise<{
    current_node: string;
    context: Record<string, unknown>;
  } | null> {
    const result = await pool.query(
      `SELECT current_node, context 
       FROM chat_sessions 
       WHERE session_id = $1`,
      [sessionId],
    );

    return result.rows[0] || null;
  }
}

export default new ChatService();
