export interface AppConfig {
  mongodbUri: string;
  mongodbDb: string;
  jwtSecret: string;
}

const mongodbUri = process.env.MONGODB_URI || "";
const mongodbDb = process.env.MONGODB_DB || "inrext";
const jwtSecret = process.env.JWT_SECRET || "";

// Basic validation: in production we warn — avoid throwing during Next.js build step
if (process.env.NODE_ENV === "production") {
  if (!mongodbUri) console.warn("MONGODB_URI is not set (production). Set it in environment variables.");
  if (!jwtSecret) console.warn("JWT_SECRET is not set (production). Set it in environment variables.");
}

export const config: AppConfig = {
  mongodbUri,
  mongodbDb,
  jwtSecret: jwtSecret || "supersecretkey",
};

export default config;
