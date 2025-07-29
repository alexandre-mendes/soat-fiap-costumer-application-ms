import { CostumerRepository } from '../../../src/application/repository/CostumerRepository';
import { ICostumer } from '../../../src/infra/database/dynamo/CostumerDynamoDatabase';
import { IDatabase } from '../../../src/infra/database/dynamo/IDatabase';
import { DefaultCostumerRepository } from '../../../src/infra/database/DefaultCostumerRepository';
import { Costumer } from '../../../src/domain/entity/Costumer';
describe('Testa repository de cliente', () => {

    let costumerRepository: CostumerRepository;
    let database: jest.Mocked<IDatabase<ICostumer>>;
    let costumer: any = { id: '123', cpf: '38010960098', email: 'a@a.com', name: 'Joao' };

    beforeEach(() => {
        database = {
            save: jest.fn(),
            update: jest.fn(),
            deleteById: jest.fn(),
            findById: jest.fn(),
            findByQuery: jest.fn(),
            findAllByQuery: jest.fn(),
        } as jest.Mocked<IDatabase<ICostumer>>;

        costumerRepository = new DefaultCostumerRepository(database);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Deve retornar cliente por id', () => {
        database.findByQuery.mockResolvedValue(costumer);

        costumerRepository.findById('123');

        expect(database.findByQuery).toHaveBeenCalled()
    })

    test('Deve retornar cliente por cpf', () => {
        database.findByQuery.mockResolvedValue(costumer);

        costumerRepository.findByCpf('123');

        expect(database.findByQuery).toHaveBeenCalled()
    })

    test('Deve salvar um cliente', () => {
        database.save.mockResolvedValue(costumer);

        costumerRepository.save(costumer);

        expect(database.save).toHaveBeenCalled()
    })
})