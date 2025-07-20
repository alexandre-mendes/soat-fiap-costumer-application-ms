import { Costumer } from "../../domain/entity/Costumer";

export interface CostumerRepository {
    save(client: Costumer): Promise<Costumer>;
    findByCpf(cpf: string): Promise<Costumer|undefined>;

}