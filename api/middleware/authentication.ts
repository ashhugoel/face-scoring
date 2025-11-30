import jwt, { type JwtPayload } from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";

const MAX_TOKEN_AGE_MS = 1000 * 60 * 60 * 24; // 24 hours

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = header.split(" ")[1]!;
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT_SECRET missing from env");
        } 

        let decoded: JwtPayload;

        try {
            decoded = jwt.verify(token, secret) as JwtPayload;
        } catch (err) {
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
    } catch (err: any) {
        return res.status(401).json({ message: "Unauthorized", error: err.message });
    }
}
