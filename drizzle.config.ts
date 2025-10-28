import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/infrastructure/db/drizzle/schema.ts",
    out: "./src/infrastructure/db/drizzle/migrations",
    dialect: "mysql",
    dbCredentials: {
        host: process.env.DB_HOST!,
        user: process.env.DB_USERNAME!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_DATABASE!,
    },
});
