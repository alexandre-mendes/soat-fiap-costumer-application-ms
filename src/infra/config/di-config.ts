import { CostumerRepository } from "../../application/repository/CostumerRepository";
import { AddCostumerUseCase } from "../../application/usecase/AddCostumerUseCase";
import { FindCostumerByCpfUseCase } from "../../application/usecase/FindCostumerByCpfUseCase";
import { FindCostumerByIdUseCase } from "../../application/usecase/FindCostumerByIdUseCase";
import { DefaultAddCostumerUseCase } from "../../application/usecase/implementations/command/DefaultAddCostumerUseCase";
import { DefaultFindCostumerByCpf } from "../../application/usecase/implementations/query/DefaultFindCostumerByCpf";
import { DefaultFindCostumerByIdUseCase } from "../../application/usecase/implementations/query/DefaultFindCostumerByIdUseCase";
import { CostumerController } from "../api/controller/CostumerController";
import { DefaultCostumerRepository } from "../database/DefaultCostumerRepository";
import { CostumerDynamoDatabase, ICostumer } from "../database/dynamo/CostumerDynamoDatabase";
import { DynamoDb } from "../database/dynamo/DynamoConfig";
import { IDatabase } from "../database/dynamo/IDatabase";


/*
    Dynamo
*/
const dynamo = new DynamoDb();

/*
    IDatabase - Dynamo
*/
const costumerDatabase: IDatabase<ICostumer> = new CostumerDynamoDatabase(dynamo)

/*
    Repositories
*/
const costumerRepository: CostumerRepository = new DefaultCostumerRepository(costumerDatabase);

/*
    Use Cases
*/
const createCostumerUseCase: AddCostumerUseCase = new DefaultAddCostumerUseCase(costumerRepository);
const findCostumerByCpfUseCase: FindCostumerByCpfUseCase = new DefaultFindCostumerByCpf(costumerRepository);
const findCostumerByIdUseCase: FindCostumerByIdUseCase = new DefaultFindCostumerByIdUseCase(costumerRepository);

/*
    Controllers
*/
const costumerController = new CostumerController(createCostumerUseCase, findCostumerByCpfUseCase, findCostumerByIdUseCase);

export { costumerController };
