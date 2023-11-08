import { Farmacia } from "./Classes";
import * as leitor from "readline-sync";

async function main() {
    const farmacia = new Farmacia();

    while (true) {
        console.log(`Seja bem-vindo à farmácia!`);
        console.log(`1 - Adicionar Medicamento`);
        console.log(`2 - Deletar Medicamento`);
        console.log(`3 - Visualizar Estoque`);
        console.log(`0 - Sair`);

        let opcao = leitor.questionInt(`Informe a opção desejada: `);

        switch (opcao) {
            case 1:
                await farmacia.adicionarMedicamento();
                break;
            case 2:
                await farmacia.deletarMedicamento();
                break;
            case 3:
                await farmacia.visualizarEstoque();
                break;
            case 0:
                console.log(`Saindo, volte sempre.`);
                process.exit(0);
            default:
                console.log(`Opção inválida!\n`);
                break;
        }
    }
}

main();
