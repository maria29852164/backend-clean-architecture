import {ISubscriptionRepository} from "../ports/subscription-repository.port";
import {SubscriptionStatus} from "../../domain/entities/subscription";

export class UpdateSubscriptionState {
    constructor(private subscriptionRepo: ISubscriptionRepository) {}

    async execute(status: string, userId: string) {
        const sub = await this.subscriptionRepo.findByUserId(userId);
        if (!sub) return { status: "none" };
        sub.status = status as SubscriptionStatus;
        await this.subscriptionRepo.update(sub);

        sub.isExpired() && (sub.status = "expired");
        return { status: sub.status, expiresAt: sub.endAt };
    }
}
