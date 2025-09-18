import * as z from 'zod';

// Validation for login form
export const loginSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
  password: z.string().min(6, { message: 'The password must be at least 6 characters' }),
});

// Validation for register form
export const registerSchema = z.object({
  handle: z.string().min(3, { message: 'The username must be at least 3 characters' }),
  name: z.string().min(2, { message: 'The name must be at least 2 characters' }),
  email: z.string().email({ message: 'Enter a valid email' }),
  password: z
    .string()
    .min(6, { message: 'The password must be at least 6 characters' })
    .max(50, { message: 'The password cannot exceed 50 characters' }),
  region: z.string({ required_error: 'Select a region' }),
});

// Validation for event form
export const eventSchema = z.object({
  name: z.string().min(3, { message: 'The name must be at least 3 characters' }),
  description: z.string().min(10, { message: 'The description must be at least 10 characters' }),
  date: z.string({ required_error: 'The date is required' }),
  type: z.enum(['in-person', 'virtual', 'hybrid'], {
    required_error: 'Select an event type',
  }),
  logo: z.string().optional(),
  objectives: z.array(z.string()),
  kpis: z.array(z.string()),
  registeredAttendees: z
    .array(
      z.object({
        name: z.string(),
        email: z.string().email(),
        walletAddress: z.string().optional(),
      })
    )
    .optional(),
  specialGuests: z.array(z.string()).optional(),
  confirmedAttendees: z.number().optional(),
  totalAttendees: z.number().optional(),
  attendeesWithCertificate: z.number().optional(),
  previosEventAttendees: z.number().optional(),
  newWallets: z.number().optional(),
  openedWalletAddresses: z.array(z.string()).optional(),
  transactionsDuringEvent: z
    .array(
      z.object({
        type: z.string(),
        count: z.number(),
        details: z.string(),
      })
    )
    .optional(),
  transactionsAfterEvent: z.number().optional(),
  totalCost: z.number().optional(),
  budgetSurplusDeficit: z.number().optional(),
  marketing: z
    .object({
      channels: z.array(z.string()),
      campaign: z.string(),
    })
    .optional(),
  virtualMetrics: z
    .object({
      engagement: z.number(),
      connectionTime: z.number(),
      other: z.record(z.any()).optional(),
    })
    .optional(),
});

// Validation for profile form
export const profileSchema = z.object({
  name: z.string().min(2, { message: 'The name must be at least 2 characters' }),
  email: z.string().email({ message: 'Enter a valid email' }),
  region: z.string({ required_error: 'Select a region' }),
  password: z
    .string()
    .min(6, { message: 'The password must be at least 6 characters' })
    .max(50, { message: 'The password cannot exceed 50 characters' })
    .optional(),
  newPassword: z
    .string()
    .min(6, { message: 'The new password must be at least 6 characters' })
    .max(50, { message: 'The new password cannot exceed 50 characters' })
    .optional(),
});

// Validation for data import
export const importDataSchema = z.object({
  file: z.instanceof(File, { message: 'You must select a file' }),
});