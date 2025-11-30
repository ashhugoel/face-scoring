"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const MAX_TOKEN_AGE_MS = 1000 * 60 * 60 * 24; // 24 hours
function authMiddleware(req, res, next) {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }
        const token = header.split(" ")[1];
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET missing from env");
        }
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, secret);
        }
        catch (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        if (!decoded.date) {
            return res.status(401).json({ message: "Invalid token format" });
        }
        // Validate date age
        const tokenDate = new Date(decoded.date).getTime();
        const now = Date.now();
        if (isNaN(tokenDate)) {
            return res.status(401).json({ message: "Invalid date inside token" });
        }
        if (now - tokenDate > MAX_TOKEN_AGE_MS) {
            return res.status(401).json({ message: "Token too old" });
        }
        return next();
    }
    catch (err) {
        return res.status(401).json({ message: "Unauthorized", error: err.message });
    }
}
//# sourceMappingURL=authentication.js.map