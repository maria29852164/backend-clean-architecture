import { Module, Global } from "@nestjs/common";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

@Global()
@Module({
    providers: [
        {
            provide: "DRIZZLE_CONNECTION",
            useFactory: async () => {
                const pool = await mysql.createPool({
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASS,
                    database: process.env.DB_NAME,
                    connectionLimit: 10,
                });
                // @ts-ignore
                return drizzle(pool, { schema , mode:'default'});
            },
        },
    ],
    exports: ["DRIZZLE_CONNECTION"],
})
export class DrizzleModule {}
