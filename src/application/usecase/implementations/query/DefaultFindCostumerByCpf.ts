import { Costumer } from "../../../../domain/entity/Costumer";
import { CostumerRepository } from "../../../repository/CostumerRepository";
import { FindCostumerByCpfUseCase } from "../../FindCostumerByCpfUseCase";

export class DefaultFindCostumerByCpf implements FindCostumerByCpfUseCase {

    constructor(private costumerRepository: CostumerRepository) {}
    
    async execute(cpf: string): Promise<Costumer | undefined> {
        return await this.costumerRepository.findByCpf(cpf);
    }
    
}