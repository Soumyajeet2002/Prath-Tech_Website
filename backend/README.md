# Prath Tech Chatbot – Backend API

Backend API for the Prath Technologies website chatbot.  
Built using Node.js, Express.js, and PostgreSQL.

The chatbot is a **rule-based decision tree engine** that handles:

- Customer inquiries
- Product exploration
- Lead capture
- Demo bookings
- Customer support tickets

This backend powers the chatbot widget integrated with the company website.

---

## Tech Stack

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** PostgreSQL 14+
- **Language:** TypeScript
- **Email:** Nodemailer (Gmail SMTP)
- **Security:** Helmet, CORS, Rate Limiting, express-validator

---

## Architecture Overview

The backend follows a **layered architecture**:

Client (Next.js Chatbot UI)
↓
Express API Routes
↓
Controllers
↓
Services (Business Logic)
↓
PostgreSQL Database

---

## Folder Structure

```
prath-tech-backend/
├── src/
│   ├── config/
│   │   ├── database.ts        # PostgreSQL pool connection
│   │   ├── migrate.ts         # DB migration (run once)
│   │   └── seed.ts            # DB seed (time slots)
│   ├── controllers/
│   │   ├── chatController.ts
│   │   ├── leadController.ts
│   │   ├── bookingController.ts
│   │   └── supportController.ts
│   ├── data/
│   │   └── chatFlow.ts        # Complete chatbot decision tree
│   ├── middleware/
│   │   ├── errorHandler.ts
│   │   └── validator.ts
│   ├── models/
│   │   └── types.ts           # TypeScript interfaces
│   ├── routes/
│   │   ├── chat.routes.ts
│   │   ├── lead.routes.ts
│   │   ├── booking.routes.ts
│   │   └── support.routes.ts
│   ├── services/
│   │   ├── chatService.ts
│   │   ├── leadService.ts
│   │   ├── bookingService.ts
│   │   ├── supportService.ts
│   │   └── emailService.ts
│   ├── utils/
│   │   └── asyncHandler.ts
│   ├── app.ts                 # Express app setup
│   └── index.ts               # Server entry point
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## Security Practices

- Environment variables are stored in `.env`
- `.env` is excluded using `.gitignore`
- `.env.example` is provided for configuration reference
- Rate limiting prevents API abuse
- Helmet adds HTTP security headers
- CORS restricts allowed frontend domains
- Input validation via `express-validator`

---

## Setup Instructions

### 1. Clone & Install

```bash
git clone <your-repo>
cd prath-tech-backend
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=prath_chatbot
DB_USER=postgres
DB_PASSWORD=your_password

FRONTEND_URL=your_frontend_url (e.g., http://localhost:3000)

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your_gmail_app_password
COMPANY_EMAIL=your_company_email (e.g., abc@example.com)
COMPANY_NAME=Prath Technologies
```

> **Gmail App Password:** Go to Google Account → Security → 2-Step Verification → App Passwords → Generate

### 3. Create PostgreSQL Database

```sql
CREATE DATABASE prath_chatbot;
```

### 4. Run Migrations

```bash
npm run db:migrate
```

### 5. Seed Default Time Slots

```bash
npm run db:seed
```

### 6. Start Development Server

```bash
npm run dev
```

Server starts at: `http://localhost:5000`

### 7. Build for Production

```bash
npm run build
npm start
```

---

## API Reference

### Health Check

```
GET /health
```

---

### Chat API

#### Start Session

```
POST /api/chat/session
Body: { "sessionId": "unique-session-id" }
```

#### Send Message / Select Option

```
POST /api/chat/message
Body: {
  "sessionId": "unique-session-id",
  "nodeId": "welcome",
  "selectedOption": "explore_products"    ← optional, the option value clicked
}
```

#### Get Specific Node

```
GET /api/chat/node/:nodeId
```

---

### Leads API

#### Capture Lead

```
POST /api/leads
Body: {
  "companyName": "ABC Corp",
  "industry": "Manufacturing",
  "numUsers": "50-100",
  "productInterested": "ERP Solution",
  "email": "contact@abc.com",
  "mobile": "9876543210"
}
```

#### Get All Leads

```
GET /api/leads?page=1&limit=20
```

---

### Bookings API

#### Get Available Slots

```
GET /api/bookings/slots
```

#### Create Booking

```
POST /api/bookings
Body: {
  "name": "Ravi Kumar",
  "email": "ravi@abc.com",
  "mobile": "9876543210",
  "companyName": "ABC Corp",
  "discussionType": "Product Demo",
  "bookingDate": "2024-07-20",
  "timeSlot": "10:00 – 10:30 AM"
}
```

#### Cancel Booking

```
PATCH /api/bookings/:id/cancel
```

---

### Support Tickets API

#### Raise Ticket

```
POST /api/support/tickets
Body: {
  "customerName": "Ravi Kumar",
  "customerEmail": "ravi@abc.com",
  "customerMobile": "9876543210",
  "product": "ERP Solution",
  "issueType": "Product Issue",
  "description": "Unable to generate GST report",
  "priority": "high"
}
```

#### Get Ticket by Number

```
GET /api/support/tickets/number/PT-2024-0001
```

---

## Next.js Frontend Integration

### Install in your Next.js project

```bash
# No extra packages needed — use native fetch
```

### Add to `.env.local` in your Next.js project

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---
