import { Controller, Post, Body } from "@nestjs/common";
import { RegisterUserUseCase } from "../../application/use-cases/register-user.usecase";

@Controller("auth")
export class AuthController {
    constructor(private registerUser: RegisterUserUseCase) {}

    @Post("register")
    async register(@Body() body: { email: string; password: string }) {
        const { email, password } = body;
        const result = await this.registerUser.execute(email, password);
        return { ok: true, user: result };
    }
}
