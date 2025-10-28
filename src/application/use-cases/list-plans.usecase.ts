import {IPlanRepository} from "../ports/plan-repository.port";

export class ListPlansUseCase {
    constructor(private planRepo: IPlanRepository) {}

    async execute() {
        return this.planRepo.findAll();
    }
}
