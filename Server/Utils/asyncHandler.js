/**
 * asyncHandler - wraps async controller functions
 * so you don't need try/catch in every controller.
 * Errors are automatically passed to the global error handler.
 *
 * Usage:
 *   export const myController = asyncHandler(async (req, res) => {
 *     // your logic — no try/catch needed
 *   });
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
