import { CostumerRepository } from "../../application/repository/CostumerRepository";
import { Costumer } from "../../domain/entity/Costumer";
import { ICostumer } from "./dynamo/CostumerDynamoDatabase";
import { DBCriteria, DBOperation, DBQuery, IDatabase } from "./dynamo/IDatabase";

export class DefaultCostumerRepository implements CostumerRepository {

    constructor(private database: IDatabase<ICostumer>) { }

    async findById(id: string): Promise<Costumer | undefined> {
        const query = new DBQuery();
        query.add(new DBCriteria('id', id, DBOperation.EQUALS));
        const finded = await this.database.findByQuery(query);

        if (finded)
            return this.parseToEntity(finded);
        return undefined;
    }

    async save(costumer: Costumer): Promise<Costumer> {
        const db = this.parseToDB(costumer);
        const saved = await this.database.save(db);
        return this.parseToEntity(saved as ICostumer);
    }

    async findByCpf(cpf: string): Promise<Costumer | undefined> {
        const query = new DBQuery();
        query.add(new DBCriteria('cpf', cpf, DBOperation.EQUALS));
        const finded = await this.database.findByQuery(query);

        if (finded)
            return this.parseToEntity(finded);
        return undefined;
    }

    private parseToDB(entity: Costumer) {
        return { id: entity.id, name: entity.name, email: entity.email, cpf: entity.cpf } as ICostumer;
    }

    private parseToEntity(db: ICostumer) {
        const entity = new Costumer(db.cpf, db.name, db.email);
        entity.id = db.id;
        return entity;
    }

}