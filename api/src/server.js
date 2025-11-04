const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const crypto = require('crypto');
const { createTransporter, buildMailOptions } = require('./smtp');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Simple global rate limiter (per IP per route)
const GLOBAL_RATE_LIMIT_COOLDOWN_MS = 1 * 60 * 1000; // 1 minute
const routeIpLastAccessStore = new Map(); // key: `${ip}|${path}` -> timestamp
// Additional validation: max 5 requests in 30 minutes per IP per route
const GLOBAL_RATE_LIMIT_WINDOW_MS = 30 * 60 * 1000; // 30 minutes
const GLOBAL_RATE_LIMIT_MAX_REQUESTS = 5;
// key: `${ip}|${path}` -> array of request timestamps (ms)
const routeIpAccessLogStore = new Map();

app.use((req, res, next) => {
  // Skip health check
  if (req.method === 'GET' && req.path === '/health') return next();

  const key = `${req.ip}|${req.path}`;
  const lastAccessAt = routeIpLastAccessStore.get(key);
  if (lastAccessAt && (Date.now() - lastAccessAt) < GLOBAL_RATE_LIMIT_COOLDOWN_MS) {
    const retryAfterMs = GLOBAL_RATE_LIMIT_COOLDOWN_MS - (Date.now() - lastAccessAt);
    const retryAfterMin = Math.ceil(retryAfterMs / 60000);
    return res.status(429).json({
      status: 'error',
      message: `Please wait ${retryAfterMin} minute(s) before retrying`,
      retryAfterMinutes: retryAfterMin
    });
  }

  // 30-minute window check (allow up to 5 requests)
  const now = Date.now();
  const windowStart = now - GLOBAL_RATE_LIMIT_WINDOW_MS;
  const timestamps = routeIpAccessLogStore.get(key) || [];
  const recent = timestamps.filter(ts => ts > windowStart);
  if (recent.length >= GLOBAL_RATE_LIMIT_MAX_REQUESTS) {
    const oldest = Math.min(...recent);
    const retryAfterMs = (oldest + GLOBAL_RATE_LIMIT_WINDOW_MS) - now;
    const retryAfterMin = Math.max(1, Math.ceil(retryAfterMs / 60000));
    return res.status(429).json({
      status: 'error',
      message: `Rate limit exceeded. Max ${GLOBAL_RATE_LIMIT_MAX_REQUESTS} requests per 30 minutes per route. Please wait ${retryAfterMin} minute(s) and try again`,
      retryAfterMinutes: retryAfterMin
    });
  }

  // Update stores
  recent.push(now);
  routeIpAccessLogStore.set(key, recent);
  routeIpLastAccessStore.set(key, now);
  next();
});

// In-memory OTP storage (use Redis in production)
const otpStore = new Map();

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Multer configuration for file uploads (career form)
const uploadsDir = path.join(process.cwd(), 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
    } catch (e) {
      return cb(e, uploadsDir);
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const unique = `cv_${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname || '');
    cb(null, `${unique}${ext}`);
  }
});

const allowedExtensions = new Set(['.pdf', '.doc', '.docx']);
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase();
    if (!ext) return cb(null, false);
    if (!allowedExtensions.has(ext)) {
      // Don't crash middleware; mark invalid and continue without storing the file
      req.fileValidationError = 'Only PDF, DOC, DOCX files are allowed';
      return cb(null, false);
    }
    cb(null, true);
  }
});

// Separate multer config for professional details (PDF only)
const allowedPDFExtensions = new Set(['.pdf']);
const uploadPDF = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase();
    if (!ext) return cb(null, false);
    if (!allowedPDFExtensions.has(ext)) {
      req.fileValidationError = 'Only PDF files are allowed for CV upload';
      return cb(null, false);
    }
    cb(null, true);
  }
});

// POST /contact to mirror the provided PHP logic
app.post('/contact', upload.single('file-upload'), async (req, res) => {
  const cleanupFileIfAny = () => {
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      try { fs.unlinkSync(req.file.path); } catch (_) {}
    }
  };

  try {
    const name = req.body?.name || '';
    const email = req.body?.email || '';
    const number = req.body?.number || '';
    const subject = req.body?.subject || '';
    const message = req.body?.message || '';
    const experience = req.body?.experience || '';
    const position = req.body?.position || '';

    const isCareerForm = Boolean(experience) || Boolean(position);

    const transporter = createTransporter();

    const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || 'info@silicontechlab.com';
    const toEmail = process.env.TO_EMAIL || 'jaideep.kumar@silicontechlab.com';

    let html;
    let emailSubject;
    if (isCareerForm) {
      emailSubject = `Career Application: ${position}`;
      const attachmentInfo = req.file ? `<br><strong>CV Attached:</strong> ${req.file.originalname}` : '<br><strong>CV Attached:</strong> No file uploaded';
      html = `
        <h3>Career Application</h3>
        <strong>Name:</strong> ${name} <br>
        <strong>Email:</strong> ${email} <br>
        <strong>Contact Number:</strong> ${number} <br>
        <strong>Position Applied:</strong> ${position} <br>
        <strong>Years of Experience:</strong> ${experience} <br>
        <strong>Message:</strong> <br> ${message}
        ${attachmentInfo}
      `;
    } else {
      emailSubject = `Contact Form: ${subject}`;
      html = `
        <h3>Contact Form Submission</h3>
        <strong>Name:</strong> ${name} <br>
        <strong>Email:</strong> ${email} <br>
        <strong>Service:</strong> ${subject} <br>
        <strong>Contact Number:</strong> ${number} <br>
        <strong>Message:</strong> <br> ${message}
      `;
    }

    const mailOptions = buildMailOptions({
      from: fromEmail,
      to: toEmail,
      subject: emailSubject,
      html
    });

    if (isCareerForm && req.fileValidationError) {
      return res.status(400).json({ status: 'error', message: req.fileValidationError });
    }

    if (isCareerForm && req.file && req.file.path) {
      mailOptions.attachments = [
        {
          filename: req.file.originalname,
          path: req.file.path
        }
      ];
    }

    const info = await transporter.sendMail(mailOptions);
    cleanupFileIfAny();

    if (isCareerForm) {
      return res.status(200).json({ status: 'success', message: 'Career application submitted successfully! We will review your application and get back to you soon.', messageId: info.messageId });
    }
    return res.status(200).json({ status: 'success', message: 'Details sent successfully', messageId: info.messageId });
  } catch (error) {
    cleanupFileIfAny();
    return res.status(500).json({ status: 'error', message: error?.message || 'Mailer Error' });
  }
});

app.post('/send-email', async (req, res) => {
  try {
    const { to, subject, text, html } = req.body || {};

    if (!to || !subject || (!text && !html)) {
      return res.status(400).json({
        error: 'ValidationError',
        message: 'Fields required: to, subject, and one of text or html.'
      });
    }

    const transporter = createTransporter();
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;
    const mailOptions = buildMailOptions({ from, to, subject, text, html });

    const info = await transporter.sendMail(mailOptions);

    return res.status(202).json({
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response
    });
  } catch (error) {
    const status = error?.responseCode && Number.isInteger(error.responseCode)
      ? error.responseCode
      : 500;
    return res.status(status).json({
      error: 'EmailSendError',
      message: error?.message || 'Failed to send email.'
    });
  }
});

// OTP generation and verification endpoints
app.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body || {};
    
    if (!email) {
      return res.status(400).json({
        status: 'error',
        message: 'Email is required'
      });
    }

    // Rate limit: enforce 1-minute cooldown per email
    const RATE_LIMIT_COOLDOWN_MS = 1 * 60 * 1000; // 1 minute
    const existing = otpStore.get(email);
    if (existing && existing.lastSentAt && (Date.now() - existing.lastSentAt) < RATE_LIMIT_COOLDOWN_MS) {
      const retryAfterMs = RATE_LIMIT_COOLDOWN_MS - (Date.now() - existing.lastSentAt);
      const retryAfterMin = Math.ceil(retryAfterMs / 60000);
      return res.status(429).json({
        status: 'error',
        message: `Please wait ${retryAfterMin} minute(s) before requesting a new OTP`,
        retryAfterMinutes: retryAfterMin
      });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = Date.now() + (5 * 60 * 1000); // 5 minutes

    // Store OTP
    otpStore.set(email, { otp, expiresAt, lastSentAt: Date.now() });

    // Send OTP email
    const transporter = createTransporter();
    const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || 'info@silicontechlab.com';
    console.log(fromEmail);
    const mailOptions = buildMailOptions({
      from: fromEmail,
      to: email,
      subject: 'OTP Verification - STL Contact Form',
      html: `
        <h3>OTP Verification</h3>
        <p>Your OTP for contact form verification is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 5 minutes.</p>
        <p>If you didn't request this OTP, please ignore this email.</p>
      `
    });

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      status: 'success',
      message: 'OTP sent successfully',
      expiresIn: 300 // 5 minutes in seconds
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error?.message || 'Failed to send OTP'
    });
  }
});

app.post('/verify-otp', (req, res) => {
  try {
    const { email, otp } = req.body || {};
    
    if (!email || !otp) {
      return res.status(400).json({
        status: 'error',
        message: 'Email and OTP are required'
      });
    }

    const storedData = otpStore.get(email);
    
    if (!storedData) {
      return res.status(400).json({
        status: 'error',
        message: 'OTP not found or expired'
      });
    }

    if (Date.now() > storedData.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({
        status: 'error',
        message: 'OTP has expired'
      });
    }

    if (storedData.otp !== otp) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid OTP'
      });
    }

    // OTP verified successfully
    otpStore.delete(email);
    
    return res.status(200).json({
      status: 'success',
      message: 'OTP verified successfully'
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error?.message || 'Failed to verify OTP'
    });
  }
});

// New contact form endpoint matching screenshot
app.post('/contact-form', async (req, res) => {
  try {
    const { name, phone, email, aboutProject, otp } = req.body || {};
    
    // Validate required fields
    if (!name || !phone || !email || !aboutProject) {
      return res.status(400).json({
        status: 'error',
        message: 'Name, phone, email, and about project are required'
      });
    }

    // Verify OTP if provided
    if (otp) {
      const storedData = otpStore.get(email);
      
      if (!storedData) {
        return res.status(400).json({
          status: 'error',
          message: 'OTP not found or expired. Please request a new OTP.'
        });
      }

      if (Date.now() > storedData.expiresAt) {
        otpStore.delete(email);
        return res.status(400).json({
          status: 'error',
          message: 'OTP has expired. Please request a new OTP.'
        });
      }

      if (storedData.otp !== otp) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid OTP'
        });
      }

      // OTP verified, remove it
      otpStore.delete(email);
    }

    // Send contact form email
    const transporter = createTransporter();
    const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || 'info@silicontechlab.com';
    const toEmail = process.env.TO_EMAIL || 'jaideep.kumar@silicontechlab.com';
    
    const mailOptions = buildMailOptions({
      from: fromEmail,
      to: toEmail,
      subject: 'New Contact Form Submission',
      html: `
        <h3>Contact Form Submission</h3>
        <strong>Name:</strong> ${name} <br>
        <strong>Phone:</strong> ${phone} <br>
        <strong>Email:</strong> ${email} <br>
        <strong>About Project:</strong> <br>
        <p>${aboutProject.replace(/\n/g, '<br>')}</p>
        <br>
        <em>Email verified: ${otp ? 'Yes' : 'No'}</em>
      `
    });

    const info = await transporter.sendMail(mailOptions);

    return res.status(200).json({
      status: 'success',
      message: 'Contact form submitted successfully! We will get back to you soon.',
      messageId: info.messageId
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error?.message || 'Failed to submit contact form'
    });
  }
});

// Professional Details endpoint matching the screenshot
app.post('/professional-details', uploadPDF.single('cv'), async (req, res) => {
  const cleanupFileIfAny = () => {
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      try { fs.unlinkSync(req.file.path); } catch (_) {}
    }
  };

  try {
    const {
      name,
      number,
      email,
      role,
      experienceYears,
      experienceMonths,
      currentCtc,
      expectedCtc,
      noticePeriod
    } = req.body || {};

    // Validate required fields
    const requiredFields = {
      name: 'Full Name',
      number: 'Mobile Number',
      email: 'Email Address',
      role: 'Role',
      experienceYears: 'Experience (Years)',
      currentCtc: 'Current CTC',
      expectedCtc: 'Expected CTC',
      noticePeriod: 'Notice Period'
    };

    const missingFields = [];
    for (const [field, label] of Object.entries(requiredFields)) {
      if (!req.body[field] || req.body[field].trim() === '') {
        missingFields.push(label);
      }
    }

    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: `Required fields missing: ${missingFields.join(', ')}`
      });
    }

    // Check for PDF validation error
    if (req.fileValidationError) {
      return res.status(400).json({
        status: 'error',
        message: req.fileValidationError
      });
    }

    // CV is required for professional details
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'CV upload is required (PDF only)'
      });
    }

    // Send professional details email
    const transporter = createTransporter();
    const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || 'info@silicontechlab.com'
    const toEmail = process.env.TO_EMAIL || 'jaideep.kumar@silicontechlab.com';
    
    const mailOptions = buildMailOptions({
      from: fromEmail,
      to: toEmail,
      subject: `Professional Details Application - ${role}`,
      html: `
        <h3>Professional Details Application</h3>
        <h4>Personal Information</h4>
        <strong>Full Name:</strong> ${name} <br>
        <strong>Mobile Number:</strong> ${number} <br>
        <strong>Email Address:</strong> ${email} <br>
        
        <h4>Professional Information</h4>
        <strong>Role:</strong> ${role} <br>
        <strong>Experience:</strong> ${experienceYears} years, ${experienceMonths || 0} months <br>
        <strong>Current CTC:</strong> ₹${currentCtc} Lakhs <br>
        <strong>Expected CTC:</strong> ₹${expectedCtc} Lakhs <br>
        <strong>Notice Period:</strong> ${noticePeriod} days <br>
        
        <br><strong>CV Attached:</strong> ${req.file.originalname}
      `
    });

    // Add CV attachment
    mailOptions.attachments = [
      {
        filename: req.file.originalname,
        path: req.file.path
      }
    ];

    const info = await transporter.sendMail(mailOptions);
    cleanupFileIfAny();

    return res.status(200).json({
      status: 'success',
      message: 'Professional details submitted successfully! We will review your application and get back to you soon.',
      messageId: info.messageId
    });
  } catch (error) {
    cleanupFileIfAny();
    return res.status(500).json({
      status: 'error',
      message: error?.message || 'Failed to submit professional details'
    });
  }
});

const port = parseInt(process.env.PORT || '3002', 10);
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});


