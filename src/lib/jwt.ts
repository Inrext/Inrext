import jwt from "jsonwebtoken";
import config from "./config";

const JWT_SECRET = config.jwtSecret;

export function signToken(payload: Record<string, any>, options = {}) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d", ...options });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
