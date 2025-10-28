// src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { MySql2Database } from "./infrastructure/db/drizzle/connection";
import { users, plans, subscriptions } from "./infrastructure/db/drizzle/schema";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Middleware global
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    // -------------------------------
    // Seeder: insertar datos iniciales
    // -------------------------------
    const db = app.get<MySql2Database<typeof import("./infrastructure/db/drizzle/schema")>>("DRIZZLE_CONNECTION");

    const userCount = await db.select().from(users).execute();
    if (userCount.length === 0) {
        console.log("🚀 Ejecutando seeder...");

        await db.insert(users).values({
            id: "user-1",
            email: "test@example.com",
            password_hash: "123456",
        });

        await db.insert(plans).values([
            { id: "plan-1", name: "Básico", description: "Plan básico", price_cents: 1000, duration_days: 30 },
            { id: "plan-2", name: "Pro", description: "Plan pro", price_cents: 5000, duration_days: 30 },
        ]);

        await db.insert(subscriptions).values({
            id: "sub-1",
            user_id: "user-1",
            plan_id: "plan-1",
            start_at: new Date(),
            end_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            status: "active",
        });

        console.log("✅ Seeder ejecutado");
    } else {
        console.log("🟢 Datos ya existen, seeder omitido");
    }

    // -------------------------------
    // Levantar el servidor
    // -------------------------------
    await app.listen(3000);
    console.log("🌐 Server running at http://localhost:3000");
}

bootstrap();
