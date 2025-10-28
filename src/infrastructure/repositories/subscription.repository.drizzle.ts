import { Injectable, Inject } from "@nestjs/common";
import { ISubscriptionRepository } from "../../application/ports/subscription-repository.port";
import {Subscription, SubscriptionStatus} from "../../domain/entities/subscription";
import { subscriptions } from "../db/drizzle/schema";
import { eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

@Injectable()
export class SubscriptionRepositoryDrizzle implements ISubscriptionRepository {
    constructor(
        @Inject("DRIZZLE_CONNECTION") private db: MySql2Database<typeof import("../db/drizzle/schema")>
    ) {}

    async deleteSubscription(userId: string): Promise<void> {
        await this.db
            .delete(subscriptions)
            .where(eq(subscriptions.user_id, userId));

    }

    async create(subscription: Subscription) {
        await this.db.insert(subscriptions).values({
            id: subscription.id,
            user_id: subscription.userId,
            plan_id: subscription.planId,
            start_at: subscription.startAt,
            end_at: subscription.endAt,
            status: subscription.status,
            created_at: subscription.createdAt,
        });
    }

    async findByUserId(userId: string) {
        const [r] = await this.db.select().from(subscriptions).where(eq(subscriptions.user_id, userId));
        return r
            ? new Subscription(r.id, r.user_id, r.plan_id, r.start_at, r.end_at, r.status as SubscriptionStatus , r.created_at)
            : null;
    }

    async update(subscription: Subscription) {
        await this.db
            .update(subscriptions)
            .set({ status: subscription.status })
            .where(eq(subscriptions.id, subscription.id));
    }
    async getSubscriptionById(subscriptionId: string): Promise<Subscription | null> {
        const [result] = await this.db
            .select()
            .from(subscriptions)
            .where(eq(subscriptions.id, subscriptionId))

        if (!result) {
            return null;
        }

        return new Subscription(
            result.id,
            result.user_id,
            result.plan_id,
            result.start_at,
            result.end_at,
            result.status as SubscriptionStatus,
            result.created_at
        );
    }
}
