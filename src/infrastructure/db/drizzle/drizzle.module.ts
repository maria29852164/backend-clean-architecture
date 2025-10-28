import { Module, Global } from "@nestjs/common";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";
import dotenv from 'dotenv';

dotenv.config();
@Global()
@Module({
    providers: [
        {
            provide: "DRIZZLE_CONNECTION",
            useFactory: async () => {
                const pool = await mysql.createPool({
                    host: process.env.DB_HOST,
                    user: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_DATABASE,
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
