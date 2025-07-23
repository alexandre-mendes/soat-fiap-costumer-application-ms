import { Request, Response, NextFunction, Router } from 'express';
import { costumerController } from '../config/di-config';
import { errorHandler } from './errorHandler';

const costumerRouter = Router();

costumerRouter.get('/api/costumers/:cpf', errorHandler(costumerController.findByCpf.bind(costumerController)));
costumerRouter.post('/api/costumers', errorHandler(costumerController.create.bind(costumerController)));


export default costumerRouter;