import crypto from "crypto";

export const requestId = (req, res, next) => {
  req.requestId = crypto.randomUUID();

  next();
};