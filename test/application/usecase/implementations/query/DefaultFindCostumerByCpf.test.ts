import { CostumerRepository } from "../../../../../src/application/repository/CostumerRepository";
import { FindCostumerByCpfUseCase } from "../../../../../src/application/usecase/FindCostumerByCpfUseCase";
import { DefaultFindCostumerByCpf } from "../../../../../src/application/usecase/implementations/query/DefaultFindCostumerByCpf";
import { Costumer } from "../../../../../src/domain/entity/Costumer";

describe('Testa consulta de cliente por CPF', () => {

    let findCostumerByCpfUseCase: FindCostumerByCpfUseCase;
    let mockCostumerRepository: jest.Mocked<CostumerRepository>;

    beforeEach(() => {
        mockCostumerRepository = {
            findByCpf: jest.fn(),
            save: jest.fn()
        } as jest.Mocked<CostumerRepository>;

        findCostumerByCpfUseCase = new DefaultFindCostumerByCpf(mockCostumerRepository);
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