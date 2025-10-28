import { Module } from "@nestjs/common";
import { DrizzleModule } from "./infrastructure/db/drizzle/drizzle.module";
import { AuthController } from "./entrypoints/controllers/auth.controller";
import { PlansController } from "./entrypoints/controllers/plans.controller";
import { SubscriptionsController } from "./entrypoints/controllers/subscriptions.controller";
import { UserRepositoryDrizzle } from "./infrastructure/repositories/user.repository.drizzle";
import { PlanRepositoryDrizzle } from "./infrastructure/repositories/plan.repository.drizzle";
import { SubscriptionRepositoryDrizzle } from "./infrastructure/repositories/subscription.repository.drizzle";
import { FirestoreLogger } from "./infrastructure/firebase/firestore-logger";
import { JwtModule } from "@nestjs/jwt";
import {RegisterUserUseCase} from "./application/use-cases/register-user.usecase";
import {LoginUserUseCase} from "./application/use-cases/login.usecase";
import {ListPlansUseCase} from "./application/use-cases/list-plans.usecase";
import {SubscribeToPlanUseCase} from "./application/use-cases/subscribe.usecase";
import {GetSubscriptionStatusUseCase} from "./application/use-cases/get-subscription-status.usecase";

@Module({
    imports: [
        DrizzleModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || "changeme",
            signOptions: { expiresIn: "1d" },
        }),
    ],
    controllers: [AuthController, PlansController, SubscriptionsController],
    providers: [
        FirestoreLogger,
        UserRepositoryDrizzle,
        PlanRepositoryDrizzle,
        SubscriptionRepositoryDrizzle,

        RegisterUserUseCase,
        LoginUserUseCase,
        ListPlansUseCase,
        SubscribeToPlanUseCase,
        GetSubscriptionStatusUseCase,
    ],
})
export class AppModule {}
