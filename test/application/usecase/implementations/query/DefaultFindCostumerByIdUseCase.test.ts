import { CostumerRepository } from "../../../../../src/application/repository/CostumerRepository";
import { Costumer } from "../../../../../src/domain/entity/Costumer";
import { FindCostumerByIdUseCase } from '../../../../../src/application/usecase/FindCostumerByIdUseCase';
import { DefaultFindCostumerByIdUseCase } from '../../../../../src/application/usecase/implementations/query/DefaultFindCostumerByIdUseCase';

describe('Testa consulta de cliente por id', () => {

    let findCostumerByIdUseCase: FindCostumerByIdUseCase;
    let mockCostumerRepository: jest.Mocked<CostumerRepository>;

    beforeEach(() => {
        mockCostumerRepository = {
            findByCpf: jest.fn(),
            findById: jest.fn(),
            save: jest.fn()
        } as jest.Mocked<CostumerRepository>;

        findCostumerByIdUseCase = new DefaultFindCostumerByIdUseCase(mockCostumerRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Deve consultar cliente por id com sucesso', async () => {
        const id = '123'

        mockCostumerRepository.findById.mockResolvedValueOnce({id} as Costumer)

        const result = await findCostumerByIdUseCase.execute(id);

        expect(result).toBeDefined();
        expect(result?.id).toEqual(id)
    })
})