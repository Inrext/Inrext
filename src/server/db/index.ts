import { MongoClient } from "mongodb";
import config from "../config";

const uri = config.mongodbUri;
const dbName = config.mongodbDb || "inrext";

let cachedClient: MongoClient | null = null;

export async function connectToDatabase() {
  if (cachedClient) return { client: cachedClient, db: cachedClient.db(dbName) };
  if (!uri) throw new Error("MONGODB_URI is not set");
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return { client, db: client.db(dbName) };
}

export { dbName };
