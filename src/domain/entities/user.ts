
export class User {
    constructor(
        public readonly id: string,
        public email: string,
        private passwordHash?: string,//optional if use firebase
        public createdAt: Date = new Date()
    ) {}

    public setPasswordHash(hash: string) {
        this.passwordHash = hash;
    }

    public validatePasswordHash(hash: string) {
        return this.passwordHash === hash;
    }
}
