import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import {IUserRepository} from "../ports/user-repository.port";

export class LoginUserUseCase {
    constructor(
        private userRepo: IUserRepository,
        private jwt: JwtService
    ) {}

    async execute(email: string, password: string) {
        const user = await this.userRepo.findByEmail(email);
        if (!user) throw new Error("INVALID_CREDENTIALS");

        const valid = await bcrypt.compare(password, user.getPasswordHash());
        if (!valid) throw new Error("INVALID_CREDENTIALS");

        const token = this.jwt.sign({ sub: user.id, email: user.email });
        return { token };
    }
}
