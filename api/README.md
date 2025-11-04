## Email API (Node.js + Express)

### Setup

1. Copy `.env` from the example values below and adjust for your SMTP provider.
2. Install dependencies and start the server.

```bash
npm install
npm run dev
```

### Environment variables

Create a `.env` file in the project root:

```
PORT=3000
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_username
SMTP_PASS=your_password
SMTP_FROM="Your Name <no-reply@example.com>"
```

### Endpoints

- `GET /health` → Returns `{ status: 'ok' }`
- `POST /send-email` → Sends an email via the configured SMTP.

Request JSON body:

```json
{
  "to": "recipient@example.com",
  "subject": "Hello",
  "text": "Plain text body",
  "html": "<strong>HTML body</strong>"
}
```

At least one of `text` or `html` is required.

### Run

```bash
npm run dev    # development with nodemon
npm start      # production
```


