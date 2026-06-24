import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name too long")
    .trim(),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format")
    .toLowerCase()
    .trim(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format")
    .toLowerCase()
    .trim(),
  password: z.string({ required_error: "Password is required" }).min(1),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(50).trim(),
  email: z.string().email().toLowerCase().trim(),
  mobile: z
    .string()
    .regex(/^\d{10}$/, "Mobile must be a valid 10-digit number")
    .optional()
    .nullable(),
});

export const resetPasswordSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});
