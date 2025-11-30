import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
    windowMs: 30 * 1000,
    max: 10,
    message: "Too many requests from this IP, try again later.",
    standardHeaders: true,
    legacyHeaders: false,
  });