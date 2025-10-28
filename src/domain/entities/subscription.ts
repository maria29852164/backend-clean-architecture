export type SubscriptionStatus = 'active' | 'expired' | 'cancelled';

export class Subscription {
    constructor(
        public id: string,
        public userId: string,
        public planId: string,
        public startAt: Date,
        public endAt: Date,
        public status: SubscriptionStatus = 'active',
        public createdAt: Date = new Date(),
    ) {}

    cancel() {
        this.status = 'cancelled';
    }

    isExpired(now = new Date()) {
        return now > this.endAt;
    }
}
