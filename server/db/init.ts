import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./drizzle/schema";
import postgres from "postgres";

export const pgClient = postgres(process.env.DATABASE_URL as string);
export const db = drizzle(pgClient, { schema, logger: true })