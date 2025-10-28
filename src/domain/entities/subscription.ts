export type SubscriptionStatus = 'active' | 'expired' | 'cancelled';

export class Subscription {
    constructor(
        public id: string,
        public userId: string,
        public planId: string,
        public startAt: Date,
        public endAt: Date,
        public status: SubscriptionStatus = 'active',
        public createdAt: Date = new Date()
    ) {}

    public cancel() {
        this.status = 'cancelled';
    }

    public checkExpired(now = new Date()) {
        if (now > this.endAt) this.status = 'expired';
    }
}
