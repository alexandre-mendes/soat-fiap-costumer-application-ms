import { Request, Response, NextFunction, Router } from 'express';
import { costumerController } from '../config/di-config';
import { wrapHandler } from './errorHandler';

const costumerRouter = Router();

costumerRouter.get('/api/costumers/:cpf', wrapHandler(costumerController.findByCpf.bind(costumerController)));
costumerRouter.post('/api/costumers', wrapHandler(costumerController.create.bind(costumerController)));


export default costumerRouter;