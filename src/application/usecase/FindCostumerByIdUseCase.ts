import { Costumer } from "../../domain/entity/Costumer";

export interface FindCostumerByIdUseCase {
    execute(id: string): Promise<Costumer | undefined>
}