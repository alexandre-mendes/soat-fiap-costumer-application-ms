import { Request, Response, NextFunction } from "express";
import { Costumer } from "../../../domain/entity/Costumer";
import { AddCostumerUseCase } from "../../../application/usecase/AddCostumerUseCase";
import { FindCostumerByCpfUseCase } from "../../../application/usecase/FindCostumerByCpfUseCase";

export class CostumerController {

    constructor(private addCostumerUseCase: AddCostumerUseCase, private findCostumerByCpfUseCase: FindCostumerByCpfUseCase) {

    }

    async findByCpf(req: Request, res: Response, next: NextFunction) {
        try 
        {
            const costumer = await this.findCostumerByCpfUseCase.execute(req.params.cpf);
            return res.json(this.parseToOutput(costumer)).status(201);
        }
        catch(error) 
        {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try 
        {
            const costumer = await this.addCostumerUseCase.execute(req.body);
            return res.json(this.parseToOutput(costumer)).status(201);
        }
        catch(error) 
        {
            next(error);
        }
    }

    private parseToOutput(costumer: Costumer | undefined): Output | undefined {
        if (costumer)
            return { id: costumer.id, cpf: costumer.cpf, name: costumer.name, email: costumer.email }
        return undefined;
    }
}

export interface Input {
    cpf: string,
    name: string,
    email: string
}

export interface Output extends Input {
    id: string | undefined
}