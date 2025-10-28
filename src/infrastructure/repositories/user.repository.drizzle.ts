import { Inject, Injectable } from "@nestjs/common";
import { users } from "../db/drizzle/schema";
import { IUserRepository } from "../../application/ports/user-repository.port";
import { User } from "../../domain/entities/user";
import { MySql2Database } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";

@Injectable()
export class UserRepositoryDrizzle implements IUserRepository {
    constructor(
        @Inject("DRIZZLE_CONNECTION")
        private readonly db: MySql2Database<typeof import("../db/drizzle/schema")>
    ) {}

    async findById(id: string): Promise<User | null> {
        const [row] = await this.db
            .select()
            .from(users)
            .where(eq(users.id, id))
            .limit(1);

        if (!row) return null;
        return new User(row.id, row.email, row.password_hash, row.created_at);
    }

    async create(user: User) {
        await this.db.insert(users).values({
            id: user.id,
            email: user.email,
            password_hash: (user as any).passwordHash,
            created_at: user.createdAt,
        });
    }

    async findByEmail(email: string) {
        const [row] = await this.db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (!row) return null;
        return new User(row.id, row.email, row.password_hash, row.created_at);
    }
}
