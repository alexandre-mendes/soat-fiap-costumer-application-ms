import { Costumer } from "../../domain/entity/Costumer";

export interface AddCostumerUseCase {
    execute(input: Input): Promise<Costumer>;
}

export interface Input {
    cpf: string,
    name: string,
    email: string
}