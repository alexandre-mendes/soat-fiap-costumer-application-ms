import { Costumer } from "../../../src/domain/entity/Costumer";

describe('Testa criação de cliente', () => {

     test('Deve criar cliente com sucesso', () => {
        const cpf = '38010960098';
        const name = 'Alexandre';
        const email = 'alexandre@fiap.com';

        const costumer = new Costumer(cpf, name, email);
        
        expect(costumer).toBeDefined();
        expect(costumer.cpf).toEqual(cpf);
        expect(costumer.name).toEqual(name);
        expect(costumer.email).toEqual(email);
     });

     test('Deve informar que o CPF é obrigatório', () => {
        expect(() => new Costumer('', 'Alexandre', 'alexandre.fiap.com')).toThrow('O CPF é obrigatório');
     });

     test('Deve informar que o nome é obrigatório', () => {
        expect(() => new Costumer('38010960098', '', 'alexandre.fiap.com')).toThrow('O nome é obrigatório');
     });

     test('Deve informar que o email é obrigatório', () => {
        expect(() => new Costumer('38010960098', 'Alexandre', '')).toThrow('O email é obrigatório');
     });
});