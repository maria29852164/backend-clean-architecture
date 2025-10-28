import { Controller, Post, Body } from "@nestjs/common";
import {RegisterUserUseCase} from "../../application/use-cases/register-user.usecase";
import {LoginUserUseCase} from "../../application/use-cases/login.usecase";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly registerUser: RegisterUserUseCase,
        private readonly loginUser: LoginUserUseCase
    ) {}

    @Post("register")
    async register(@Body() body: { email: string; password: string }) {
        return await this.registerUser.execute(body.email, body.password);
    }

    @Post("login")
    async login(@Body() body: { email: string; password: string }) {
        return await this.loginUser.execute(body.email, body.password);
    }
}
