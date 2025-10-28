import { Module } from "@nestjs/common";
import { DrizzleModule } from "./infrastructure/db/drizzle/drizzle.module";
import { AuthController } from "./entrypoints/controllers/auth.controller";
import { PlansController } from "./entrypoints/controllers/plans.controller";
import { SubscriptionsController } from "./entrypoints/controllers/subscriptions.controller";
import { UserRepositoryDrizzle } from "./infrastructure/repositories/user.repository.drizzle";
import { PlanRepositoryDrizzle } from "./infrastructure/repositories/plan.repository.drizzle";
import { SubscriptionRepositoryDrizzle } from "./infrastructure/repositories/subscription.repository.drizzle";
import { FirestoreLogger } from "./infrastructure/firebase/firestore-logger";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {RegisterUserUseCase} from "./application/use-cases/register-user.usecase";
import {LoginUserUseCase} from "./application/use-cases/login.usecase";
import {ListPlansUseCase} from "./application/use-cases/list-plans.usecase";
import {SubscribeToPlanUseCase} from "./application/use-cases/subscribe.usecase";
import {GetSubscriptionStatusUseCase} from "./application/use-cases/get-subscription-status.usecase";
import {IUserRepository} from "./application/ports/user-repository.port";
import {ISubscriptionRepository} from "./application/ports/subscription-repository.port";
import {IPlanRepository} from "./application/ports/plan-repository.port";

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
        SubscribeToPlanUseCase,
        GetSubscriptionStatusUseCase,
       // PLANS
        {
            provide: "IPlanRepository",
            useClass: PlanRepositoryDrizzle,
        },
        {
            provide: ListPlansUseCase,
            useFactory: (planRepo: IPlanRepository) => new ListPlansUseCase(planRepo),
            inject: ["IPlanRepository"],
        },
        // SUBS
        {
            provide:'ISubscriptionRepository',
            useClass: SubscriptionRepositoryDrizzle
        },
        {
            provide: GetSubscriptionStatusUseCase,
            useFactory: (subRepo: ISubscriptionRepository) => new GetSubscriptionStatusUseCase(subRepo),
        },
        {
            provide: SubscribeToPlanUseCase,
            useFactory: (
                subscriptionRepo: ISubscriptionRepository,
                planRepo: IPlanRepository,
                logger: FirestoreLogger
            ) => new SubscribeToPlanUseCase(subscriptionRepo, planRepo, logger),
            inject: [
                "ISubscriptionRepository",
                "IPlanRepository",
                FirestoreLogger
            ],
        },
        // USER
        {
            provide:'IUserRepository',
            useClass: UserRepositoryDrizzle
        },
        {
            provide: RegisterUserUseCase,
            useFactory: (userRepo: IUserRepository, logger: FirestoreLogger) =>
                new RegisterUserUseCase(userRepo, logger),
            inject: ["IUserRepository", FirestoreLogger],
        },
        {
            provide: LoginUserUseCase,
            useFactory: (userRepo: IUserRepository, jwtService:JwtService) =>
                new LoginUserUseCase(userRepo, jwtService),
            inject: ["IUserRepository", JwtService],
        }
    ],
})
export class AppModule {}
