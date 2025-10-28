import {ISubscriptionRepository} from "../ports/subscription-repository.port";
import {Subscription} from "../../domain/entities/subscription";
import {randomUUID} from "crypto";
import {IPlanRepository} from "../ports/plan-repository.port";
import {FirestoreLogger} from "../../infrastructure/firebase/firestore-logger";

export class ChangeSubscription {
    constructor(private subscriptionRepo: ISubscriptionRepository, private planRepo: IPlanRepository,        private logger: FirestoreLogger
    ) {}

    async execute(userId: string, planId:string) {
          await this.subscriptionRepo.deleteSubscription(userId);

        const plan = await this.planRepo.findById(planId);
        if (!plan) throw new Error("PLAN_NOT_FOUND");

        const startAt = new Date();
        const endAt = new Date(startAt.getTime() + plan.durationDays * 24 * 60 * 60 * 1000);
        const subscription = new Subscription(randomUUID(), userId, planId, startAt, endAt, "active");

        await this.subscriptionRepo.create(subscription);
        await this.logger.log("subscription.changed", { userId, planId });
        return subscription;
    }
}
