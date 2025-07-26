import { DBOperation, DBQuery, Filter, IDatabase } from "./IDatabase";
import { DynamoDb } from "./DynamoConfig";

export interface ICostumer {
  id?: string,
  name: string;
  email: string;
  cpf: string;
}

export class CostumerDynamoDatabase implements IDatabase<ICostumer> {

  constructor(private dynamo: DynamoDb) { }

  async save(entity: ICostumer): Promise<ICostumer> {
    if (!entity.id)
      entity.id = crypto.randomUUID();

    await this.dynamo.putItem('costumer', entity);
    return entity;
  }

  async update(entity: ICostumer): Promise<ICostumer> {
    return await this.save(entity);
  }

  async deleteById(id: string): Promise<void> {
    await this.dynamo.deleteItem('costumer', { id })
  }

  async findById(id: string): Promise<ICostumer | null> {
    return await this.dynamo.getItem('costumer', { id }) as ICostumer;
  }

  async findByQuery(query: DBQuery): Promise<ICostumer> {
    const results = await this.findAllByQuery(query);
    return results[0] ?? null;
  }

  async findAllByQuery(query: DBQuery): Promise<ICostumer[]> {
    const expressionParts: string[] = [];
    const expressionValues: Record<string, any> = {};
    const expressionNames: Record<string, string> = {};

    query.andCriteria.forEach((criteria, i) => {
      const valuePlaceholder = `:v${i}`;
      const keyAlias = `#k${i}`;

      expressionNames[keyAlias] = criteria.key;
      expressionValues[valuePlaceholder] = criteria.value;

      switch (criteria.operation) {
        case DBOperation.EQUALS:
          expressionParts.push(`${keyAlias} = ${valuePlaceholder}`);
          break;
        case DBOperation.NOT_EQUALS:
          expressionParts.push(`${keyAlias} <> ${valuePlaceholder}`);
          break;
        default:
          throw new Error(`Operação não suportada: ${criteria.operation}`);
      }
    });

    const filterExpression = expressionParts.join(' AND ');

    const result = await this.dynamo.scanByField<ICostumer>({
      tableName: 'costumer',
      filterExpression,
      expressionValues,
      expressionNames,
    });

    return result;
  }

}