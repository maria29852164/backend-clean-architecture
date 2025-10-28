import { Injectable, Inject } from "@nestjs/common";
import { IPlanRepository } from "../../application/ports/plan-repository.port";
import { Plan } from "../../domain/entities/plan";
import { plans } from "../db/drizzle/schema";
import { eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

@Injectable()
export class PlanRepositoryDrizzle implements IPlanRepository {
  constructor(
    @Inject("DRIZZLE_CONNECTION") private db: MySql2Database<typeof import("../db/drizzle/schema")>
  ) {}

  async findAll(): Promise<Plan[]> {
    const rows = await this.db.select().from(plans);
    return rows.map(
      r => new Plan(r.id, r.name, r.description ?? '', r.price_cents, r.duration_days, r.created_at)
    );
  }

  async findById(id: string) {
    const [r] = await this.db.select().from(plans).where(eq(plans.id, id));
    return r ? new Plan(r.id, r.name, r.description ?? '', r.price_cents, r.duration_days, r.created_at) : null;
  }
}
