import { Subscription } from "../../domain/entities/subscription";

export interface ISubscriptionRepository {
    create(subscription: Subscription): Promise<void>;
    findByUserId(userId: string): Promise<Subscription | null>;
    update(subscription: Subscription): Promise<void>;
}
