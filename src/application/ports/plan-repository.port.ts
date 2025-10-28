import { Plan } from "../../domain/entities/plan";

export interface IPlanRepository {
    findAll(): Promise<Plan[]>;
    findById(id: string): Promise<Plan | null>;
}
