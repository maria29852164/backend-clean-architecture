import {Controller, Post, Get, Body, Req, Put} from "@nestjs/common";
import {SubscribeToPlanUseCase} from "../../application/use-cases/subscribe.usecase";
import {GetSubscriptionStatusUseCase} from "../../application/use-cases/get-subscription-status.usecase";
import {UpdateSubscriptionState} from "../../application/use-cases/update-subscription.usecase";
import {ChangeSubscription} from "../../application/use-cases/change-subscription.usecase";

@Controller("subscriptions")
export class SubscriptionsController {
    constructor(
        private readonly subscribeUseCase: SubscribeToPlanUseCase,
        private readonly statusUseCase: GetSubscriptionStatusUseCase,
        private readonly updateSubscriptionState: UpdateSubscriptionState,
        private readonly changeSubscription: ChangeSubscription,
    ) {}

    @Post()
    async subscribe(@Body() body: { userId: string; planId: string }) {
        return await this.subscribeUseCase.execute(body.userId, body.planId);
    }

    @Get("me")
    async geStatus(@Req() req: any) {
        const userId = req.user?.sub || req.query.userId; // placeholder
        console.log('userId ', userId);
        return await this.statusUseCase.execute(userId);
    }
    @Put("status")
    async updateStatusSubscription(@Req() req: any, @Body() body: { status:string, userId: string }) {

        return await this.updateSubscriptionState.execute(body.status, body.userId);

    }
    @Put('change')
    async changeSubscriptionUpdate(@Req() req: any, @Body() body: {userId: string; planId: string }) {
        return await this.changeSubscription.execute(body.userId,body.planId);
    }
}
