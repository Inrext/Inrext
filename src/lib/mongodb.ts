// Deprecated wrapper: forward calls to server/db at runtime to avoid duplicate logic
// We use a runtime require to avoid TypeScript path resolution issues during build.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const serverDb: any = require("src/server/db");

export async function connectToDatabase() {
	return serverDb.connectToDatabase();
}

export const dbName = serverDb.dbName;
