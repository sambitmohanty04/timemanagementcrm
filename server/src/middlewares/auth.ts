import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request to include user object
export interface AuthRequest extends Request {
  user?: {
    id: string;
    _id?: string;
  };
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ success: false, message: "Not authorized, no token" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { userId?: string; id?: string };

    // Support both `userId` or `id` payload fields from JWT
    const extractedId = decoded.userId || decoded.id;

    if (!extractedId) {
      res.status(401).json({ success: false, message: "Invalid token payload" });
      return;
    }

    req.user = { id: extractedId };
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Not authorized, token failed" });
  }
};