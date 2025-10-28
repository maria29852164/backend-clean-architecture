import { IUserRepository } from "../ports/user-repository.port";
import { FirestoreLogger } from "../../infrastructure/firebase/firestore-logger";
import { randomUUID } from "crypto";
import * as bcrypt from "bcrypt";

export class RegisterUserUseCase {
    constructor(
        private userRepo: IUserRepository,
        private logger: FirestoreLogger
    ) {}

    async execute(email: string, password: string) {
        const existing = await this.userRepo.findByEmail(email);
        if (existing) throw new Error("EMAIL_ALREADY_EXISTS");
        const id = randomUUID();
        const hash = await bcrypt.hash(password, 10);
        const user = { id, email, passwordHash: hash, createdAt: new Date() } as any;
        await this.userRepo.create(user);
        await this.logger.log("user.created", { userId: id, email });
        return { id, email };
    }
}
