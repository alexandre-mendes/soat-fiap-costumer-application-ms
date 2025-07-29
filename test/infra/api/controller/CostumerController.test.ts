import { AddCostumerUseCase } from '../../../../src/application/usecase/AddCostumerUseCase';
import { FindCostumerByCpfUseCase } from '../../../../src/application/usecase/FindCostumerByCpfUseCase';
import { FindCostumerByIdUseCase } from '../../../../src/application/usecase/FindCostumerByIdUseCase';
import { Costumer } from '../../../../src/domain/entity/Costumer';
import { CostumerController } from '../../../../src/infra/api/controller/CostumerController';
import { Response, Request } from 'express';

describe('Testa controller de cliente', () => {

    let costumerController: CostumerController;
    let mockAddCostumerUseCase: jest.Mocked<AddCostumerUseCase>;
    let mockFindCostumerByCpfUseCase: jest.Mocked<FindCostumerByCpfUseCase>;
    let findCostumerByIdUseCase: jest.Mocked<FindCostumerByIdUseCase>;

    let mockResponse: jest.Mocked<Response>;

    beforeEach(() => {
        mockResponse = { json: jest.fn(), send: jest.fn(), status: jest.fn() } as unknown as jest.Mocked<Response>;
        mockResponse.json.mockReturnValue(mockResponse)
        mockResponse.send.mockReturnValue(mockResponse)

        mockAddCostumerUseCase = { execute: jest.fn() } as jest.Mocked<AddCostumerUseCase>;
        mockFindCostumerByCpfUseCase = { execute: jest.fn() } as jest.Mocked<FindCostumerByCpfUseCase>;
        findCostumerByIdUseCase = { execute: jest.fn() } as jest.Mocked<FindCostumerByIdUseCase>;

        costumerController = new CostumerController(mockAddCostumerUseCase, mockFindCostumerByCpfUseCase, findCostumerByIdUseCase);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Deve executar consulta de cliente por id', () => {
        findCostumerByIdUseCase.execute.mockResolvedValueOnce(Promise.resolve({} as Costumer));

        costumerController.findById({ body: {}, params: { id: 'id' } } as unknown as Request, mockResponse);

        expect(findCostumerByIdUseCase.execute).toHaveBeenCalled();
    });

    test('Deve executar consulta de cliente por cpf', () => {
        mockFindCostumerByCpfUseCase.execute.mockResolvedValueOnce(Promise.resolve({} as Costumer));

        costumerController.findByCpf({ body: {}, params: { cpf: 'cpf' } } as unknown as Request, mockResponse);

        expect(mockFindCostumerByCpfUseCase.execute).toHaveBeenCalled();
    });

    test('Deve salvar cliente com sucesso', () => {
        mockAddCostumerUseCase.execute.mockResolvedValueOnce(Promise.resolve({} as Costumer));

        costumerController.create({ body: {} } as unknown as Request, mockResponse);

        expect(mockAddCostumerUseCase.execute).toHaveBeenCalled();
    });

})