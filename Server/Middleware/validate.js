/**
 * validate(schema) — Zod validation middleware
 *
 * Usage in routes:
 *   import { validate } from "../Middleware/validate.js";
 *   import { registerSchema } from "../Validators/user.validator.js";
 *
 *   router.post("/register", validate(registerSchema), registerUserController);
 */
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const firstError = result.error.errors[0];
    return res.status(400).json({
      success: false,
      message: firstError.message,
      errors: result.error.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // Replace req.body with sanitized/coerced data from Zod
  req.body = result.data;
  next();
};
