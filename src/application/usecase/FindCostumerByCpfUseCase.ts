import { Costumer } from "../../domain/entity/Costumer";

export interface FindCostumerByCpfUseCase {
    execute(cpf: string): Promise<Costumer | undefined>;
}