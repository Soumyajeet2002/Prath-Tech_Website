import { Request, Response, NextFunction } from 'express';
import { validationResult, body, ValidationChain } from 'express-validator';

// Run validation and return errors if any
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await Promise.all(validations.map(v => v.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(e => ({ field: e.type, message: e.msg })),
      });
      return;
    }
    next();
  };
};

// ── VALIDATION RULES ──────────────────────────────────────────────

export const chatValidation = [
  body('sessionId').notEmpty().withMessage('sessionId is required'),
  body('nodeId').notEmpty().withMessage('nodeId is required'),
];

export const leadValidation = [
  body('companyName').notEmpty().trim().withMessage('Company name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('mobile')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Valid Indian mobile number is required'),
];

export const bookingValidation = [
  body('name').notEmpty().trim().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('discussionType').notEmpty().withMessage('Discussion type is required'),
  body('bookingDate')
    .isDate()
    .withMessage('Valid booking date (YYYY-MM-DD) is required'),
  body('timeSlot').notEmpty().withMessage('Time slot is required'),
];

export const supportValidation = [
  body('customerName').notEmpty().trim().withMessage('Customer name is required'),
  body('customerEmail').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('issueType').notEmpty().withMessage('Issue type is required'),
  body('description')
    .notEmpty()
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters'),
];
