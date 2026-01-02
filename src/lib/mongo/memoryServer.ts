import { MongoMemoryServer } from "mongodb-memory-server";

declare global {
  var _mongoMemoryServer: MongoMemoryServer | undefined;
}

export async function getMemoryMongoUri(): Promise<string> {
  if (process.env.NODE_ENV !== "development") {
    throw new Error("MongoMemoryServer só deve ser usado em desenvolvimento");
  }

  if (!global._mongoMemoryServer) {
    global._mongoMemoryServer = await MongoMemoryServer.create();
  }

  return global._mongoMemoryServer.getUri();
}
