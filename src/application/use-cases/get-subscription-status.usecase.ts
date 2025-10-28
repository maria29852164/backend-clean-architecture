import {ISubscriptionRepository} from "../ports/subscription-repository.port";
import {IPlanRepository} from "../ports/plan-repository.port";

export class GetSubscriptionStatusUseCase {
    constructor(private subscriptionRepo: ISubscriptionRepository, private planRepo: IPlanRepository) {}

    async execute(userId: string) {
        console.log(this.subscriptionRepo);
        const sub = await this.subscriptionRepo.findByUserId(userId);
        if (!sub) return { status: "none" };
        const plan = await this.planRepo.findById(sub.planId);
        sub.isExpired() && (sub.status = "expired");
        return { subId: sub.id,status: sub.status, expiresAt: sub.endAt , plan};
    }
}
