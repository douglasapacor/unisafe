import { MongoClient } from "mongodb";
import { getMemoryMongoUri } from "./memoryServer";

declare global {
  var _mongoClient: MongoClient | undefined;
}

export async function getMongoClient(): Promise<MongoClient> {
  if (global._mongoClient) {
    return global._mongoClient;
  }

  const uri =
    process.env.NODE_ENV === "development"
      ? await getMemoryMongoUri()
      : process.env.MONGODB_URI!;

  const client = new MongoClient(uri);

  await client.connect();

  global._mongoClient = client;

  return client;
}
