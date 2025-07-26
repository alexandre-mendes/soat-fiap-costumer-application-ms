import { Costumer } from "../../../../domain/entity/Costumer";
import { CostumerRepository } from "../../../repository/CostumerRepository";
import { FindCostumerByIdUseCase } from "../../FindCostumerByIdUseCase";

export class DefaultFindCostumerByIdUseCase implements FindCostumerByIdUseCase {

    constructor(private costumerRepository: CostumerRepository) {}

    execute(id: string): Promise<Costumer | undefined> {
        return this.costumerRepository.findById(id);
    }
}