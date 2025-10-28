import { Controller, Get } from "@nestjs/common";
import {ListPlansUseCase} from "../../application/use-cases/list-plans.usecase";

@Controller("plans")
export class PlansController {
    constructor(private readonly listPlans: ListPlansUseCase) {}

    @Get()
    async findAll() {
        return await this.listPlans.execute();
    }
}
