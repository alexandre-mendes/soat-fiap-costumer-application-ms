import { CostumerRepository } from "../../../../../src/application/repository/CostumerRepository";
import { FindCostumerByCpfUseCase } from "../../../../../src/application/usecase/FindCostumerByCpfUseCase";
import { DefaultFindCostumerByCpfUseCase } from "../../../../../src/application/usecase/implementations/query/DefaultFindCostumerByCpfUseCase";
import { Costumer } from "../../../../../src/domain/entity/Costumer";

describe('Testa consulta de cliente por CPF', () => {

    let findCostumerByCpfUseCase: FindCostumerByCpfUseCase;
    let mockCostumerRepository: jest.Mocked<CostumerRepository>;

    beforeEach(() => {
        mockCostumerRepository = {
            findByCpf: jest.fn(),
            findById: jest.fn(),
            save: jest.fn()
        } as jest.Mocked<CostumerRepository>;

        findCostumerByCpfUseCase = new DefaultFindCostumerByCpfUseCase(mockCostumerRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Deve consultar cliente com sucesso', async () => {
        const cpf = '38010960098'

        mockCostumerRepository.findByCpf.mockResolvedValueOnce({cpf} as Costumer)

        const result = await findCostumerByCpfUseCase.execute(cpf);

        expect(result).toBeDefined();
        expect(result?.cpf).toEqual(cpf)
    })
})