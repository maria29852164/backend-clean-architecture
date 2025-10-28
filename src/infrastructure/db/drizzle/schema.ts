import { mysqlTable, serial, varchar, int, text, datetime } from "drizzle-orm/mysql-core";
import {sql} from 'drizzle-orm';
export const users = mysqlTable("users", {
    id: varchar("id", { length: 36 }).primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password_hash: text("password_hash").notNull(),
    created_at: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const plans = mysqlTable("plans", {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    price_cents: int("price_cents").notNull(),
    duration_days: int("duration_days").notNull(),
    created_at: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const subscriptions = mysqlTable("subscriptions", {
    id: varchar("id", { length: 36 }).primaryKey(),
    user_id: varchar("user_id", { length: 36 }).notNull().references(() => users.id),
    plan_id: varchar("plan_id", { length: 36 }).notNull().references(() => plans.id),
    start_at: datetime("start_at").notNull(),
    end_at: datetime("end_at").notNull(),
    status: varchar("status", { length: 20 }).notNull().default('active'),
    created_at: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
