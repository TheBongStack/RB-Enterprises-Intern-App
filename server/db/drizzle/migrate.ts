import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const migrationClient = postgres(process.env.DATABASE_URL as string, {
  max: 1,
  onclose: (connId: number) =>
    console.log("Migration connection closed. Connection ID : ", connId),
});

(async () => {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./server/db/drizzle/migrations",
  });
  await migrationClient.end();
})();
