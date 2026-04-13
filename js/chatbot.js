/** PrathTech Chatbot — JS file **/

const API_URL = window.PRATHTECH_API_URL || "http://localhost:5000";
const BOT_AVATAR =
  "https://api.dicebear.com/7.x/bottts/svg?seed=WybbleAI&baseColor=159abb";

/* STATE */
let state = {
  chatbotSessionId: null,
  currentNodeId: "welcome",
  messages: [],
  isLoading: false,
  isEscalated: false,
};

/* UTILITY */
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function formatTimestamp(date) {
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "Just now";
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str || "";
  return div.innerHTML;
}

/* MESSAGE CONTENT RENDERER */
function renderMessageContent(text) {
  if (!text) return "";
  const lines = text.split("\n");
  return lines
    .map((line) => {
      if (!line.trim()) return "<br>";
      const boldified = line.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
      return `<p>${boldified}</p>`;
    })
    .join("");
}

/* API HELPERS */
async function safeFetch(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    if (res.status === 429)
      throw new Error("Too many requests. Please slow down.");
    throw new Error(`HTTP ${res.status}`);
  }
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Request failed");
  return json.data;
}

async function startChatSession() {
  return safeFetch(`${API_URL}/api/chat/session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
}

async function sendChatMessageAPI(sessionId, nodeId, selectedOption) {
  return safeFetch(`${API_URL}/api/chat/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, nodeId, selectedOption }),
  });
}

async function getAvailableSlots() {
  const res = await fetch(`${API_URL}/api/bookings/slots`);
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Failed to fetch slots");
  return json.data;
}

async function createBooking(data) {
  const res = await fetch(`${API_URL}/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success)
    throw new Error(json.message || "Failed to create booking");
  return json.data;
}

async function submitLead(data) {
  const res = await fetch(`${API_URL}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Failed to submit lead");
  return json.data;
}

async function raiseTicket(data) {
  const res = await fetch(`${API_URL}/api/support/tickets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Failed to raise ticket");
  return json.data;
}

async function getChatHistory(sessionId) {
  return safeFetch(`${API_URL}/api/chat/history/${sessionId}`);
}

/* DOM REFS */
const chatWidget = document.getElementById("chat-widget");
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const chatbotBtn = document.getElementById("chatbot-btn");
const closeBtn = document.getElementById("close-chat-btn");
const downloadBtn = document.getElementById("download-chat-btn");
const typingEl = document.getElementById("typing-indicator");

/* WIDGET OPEN / CLOSE */
chatbotBtn.addEventListener("click", openWidget);
closeBtn.addEventListener("click", closeWidget);

function openWidget() {
  chatWidget.classList.add("open");
  chatbotBtn.style.display = "none";
  scrollToBottom();
}

function closeWidget() {
  chatWidget.classList.remove("open");
  if (!state.isEscalated) {
    chatbotBtn.style.display = "flex";
  }
}

window.addEventListener("chatbot:close", closeWidget);

function setupTawkHandlers() {
  if (!window.Tawk_API) return;

  window.Tawk_API.onChatMaximized = function () {
    chatbotBtn.style.display = "none";
    chatWidget.classList.remove("open");
  };

  window.Tawk_API.onChatMinimized = function () {
    chatbotBtn.style.display = "none";
  };

  window.Tawk_API.onChatEnded = function () {
    state.isEscalated = false;
    chatbotBtn.style.display = "flex";
  };
}

function waitForTawk() {
  if (window.Tawk_API) {
    setupTawkHandlers();
  } else {
    setTimeout(waitForTawk, 500);
  }
}
waitForTawk();

/* SCROLL */
function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

/* RENDER A MESSAGE ROW */
function renderMessage(msg) {
  const isUser = msg.role === "user";
  const row = document.createElement("div");
  row.className = `msg-row ${isUser ? "user" : "bot"}`;
  row.dataset.msgId = msg.id;

  const avatarDiv = document.createElement("div");
  avatarDiv.className = `msg-avatar ${isUser ? "user-avatar" : "bot-avatar"}`;
  if (isUser) {
    avatarDiv.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.25rem;height:1.25rem;color:#fff"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
  } else {
    avatarDiv.innerHTML = `<img src="${BOT_AVATAR}" alt="Bot">`;
  }

  const contentDiv = document.createElement("div");
  contentDiv.className = "msg-content";

  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${isUser ? "user-bubble" : "bot-bubble"}`;

  let html = "";
  if (msg.intro) html += renderMessageContent(msg.intro);
  if (!msg.intro && msg.content) html += renderMessageContent(msg.content);
  if (msg.features && msg.features.length > 0) {
    html += '<div style="margin-top:0.75rem;">';
    msg.features.forEach((f) => {
      html += `<div style="display:flex;align-items:center;gap:0.5rem;font-size:0.85rem;color:#334155;margin-bottom:0.25rem;">
        <span style="color:var(--primary)">●</span> ${escapeHtml(f.text)}
      </div>`;
    });
    html += "</div>";
  }
  if (msg.body)
    html += `<div style="margin-top:0.75rem;">${renderMessageContent(msg.body)}</div>`;
  if (msg.followUp)
    html += `<div style="margin-top:0.75rem;">${renderMessageContent(msg.followUp)}</div>`;
  bubble.innerHTML = html || escapeHtml(msg.content || "");

  const meta = document.createElement("div");
  meta.className = "msg-meta";
  meta.innerHTML =
    `<span>${formatTimestamp(msg.timestamp)}</span>` +
    (msg.model && !isUser
      ? `<span class="model-badge">${escapeHtml(msg.model)}</span>`
      : "");

  contentDiv.appendChild(bubble);
  contentDiv.appendChild(meta);

  row.appendChild(avatarDiv);
  row.appendChild(contentDiv);
  chatMessages.appendChild(row);

  return { row, contentDiv };
}

/* RENDER OPTION BUTTONS */
function renderOptions(options, contentDiv) {
  if (!options || options.length === 0) return;
  const optDiv = document.createElement("div");
  optDiv.className = "msg-options";
  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt.label;
    btn.addEventListener("click", () => {
      optDiv.remove();
      sendMessage(opt.value, opt.label);
    });
    optDiv.appendChild(btn);
  });
  contentDiv.appendChild(optDiv);
}

/* SHOW / HIDE TYPING */
function showTyping() {
  typingEl.classList.add("show");
  scrollToBottom();
}
function hideTyping() {
  typingEl.classList.remove("show");
}

/* ADD MESSAGE TO STATE + DOM */
function addMessage(msgData, withOptions = false) {
  state.messages.push(msgData);
  const { contentDiv } = renderMessage(msgData);
  if (withOptions && msgData.options && msgData.options.length > 0) {
    renderOptions(msgData.options, contentDiv);
  }
  scrollToBottom();
}

/* SEND MESSAGE */
async function sendMessage(content, displayLabel) {
  if (!content.trim() || state.isLoading || !state.chatbotSessionId) return;

  const displayContent = displayLabel || content.trim();

  const userMsg = {
    id: generateId(),
    role: "user",
    content: displayContent,
    timestamp: new Date(),
  };
  addMessage(userMsg);

  state.isLoading = true;
  chatInput.disabled = true;
  sendBtn.disabled = true;
  showTyping();

  try {
    const response = await sendChatMessageAPI(
      state.chatbotSessionId,
      state.currentNodeId,
      content,
    );

    hideTyping();

    const botMsg = {
      id: generateId(),
      role: "assistant",
      content: response.message,
      intro: response.intro,
      body: response.body,
      followUp: response.followUp,
      timestamp: new Date(),
      model: "PrathTech AI Assistant",
      options: response.options,
      features: response.features,
    };

    state.currentNodeId = response.nodeId;

    if (response.type === "form" && response.formType) {
      addMessage(botMsg, false);
      renderForm(response.formType, response.metadata);
    } else if (response.type === "slots") {
      addMessage(botMsg, false);
      renderSlots(response.metadata);
    } else if (response.type === "escalate") {
      addMessage(botMsg, true);
      state.isEscalated = true;
      setTimeout(() => {
        closeWidget();
        if (window.Tawk_API) {
          window.Tawk_API.showWidget();
          window.Tawk_API.maximize();
        }
      }, 1200);
    } else {
      addMessage(botMsg, true);
    }
  } catch (err) {
    hideTyping();
    const errMsg = {
      id: generateId(),
      role: "assistant",
      content: "Sorry, something went wrong. Please try again.",
      timestamp: new Date(),
      model: "PrathTech AI Bot",
    };
    addMessage(errMsg);
  } finally {
    state.isLoading = false;
    chatInput.disabled = false;
    sendBtn.disabled = false;
    chatInput.focus();
  }
}

/* CHAT INPUT HANDLERS */
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    doSend();
  }
});
chatInput.addEventListener("input", () => {
  chatInput.style.height = "auto";
  chatInput.style.height = Math.min(chatInput.scrollHeight, 200) + "px";
  sendBtn.disabled = !chatInput.value.trim() || state.isLoading;
});
sendBtn.addEventListener("click", doSend);
function doSend() {
  const val = chatInput.value.trim();
  if (!val) return;
  chatInput.value = "";
  chatInput.style.height = "auto";
  sendMessage(val);
}

/* RENDER LEAD FORM */
function renderForm(formType, metadata) {
  const container = document.createElement("div");
  container.className = "msg-row bot";

  const avatarDiv = document.createElement("div");
  avatarDiv.className = "msg-avatar bot-avatar";
  avatarDiv.innerHTML = `<img src="${BOT_AVATAR}" alt="Bot">`;

  const contentDiv = document.createElement("div");
  contentDiv.className = "msg-content";
  contentDiv.style.maxWidth = "100%";

  if (formType === "lead") {
    contentDiv.innerHTML = buildLeadFormHTML();
  } else if (formType === "support") {
    contentDiv.innerHTML = buildSupportFormHTML();
  } else if (formType === "booking") {
    contentDiv.innerHTML = buildBookingFormHTML(metadata);
  }

  container.appendChild(avatarDiv);
  container.appendChild(contentDiv);
  chatMessages.appendChild(container);
  scrollToBottom();

  if (formType === "lead") attachLeadForm(contentDiv);
  else if (formType === "support") attachSupportForm(contentDiv);
  else if (formType === "booking")
    attachBookingFormSubmit(contentDiv, metadata);
}

/* Lead Form HTML */
function buildLeadFormHTML() {
  return `<div class="chat-form">
    <h3>Share Your Details</h3>
    <p class="sub">Help us understand your requirements better</p>
    <div class="form-group">
      <label>🏢 Company Name *</label>
      <input type="text" name="companyName" placeholder="ABC Corporation" required>
    </div>
    <div class="form-group">
      <label>Industry</label>
      <select name="industry">
        <option value="">Select industry</option>
        <option>Manufacturing</option>
        <option>Construction</option>
        <option>Government</option>
        <option>Education</option>
        <option>Healthcare</option>
        <option>Services</option>
        <option>Other</option>
      </select>
    </div>
    <div class="form-group">
      <label>👥 Number of Users</label>
      <select name="numUsers">
        <option value="">Select range</option>
        <option>1-10</option><option>11-50</option>
        <option>51-100</option><option>101-500</option><option>500+</option>
      </select>
    </div>
    <div class="form-group">
      <label>📦 Product Interested In</label>
      <select name="productInterested">
        <option value="">Select product</option>
        <option>ERP Solution</option>
        <option>Society Management System</option>
        <option>HRMS</option>
        <option>Custom Software</option>
        <option>Multiple</option>
      </select>
    </div>
    <div class="form-group">
      <label>✉️ Email Address *</label>
      <input type="email" name="email" placeholder="you@company.com" required>
    </div>
    <div class="form-group">
      <label>📞 Mobile Number *</label>
      <input type="tel" name="mobile" placeholder="9876543210" pattern="[6-9]\\d{9}" required>
      <p class="form-hint">10-digit Indian mobile number</p>
    </div>
    <div class="form-group">
      <label>Additional Notes</label>
      <textarea name="notes" rows="3" placeholder="Any specific requirements?"></textarea>
    </div>
    <button type="button" class="btn-submit" id="lead-submit-btn">Submit Details</button>
  </div>`;
}

function attachLeadForm(container) {
  const btn = container.querySelector("#lead-submit-btn");
  btn.addEventListener("click", async () => {
    const data = {
      companyName: container.querySelector("[name=companyName]").value,
      industry: container.querySelector("[name=industry]").value,
      numUsers: container.querySelector("[name=numUsers]").value,
      productInterested: container.querySelector("[name=productInterested]")
        .value,
      email: container.querySelector("[name=email]").value,
      mobile: container.querySelector("[name=mobile]").value,
      notes: container.querySelector("[name=notes]").value,
    };
    if (!data.companyName || !data.email || !data.mobile) {
      alert("Please fill required fields.");
      return;
    }
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Submitting...';
    try {
      await submitLead(data);
      showSuccessInChat(
        `✅ Thank you! Our team will reach out to you at ${data.email} within 24 business hours.`,
      );
      container.closest(".msg-row").remove();
    } catch (e) {
      btn.disabled = false;
      btn.textContent = "Submit Details";
      alert(e.message);
    }
  });
}

/* Support Form HTML */
function buildSupportFormHTML() {
  return `<div class="chat-form">
    <h3>Raise a Support Ticket</h3>
    <p class="sub">We'll get back to you as soon as possible</p>
    <div class="form-group">
      <label>👤 Your Name *</label>
      <input type="text" name="customerName" placeholder="John Doe" required>
    </div>
    <div class="form-group">
      <label>✉️ Email *</label>
      <input type="email" name="customerEmail" placeholder="john@company.com" required>
    </div>
    <div class="form-group">
      <label>📞 Mobile</label>
      <input type="tel" name="customerMobile" placeholder="9876543210">
    </div>
    <div class="form-group">
      <label>Product</label>
      <select name="product">
        <option value="">Select product</option>
        <option>ERP Solution</option>
        <option>Society Management System</option>
        <option>HRMS</option>
        <option>Other</option>
      </select>
    </div>
    <div class="form-group">
      <label>Issue Type *</label>
      <select name="issueType" required>
        <option value="">Select type</option>
        <option>Bug / Error</option>
        <option>Feature Request</option>
        <option>Account Issue</option>
        <option>Billing</option>
        <option>Other</option>
      </select>
    </div>
    <div class="form-group">
      <label>Description *</label>
      <textarea name="description" rows="3" placeholder="Describe your issue..." required></textarea>
    </div>
    <div class="form-group">
      <label>Priority</label>
      <select name="priority">
        <option value="low">Low</option>
        <option value="medium" selected>Medium</option>
        <option value="high">High</option>
      </select>
    </div>
    <button type="button" class="btn-submit" id="support-submit-btn">Submit Ticket</button>
  </div>`;
}

function attachSupportForm(container) {
  const btn = container.querySelector("#support-submit-btn");
  btn.addEventListener("click", async () => {
    const data = {
      customerName: container.querySelector("[name=customerName]").value,
      customerEmail: container.querySelector("[name=customerEmail]").value,
      customerMobile: container.querySelector("[name=customerMobile]").value,
      product: container.querySelector("[name=product]").value,
      issueType: container.querySelector("[name=issueType]").value,
      description: container.querySelector("[name=description]").value,
      priority: container.querySelector("[name=priority]").value,
    };
    if (
      !data.customerName ||
      !data.customerEmail ||
      !data.issueType ||
      !data.description
    ) {
      alert("Please fill required fields.");
      return;
    }
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Submitting...';
    try {
      await raiseTicket(data);
      showSuccessInChat(
        `✅ Ticket raised! We'll contact you at ${data.customerEmail} soon.`,
      );
      container.closest(".msg-row").remove();
    } catch (e) {
      btn.disabled = false;
      btn.textContent = "Submit Ticket";
      alert(e.message);
    }
  });
}

/* Booking / Slots */
async function renderSlots(metadata) {
  const discussionType = (metadata && metadata.discussionType) || "General";

  const loadMsg = {
    id: generateId(),
    role: "assistant",
    content: "Loading available slots...",
    timestamp: new Date(),
    model: "PrathTech AI Assistant",
  };
  addMessage(loadMsg);
  const loadRow = chatMessages.querySelector(`[data-msg-id="${loadMsg.id}"]`);

  try {
    const slots = await getAvailableSlots();
    if (loadRow) loadRow.remove();

    const container = document.createElement("div");
    container.className = "msg-row bot";

    const avatarDiv = document.createElement("div");
    avatarDiv.className = "msg-avatar bot-avatar";
    avatarDiv.innerHTML = `<img src="${BOT_AVATAR}" alt="Bot">`;

    const contentDiv = document.createElement("div");
    contentDiv.className = "msg-content";
    contentDiv.style.maxWidth = "100%";
    contentDiv.innerHTML = buildSlotsHTML(slots);

    container.appendChild(avatarDiv);
    container.appendChild(contentDiv);
    chatMessages.appendChild(container);
    scrollToBottom();

    attachSlotButtons(contentDiv, slots, discussionType);
  } catch (e) {
    if (loadRow)
      loadRow.querySelector(".chat-bubble").textContent =
        "Failed to load slots. Please try again.";
  }
}

function buildSlotsHTML(slots) {
  let html = `<div class="chat-form">
    <h3>📅 Select a Time Slot</h3>`;

  slots.forEach((day) => {
    html += `<div class="slot-day">
      <h4>${escapeHtml(day.label)}</h4>
      <div class="slot-grid">`;
    if (day.slots.length > 0) {
      day.slots.forEach((slot) => {
        html += `<button class="slot-btn" data-date="${escapeHtml(day.date)}" data-label="${escapeHtml(day.label)}" data-slot="${escapeHtml(slot.slot_label)}">
          🕐 ${escapeHtml(slot.slot_label)}
        </button>`;
      });
    } else {
      html += `<p class="no-slots">No slots available</p>`;
    }
    html += `</div></div>`;
  });

  html += `</div>`;
  return html;
}

function attachSlotButtons(container, slots, discussionType) {
  container.querySelectorAll(".slot-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const date = btn.dataset.date;
      const dayLabel = btn.dataset.label;
      const slotLabel = btn.dataset.slot;
      showBookingForm(container, date, dayLabel, slotLabel, discussionType);
    });
  });
}

function buildBookingFormHTML(metadata) {
  return "";
}

function showBookingForm(container, date, dayLabel, slotLabel, discussionType) {
  container.innerHTML = `<div class="chat-form">
    <h3>Confirm Your Booking</h3>
    <p class="sub">${escapeHtml(slotLabel)} on ${escapeHtml(dayLabel)}</p>
    <div class="form-group">
      <label>👤 Your Name *</label>
      <input type="text" name="name" placeholder="John Doe" required>
    </div>
    <div class="form-group">
      <label>✉️ Email Address *</label>
      <input type="email" name="email" placeholder="john@company.com" required>
    </div>
    <div class="form-group">
      <label>📞 Mobile Number *</label>
      <input type="tel" name="mobile" placeholder="9876543210" pattern="[6-9]\\d{9}" required>
    </div>
    <div class="form-group">
      <label>🏢 Company Name</label>
      <input type="text" name="companyName" placeholder="ABC Corporation">
    </div>
    <div class="btn-row">
      <button type="button" class="btn-back" id="booking-back-btn">Back</button>
      <button type="button" class="btn-submit" id="booking-submit-btn" style="flex:1">Confirm Booking</button>
    </div>
  </div>`;

  container
    .querySelector("#booking-back-btn")
    .addEventListener("click", async () => {
      const slots = await getAvailableSlots().catch(() => []);
      container.innerHTML = buildSlotsHTML(slots);
      attachSlotButtons(container, slots, discussionType);
    });

  container
    .querySelector("#booking-submit-btn")
    .addEventListener("click", async () => {
      const btn = container.querySelector("#booking-submit-btn");
      const data = {
        name: container.querySelector("[name=name]").value,
        email: container.querySelector("[name=email]").value,
        mobile: container.querySelector("[name=mobile]").value,
        companyName: container.querySelector("[name=companyName]").value,
        discussionType: discussionType,
        bookingDate: date,
        timeSlot: slotLabel,
      };
      if (!data.name || !data.email || !data.mobile) {
        alert("Please fill required fields.");
        return;
      }
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span> Booking...';
      try {
        await createBooking(data);
        showSuccessInChat(
          `✅ Meeting confirmed!\n\n📅 ${dayLabel}\n⏰ ${slotLabel}\n\nA confirmation has been sent to ${data.email}`,
        );
        container.closest(".msg-row").remove();
      } catch (e) {
        btn.disabled = false;
        btn.textContent = "Confirm Booking";
        alert(e.message);
      }
    });

  scrollToBottom();
}

/* SUCCESS MESSAGE IN CHAT */
function showSuccessInChat(text) {
  const msg = {
    id: generateId(),
    role: "assistant",
    content: text,
    timestamp: new Date(),
    model: "PrathTech AI Assistant",
  };
  state.messages.push(msg);
  const row = document.createElement("div");
  row.className = "msg-row bot";
  row.dataset.msgId = msg.id;

  const avatarDiv = document.createElement("div");
  avatarDiv.className = "msg-avatar bot-avatar";
  avatarDiv.innerHTML = `<img src="${BOT_AVATAR}" alt="Bot">`;

  const contentDiv = document.createElement("div");
  contentDiv.className = "msg-content";

  const bubble = document.createElement("div");
  bubble.className = "chat-bubble bot-bubble";
  bubble.innerHTML = `<p class="success-msg">${escapeHtml(text)}</p>`;

  const meta = document.createElement("div");
  meta.className = "msg-meta";
  meta.innerHTML = `<span>${formatTimestamp(new Date())}</span>`;

  contentDiv.appendChild(bubble);
  contentDiv.appendChild(meta);
  row.appendChild(avatarDiv);
  row.appendChild(contentDiv);
  chatMessages.appendChild(row);
  scrollToBottom();
}

/* DOWNLOAD CHAT */
downloadBtn.addEventListener("click", async () => {
  if (!state.chatbotSessionId) return;
  try {
    const history = await getChatHistory(state.chatbotSessionId);
    if (!history || history.length === 0) {
      alert("No chat history found");
      return;
    }
    const text = history
      .map((m) =>
        m.message ? `${m.sender.toUpperCase()}: ${m.message}` : null,
      )
      .filter(Boolean)
      .join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-${state.chatbotSessionId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error("Failed to download chat:", e);
  }
});

/* INIT — Start session on page load */
async function init() {
  try {
    const data = await startChatSession();
    if (!data || !data.sessionId) throw new Error("Invalid session response");
    state.chatbotSessionId = data.sessionId;
    state.currentNodeId = data.nodeId;

    const welcomeMsg = {
      id: generateId(),
      role: "assistant",
      content: data.message,
      intro: data.intro,
      body: data.body,
      followUp: data.followUp,
      timestamp: new Date(),
      model: "PrathTech AI Assistant",
      options: data.options,
      features: data.features,
    };
    addMessage(welcomeMsg, true);
  } catch (e) {
    console.error("Failed to init chatbot:", e);
    const fallback = {
      id: generateId(),
      role: "assistant",
      content:
        "Welcome to PrathTech! Our AI assistant is currently unavailable. Please try again later.",
      timestamp: new Date(),
      model: "PrathTech AI Assistant",
    };
    addMessage(fallback);
  }
}

document.addEventListener("DOMContentLoaded", init);
