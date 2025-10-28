import {ISubscriptionRepository} from "../ports/subscription-repository.port";

export class GetSubscriptionStatusUseCase {
    constructor(private subscriptionRepo: ISubscriptionRepository) {}

    async execute(userId: string) {
        const sub = await this.subscriptionRepo.findByUserId(userId);
        if (!sub) return { status: "none" };

        sub.isExpired() && (sub.status = "expired");
        return { status: sub.status, expiresAt: sub.endAt };
    }
}
