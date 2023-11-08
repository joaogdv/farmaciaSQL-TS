import * as leitor from 'readline-sync';
import banco from './db'
class Medicamento {
    nome: string;
    qtd: number;
    preco: number;

    constructor(nome: string, qtd: number, preco: number) {
        this.nome = nome;
        this.qtd = qtd;
        this.preco = preco;
    }
}

export class Farmacia {
    medicamentos: Medicamento[];

    constructor() {
        this.medicamentos = [];
    }

    async adicionarMedicamento(): Promise<void> {
        let nome = leitor.question("Informe o nome do novo medicamento: ");
        let qtd = parseFloat(leitor.question("Informe a quantidade do novo medicamento: "));
        let preco = parseFloat(leitor.question("Informe o preço do novo medicamento: "));
        let medicamento = new Medicamento(nome, qtd, preco);
        this.medicamentos.push(medicamento);
        await this.criarMedicamentoBanco(medicamento);
        console.log(`Foi adicionado ao estoque: ${qtd} de ${nome}`);
    }

    async criarMedicamentoBanco(medicamento: Medicamento): Promise<void> {
        try {
            await executeDatabaseQuery(`INSERT INTO medicamentos (nome, qtd, preco) VALUES (?, ?, ?)`, [medicamento.nome, medicamento.qtd, medicamento.preco]);
            console.log(`Medicamento ${medicamento.nome} inserido no BD com sucesso!`);
        } catch (err) {
            console.log('Erro: ', err);
        }
    }

    async deletarMedicamento(): Promise<void> {
        await this.medicamentosBanco()
        let id_medicamento = leitor.questionInt("Informe o ID do medicamento a ser deletado: ")

        try {
            await executeDatabaseQuery("DELETE FROM medicamentos WHERE id_medicamento = ?", [id_medicamento])
            console.log(`Medicamento deletado com sucesso`);
        } catch (err) {
            console.log(`Erro: `, err);
        }
    }

    async visualizarEstoque(): Promise<void> {
        try {
            const medicamentos = await this.medicamentosBanco();
            console.log("Medicamentos disponíveis no estoque:");
            medicamentos.forEach(({ nome, qtd, preco }: any) => {
                console.log(`${nome} - Quantidade: ${qtd} - Preço: R$ ${preco}`);
            });
        } catch (err) {
            console.log('Erro: ', err);
        }
    }

    async medicamentosBanco(): Promise<any[]> {
        try {
            const medicamentos = await executeDatabaseQuery("SELECT * FROM medicamentos", []);
            return medicamentos;
        } catch (err) {
            console.log('Erro: ', err);
            return [];
        }
    }
}

async function executeDatabaseQuery(query: string, params: any[]): Promise<any> {
    try {
       
        const result = await banco.execute(query, params);
        return result;
    } catch (err) {
        console.error('Erro na execução da consulta', err);
        throw err;
    }
}
