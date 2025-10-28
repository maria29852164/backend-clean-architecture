import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../../app.module';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { users, plans, subscriptions } from './schema';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    // Obtener la conexión Drizzle
    const db = app.get<MySql2Database<typeof import('./schema')>>('DRIZZLE_CONNECTION');

    console.log('🚀 Limpiando tablas...');
    await db.delete(subscriptions).execute();
    await db.delete(users).execute();
    await db.delete(plans).execute();

    console.log('📦 Insertando datos de prueba...');

    // Crear usuarios
    const passwordHash = await bcrypt.hash('password123', 10);
    const userId = randomUUID();
    await db.insert(users).values({
        id: userId,
        email: 'testuser@example.com',
        password_hash: passwordHash,
        created_at: new Date(),
    });

    // Crear planes
    const planBasicId = randomUUID();
    const planProId = randomUUID();
    await db.insert(plans).values([
        {
            id: planBasicId,
            name: 'Plan Básico',
            description: 'Acceso limitado a cursos',
            price_cents: 1000,
            duration_days: 30,
            created_at: new Date(),
        },
        {
            id: planProId,
            name: 'Plan Pro',
            description: 'Acceso completo a todos los cursos',
            price_cents: 5000,
            duration_days: 30,
            created_at: new Date(),
        },
    ]);

    // Crear suscripción
    const startAt = new Date();
    const endAt = new Date(startAt.getTime() + 30 * 24 * 60 * 60 * 1000);
    await db.insert(subscriptions).values({
        id: randomUUID(),
        user_id: userId,
        plan_id: planBasicId,
        start_at: startAt,
        end_at: endAt,
        status: 'active',
        created_at: new Date(),
    });

    console.log('✅ Seeder ejecutado correctamente');
    await app.close();
}

bootstrap().catch((err) => {
    console.error('❌ Error ejecutando seeder:', err);
    process.exit(1);
});
