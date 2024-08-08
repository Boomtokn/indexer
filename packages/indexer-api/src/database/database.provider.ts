import { createDataSource } from "@repo/indexer-database";

export async function connectToDatabase(
  env: Record<string, string | undefined>,
) {
  const databaseConfig = {
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    dbName: env.DATABASE_NAME,
  };
  for (const [key, value] of Object.entries(databaseConfig)) {
    if (!value)
      throw new Error(`Missing required environment variable: ${key}`);
  }
  try {
    const database = await createDataSource(databaseConfig).initialize();
    return database;
  } catch (error) {
    console.log("Unable to connect to database", error);
    throw error;
  }
}
