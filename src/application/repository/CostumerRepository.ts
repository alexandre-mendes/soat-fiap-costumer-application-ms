import { Costumer } from "../../domain/entity/Costumer";

export interface CostumerRepository {
    findById(id: string): Promise<Costumer|undefined>;
    save(client: Costumer): Promise<Costumer>;
    findByCpf(cpf: string): Promise<Costumer|undefined>;

}