import { Costumer } from "../../../../domain/entity/Costumer";
import { DomainError } from "../../../../domain/error/DomainError";
import { CostumerRepository } from "../../../repository/CostumerRepository";
import { AddCostumerUseCase, Input } from "../../AddCostumerUseCase";

export class DefaultAddCostumerUseCase implements AddCostumerUseCase {

    constructor(private costumerRepository: CostumerRepository) { }

    async execute(input: Input): Promise<Costumer> {
        const finded = await this.costumerRepository.findByCpf(input.cpf);

        if (finded)
            throw new DomainError('O CPF informado já possui cadastro.')

        const client = new Costumer(input.cpf, input.name, input.email);
        return await this.costumerRepository.save(client);
    }

}