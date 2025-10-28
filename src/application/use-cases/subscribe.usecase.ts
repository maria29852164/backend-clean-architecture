import { randomUUID } from "crypto";
import {FirestoreLogger} from "../../infrastructure/firebase/firestore-logger";
import {IPlanRepository} from "../ports/plan-repository.port";
import {ISubscriptionRepository} from "../ports/subscription-repository.port";
import {Subscription} from "../../domain/entities/subscription";

export class SubscribeToPlanUseCase {
    constructor(
        private subscriptionRepo: ISubscriptionRepository,
        private planRepo: IPlanRepository,
        private logger: FirestoreLogger
    ) {}

    async execute(userId: string, planId: string) {
        const plan = await this.planRepo.findById(planId);
        if (!plan) throw new Error("PLAN_NOT_FOUND");

        const startAt = new Date();
        const endAt = new Date(startAt.getTime() + plan.durationDays * 24 * 60 * 60 * 1000);
        const subscription = new Subscription(randomUUID(), userId, planId, startAt, endAt, "active");

        await this.subscriptionRepo.create(subscription);
        await this.logger.log("subscription.created", { userId, planId });

        return subscription;
    }
}
