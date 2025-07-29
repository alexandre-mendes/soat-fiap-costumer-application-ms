import { CostumerRepository } from "../../../../../src/application/repository/CostumerRepository";
import { AddCostumerUseCase } from "../../../../../src/application/usecase/AddCostumerUseCase";
import { DefaultAddCostumerUseCase } from "../../../../../src/application/usecase/implementations/command/DefaultAddCostumerUseCase";
import { Costumer } from "../../../../../src/domain/entity/Costumer";

describe('Testa inclusão de cliente', () => {

    let addCostumerUseCase: AddCostumerUseCase;
    let mockCostumerRepository: jest.Mocked<CostumerRepository>;

    beforeEach(() => {
        mockCostumerRepository = {
            findByCpf: jest.fn(),
            save: jest.fn(),
            findById: jest.fn()
        } as jest.Mocked<CostumerRepository>;

        addCostumerUseCase = new DefaultAddCostumerUseCase(mockCostumerRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Deve incluir cliente com sucesso', async () => {
        mockCostumerRepository.findByCpf.mockResolvedValue(undefined);
        mockCostumerRepository.save.mockImplementationOnce((costumer: Costumer) => Promise.resolve(costumer))

        const input = {
            cpf: '38010960098',
            name: 'Alexandre',
            email: 'alexandre@testmail.com'
        }

        const result = await addCostumerUseCase.execute(input)

        expect(result.cpf).toEqual(input.cpf)
        expect(result.name).toEqual(input.name)
        expect(result.email).toEqual(input.email)
    })
})