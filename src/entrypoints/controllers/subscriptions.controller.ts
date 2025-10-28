import { Controller, Post, Get, Body, Req } from "@nestjs/common";
import {SubscribeToPlanUseCase} from "../../application/use-cases/subscribe.usecase";
import {GetSubscriptionStatusUseCase} from "../../application/use-cases/get-subscription-status.usecase";

@Controller("subscriptions")
export class SubscriptionsController {
    constructor(
        private readonly subscribeUseCase: SubscribeToPlanUseCase,
        private readonly statusUseCase: GetSubscriptionStatusUseCase
    ) {}

    @Post()
    async subscribe(@Body() body: { userId: string; planId: string }) {
        return await this.subscribeUseCase.execute(body.userId, body.planId);
    }

    @Get("me")
    async getStatus(@Req() req: any) {
        const userId = req.user?.sub || req.query.userId; // placeholder
        return await this.statusUseCase.execute(userId);
    }
}
